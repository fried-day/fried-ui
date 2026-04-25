import { Node } from "ts-morph";
import { describe, expect, it } from "vitest";

import { loadSource } from "../helpers/ast";
import { components } from "../helpers/components";
import {
  getArgTypeNames,
  getArgTypesObject,
  getComponentInterfaceProps,
  passthroughAllowedExtras,
} from "../helpers/stories-ast";

describe("Audit — story / interface parity", () => {
  it.each(components)(
    "$kebab: every {Pascal}Props prop has an argType (and vice versa)",
    ({ componentFile, kebab, pascal, storiesFile }) => {
      const interfaceProps = getComponentInterfaceProps({ componentFile, pascal });
      if (interfaceProps.length === 0) return;

      const source = loadSource({ file: storiesFile });
      if (!source) return;

      const argTypeNames = new Set(getArgTypeNames(source));
      const interfacePropNames = new Set(interfaceProps.map((prop) => prop.name));

      const offenders: string[] = [];

      for (const prop of interfaceProps) {
        if (prop.name === "ref") continue;
        if (argTypeNames.has(prop.name)) continue;

        offenders.push(`interface prop "${prop.name}" missing from argTypes`);
      }

      for (const argTypeName of argTypeNames) {
        if (interfacePropNames.has(argTypeName)) continue;
        if (passthroughAllowedExtras.has(argTypeName)) continue;

        offenders.push(`argType "${argTypeName}" not declared in ${pascal}Props (and not in pass-through whitelist)`);
      }

      expect(
        offenders,
        `${kebab}.stories.tsx argTypes and ${pascal}Props out of sync:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(components)(
    "$kebab: enum argType descriptions follow 4-part template (50–120 words, **bold** groups)",
    ({ kebab, storiesFile }) => {
      const source = loadSource({ file: storiesFile });
      if (!source) return;

      const argTypes = getArgTypesObject(source);
      if (!argTypes) return;

      const offenders: string[] = [];

      for (const argTypeProp of argTypes.getProperties()) {
        if (!Node.isPropertyAssignment(argTypeProp)) continue;

        const propName = argTypeProp.getName();
        const config = argTypeProp.getInitializer();
        if (!Node.isObjectLiteralExpression(config)) continue;

        const optionsProp = config.getProperty("options");
        if (!Node.isPropertyAssignment(optionsProp)) continue;

        const optionsInit = optionsProp.getInitializer();
        if (!Node.isArrayLiteralExpression(optionsInit)) continue;

        if (optionsInit.getElements().length <= 2) continue;

        const descriptionProp = config.getProperty("description");

        if (!Node.isPropertyAssignment(descriptionProp)) {
          offenders.push(`argTypes.${propName} has options but no description`);
          continue;
        }

        const descInit = descriptionProp.getInitializer();
        if (!Node.isStringLiteral(descInit) && !Node.isNoSubstitutionTemplateLiteral(descInit)) continue;

        const text = descInit.getLiteralText();
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const hasBoldGroup = /\*\*[^*]+\*\*/.test(text);

        const reasons: string[] = [];
        if (!hasBoldGroup) reasons.push("missing **bold** option groups");
        if (wordCount < 50) reasons.push(`only ${String(wordCount)} words (min 50)`);
        if (wordCount > 120) reasons.push(`${String(wordCount)} words (max 120)`);

        if (reasons.length === 0) continue;

        offenders.push(
          `line ${String(descInit.getStartLineNumber())}: argTypes.${propName}.description: ${reasons.join("; ")}`,
        );
      }

      expect(
        offenders,
        `${kebab}.stories.tsx enum descriptions violate 4-part template:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );
});
