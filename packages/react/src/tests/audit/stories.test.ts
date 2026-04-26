import { Node } from "ts-morph";

import { describe, expect, it } from "vitest";

import {
  getAllStringLiterals,
  getClassNameStringLiterals,
  getMetaArgTypeDescriptions,
  loadSource,
  metaHasPath,
} from "../helpers/ast";
import { components } from "../helpers/components";
import {
  getArgTypesObject,
  getNamedExportSequence,
  MOCK_DATA_BLACKLIST,
  validCategories,
} from "../helpers/stories-ast";
import { inferTier, TIER_LABELS } from "../fixtures/story-tiers";

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

  it.each(components)("$kebab: argType descriptions use words, not transition symbols", ({ kebab, storiesFile }) => {
    const argTypes = getMetaArgTypeDescriptions({ storiesFile });
    const bannedSymbols = [" -> ", " <- ", " => ", "\u2192", "\u2190"];
    const offenders: string[] = [];

    for (const { description, line, propName } of argTypes) {
      for (const symbol of bannedSymbols) {
        if (!description.includes(symbol)) continue;

        offenders.push(
          `${kebab}.stories.tsx:${String(line)} argTypes.${propName}.description contains "${symbol.trim()}" — replace with words ("leads to", "maps to", "transitions to", "derives from")`,
        );
      }
    }

    expect(
      offenders,
      `${kebab}.stories.tsx argType descriptions contain banned transition symbols — see .claude/rules/writing.md:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: every argType.table.category is one of 5 valid values", ({ kebab, storiesFile }) => {
    const source = loadSource({ file: storiesFile });
    if (!source) return;

    const argTypes = getArgTypesObject(source);
    if (!argTypes) return;

    const offenders: string[] = [];

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
      if (validCategories.has(value)) continue;

      offenders.push(
        `argTypes.${propName}.table.category="${value}" — must be one of: ${[...validCategories].join(", ")}`,
      );
    }

    expect(offenders, `${kebab}.stories.tsx has invalid category values:\n${offenders.join("\n")}`).toEqual([]);
  });

  it.each(components)(
    "$kebab: string literals avoid placeholder mock data (Lorem, foo bar, asdf, …)",
    ({ kebab, storiesFile }) => {
      const literals = getAllStringLiterals({ storiesFile });
      const offenders: string[] = [];

      for (const literal of literals) {
        for (const banned of MOCK_DATA_BLACKLIST) {
          const escaped = banned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const re = new RegExp(`\\b${escaped}\\b`, "i");
          if (!re.test(literal)) continue;

          offenders.push(`"${literal}" contains placeholder "${banned}" — use realistic mock data`);
        }
      }

      expect(
        offenders,
        `${kebab}.stories.tsx string literals contain placeholder mock data:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(components)("$kebab: story export tiers are non-decreasing", ({ kebab, storiesFile }) => {
    const source = loadSource({ file: storiesFile });
    if (!source) return;

    const sequence = getNamedExportSequence(source);
    if (sequence.length === 0) return;

    const offenders: string[] = [];
    let previousTier = 0;
    let previousName = "";

    for (const { line, name } of sequence) {
      const tier = inferTier(name);

      if (tier < previousTier) {
        offenders.push(
          `line ${String(line)}: "${name}" (tier ${tier} — ${TIER_LABELS[tier]}) appears after "${previousName}" (tier ${previousTier} — ${TIER_LABELS[previousTier]})`,
        );
      }

      previousTier = tier;
      previousName = name;
    }

    expect(
      offenders,
      `${kebab}.stories.tsx export order violates 5-tier convention — see rules/storybook.md "Story order":\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
