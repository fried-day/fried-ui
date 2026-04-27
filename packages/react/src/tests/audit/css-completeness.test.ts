import fs from "node:fs";
import path from "node:path";

import { Project } from "ts-morph";
import { describe, expect, it } from "vitest";

import { components } from "../helpers/components";
import { camelToKebab } from "../helpers/strings";

const stylesComponentsDir = path.resolve(import.meta.dirname, "..", "..", "..", "..", "styles", "src", "components");

interface EnumModifier {
  propKeyKebab: string;
  propName: string;
  values: string[];
}

interface ParsedSelector {
  internalClasses: string[];
  modifiers: ModifierMatch[];
}

interface ModifierMatch {
  propName: string;
  value: string;
}

interface PropSignatureNode {
  getName: () => string;
  getTypeNode: () => { getText: () => string } | undefined;
}

function isUnionTypeText(typeText: string): boolean {
  if (!typeText.includes("|")) return false;
  const parts = typeText.split("|").map((part) => part.trim().replaceAll(/^"|"$/g, ""));

  return parts.every((part) => /^[A-Za-z0-9-]*$/.test(part) || part === "");
}

function extractEnumValues(typeText: string): string[] {
  const parts = typeText.split("|").map((part) => part.trim().replaceAll(/^"|"$/g, ""));

  return parts.filter((part) => part !== "" && part !== "default");
}

function collectEnumModifiersFromInterface({
  interfaceProps,
  seen,
}: Readonly<{
  interfaceProps: PropSignatureNode[];
  seen: Set<string>;
}>): EnumModifier[] {
  const result: EnumModifier[] = [];

  for (const prop of interfaceProps) {
    const propName = prop.getName();
    if (seen.has(propName)) continue;

    const typeText = prop.getTypeNode()?.getText() ?? "";
    if (!isUnionTypeText(typeText)) continue;

    const values = extractEnumValues(typeText);
    if (values.length === 0) continue;

    seen.add(propName);
    result.push({ propName, propKeyKebab: camelToKebab(propName), values });
  }

  return result;
}

function getEnumModifiers(componentFile: string): EnumModifier[] {
  if (!fs.existsSync(componentFile)) return [];

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const source = project.addSourceFileAtPath(componentFile);
  const result: EnumModifier[] = [];
  const seen = new Set<string>();

  for (const interfaceDecl of source.getInterfaces()) {
    if (!interfaceDecl.getName().endsWith("Props")) continue;
    result.push(...collectEnumModifiersFromInterface({ interfaceProps: interfaceDecl.getProperties(), seen }));
  }

  return result;
}

function matchModifierForRest({
  rest,
  enums,
}: Readonly<{
  rest: string;
  enums: EnumModifier[];
}>): ModifierMatch | undefined {
  for (const enumMod of enums) {
    const propName = enumMod.propName;

    if (propName === "variant") {
      const value = rest;
      if (enumMod.values.includes(rest)) return { propName, value };

      continue;
    }

    if (!rest.startsWith(`${enumMod.propKeyKebab}-`)) continue;
    const value = rest.slice(enumMod.propKeyKebab.length + 1);
    if (enumMod.values.includes(value)) return { propName, value };
  }

  return undefined;
}

