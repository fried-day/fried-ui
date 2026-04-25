import { Node } from "ts-morph";
import { describe, expect, it } from "vitest";

import { loadSource } from "../helpers/ast";
import { components } from "../helpers/components";
import { ALIGNMENT_PATTERN, getArgTypeNames, getArgTypesObject, getStoryExportNames } from "../helpers/stories-ast";
import { COMPONENT_ROLES } from "../fixtures/role-manifest";

describe("Audit — story role invariants", () => {
  it.each(components)("$kebab: required stories per role are exported", ({ kebab, storiesFile }) => {
    const role = COMPONENT_ROLES[kebab];
    if (!role) return;

    const source = loadSource({ file: storiesFile });
    if (!source) return;

    const exportNames = new Set(getStoryExportNames(source));
    const missing = role.requiredStories.filter((name) => !exportNames.has(name));

    expect(
      missing,
      `${kebab}.stories.tsx missing required stories for ${role.role} role: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: pass-through props per role appear as argTypes", ({ kebab, storiesFile }) => {
    const role = COMPONENT_ROLES[kebab];
    if (!role?.passthroughProps) return;

    const source = loadSource({ file: storiesFile });
    if (!source) return;

    const argTypeNames = new Set(getArgTypeNames(source));
    const missing = role.passthroughProps.filter((name) => !argTypeNames.has(name));

    expect(
      missing,
      `${kebab}.stories.tsx missing required argTypes for ${role.role} role: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: variant-comparison container alignment matches role", ({ kebab, storiesFile }) => {
    const role = COMPONENT_ROLES[kebab];
    if (!role?.alignment) return;

    const source = loadSource({ file: storiesFile });
    if (!source) return;

    const offenders: string[] = [];

    source.forEachDescendant((node) => {
      if (!Node.isJsxAttribute(node)) return;
      if (node.getNameNode().getText() !== "className") return;

      const init = node.getInitializer();
      if (!Node.isStringLiteral(init)) return;

      const value = init.getLiteralText();
      if (!/\bflex\b/.test(value)) return;

      // Skip demo-backdrop containers (single-component centering, gradient/colored bg)
      if (/\bjustify-center\b/.test(value)) return;
      if (/\bbg-linear-/.test(value)) return;

      const match = ALIGNMENT_PATTERN.exec(value);
      if (!match) return;

      const found = `items-${match[1] ?? ""}`;
      if (found === role.alignment) return;

      offenders.push(
        `line ${String(init.getStartLineNumber())}: "${found}" — ${role.role} role expects "${role.alignment ?? ""}"`,
      );
    });

    expect(offenders, `${kebab}.stories.tsx flex containers misaligned for role:\n${offenders.join("\n")}`).toEqual([]);
  });

  it.each(components)(
    "$kebab: required-children components mark argTypes.children.type.required: true",
    ({ kebab, storiesFile }) => {
      const role = COMPONENT_ROLES[kebab];
      if (!role?.requiresChildren) return;

      const source = loadSource({ file: storiesFile });
      if (!source) return;

      const argTypes = getArgTypesObject(source);
      if (!argTypes) return;

      const childrenProp = argTypes.getProperty("children");

      if (!Node.isPropertyAssignment(childrenProp)) {
        expect.fail(`${kebab}.stories.tsx ${role.role} role requires children argType marked required: true`);

        return;
      }

      const config = childrenProp.getInitializer();
      if (!Node.isObjectLiteralExpression(config)) return;

      const typeProp = config.getProperty("type");

      if (!Node.isPropertyAssignment(typeProp)) {
        expect.fail(
          `${kebab}.stories.tsx children argType missing \`type: { name: 'other', value: 'ReactNode', required: true }\``,
        );

        return;
      }

      const typeInit = typeProp.getInitializer();
      if (!Node.isObjectLiteralExpression(typeInit)) return;

      const requiredProp = typeInit.getProperty("required");

      const requiredText = Node.isPropertyAssignment(requiredProp)
        ? requiredProp.getInitializer()?.getText()
        : undefined;

      expect(
        requiredText,
        `${kebab}.stories.tsx children argType \`type.required\` is "${requiredText ?? "undefined"}" — must be \`true\``,
      ).toBe("true");
    },
  );
});
