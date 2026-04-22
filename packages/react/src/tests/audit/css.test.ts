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

describe("CSS audit — drift guardrails", () => {
  it("no component may style :required / [data-required] (required is semantic-only, signal via Label asterisk)", () => {
    const errors: string[] = [];

    const requiredSelector =
      /(?:&\s*:required|&\s*\[data-required\]|:has\(\s*:required\s*\)|:has\(\s*\[data-required\]\s*\))/;

    for (const file of listCssFiles()) {
      if (file === "field.css") continue;

      const content = readCss({ file });
      const lines = content.split("\n");

      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index] ?? "";

        if (requiredSelector.test(line)) {
          errors.push(
            `${file}:${index + 1}: ${line.trim()} — :required / [data-required] visual rule forbidden outside FieldLabel`,
          );
        }
      }
    }

    expect(
      errors,
      `Required state is semantic-only — signal via FieldLabel asterisk (.field-label-required span). Do NOT change input border/ring/color based on :required or [data-required]. See memory feedback_required_semantic_only.md.\n${errors.join("\n")}`,
    ).toEqual([]);
  });

  it("disabled styling must use @apply status-disabled (not raw pointer-events-none opacity-50)", () => {
    const errors: string[] = [];

    const rawDisabledPattern =
      /@apply[^;]*\bpointer-events-none\b[^;]*\bopacity-(?:50|\(--disabled-opacity\))\b|@apply[^;]*\bopacity-(?:50|\(--disabled-opacity\))\b[^;]*\bpointer-events-none\b/;

    for (const file of listCssFiles()) {
      const content = readCss({ file });
      const lines = content.split("\n");

      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index] ?? "";

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

      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index] ?? "";

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
