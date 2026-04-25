import { Node, Project, SyntaxKind } from "ts-morph";
import type { ObjectLiteralExpression, SourceFile } from "ts-morph";

import { findMetaObject } from "../helpers/ast";

export interface InterfaceProp {
  hasJsDocDefault: boolean;
  isOptional: boolean;
  isUnion: boolean;
  jsDocText: string;
  name: string;
  optionsCount: number;
  typeText: string;
}

function getArgTypesObject(source: SourceFile): ObjectLiteralExpression | undefined {
  const meta = findMetaObject(source);
  if (!Node.isObjectLiteralExpression(meta)) return undefined;

  const argTypesProp = meta.getProperty("argTypes");
  if (!Node.isPropertyAssignment(argTypesProp)) return undefined;

  const init = argTypesProp.getInitializer();
  if (!Node.isObjectLiteralExpression(init)) return undefined;

  return init;
}

function getArgTypeNames(source: SourceFile): string[] {
  const argTypes = getArgTypesObject(source);
  if (!argTypes) return [];

  const names: string[] = [];

  for (const argTypeProp of argTypes.getProperties()) {
    if (!Node.isPropertyAssignment(argTypeProp)) continue;

    const name = argTypeProp.getName().replace(/^["']|["']$/g, "");
    names.push(name);
  }

  return names;
}

function getStoryExportNames(source: SourceFile): string[] {
  const names = new Set<string>();

  for (const stmt of source.getStatements()) {
    if (!Node.isExportDeclaration(stmt)) continue;

    for (const named of stmt.getNamedExports()) names.add(named.getName());
  }

  for (const variable of source.getVariableDeclarations()) {
    const typeNode = variable.getTypeNode();
    if (typeNode?.getText() === "Story") names.add(variable.getName());
  }

  return [...names];
}

function getNamedExportSequence(source: SourceFile): { line: number; name: string }[] {
  const sequence: { line: number; name: string }[] = [];

  for (const stmt of source.getStatements()) {
    if (!Node.isExportDeclaration(stmt)) continue;

    for (const named of stmt.getNamedExports()) {
      sequence.push({ line: named.getStartLineNumber(), name: named.getName() });
    }
  }

  return sequence;
}

interface GetComponentInterfacePropsParams {
  componentFile: string;
  pascal: string;
}

function getComponentInterfaceProps({
  componentFile,
  pascal,
}: Readonly<GetComponentInterfacePropsParams>): InterfaceProp[] {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const source = project.addSourceFileAtPath(componentFile);

  const interfaceDecl = source.getInterface(`${pascal}Props`);
  if (!interfaceDecl) return [];

  const props: InterfaceProp[] = [];

  for (const prop of interfaceDecl.getProperties()) {
    const typeNode = prop.getTypeNode();
    const typeText = typeNode?.getText() ?? "";
    const jsDoc = prop.getJsDocs()[0];
    const jsDocText = jsDoc?.getInnerText() ?? "";

    const unionParts = typeText.split("|").map((part) => part.trim().replace(/^"|"$/g, ""));
    const isUnion = typeText.includes("|") && unionParts.every((part) => /^[A-Za-z0-9-]*$/.test(part) || part === "");

    props.push({
      hasJsDocDefault: /@default\s/.test(jsDocText),
      isOptional: prop.hasQuestionToken(),
      isUnion,
      jsDocText,
      name: prop.getName(),
      optionsCount: isUnion ? unionParts.filter((part) => part !== "").length : 0,
      typeText,
    });
  }

  return props;
}

const ALIGNMENT_PATTERN = /\bitems-(start|center|end|stretch|baseline)\b/;

const validCategories = new Set(["Children", "Style Variants", "State", "Events", "Styling"]);

const MOCK_DATA_BLACKLIST = [
  "Lorem",
  "Ipsum",
  "lorem ipsum",
  "foo bar",
  "asdf",
  "qwerty",
  "test1",
  "test2",
  "Test 1",
  "Test 2",
  "abc123",
  "John Doe",
  "Jane Doe",
];

const passthroughAllowedExtras = new Set([
  "children",
  "className",
  "ref",
  "disabled",
  "readOnly",
  "required",
  "aria-invalid",
  "aria-pressed",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "isPending",
  "id",
  "data-testid",
  "type",
  "placeholder",
  "htmlFor",
  "name",
  "value",
  "defaultValue",
  "onPress",
  "onClick",
  "onChange",
  "onDismiss",
]);

const REQUIRED_RENDER_SIGNATURE = "(args): React.JSX.Element =>";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export {
  ALIGNMENT_PATTERN,
  REQUIRED_RENDER_SIGNATURE,
  SyntaxKind,
  escapeRegex,
  getArgTypeNames,
  getArgTypesObject,
  getComponentInterfaceProps,
  getNamedExportSequence,
  getStoryExportNames,
  MOCK_DATA_BLACKLIST,
  passthroughAllowedExtras,
  validCategories,
};
