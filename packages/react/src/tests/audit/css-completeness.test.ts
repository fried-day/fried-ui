import fs from "node:fs";
import path from "node:path";

import { Project } from "ts-morph";
import { describe, expect, it } from "vitest";

import { components } from "../helpers/components";

const stylesComponentsDir = path.resolve(import.meta.dirname, "..", "..", "..", "..", "styles", "src", "components");

function camelToKebab(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`).replace(/^-/, "");
}

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

function getEnumModifiers(componentFile: string): EnumModifier[] {
  if (!fs.existsSync(componentFile)) return [];

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const source = project.addSourceFileAtPath(componentFile);
  const result: EnumModifier[] = [];
  const seen = new Set<string>();

  for (const interfaceDecl of source.getInterfaces()) {
    if (!interfaceDecl.getName().endsWith("Props")) continue;

    for (const prop of interfaceDecl.getProperties()) {
      const propName = prop.getName();

      if (seen.has(propName)) continue;

      const typeNode = prop.getTypeNode();
      const typeText = typeNode?.getText() ?? "";

      if (!typeText.includes("|")) continue;

      const parts = typeText.split("|").map((part) => part.trim().replace(/^"|"$/g, ""));
      const isUnion = parts.every((part) => /^[A-Za-z0-9-]*$/.test(part) || part === "");

      if (!isUnion) continue;

      const values = parts.filter((part) => part !== "" && part !== "default");

      if (values.length === 0) continue;

      seen.add(propName);
      result.push({ propName, propKeyKebab: camelToKebab(propName), values });
    }
  }

  return result;
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

    let isMatchedAsModifier = false;

    for (const enumMod of enums) {
      if (enumMod.propName === "variant") {
        if (enumMod.values.includes(rest)) {
          modifiers.push({ propName: enumMod.propName, value: rest });
          isMatchedAsModifier = true;

          break;
        }

        continue;
      }

      if (rest.startsWith(`${enumMod.propKeyKebab}-`)) {
        const value = rest.slice(enumMod.propKeyKebab.length + 1);

        if (enumMod.values.includes(value)) {
          modifiers.push({ propName: enumMod.propName, value });
          isMatchedAsModifier = true;

          break;
        }
      }
    }

    if (!isMatchedAsModifier) internalClasses.push(cls);
  }

  return { modifiers, internalClasses };
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
      const selectorBlock = cssContent.slice(start, cursor).trim();

      if (selectorBlock !== "" && !selectorBlock.startsWith("@")) {
        for (const selector of selectorBlock.split(",")) {
          const trimmed = selector.trim();

          if (trimmed !== "") selectors.push(trimmed);
        }
      }
    }

    cursor += 1;
  }

  return selectors;
}

describe("CSS audit — modifier completeness per internal element", () => {
  it.each(components)(
    "$kebab: every internal element styled by a modifier value covers ALL values of that modifier",
    ({ componentFile, kebab }) => {
      const cssFile = path.join(stylesComponentsDir, `${kebab}.css`);

      if (!fs.existsSync(cssFile)) return;

      const enums = getEnumModifiers(componentFile);

      if (enums.length === 0) return;

      const cssContent = fs.readFileSync(cssFile, "utf-8");
      const selectors = extractSelectors(cssContent);

      const coverage = new Map<string, Map<string, Set<string>>>();

      for (const selector of selectors) {
        const parsed = parseSelector({ selector, block: kebab, enums });

        if (parsed.modifiers.length === 0) continue;
        if (parsed.internalClasses.length === 0) continue;

        for (const internalClass of parsed.internalClasses) {
          if (!coverage.has(internalClass)) coverage.set(internalClass, new Map());

          const internalMap = coverage.get(internalClass)!;

          for (const modifier of parsed.modifiers) {
            if (!internalMap.has(modifier.propName)) internalMap.set(modifier.propName, new Set());

            internalMap.get(modifier.propName)!.add(modifier.value);
          }
        }
      }

      const missing: string[] = [];

      for (const [internalClass, modMap] of coverage) {
        for (const [propName, values] of modMap) {
          const enumMod = enums.find((entry) => entry.propName === propName);

          if (!enumMod) continue;

          const missingValues = enumMod.values.filter((value) => !values.has(value));

          if (missingValues.length === 0) continue;
          if (missingValues.length === enumMod.values.length) continue;

          const seenValues = enumMod.values.filter((value) => values.has(value));

          missing.push(
            `.${internalClass} has rules for ${propName}=[${seenValues.join(", ")}] but missing ${propName}=[${missingValues.join(", ")}]`,
          );
        }
      }

      expect(
        missing,
        `${kebab}.css missing modifier-value rules for internal elements (real-case consumers using all class combinations get unstyled output):\n${missing.join("\n")}`,
      ).toEqual([]);
    },
  );
});
