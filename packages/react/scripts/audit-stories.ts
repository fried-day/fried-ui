#!/usr/bin/env tsx
/**
 * Audit script — Wave 1 Quick Wins (warning mode, non-blocking)
 *
 * Runs 5 structural rules over every `*.stories.tsx` in `src/components/**`
 * and emits a markdown report grouped by rule. Does not touch CI or vitest.
 *
 * Usage (from `packages/react`):
 *   npx tsx scripts/audit-stories.ts
 *   npx tsx scripts/audit-stories.ts --json
 */

import fs from "node:fs";
import path from "node:path";

import { Node, Project, SyntaxKind } from "ts-morph";
import type { ObjectLiteralExpression, SourceFile } from "ts-morph";

import { componentRoles } from "./_role-manifest";

const ROOT = path.resolve(import.meta.dirname, "..");
const COMPONENTS_DIR = path.join(ROOT, "src", "components");
const IGNORED_DIRS = new Set(["icons"]);

const ALIGNMENT_PATTERN = /\bitems-(start|center|end|stretch|baseline)\b/;

const WAVE_1_RULES = ["category-enum", "export-order", "render-signature", "mock-data-blacklist", "meta-shape"];

const WAVE_2_RULES = [
  "argtype-interface-parity",
  "required-stories",
  "passthrough-props",
  "container-alignment",
  "enum-description",
  "required-children",
];

const ALL_RULES = [...WAVE_1_RULES, ...WAVE_2_RULES];

const VALID_CATEGORIES = new Set(["Children", "Style Variants", "State", "Events", "Styling"]);

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

const REQUIRED_RENDER_SIGNATURE = "(args): React.JSX.Element =>";

interface Violation {
  detail: string;
  file: string;
  line?: number;
  rule: string;
}

const violations: Violation[] = [];

interface ComponentEntry {
  componentFile: string;
  kebab: string;
  pascal: string;
  storiesFile: string;
}

function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function listStoryFiles(): ComponentEntry[] {
  return fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !IGNORED_DIRS.has(entry.name))
    .map((entry) => {
      const kebab = entry.name;
      const pascal = kebabToPascal(kebab);
      return {
        componentFile: path.join(COMPONENTS_DIR, kebab, `${pascal}.tsx`),
        kebab,
        pascal,
        storiesFile: path.join(COMPONENTS_DIR, kebab, `${kebab}.stories.tsx`),
      };
    })
    .filter((entry) => fs.existsSync(entry.storiesFile));
}

function findMetaObject(source: SourceFile): ObjectLiteralExpression | undefined {
  const meta = source.getVariableDeclaration("meta");
  if (!meta) return undefined;

  const satisfies = meta.getInitializerIfKind(SyntaxKind.SatisfiesExpression);
  const expression = satisfies?.getExpression() ?? meta.getInitializer();

  return Node.isObjectLiteralExpression(expression) ? expression : undefined;
}

function getArgTypesObject(source: SourceFile): ObjectLiteralExpression | undefined {
  const meta = findMetaObject(source);
  if (!meta) return undefined;

  const argTypesProp = meta.getProperty("argTypes");
  if (!Node.isPropertyAssignment(argTypesProp)) return undefined;

  const init = argTypesProp.getInitializer();
  return Node.isObjectLiteralExpression(init) ? init : undefined;
}

