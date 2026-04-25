import { Node, Project } from "ts-morph";
import type { Statement } from "ts-morph";
import { describe, expect, it } from "vitest";

import { components } from "../helpers/components";

function getInterfaceName(stmt: Statement | undefined): string | undefined {
  if (Node.isInterfaceDeclaration(stmt)) return stmt.getName();
  if (Node.isTypeAliasDeclaration(stmt)) return stmt.getName();

  return undefined;
}

describe("Audit — file layout colocation", () => {
  it.each(components)("$kebab: every {Sub}Props interface sits directly above its component", ({ componentFile }) => {
    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const source = project.addSourceFileAtPath(componentFile);

    const statements = source.getStatements();
    const offenders: string[] = [];

    for (let index = 0; index < statements.length; index += 1) {
      const stmt = statements[index];

      const interfaceName = getInterfaceName(stmt);
      if (!interfaceName?.endsWith("Props")) continue;

      const expectedComponent = interfaceName.replace(/Props$/, "");
      const next = statements[index + 1];

      if (!next) {
        offenders.push(`line ${String(stmt!.getStartLineNumber())}: ${interfaceName} has no following statement`);
        continue;
      }

      if (!Node.isVariableStatement(next)) {
        offenders.push(
          `line ${String(stmt!.getStartLineNumber())}: ${interfaceName} not followed by a variable declaration (got ${next.getKindName()})`,
        );

        continue;
      }

      const declarations = next.getDeclarations();
      const firstName = declarations[0]?.getName();

      if (firstName !== expectedComponent) {
        offenders.push(
          `line ${String(stmt!.getStartLineNumber())}: ${interfaceName} followed by \`${firstName ?? "?"}\` — expected \`${expectedComponent}\``,
        );
      }
    }

    expect(
      offenders,
      `colocation drift — each {Sub}Props interface must sit directly above the component it describes:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: every component is followed by its displayName assignment", ({ componentFile }) => {
    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const source = project.addSourceFileAtPath(componentFile);

    const statements = source.getStatements();
    const offenders: string[] = [];

    for (let index = 0; index < statements.length; index += 1) {
      const stmt = statements[index];
      if (!Node.isVariableStatement(stmt)) continue;

      const decl = stmt.getDeclarations()[0];
      const name = decl?.getName();
      if (!name?.match(/^[A-Z]/)) continue;

      const initText = decl?.getInitializer()?.getText() ?? "";
      const isComponent = initText.includes("=>") && /<[A-Z]|<\w+\.|<[a-z]+ /.test(initText);
      if (!isComponent) continue;

      const next = statements[index + 1];

      if (!next || !Node.isExpressionStatement(next)) {
        offenders.push(`line ${String(stmt.getStartLineNumber())}: ${name} not followed by displayName assignment`);
        continue;
      }

      const expr = next.getExpression();

      if (!Node.isBinaryExpression(expr)) {
        offenders.push(`line ${String(next.getStartLineNumber())}: expected ${name}.displayName assignment`);
        continue;
      }

      const left = expr.getLeft();

      const isDisplayNameForComponent =
        Node.isPropertyAccessExpression(left) &&
        left.getExpression().getText() === name &&
        left.getName() === "displayName";

      if (!isDisplayNameForComponent) {
        offenders.push(
          `line ${String(next.getStartLineNumber())}: ${name} not immediately followed by ${name}.displayName = "${name}"`,
        );
      }
    }

    expect(
      offenders,
      `displayName ordering drift — each component declaration must be followed immediately by its displayName assignment:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
