import fs from "node:fs";
import path from "node:path";

import { Node, Project, SyntaxKind } from "ts-morph";
import type { JSDoc, SourceFile, StringLiteral, VariableDeclaration } from "ts-morph";

import { describe, expect, it } from "vitest";

const componentsDir = path.resolve(import.meta.dirname, "..", "components");
const parityTestPath = path.resolve(import.meta.dirname, "parity.test.tsx");
const tsConfigFilePath = path.resolve(import.meta.dirname, "..", "..", "tsconfig.json");

const ignoredDirs = new Set(["icons"]);

const DOMAIN_WORDS = [
  "Email",
  "Password",
  "Username",
  "Signup",
  "Sign up",
  "Login",
  "Log in",
  "Address",
  "Phone",
  "Credit Card",
  "First Name",
  "Last Name",
  "SSN",
];

const validLayouts = new Set(["centered", "padded", "fullscreen"]);

interface ComponentDir {
  componentFile: string;
  dir: string;
  kebab: string;
  pascal: string;
  storiesFile: string;
  variantsFile: string;
}

interface LoadSourceParams {
  file: string;
}

interface VariantsFileParams {
  variantsFile: string;
}

interface FindComponentParams {
  componentFile: string;
  pascal: string;
}

interface MetaLookupParams {
  predicate: (node: Node) => boolean;
  propPath: string[];
  source: SourceFile | undefined;
}

interface StoryFileParams {
  storiesFile: string;
}

interface ClassNameLiteral {
  story: string;
  value: string;
}

interface VariantPropInfo {
  isBoolean: boolean;
  jsDoc: JSDoc | undefined;
  name: string;
}

const project = new Project({ tsConfigFilePath, skipAddingFilesFromTsConfig: true });

function loadSource({ file }: Readonly<LoadSourceParams>): SourceFile | undefined {
  if (!fs.existsSync(file)) return undefined;

  return project.addSourceFileAtPath(file);
}

function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function buildComponent(name: string): ComponentDir {
  const kebab = name;
  const pascal = kebabToPascal(kebab);
  const dir = path.join(componentsDir, kebab);
  const componentFile = path.join(dir, `${pascal}.tsx`);
  const variantsFile = path.join(dir, `${kebab}.variants.ts`);
  const storiesFile = path.join(dir, `${kebab}.stories.tsx`);

  return { componentFile, dir, kebab, pascal, storiesFile, variantsFile };
}

function listComponents(): ComponentDir[] {
  return fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !ignoredDirs.has(entry.name))
    .map((entry) => buildComponent(entry.name));
}

const components = listComponents();

function getVariantsInterfaceProps({ variantsFile }: Readonly<VariantsFileParams>): VariantPropInfo[] {
  const source = loadSource({ file: variantsFile });

  if (!source) return [];

  const props: VariantPropInfo[] = [];

  for (const interfaceDecl of source.getInterfaces()) {
    for (const propNode of interfaceDecl.getProperties()) {
      const typeNode = propNode.getTypeNode();
      const typeText = typeNode?.getText() ?? "";

      props.push({
        isBoolean: typeText === "boolean",
        jsDoc: propNode.getJsDocs()[0],
        name: propNode.getName(),
      });
    }
  }

  return props;
}

function getComponentVariableDeclaration({
  componentFile,
  pascal,
}: Readonly<FindComponentParams>): VariableDeclaration | undefined {
  const source = loadSource({ file: componentFile });

  if (!source) return undefined;

  return source.getVariableDeclaration(pascal);
}

function getStoryNames({ storiesFile }: Readonly<StoryFileParams>): string[] {
  const source = loadSource({ file: storiesFile });

  if (!source) return [];

  const names: string[] = [];

  for (const variable of source.getVariableDeclarations()) {
    const typeNode = variable.getTypeNode();

    if (typeNode?.getText() === "Story") names.push(variable.getName());
  }

  return names;
}

function countStorySourceCodeBlocks({ storiesFile }: Readonly<StoryFileParams>): number {
  const source = loadSource({ file: storiesFile });

  if (!source) return 0;

  let count = 0;

  source.forEachDescendant((node) => {
    if (!Node.isPropertyAssignment(node)) return;
    if (node.getName() !== "code") return;

    const parentObject = node.getParent();
    const sourceProp = parentObject?.getParent();
    const docsProp = sourceProp?.getParent()?.getParent();
    const parametersProp = docsProp?.getParent()?.getParent();

    const isWrappedCorrectly =
      Node.isPropertyAssignment(sourceProp) &&
      sourceProp.getName() === "source" &&
      Node.isPropertyAssignment(docsProp) &&
      docsProp.getName() === "docs" &&
      Node.isPropertyAssignment(parametersProp) &&
      parametersProp.getName() === "parameters";

    if (isWrappedCorrectly) count += 1;
  });

  return count;
}