// Rule 1 — Category enum (whitelist of 5 values)
function auditCategoryEnum({ kebab, source }: { kebab: string; source: SourceFile }): void {
  const argTypes = getArgTypesObject(source);
  if (!argTypes) return;

  for (const argTypeProp of argTypes.getProperties()) {
    if (!Node.isPropertyAssignment(argTypeProp)) continue;

    const propName = argTypeProp.getName();
    const config = argTypeProp.getInitializer();
    if (!Node.isObjectLiteralExpression(config)) continue;

    const tableProp = config.getProperty("table");
    if (!Node.isPropertyAssignment(tableProp)) continue;

    const tableObj = tableProp.getInitializer();
    if (!Node.isObjectLiteralExpression(tableObj)) continue;

    const categoryProp = tableObj.getProperty("category");
    if (!Node.isPropertyAssignment(categoryProp)) continue;

    const categoryInit = categoryProp.getInitializer();
    if (!Node.isStringLiteral(categoryInit) && !Node.isNoSubstitutionTemplateLiteral(categoryInit)) continue;

    const value = categoryInit.getLiteralText();
    if (VALID_CATEGORIES.has(value)) continue;

    violations.push({
      detail: `argTypes.${propName}.table.category="${value}" — must be one of: ${[...VALID_CATEGORIES].join(", ")}`,
      file: kebab,
      line: categoryInit.getStartLineNumber(),
      rule: "category-enum",
    });
  }
}

// Rule 2 — Named story exports must appear before `export default meta`
function auditExportOrder({ kebab, source }: { kebab: string; source: SourceFile }): void {
  const defaultExport = source.getStatements().find((stmt) => Node.isExportAssignment(stmt));
  if (!defaultExport) return;

  const defaultLine = defaultExport.getStartLineNumber();

  const namedStoryExports: { line: number; name: string }[] = [];

  for (const stmt of source.getStatements()) {
    if (!Node.isExportDeclaration(stmt)) continue;

    const namedExports = stmt.getNamedExports();
    for (const named of namedExports) {
      namedStoryExports.push({ line: named.getStartLineNumber(), name: named.getName() });
    }
  }

  const lateExports = namedStoryExports.filter((e) => e.line > defaultLine);
  if (lateExports.length === 0 && namedStoryExports.length > 0) return;

  if (namedStoryExports.length === 0) {
    // No re-export block — check if stories are exported via `export const X` directly
    return;
  }

  for (const late of lateExports) {
    violations.push({
      detail: `named export "${late.name}" appears after \`export default meta\` (line ${defaultLine})`,
      file: kebab,
      line: late.line,
      rule: "export-order",
    });
  }
}

// Rule 3 — Render fn signature `(args): React.JSX.Element =>`
function auditRenderSignature({ kebab, source }: { kebab: string; source: SourceFile }): void {
  source.forEachDescendant((node) => {
    if (!Node.isPropertyAssignment(node)) return;
    if (node.getName() !== "render") return;

    const init = node.getInitializer();
    if (!Node.isArrowFunction(init)) return;

    const sigText = init.getText().split("=>")[0]?.trim();
    if (!sigText) return;

    const expected = REQUIRED_RENDER_SIGNATURE.split("=>")[0]?.trim();
    const fullSig = `${sigText} =>`;

    if (sigText === expected) return;

    violations.push({
      detail: `render signature is \`${fullSig}\` — expected \`${REQUIRED_RENDER_SIGNATURE}\``,
      file: kebab,
      line: node.getStartLineNumber(),
      rule: "render-signature",
    });
  });
}