function parseSelector({
  selector,
  block,
  enums,
}: Readonly<{
  selector: string;
  block: string;
  enums: EnumModifier[];
}>): ParsedSelector {
  const classMatches = [...selector.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((match) => match[1] ?? "");

  const modifiers: ModifierMatch[] = [];
  const internalClasses: string[] = [];

  for (const cls of classMatches) {
    if (cls === block) continue;
    if (!cls.startsWith(`${block}-`)) continue;

    const rest = cls.slice(block.length + 1);
    const match = matchModifierForRest({ rest, enums });

    if (match) {
      modifiers.push(match);
    } else internalClasses.push(cls);
  }

  return { modifiers, internalClasses };
}

function pushSelectorsFromBlock({
  selectorBlock,
  target,
}: Readonly<{
  selectorBlock: string;
  target: string[];
}>): void {
  if (selectorBlock === "" || selectorBlock.startsWith("@")) return;

  for (const selector of selectorBlock.split(",")) {
    const trimmed = selector.trim();
    if (trimmed !== "") target.push(trimmed);
  }
}

function extractSelectors(cssContent: string): string[] {
  const selectors: string[] = [];
  let cursor = 0;

  while (cursor < cssContent.length) {
    const start = cursor;

    while (cursor < cssContent.length && cssContent[cursor] !== "{" && cssContent[cursor] !== "}") {
      cursor += 1;
    }

    if (cursor >= cssContent.length) break;

    if (cssContent[cursor] === "{") {
      pushSelectorsFromBlock({ selectorBlock: cssContent.slice(start, cursor).trim(), target: selectors });
    }

    cursor += 1;
  }

  return selectors;
}

function recordParsedSelector({
  parsed,
  coverage,
}: Readonly<{
  parsed: ParsedSelector;
  coverage: Map<string, Map<string, Set<string>>>;
}>): void {
  if (parsed.modifiers.length === 0 || parsed.internalClasses.length === 0) return;

  for (const internalClass of parsed.internalClasses) {
    if (!coverage.has(internalClass)) coverage.set(internalClass, new Map());
    const internalMap = coverage.get(internalClass)!;

    for (const modifier of parsed.modifiers) {
      if (!internalMap.has(modifier.propName)) internalMap.set(modifier.propName, new Set());
      internalMap.get(modifier.propName)!.add(modifier.value);
    }
  }
}

function buildCoverage({
  selectors,
  block,
  enums,
}: Readonly<{
  selectors: string[];
  block: string;
  enums: EnumModifier[];
}>): Map<string, Map<string, Set<string>>> {
  const coverage = new Map<string, Map<string, Set<string>>>();

  for (const selector of selectors) {
    recordParsedSelector({ parsed: parseSelector({ selector, block, enums }), coverage });
  }

  return coverage;
}

function describePartialCoverage({
  internalClass,
  propName,
  values,
  enumMod,
}: Readonly<{
  internalClass: string;
  propName: string;
  values: Set<string>;
  enumMod: EnumModifier;
}>): string | undefined {
  const missingValues = enumMod.values.filter((value) => !values.has(value));
  if (missingValues.length === 0 || missingValues.length === enumMod.values.length) return undefined;
  const seenValues = enumMod.values.filter((value) => values.has(value));

  return `.${internalClass} has rules for ${propName}=[${seenValues.join(", ")}] but missing ${propName}=[${missingValues.join(", ")}]`;
}

function findMissingCoverage({
  coverage,
  enums,
}: Readonly<{
  coverage: Map<string, Map<string, Set<string>>>;
  enums: EnumModifier[];
}>): string[] {
  const missing: string[] = [];

  for (const [internalClass, modMap] of coverage) {
    for (const [propName, values] of modMap) {
      const enumMod = enums.find((entry) => entry.propName === propName);
      if (!enumMod) continue;
      const message = describePartialCoverage({ internalClass, propName, values, enumMod });
      if (message !== undefined) missing.push(message);
    }
  }

  return missing;
}

describe("CSS audit — modifier completeness per internal element", () => {
  it.each(components)(
    "$kebab: every internal element styled by a modifier value covers ALL values of that modifier",
    ({ componentFile, kebab }) => {
      const cssFile = path.join(stylesComponentsDir, `${kebab}.css`);
      if (!fs.existsSync(cssFile)) return;

      const enums = getEnumModifiers(componentFile);
      if (enums.length === 0) return;

      const cssContent = fs.readFileSync(cssFile, "utf8");
      const selectors = extractSelectors(cssContent);
      const coverage = buildCoverage({ selectors, block: kebab, enums });
      const missing = findMissingCoverage({ coverage, enums });

      expect(
        missing,
        `${kebab}.css missing modifier-value rules for internal elements (real-case consumers using all class combinations get unstyled output):\n${missing.join("\n")}`,
      ).toEqual([]);
    },
  );
});
