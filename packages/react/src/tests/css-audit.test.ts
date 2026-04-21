import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const stylesComponentsDir = path.resolve(import.meta.dirname, "..", "..", "..", "styles", "src", "components");

interface ReadCssParams {
  file: string;
}

interface ExtractRulesParams {
  classPattern: RegExp;
  content: string;
}

function readCss({ file }: ReadCssParams): string {
  return fs.readFileSync(path.join(stylesComponentsDir, file), "utf-8");
}

function extractRules({ content, classPattern }: ExtractRulesParams): string[] {
  const rules: string[] = [];
  const lines = content.split("\n");
  let isCapturing = false;
  let depth = 0;
  let current = "";

  for (const line of lines) {
    if (!isCapturing && classPattern.test(line) && line.includes("{")) {
      isCapturing = true;
      depth = 1;
      current = line + "\n";
      continue;
    }

    if (isCapturing) {
      current += line + "\n";
      depth += (line.match(/\{/g) ?? []).length;
      depth -= (line.match(/\}/g) ?? []).length;

      if (depth === 0) {
        rules.push(current);
        isCapturing = false;
        current = "";
      }
    }
  }

  return rules;
}

describe("CSS dead class audit", () => {
  it("outline variants must use -outline-border token (not transparent -border)", () => {
    const files = fs.readdirSync(stylesComponentsDir).filter((file) => file.endsWith(".css"));
    const errors: string[] = [];

    for (const file of files) {
      const content = readCss({ file });
      const outlineRules = extractRules({ content, classPattern: /\.[a-z]+--[a-z-]*outline\s*\{/ });

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
    const files = fs.readdirSync(stylesComponentsDir).filter((file) => file.endsWith(".css"));
    const errors: string[] = [];

    for (const file of files) {
      const content = readCss({ file });
      const softRules = extractRules({ content, classPattern: /\.[a-z]+--[a-z-]+-soft\s*\{/ });

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
    const files = fs.readdirSync(stylesComponentsDir).filter((file) => file.endsWith(".css"));
    const errors: string[] = [];

    for (const file of files) {
      const content = readCss({ file });
      const ghostRules = extractRules({ content, classPattern: /\.[a-z]+--[a-z-]+-ghost\s*\{/ });

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