// Rule 4 — Mock data blacklist (Lorem / foo / asdf / placeholder names)
function auditMockDataBlacklist({ kebab, source }: { kebab: string; source: SourceFile }): void {
  for (const literal of source.getDescendantsOfKind(SyntaxKind.StringLiteral)) {
    const text = literal.getLiteralText();

    for (const banned of MOCK_DATA_BLACKLIST) {
      const re = new RegExp(`\\b${banned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (!re.test(text)) continue;

      violations.push({
        detail: `string literal "${text}" contains placeholder "${banned}" — use realistic mock data`,
        file: kebab,
        line: literal.getStartLineNumber(),
        rule: "mock-data-blacklist",
      });
    }
  }
}

// Rule 5 — `tags: ["autodocs"]` and `parameters.layout` already enforced in stories.test.ts
//   We re-audit here so the warning report shows a consolidated view.
function auditMetaShape({ kebab, source }: { kebab: string; source: SourceFile }): void {
  const meta = findMetaObject(source);
  if (!meta) {
    violations.push({
      detail: "no `meta` variable declaration found",
      file: kebab,
      rule: "meta-shape",
    });
    return;
  }

  const tagsProp = meta.getProperty("tags");
  if (!Node.isPropertyAssignment(tagsProp)) {
    violations.push({
      detail: 'meta missing `tags: ["autodocs"]`',
      file: kebab,
      line: meta.getStartLineNumber(),
      rule: "meta-shape",
    });
  }

  const paramsProp = meta.getProperty("parameters");
  if (!Node.isPropertyAssignment(paramsProp)) {
    violations.push({
      detail: "meta missing `parameters.layout`",
      file: kebab,
      line: meta.getStartLineNumber(),
      rule: "meta-shape",
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// Wave 2 — Core invariants
// ─────────────────────────────────────────────────────────────────

interface ComponentInterfaceProp {
  hasJsDocDefault: boolean;
  isOptional: boolean;
  isUnion: boolean;
  jsDocText: string;
  name: string;
  optionsCount: number;
  typeText: string;
}

function getComponentInterfaceProps(componentFile: string, pascal: string): ComponentInterfaceProp[] {
  if (!fs.existsSync(componentFile)) return [];

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const source = project.addSourceFileAtPath(componentFile);

  const interfaceDecl = source.getInterface(`${pascal}Props`);
  if (!interfaceDecl) return [];

  const props: ComponentInterfaceProp[] = [];

  for (const prop of interfaceDecl.getProperties()) {
    const typeNode = prop.getTypeNode();
    const typeText = typeNode?.getText() ?? "";
    const jsDoc = prop.getJsDocs()[0];
    const jsDocText = jsDoc?.getInnerText() ?? "";

    const unionParts = typeText.split("|").map((s) => s.trim().replace(/^"|"$/g, ""));
    const isUnion = typeText.includes("|") && unionParts.every((p) => /^[A-Za-z0-9-]*$/.test(p) || p === "");

    props.push({
      hasJsDocDefault: /@default\s/.test(jsDocText),
      isOptional: prop.hasQuestionToken(),
      isUnion,
      jsDocText,
      name: prop.getName(),
      optionsCount: isUnion ? unionParts.filter((p) => p !== "").length : 0,
      typeText,
    });
  }

  return props;
}

function getArgTypeNames(source: SourceFile): string[] {
  const argTypes = getArgTypesObject(source);
  if (!argTypes) return [];

  return argTypes
    .getProperties()
    .filter((p): p is ReturnType<typeof argTypes.getProperty> & { getName: () => string } =>
      Node.isPropertyAssignment(p),
    )
    .map((p) => {
      const name = p.getName();
      return name.replace(/^["']|["']$/g, "");
    });
}

function getStoryExportNames(source: SourceFile): string[] {
  const names = new Set<string>();

  for (const stmt of source.getStatements()) {
    if (Node.isExportDeclaration(stmt)) {
      for (const named of stmt.getNamedExports()) {
        names.add(named.getName());
      }
    }
  }

  for (const variable of source.getVariableDeclarations()) {
    const typeNode = variable.getTypeNode();
    if (typeNode?.getText() === "Story") names.add(variable.getName());
  }

  return [...names];
}

// Rule 6 — argType-vs-interface parity
function auditArgtypeInterfaceParity({ entry, source }: { entry: ComponentEntry; source: SourceFile }): void {
  const interfaceProps = getComponentInterfaceProps(entry.componentFile, entry.pascal);
  if (interfaceProps.length === 0) return;

  const argTypeNames = new Set(getArgTypeNames(source));
  const interfacePropNames = new Set(interfaceProps.map((p) => p.name));

  // every interface prop must have an argType (skip ref — never documented)
  for (const prop of interfaceProps) {
    if (prop.name === "ref") continue;
    if (argTypeNames.has(prop.name)) continue;

    violations.push({
      detail: `interface prop "${prop.name}" missing from argTypes`,
      file: entry.kebab,
      rule: "argtype-interface-parity",
    });
  }

  // every argType must be in interface OR be an inherited primitive prop (allow whitelist)
  const allowedExtras = new Set([
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

  for (const argTypeName of argTypeNames) {
    if (interfacePropNames.has(argTypeName)) continue;
    if (allowedExtras.has(argTypeName)) continue;

    violations.push({
      detail: `argType "${argTypeName}" not declared in ${entry.pascal}Props (and not in pass-through whitelist)`,
      file: entry.kebab,
      rule: "argtype-interface-parity",
    });
  }
}

// Rule 7 — required stories per role
function auditRequiredStories({ entry, source }: { entry: ComponentEntry; source: SourceFile }): void {
  const role = componentRoles[entry.kebab];
  if (!role) return;

  const exportNames = new Set(getStoryExportNames(source));

  for (const required of role.requiredStories) {
    if (exportNames.has(required)) continue;

    violations.push({
      detail: `${role.role} role requires story "${required}" (exported names: ${[...exportNames].join(", ") || "none"})`,
      file: entry.kebab,
      rule: "required-stories",
    });
  }
}

// Rule 8 — pass-through props per role
function auditPassthroughProps({ entry, source }: { entry: ComponentEntry; source: SourceFile }): void {
  const role = componentRoles[entry.kebab];
  if (!role?.passthroughProps) return;

  const argTypeNames = new Set(getArgTypeNames(source));

  for (const required of role.passthroughProps) {
    if (argTypeNames.has(required)) continue;

    violations.push({
      detail: `${role.role} role requires argType "${required}"`,
      file: entry.kebab,
      rule: "passthrough-props",
    });
  }
}

// Rule 9 — container alignment per role (Sizes / Variants comparison containers)
function auditContainerAlignment({ entry, source }: { entry: ComponentEntry; source: SourceFile }): void {
  const role = componentRoles[entry.kebab];
  if (!role?.alignment) return;

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

    const found = `items-${match[1]}`;
    if (found === role.alignment) return;

    violations.push({
      detail: `flex container uses "${found}" — ${role.role} role expects "${role.alignment}"`,
      file: entry.kebab,
      line: init.getStartLineNumber(),
      rule: "container-alignment",
    });
  });
}

// Rule 10 — enum description shape (4-part + 50–120 words)
function auditEnumDescription({ entry, source }: { entry: ComponentEntry; source: SourceFile }): void {
  const argTypes = getArgTypesObject(source);
  if (!argTypes) return;

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
      violations.push({
        detail: `argTypes.${propName} has options but no description`,
        file: entry.kebab,
        line: argTypeProp.getStartLineNumber(),
        rule: "enum-description",
      });
      continue;
    }

    const descInit = descriptionProp.getInitializer();
    if (!Node.isStringLiteral(descInit) && !Node.isNoSubstitutionTemplateLiteral(descInit)) continue;

    const text = descInit.getLiteralText();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const hasBoldGroup = /\*\*[^*]+\*\*/.test(text);

    const reasons: string[] = [];
    if (!hasBoldGroup) reasons.push("missing **bold** option groups");
    if (wordCount < 50) reasons.push(`only ${wordCount} words (min 50)`);
    if (wordCount > 120) reasons.push(`${wordCount} words (max 120)`);

    if (reasons.length === 0) continue;

    violations.push({
      detail: `argTypes.${propName}.description: ${reasons.join("; ")}`,
      file: entry.kebab,
      line: descInit.getStartLineNumber(),
      rule: "enum-description",
    });
  }
}

// Rule 11 — required children must be marked `type.required: true`
function auditRequiredChildren({ entry, source }: { entry: ComponentEntry; source: SourceFile }): void {
  const role = componentRoles[entry.kebab];
  if (!role?.requiresChildren) return;

  const argTypes = getArgTypesObject(source);
  if (!argTypes) return;

  const childrenProp = argTypes.getProperty("children");
  if (!Node.isPropertyAssignment(childrenProp)) {
    violations.push({
      detail: `${role.role} role requires children argType to be declared with required: true`,
      file: entry.kebab,
      rule: "required-children",
    });
    return;
  }

  const config = childrenProp.getInitializer();
  if (!Node.isObjectLiteralExpression(config)) return;

  const typeProp = config.getProperty("type");
  if (!Node.isPropertyAssignment(typeProp)) {
    violations.push({
      detail: "children argType missing `type: { name: 'other', value: 'ReactNode', required: true }`",
      file: entry.kebab,
      line: childrenProp.getStartLineNumber(),
      rule: "required-children",
    });
    return;
  }

  const typeInit = typeProp.getInitializer();
  if (!Node.isObjectLiteralExpression(typeInit)) return;

  const requiredProp = typeInit.getProperty("required");
  if (!Node.isPropertyAssignment(requiredProp)) {
    violations.push({
      detail: "children argType `type` missing `required: true`",
      file: entry.kebab,
      line: typeInit.getStartLineNumber(),
      rule: "required-children",
    });
    return;
  }

  const requiredInit = requiredProp.getInitializer();
  if (requiredInit?.getText() !== "true") {
    violations.push({
      detail: `children argType \`type.required\` is "${requiredInit?.getText() ?? "undefined"}" — must be \`true\``,
      file: entry.kebab,
      line: requiredProp.getStartLineNumber(),
      rule: "required-children",
    });
  }
}