function findMetaObject(source: SourceFile): Node | undefined {
  const meta = source.getVariableDeclaration("meta");
  const satisfiesInit = meta?.getInitializerIfKind(SyntaxKind.SatisfiesExpression);
  const expression = satisfiesInit?.getExpression();
  const fallback = meta?.getInitializer();
  const result = expression ?? fallback;

  return result;
}

function metaHasPath({ predicate, propPath, source }: Readonly<MetaLookupParams>): boolean {
  if (!source) return false;

  const metaObject = findMetaObject(source);

  if (!Node.isObjectLiteralExpression(metaObject)) return false;

  let current: Node = metaObject;

  for (const key of propPath) {
    if (!Node.isObjectLiteralExpression(current)) return false;

    const propAssignment: Node | undefined = current.getProperty(key);
    if (!Node.isPropertyAssignment(propAssignment)) return false;

    const next = propAssignment.getInitializer();
    if (!next) return false;

    current = next;
  }

  return predicate(current);
}

function getClassNameStringLiterals({ storiesFile }: Readonly<StoryFileParams>): ClassNameLiteral[] {
  const source = loadSource({ file: storiesFile });

  if (!source) return [];

  const results: ClassNameLiteral[] = [];

  source.forEachDescendant((node) => {
    if (!Node.isJsxAttribute(node) || node.getNameNode().getText() !== "className") return;

    const initializer = node.getInitializer();
    const stringLiterals: StringLiteral[] = [];

    if (Node.isStringLiteral(initializer)) {
      stringLiterals.push(initializer);
    } else if (Node.isJsxExpression(initializer)) {
      initializer.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach((literal) => stringLiterals.push(literal));
    }

    const storyName = findEnclosingStoryName(node);

    for (const literal of stringLiterals) {
      results.push({ story: storyName, value: literal.getLiteralText() });
    }
  });

  return results;
}

function findEnclosingStoryName(node: Node): string {
  let current: Node | undefined = node;

  while (current) {
    const parent = current.getParent();

    if (Node.isVariableDeclaration(parent) && parent.getTypeNode()?.getText() === "Story") {
      return parent.getName();
    }

    current = parent;
  }

  return "<meta>";
}

function getAllStringLiterals({ storiesFile }: Readonly<StoryFileParams>): string[] {
  const source = loadSource({ file: storiesFile });

  if (!source) return [];

  return source.getDescendantsOfKind(SyntaxKind.StringLiteral).map((literal) => literal.getLiteralText());
}

