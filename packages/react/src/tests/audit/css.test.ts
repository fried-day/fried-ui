import { describe, expect, it } from "vitest";

import { extractRules, listCssFiles, readCss } from "../helpers/css";

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