function main(): void {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const stories = listStoryFiles();

  for (const entry of stories) {
    const source = project.addSourceFileAtPath(entry.storiesFile);
    const { kebab } = entry;

    auditCategoryEnum({ kebab, source });
    auditExportOrder({ kebab, source });
    auditRenderSignature({ kebab, source });
    auditMockDataBlacklist({ kebab, source });
    auditMetaShape({ kebab, source });

    auditArgtypeInterfaceParity({ entry, source });
    auditRequiredStories({ entry, source });
    auditPassthroughProps({ entry, source });
    auditContainerAlignment({ entry, source });
    auditEnumDescription({ entry, source });
    auditRequiredChildren({ entry, source });
  }

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ stories: stories.length, violations }, null, 2));
    return;
  }

  emitMarkdownReport({ stories });
}

function emitMarkdownReport({ stories }: { stories: ComponentEntry[] }): void {
  const byRule = new Map<string, Violation[]>();
  for (const v of violations) {
    if (!byRule.has(v.rule)) byRule.set(v.rule, []);
    byRule.get(v.rule)!.push(v);
  }

  const byFile = new Map<string, Violation[]>();
  for (const v of violations) {
    if (!byFile.has(v.file)) byFile.set(v.file, []);
    byFile.get(v.file)!.push(v);
  }

  const cleanFiles = stories.filter((s) => !byFile.has(s.kebab));

  console.log("# Audit Report — Wave 1 + Wave 2");
  console.log();
  console.log(`- Stories scanned: **${stories.length}**`);
  console.log(`- Violations: **${violations.length}**`);
  console.log(`- Clean files: **${cleanFiles.length}** / ${stories.length}`);
  console.log();

  console.log("## Summary by rule");
  console.log();
  console.log("| Rule | Count |");
  console.log("| --- | --- |");
  for (const rule of ALL_RULES) {
    const list = byRule.get(rule) ?? [];
    const wave = WAVE_1_RULES.includes(rule) ? "1" : "2";
    console.log(`| W${wave} · ${rule} | ${list.length} |`);
  }
  console.log();

  console.log("## Summary by file");
  console.log();
  console.log("| File | Violations |");
  console.log("| --- | --- |");
  for (const story of stories) {
    const list = byFile.get(story.kebab) ?? [];
    const marker = list.length === 0 ? "OK" : String(list.length);
    console.log(`| ${story.kebab} | ${marker} |`);
  }
  console.log();

  if (violations.length === 0) {
    console.log("All stories pass Wave 1 + Wave 2 audits.");
    return;
  }

  console.log("## Violations by rule");
  console.log();

  for (const [rule, list] of byRule) {
    console.log(`### ${rule} (${list.length})`);
    console.log();
    for (const v of list) {
      const loc = v.line ? `:${v.line}` : "";
      console.log(`- **${v.file}${loc}** — ${v.detail}`);
    }
    console.log();
  }
}

main();