describe("DX — A. Stories invariants", () => {
  it.each(components)("$kebab: stories string literals contain no domain words", ({ kebab, storiesFile }) => {
    const literals = getAllStringLiterals({ storiesFile });
    const offenders: string[] = [];

    for (const literal of literals) {
      for (const word of DOMAIN_WORDS) {
        if (literal.includes(word)) offenders.push(`"${literal}" contains "${word}"`);
      }
    }

    expect(
      offenders,
      `${kebab}.stories.tsx string literals contain domain words — use generic text per storybook.md:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: flex-col only in FullWidth story", ({ kebab, storiesFile }) => {
    const classNameLiterals = getClassNameStringLiterals({ storiesFile });
    const offenders: string[] = [];

    for (const { story, value } of classNameLiterals) {
      if (!/\bflex-col\b/.test(value)) continue;
      if (/(sm|md|lg|xl|2xl):flex-col/.test(value)) continue;
      if (story === "FullWidth") continue;

      offenders.push(`story "${story}": className="${value}"`);
    }

    expect(
      offenders,
      `${kebab}.stories.tsx has flex-col outside FullWidth — use flex-wrap for responsive variant comparison:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: every named story has parameters.docs.source.code", ({ kebab, storiesFile }) => {
    const storyNames = getStoryNames({ storiesFile });
    const sourceCodeCount = countStorySourceCodeBlocks({ storiesFile });

    expect(
      sourceCodeCount,
      `${kebab}.stories.tsx has ${storyNames.length} Story declarations but only ${sourceCodeCount} parameters.docs.source.code blocks`,
    ).toBeGreaterThanOrEqual(storyNames.length);
  });

  it.each(components)("$kebab: meta has tags:['autodocs']", ({ kebab, storiesFile }) => {
    const source = loadSource({ file: storiesFile });

    const hasAutodocs = metaHasPath({
      predicate: (node) => {
        if (!Node.isArrayLiteralExpression(node)) return false;

        return node
          .getElements()
          .some((element) => Node.isStringLiteral(element) && element.getLiteralText() === "autodocs");
      },
      propPath: ["tags"],
      source,
    });

    expect(hasAutodocs, `${kebab}.stories.tsx meta missing tags: ["autodocs"]`).toBe(true);
  });

  it.each(components)("$kebab: meta has valid layout parameter", ({ kebab, storiesFile }) => {
    const source = loadSource({ file: storiesFile });

    const hasLayout = metaHasPath({
      predicate: (node) => Node.isStringLiteral(node) && validLayouts.has(node.getLiteralText()),
      propPath: ["parameters", "layout"],
      source,
    });

    expect(hasLayout, `${kebab}.stories.tsx meta missing layout: "centered" | "padded" | "fullscreen"`).toBe(true);
  });
});

describe("DX — B. JSDoc invariants (variants.ts)", () => {
  it.each(components)("$kebab: every prop has a JSDoc comment", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });
    const missing = props.filter((prop) => prop.jsDoc === undefined).map((prop) => prop.name);

    expect(missing, `${kebab}.variants.ts: props missing JSDoc: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(components)("$kebab: every prop has @default annotation", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });

    const missing = props
      .filter((prop) => prop.jsDoc !== undefined)
      .filter((prop) => !prop.jsDoc!.getTags().some((tag) => tag.getTagName() === "default"))
      .map((prop) => prop.name);

    expect(missing, `${kebab}.variants.ts: props missing @default: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(components)("$kebab: boolean props start with 'Whether the'", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });

    const offenders = props
      .filter((prop) => prop.isBoolean && prop.jsDoc !== undefined)
      .filter((prop) => !prop.jsDoc!.getDescription().trim().startsWith("Whether the"))
      .map((prop) => `${prop.name}: "${prop.jsDoc!.getDescription().trim().slice(0, 60)}"`);

    expect(
      offenders,
      `${kebab}.variants.ts: boolean props must start with "Whether the..." per architecture.md:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: no @example in variants.ts (belongs in Storybook)", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });

    const offenders = props
      .filter((prop) => prop.jsDoc !== undefined)
      .filter((prop) => prop.jsDoc!.getTags().some((tag) => tag.getTagName() === "example"))
      .map((prop) => prop.name);

    expect(
      offenders,
      `${kebab}.variants.ts: props have @example — examples belong in Storybook: ${offenders.join(", ")}`,
    ).toEqual([]);
  });
});

describe("DX — C. Component invariants (Component.tsx)", () => {
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

interface DisplayNameAssignmentParams {
  pascal: string;
  statement: Node;
}

function isComponentDisplayNameAssignment({ pascal, statement }: Readonly<DisplayNameAssignmentParams>): boolean {
  if (!Node.isExpressionStatement(statement)) return false;

  const expr = statement.getExpression();
  if (!Node.isBinaryExpression(expr)) return false;
  if (expr.getOperatorToken().getText() !== "=") return false;

  const left = expr.getLeft();
  if (!Node.isPropertyAccessExpression(left)) return false;
  if (left.getExpression().getText() !== pascal) return false;
  if (left.getName() !== "displayName") return false;

  const right = expr.getRight();
  const isMatchingString = Node.isStringLiteral(right) && right.getLiteralText() === pascal;

  return isMatchingString;
}

describe("DX — D. Coverage invariants", () => {
  it.each(components)(
    "$kebab: has all required files (Component, test, stories, variants, index)",
    ({ dir, kebab, pascal }) => {
      const required = [
        { name: `${pascal}.tsx`, label: "Component.tsx" },
        { name: `${kebab}.test.tsx`, label: "test.tsx" },
        { name: `${kebab}.stories.tsx`, label: "stories.tsx" },
        { name: `${kebab}.variants.ts`, label: "variants.ts" },
        { name: "index.ts", label: "index.ts" },
      ];

      const missing = required.filter(({ name }) => !fs.existsSync(path.join(dir, name))).map(({ label }) => label);

      expect(missing, `${kebab}/ missing required files: ${missing.join(", ")}`).toEqual([]);
    },
  );

  it("every component has an entry in parity.test.tsx", () => {
    const source = loadSource({ file: parityTestPath });

    if (!source) {
      expect.fail("parity.test.tsx not found");

      return;
    }

    const importedNames = new Set<string>();

    for (const importDecl of source.getImportDeclarations()) {
      for (const named of importDecl.getNamedImports()) {
        importedNames.add(named.getName());
      }
    }

    const missing = components.map((component) => component.pascal).filter((pascal) => !importedNames.has(pascal));

    expect(missing, `Components missing parity test coverage (add to parity.test.tsx): ${missing.join(", ")}`).toEqual(
      [],
    );
  });
});
