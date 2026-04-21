import { Node } from "ts-morph";

import { describe, expect, it } from "vitest";

import {
  countStorySourceCodeBlocks,
  getAllStringLiterals,
  getClassNameStringLiterals,
  getStoryNames,
  loadSource,
  metaHasPath,
} from "../helpers/ast";
import { components } from "../helpers/components";

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

describe("Audit — stories conventions", () => {
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
