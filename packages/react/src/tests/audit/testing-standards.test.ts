import { Node, Project, SyntaxKind } from "ts-morph";
import { describe, expect, it } from "vitest";

import { components } from "../helpers/components";

describe("Audit — test naming standards", () => {
  it.each(components)(
    "$kebab: top-level describe arguments use component or subpart PascalCase",
    ({ componentFile, dir, kebab, pascal }) => {
      const project = new Project({ skipAddingFilesFromTsConfig: true });
      const componentSource = project.addSourceFileAtPath(componentFile);

      const validNames = new Set<string>([pascal]);

      for (const decl of componentSource.getInterfaces()) {
        const name = decl.getName();
        if (name.endsWith("Props")) validNames.add(name.replace(/Props$/, ""));
      }

      for (const decl of componentSource.getTypeAliases()) {
        const name = decl.getName();
        if (name.endsWith("Props")) validNames.add(name.replace(/Props$/, ""));
      }

      const testFile = `${dir}/${kebab}.test.tsx`;
      const source = project.addSourceFileAtPath(testFile);

      const calls = source.getDescendantsOfKind(SyntaxKind.CallExpression);

      const topLevelDescribes = calls.filter((call) => {
        if (call.getExpression().getText() !== "describe") return false;

        const parent = call.getParent();
        if (!Node.isExpressionStatement(parent)) return false;

        return parent.getParent() === source;
      });

      expect(
        topLevelDescribes.length,
        `${kebab}.test.tsx must have at least one top-level describe block`,
      ).toBeGreaterThan(0);

      const offenders: string[] = [];

      for (const describeCall of topLevelDescribes) {
        const arg = describeCall.getArguments()[0];
        if (!Node.isStringLiteral(arg) && !Node.isNoSubstitutionTemplateLiteral(arg)) continue;

        const literal = arg.getLiteralText();
        if (validNames.has(literal)) continue;

        offenders.push(
          `line ${String(describeCall.getStartLineNumber())}: describe("${literal}") — expected one of: ${[...validNames].join(", ")}`,
        );
      }

      expect(
        offenders,
        `${kebab}.test.tsx top-level describe must use a PascalCase component or subpart name:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(components)("$kebab: every it() title starts with a lowercase verb", ({ kebab, dir }) => {
    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const testFile = `${dir}/${kebab}.test.tsx`;
    const source = project.addSourceFileAtPath(testFile);

    const calls = source.getDescendantsOfKind(SyntaxKind.CallExpression);
    const offenders: string[] = [];

    for (const call of calls) {
      const expr = call.getExpression();
      const text = expr.getText();
      if (text !== "it" && text !== "it.each") continue;

      const titleArg = text === "it.each" ? call.getArguments()[0] : call.getArguments()[0];
      if (!Node.isStringLiteral(titleArg) && !Node.isNoSubstitutionTemplateLiteral(titleArg)) continue;

      const title = titleArg.getLiteralText();
      const firstWord = title.split(/\s+/)[0] ?? "";

      if (/^[a-z]/.test(firstWord)) continue;

      offenders.push(`line ${String(call.getStartLineNumber())}: it("${title}") — should start with lowercase verb`);
    }

    expect(
      offenders,
      `${kebab}.test.tsx it() titles should start with a lowercase verb (renders/applies/merges/forwards/sets):\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
