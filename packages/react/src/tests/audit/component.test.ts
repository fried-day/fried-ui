import { Node, SyntaxKind } from "ts-morph";

import { describe, expect, it } from "vitest";

import { getComponentVariableDeclaration, isComponentDisplayNameAssignment, loadSource } from "../helpers/ast";
import { components } from "../helpers/components";

describe("Audit — Component.tsx conventions", () => {
  it.each(components)("$kebab: component has JSDoc (component-level docstring)", ({ componentFile, pascal }) => {
    const varDecl = getComponentVariableDeclaration({ componentFile, pascal });

    expect(varDecl, `${pascal}.tsx missing variable declaration for ${pascal}`).toBeDefined();

    const statement = varDecl!.getVariableStatement();
    const jsDocs = statement?.getJsDocs() ?? [];

    expect(
      jsDocs.length,
      `${pascal}.tsx: component ${pascal} missing JSDoc (1-2 line intent description)`,
    ).toBeGreaterThan(0);
  });

  it.each(components)("$kebab: destructure has NO defaults (breaks 1:1 parity)", ({ componentFile, pascal }) => {
    const source = loadSource({ file: componentFile });

    if (!source) return;

    const varDecl = source.getVariableDeclaration(pascal);
    const arrow = varDecl?.getInitializerIfKind(SyntaxKind.ArrowFunction);
    if (!arrow) return;

    const offenders: string[] = [];

    arrow.getBody().forEachDescendant((node) => {
      if (!Node.isObjectBindingPattern(node)) return;

      for (const element of node.getElements()) {
        const initializer = element.getInitializer();

        if (initializer) offenders.push(`${element.getName()} = ${initializer.getText()}`);
      }
    });

    expect(
      offenders,
      `${pascal}.tsx: destructure has default values — defaults must live in base class CSS for parity:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: sets displayName", ({ componentFile, pascal }) => {
    const source = loadSource({ file: componentFile });

    if (!source) {
      expect.fail(`${pascal}.tsx not found`);

      return;
    }

    const hasDisplayName = source
      .getStatements()
      .some((statement) => isComponentDisplayNameAssignment({ pascal, statement }));

    expect(hasDisplayName, `${pascal}.tsx missing ${pascal}.displayName = "${pascal}"`).toBe(true);
  });
});
