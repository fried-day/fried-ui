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

  it.each(components)(
    "$kebab: every {Name}Props interface declares className with JSDoc",
    ({ componentFile, kebab }) => {
      const source = loadSource({ file: componentFile });
      if (!source) return;

      const offenders: string[] = [];

      for (const interfaceDecl of source.getInterfaces()) {
        const interfaceName = interfaceDecl.getName();
        if (!interfaceName.endsWith("Props")) continue;

        const classNameProp = interfaceDecl.getProperty("className");

        if (!classNameProp) {
          offenders.push(`${interfaceName}: missing inline \`className\` declaration`);
          continue;
        }

        const jsDocs = classNameProp.getJsDocs();

        if (jsDocs.length === 0) {
          offenders.push(`${interfaceName}.className: missing JSDoc`);
        }
      }

      expect(
        offenders,
        `${kebab}: every {Name}Props must redeclare \`className\` inline with a JSDoc comment so IDE hover and autodocs see the same prose for every component:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(components)(
    "$kebab: interfaces that ship children declare it inline with JSDoc",
    ({ componentFile, kebab }) => {
      const source = loadSource({ file: componentFile });
      if (!source) return;

      const offenders: string[] = [];

      for (const interfaceDecl of source.getInterfaces()) {
        const interfaceName = interfaceDecl.getName();
        if (!interfaceName.endsWith("Props")) continue;

        const subpartName = interfaceName.replace(/Props$/, "");
        const subpartDecl = source.getVariableDeclaration(subpartName);
        const arrow = subpartDecl?.getInitializerIfKind(SyntaxKind.ArrowFunction);
        if (!arrow) continue;

        const rendersChildren = arrow.getBodyText().includes("{children}");
        if (!rendersChildren) continue;

        const childrenProp = interfaceDecl.getProperty("children");

        if (!childrenProp) {
          offenders.push(`${interfaceName}: renders children but missing inline \`children\` declaration`);
          continue;
        }

        const jsDocs = childrenProp.getJsDocs();

        if (jsDocs.length === 0) {
          offenders.push(`${interfaceName}.children: missing JSDoc`);
        }
      }

      expect(
        offenders,
        `${kebab}: every interface whose component renders \`{children}\` must declare \`children\` inline with a JSDoc comment so the contract is visible on hover:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );
});

describe("Audit — drift guardrails (AST)", () => {
  const fieldSubcomponents = new Set(["field"]);
  const renderPropComponents = new Set(["button"]);

  it.each(components)("$kebab: no outer clsx(classes(...), className) wrap", ({ componentFile, kebab }) => {
    if (renderPropComponents.has(kebab)) return;

    const source = loadSource({ file: componentFile });
    if (!source) return;

    const offenders: string[] = [];

    source.forEachDescendant((node) => {
      if (!Node.isCallExpression(node)) return;

      const expression = node.getExpression();
      if (!Node.isIdentifier(expression) || expression.getText() !== "clsx") return;

      const firstArg = node.getArguments()[0];
      if (!Node.isCallExpression(firstArg)) return;

      const innerExpr = firstArg.getExpression();
      if (!Node.isIdentifier(innerExpr) || innerExpr.getText() !== "classes") return;

      offenders.push(`line ${node.getStartLineNumber()}: ${node.getText().slice(0, 80)}...`);
    });

    expect(
      offenders,
      `${kebab}: outer clsx(classes(...), className) wrap is an anti-pattern — fold className into classes({ block, modifiers, className }) as the 3rd param:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)(
    "$kebab: field subcomponents use useFieldState (not direct useContext)",
    ({ componentFile, kebab }) => {
      if (!fieldSubcomponents.has(kebab)) return;

      const source = loadSource({ file: componentFile });
      if (!source) return;

      const importsUseFieldState = source.getImportDeclarations().some((decl) => {
        const moduleSpecifier = decl.getModuleSpecifierValue();
        if (!moduleSpecifier.includes("use-field-state")) return false;

        return decl.getNamedImports().some((named) => named.getName() === "useFieldState");
      });

      expect(
        importsUseFieldState,
        `${kebab}: Field subcomponents (FieldLabel/FieldDescription/FieldError) must use useFieldState hook from "./use-field-state" to consume FieldContext with prop-override fallback.`,
      ).toBe(true);
    },
  );
});
