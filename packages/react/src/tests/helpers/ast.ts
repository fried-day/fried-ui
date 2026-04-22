import fs from "node:fs";
import path from "node:path";

import { Node, Project, SyntaxKind } from "ts-morph";
import type { JSDoc, SourceFile, StringLiteral, VariableDeclaration } from "ts-morph";

const tsConfigFilePath = path.resolve(import.meta.dirname, "..", "..", "..", "tsconfig.json");

const project = new Project({ tsConfigFilePath, skipAddingFilesFromTsConfig: true });

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

interface StoryFileParams {
  storiesFile: string;
}

interface MetaLookupParams {
  predicate: (node: Node) => boolean;
  propPath: string[];
  source: SourceFile | undefined;
}

interface DisplayNameAssignmentParams {
  pascal: string;
  statement: Node;
}

export interface ClassNameLiteral {
  story: string;
  value: string;
}

export interface VariantPropInfo {
  isBoolean: boolean;
  jsDoc: JSDoc | undefined;
  name: string;
}

export interface ArgTypeDescription {
  description: string;
  line: number;
  propName: string;
}

function loadSource({ file }: Readonly<LoadSourceParams>): SourceFile | undefined {
  if (!fs.existsSync(file)) return undefined;

  return project.addSourceFileAtPath(file);
}

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

function getAllStringLiterals({ storiesFile }: Readonly<StoryFileParams>): string[] {
  const source = loadSource({ file: storiesFile });

  if (!source) return [];

  return source.getDescendantsOfKind(SyntaxKind.StringLiteral).map((literal) => literal.getLiteralText());
}

function getMetaArgTypeDescriptions({ storiesFile }: Readonly<StoryFileParams>): ArgTypeDescription[] {
  const source = loadSource({ file: storiesFile });

  if (!source) return [];

  const metaObject = findMetaObject(source);

  if (!Node.isObjectLiteralExpression(metaObject)) return [];

  const argTypesProp = metaObject.getProperty("argTypes");

  if (!Node.isPropertyAssignment(argTypesProp)) return [];

  const argTypesObject = argTypesProp.getInitializer();

  if (!Node.isObjectLiteralExpression(argTypesObject)) return [];

  const results: ArgTypeDescription[] = [];

  for (const argTypeProp of argTypesObject.getProperties()) {
    if (!Node.isPropertyAssignment(argTypeProp)) continue;

    const propName = argTypeProp.getName();
    const config = argTypeProp.getInitializer();

    if (!Node.isObjectLiteralExpression(config)) continue;

    const descriptionProp = config.getProperty("description");

    if (!Node.isPropertyAssignment(descriptionProp)) continue;

    const descriptionInit = descriptionProp.getInitializer();

    if (!Node.isStringLiteral(descriptionInit) && !Node.isNoSubstitutionTemplateLiteral(descriptionInit)) continue;

    results.push({
      description: descriptionInit.getLiteralText(),
      line: descriptionInit.getStartLineNumber(),
      propName,
    });
  }

  return results;
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

export {
  countStorySourceCodeBlocks,
  findEnclosingStoryName,
  findMetaObject,
  getAllStringLiterals,
  getClassNameStringLiterals,
  getComponentVariableDeclaration,
  getMetaArgTypeDescriptions,
  getStoryNames,
  getVariantsInterfaceProps,
  isComponentDisplayNameAssignment,
  loadSource,
  metaHasPath,
};
