import fs from "node:fs";
import path from "node:path";

import { Project } from "ts-morph";
import type { SourceFile } from "ts-morph";
import { describe, expect, it } from "vitest";

import { components } from "../helpers/components";
import { extractRules, listCssFiles, readCss } from "../helpers/css";
import { camelToKebab, escapeRegex } from "../helpers/strings";

const stylesComponentsDir = path.resolve(import.meta.dirname, "..", "..", "..", "..", "styles", "src", "components");

const nonModifierProps = new Set([
  "as",
  "type",
  "placeholder",
  "htmlFor",
  "name",
  "value",
  "defaultValue",
  "id",
  "rel",
  "target",
  "role",
]);

const IDENTIFIER_KEY = /^[a-zA-Z_$][a-zA-Z0-9_$-]*$/;
const IDENTIFIER_VALUE = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

function addModifierToken({ keys, token }: Readonly<{ keys: Set<string>; token: string }>): void {
  const trimmed = token.trim();
  if (trimmed === "") return;

  const colonIndex = trimmed.indexOf(":");

  if (colonIndex === -1) {
    const name = trimmed.replaceAll(/^["']|["']$/g, "");
    if (IDENTIFIER_KEY.test(name)) keys.add(name);

    return;
  }

  const cleanKey = stripQuotes(trimmed.slice(0, colonIndex).trim());
  const value = trimmed.slice(colonIndex + 1).trim();

  if (IDENTIFIER_KEY.test(cleanKey)) keys.add(cleanKey);
  if (IDENTIFIER_VALUE.test(value)) keys.add(value);
}

function stripQuotes(value: string): string {
  return value.replaceAll(/^["']|["']$/g, "");
}

function collectClassesModifierProps(source: SourceFile): Set<string> {
  const keys = new Set<string>();
  const matches = source.getText().matchAll(/classes\s*\(\s*\{[^}]*?modifiers\s*:\s*\{([^}]*)\}/gs);

  for (const match of matches) {
    const inner = match[1] ?? "";

    for (const token of inner.split(",")) addModifierToken({ keys, token });
  }

  return keys;
}

function extractUnionValues(typeText: string): string[] | undefined {
  if (!typeText.includes("|")) return undefined;

  const parts = typeText.split("|").map((part) => part.trim().replaceAll(/^"|"$/g, ""));
  const isUnion = parts.every((part) => /^[A-Za-z0-9-]*$/.test(part) || part === "");
  if (!isUnion) return undefined;

  const values = parts.filter((part) => part !== "");
  if (values.length === 0) return undefined;

  return values;
}

function findMissingValuesForProp({
  values,
  propName,
  propKey,
  interfaceName,
  kebab,
  cssContent,
}: Readonly<{
  values: string[];
  propName: string;
  propKey: string;
  interfaceName: string;
  kebab: string;
  cssContent: string;
}>): string[] {
  const missing: string[] = [];

  for (const value of values) {
    if (value === "default") continue;

    const escaped = escapeRegex(value);
    const valueOnlyPattern = new RegExp(String.raw`\.[a-z][a-z0-9-]*-${escaped}\b`);
    const keyValuePattern = new RegExp(String.raw`\.[a-z][a-z0-9-]*-${propKey}-${escaped}\b`);

    if (!valueOnlyPattern.test(cssContent) && !keyValuePattern.test(cssContent)) {
      missing.push(
        `${interfaceName}.${propName}="${value}" — no matching CSS class in ${kebab}.css (looked for .{block}-${value} and .{block}-${propKey}-${value})`,
      );
    }
  }

  return missing;
}

function collectMissingForInterface({
  source,
  classesModifierProps,
  kebab,
  cssContent,
}: Readonly<{
  source: SourceFile;
  classesModifierProps: Set<string>;
  kebab: string;
  cssContent: string;
}>): string[] {
  const missing: string[] = [];

  for (const interfaceDecl of source.getInterfaces()) {
    const interfaceName = interfaceDecl.getName();
    if (!interfaceName.endsWith("Props")) continue;

    for (const prop of interfaceDecl.getProperties()) {
      const propName = prop.getName();
      if (nonModifierProps.has(propName)) continue;
      if (!classesModifierProps.has(propName)) continue;

      const typeText = prop.getTypeNode()?.getText() ?? "";
      const values = extractUnionValues(typeText);
      if (!values) continue;

      missing.push(
        ...findMissingValuesForProp({
          values,
          propName,
          propKey: camelToKebab(propName),
          interfaceName,
          kebab,
          cssContent,
        }),
      );
    }
  }

  return missing;
}

describe("CSS audit — variant border token usage", () => {
  it("outline variants must use -outline-border token (not transparent -border)", () => {
    const errors: string[] = [];

    for (const file of listCssFiles()) {
      const content = readCss({ file });
      const outlineRules = extractRules({ classPattern: /\.[a-z-]+-outline\s*\{/, content });

      for (const rule of outlineRules) {
        const classMatch = rule.match(/\.[a-z-]+/);
        const className = classMatch ? classMatch[0] : "unknown";
        const badBorderPattern = /border-[a-z]+-border\b(?!-outline)/;

        if (badBorderPattern.test(rule) && !rule.includes("-outline-border")) {
          errors.push(`${file} ${className}: outline variant uses transparent -border token`);
        }
      }
    }

    expect(errors).toEqual([]);
  });

  it("soft variants must use -soft-border token", () => {
    const errors: string[] = [];

    for (const file of listCssFiles()) {
      const content = readCss({ file });
      const softRules = extractRules({ classPattern: /\.[a-z-]+-soft\s*\{/, content });

      for (const rule of softRules) {
        const classMatch = rule.match(/\.[a-z-]+/);
        const className = classMatch ? classMatch[0] : "unknown";
        const hasBorder = /@apply[^;]*\bborder-/.test(rule);

        if (hasBorder && !rule.includes("-soft-border")) {
          errors.push(`${file} ${className}: soft variant should use -soft-border token`);
        }
      }
    }

    expect(errors).toEqual([]);
  });

  it("ghost variants must not apply visible border", () => {
    const errors: string[] = [];

    for (const file of listCssFiles()) {
      const content = readCss({ file });
      const ghostRules = extractRules({ classPattern: /\.[a-z-]+-ghost\s*\{/, content });

      for (const rule of ghostRules) {
        const classMatch = rule.match(/\.[a-z-]+/);
        const className = classMatch ? classMatch[0] : "unknown";

        if (/@apply[^;]*\bborder-[a-z]+-outline-border/.test(rule)) {
          errors.push(`${file} ${className}: ghost variant should not apply colored border`);
        }
      }
    }

    expect(errors).toEqual([]);
  });
});

describe("CSS audit — drift guardrails", () => {
  it("no component may style :required / [data-required] (required is semantic-only, signal via Label asterisk)", () => {
    const errors: string[] = [];

    const requiredSelector =
      /(?:&\s*:required|&\s*\[data-required\]|:has\(\s*:required\s*\)|:has\(\s*\[data-required\]\s*\))/;

    for (const file of listCssFiles()) {
      const content = readCss({ file });
      const lines = content.split("\n");

      for (const [index, line_] of lines.entries()) {
        const line = line_ ?? "";

        if (requiredSelector.test(line)) {
          errors.push(`${file}:${index + 1}: ${line.trim()} — :required / [data-required] visual rule forbidden`);
        }
      }
    }

    expect(
      errors,
      `Required state is semantic-only — signal via the paired Label asterisk. Do NOT change input border/ring/color based on :required or [data-required]. See memory feedback_required_semantic_only.md.\n${errors.join("\n")}`,
    ).toEqual([]);
  });

  it("disabled styling must use @apply status-disabled (not raw pointer-events-none opacity-50)", () => {
    const errors: string[] = [];

    const rawDisabledPattern =
      /@apply[^;]*\bpointer-events-none\b[^;]*\bopacity-(?:50|\(--disabled-opacity\))\b|@apply[^;]*\bopacity-(?:50|\(--disabled-opacity\))\b[^;]*\bpointer-events-none\b/;

    for (const file of listCssFiles()) {
      const content = readCss({ file });
      const lines = content.split("\n");

      for (const [index, line_] of lines.entries()) {
        const line = line_ ?? "";

        if (rawDisabledPattern.test(line) && !line.includes("status-disabled")) {
          errors.push(`${file}:${index + 1}: ${line.trim()}`);
        }
      }
    }

    expect(
      errors,
      `Use @apply status-disabled for disabled styling. Raw pointer-events-none opacity-50 misses cursor-not-allowed:\n${errors.join("\n")}`,
    ).toEqual([]);
  });

  it("no native :invalid pseudo (matches required-empty on page load = user confusion)", () => {
    const errors: string[] = [];
    const invalidPseudoPattern = /(?<![-\w])(:invalid\b|:has\(\s*:invalid\s*\))/;

    for (const file of listCssFiles()) {
      const content = readCss({ file });
      const lines = content.split("\n");

      for (const [index, line_] of lines.entries()) {
        const line = line_ ?? "";

        if (invalidPseudoPattern.test(line)) {
          errors.push(`${file}:${index + 1}: ${line.trim()}`);
        }
      }
    }

    expect(
      errors,
      `Native :invalid matches required-empty inputs before user interaction (confusing UX). Use [aria-invalid="true"] or [data-invalid] attrs instead — React Aria only sets those after real validation.\n${errors.join("\n")}`,
    ).toEqual([]);
  });
});

describe("CSS audit — modifier coverage", () => {
  it.each(components)("$kebab: every interface enum value has a matching CSS class", ({ componentFile, kebab }) => {
    if (!fs.existsSync(componentFile)) return;

    const cssFile = path.join(stylesComponentsDir, `${kebab}.css`);
    const cssContent = fs.existsSync(cssFile) ? fs.readFileSync(cssFile, "utf8") : "";

    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const source = project.addSourceFileAtPath(componentFile);

    const classesModifierProps = collectClassesModifierProps(source);
    const missing = collectMissingForInterface({ source, classesModifierProps, kebab, cssContent });

    expect(
      missing,
      `${kebab} CSS missing modifier classes (interface declares values without CSS):\n${missing.join("\n")}`,
    ).toEqual([]);
  });
});
