import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const componentsDir = path.resolve(import.meta.dirname, "..", "components");
const parityTestPath = path.resolve(import.meta.dirname, "parity.test.tsx");

const ignoreDirs = new Set(["icons"]);

interface ComponentDir {
  dir: string;
  kebab: string;
  pascal: string;
}

interface ReadFileParams {
  file: string;
}

function listComponents(): ComponentDir[] {
  return fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !ignoreDirs.has(entry.name))
    .map((entry) => {
      const kebab = entry.name;

      const pascal = kebab
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

      const dir = path.join(componentsDir, kebab);

      return { dir, kebab, pascal };
    });
}

function readFile({ file }: Readonly<ReadFileParams>): string {
  return fs.readFileSync(file, "utf-8");
}

const components = listComponents();

describe("LLM DX — A. Stories invariants", () => {
  const domainWords = [
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

  it.each(components)("$kebab: stories use generic body text (no domain words)", ({ dir, kebab }) => {
    const storyPath = path.join(dir, `${kebab}.stories.tsx`);
    const content = readFile({ file: storyPath });

    for (const word of domainWords) {
      expect(
        content,
        `${kebab}.stories.tsx contains domain word "${word}" — use generic text (component name) per storybook.md`,
      ).not.toContain(word);
    }
  });

  it.each(components)(
    "$kebab: flex-col only in FullWidth story (variant comparison must use flex-wrap)",
    ({ dir, kebab }) => {
      const storyPath = path.join(dir, `${kebab}.stories.tsx`);
      const content = readFile({ file: storyPath });
      const lines = content.split("\n");

      const offenders: string[] = [];
      let currentStoryName = "";

      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index]!;
        const storyDecl = line.match(/^const\s+(\w+):\s*Story\s*=/);

        if (storyDecl) {
          currentStoryName = storyDecl[1]!;
          continue;
        }

        const hasPlainFlexCol = line.includes("flex-col") && !line.match(/(sm|md|lg|xl|2xl):flex-col/);
        const isOutsideFullWidth = currentStoryName !== "FullWidth";

        if (hasPlainFlexCol && isOutsideFullWidth) {
          offenders.push(`line ${index + 1} in story "${currentStoryName || "<meta>"}": ${line.trim()}`);
        }
      }

      expect(
        offenders,
        `${kebab}.stories.tsx has flex-col outside FullWidth — use flex-wrap for responsive variant comparison:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(components)("$kebab: every named story export has parameters.docs.source.code", ({ dir, kebab }) => {
    const storyPath = path.join(dir, `${kebab}.stories.tsx`);
    const content = readFile({ file: storyPath });

    const storyNames = [...content.matchAll(/^const\s+(\w+):\s*Story\s*=/gm)].map((match) => match[1]);

    const sourceCodeBlocks = [...content.matchAll(/parameters:\s*\{[^}]*docs:\s*\{[^}]*source:\s*\{[^}]*code:/gs)]
      .length;

    expect(
      sourceCodeBlocks,
      `${kebab}.stories.tsx has ${storyNames.length} stories but only ${sourceCodeBlocks} source.code blocks — every story needs one per storybook.md`,
    ).toBeGreaterThanOrEqual(storyNames.length);
  });

  it.each(components)("$kebab: meta has tags:['autodocs']", ({ dir, kebab }) => {
    const storyPath = path.join(dir, `${kebab}.stories.tsx`);
    const content = readFile({ file: storyPath });
    expect(content, `${kebab}.stories.tsx missing tags: ["autodocs"]`).toMatch(/tags:\s*\[\s*"autodocs"\s*\]/);
  });

  it.each(components)("$kebab: meta has layout parameter (centered or padded)", ({ dir, kebab }) => {
    const storyPath = path.join(dir, `${kebab}.stories.tsx`);
    const content = readFile({ file: storyPath });

    expect(content, `${kebab}.stories.tsx missing layout parameter`).toMatch(
      /layout:\s*"(centered|padded|fullscreen)"/,
    );
  });
});

describe("LLM DX — B. JSDoc invariants (variants.ts)", () => {
  it.each(components)("$kebab: every prop has JSDoc comment", ({ dir, kebab }) => {
    const variantsPath = path.join(dir, `${kebab}.variants.ts`);

    if (!fs.existsSync(variantsPath)) return;

    const content = readFile({ file: variantsPath });
    const props = [...content.matchAll(/^\s{2}(\w+)\?:/gm)];

    const missing: string[] = [];

    for (const match of props) {
      const propName = match[1]!;
      const propStart = content.indexOf(match[0]);
      const preceding = content.slice(0, propStart);
      const lastCommentEnd = preceding.lastIndexOf("*/");
      const trimmedBetween = preceding.slice(lastCommentEnd + 2).trim();

      if (lastCommentEnd === -1 || trimmedBetween !== "") {
        missing.push(propName);
      }
    }

    expect(missing, `${kebab}.variants.ts: props missing JSDoc: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(components)("$kebab: every prop has @default annotation", ({ dir, kebab }) => {
    const variantsPath = path.join(dir, `${kebab}.variants.ts`);

    if (!fs.existsSync(variantsPath)) return;

    const content = readFile({ file: variantsPath });
    const comments = [...content.matchAll(/\/\*\*([^*]|\*(?!\/))*\*\//g)];

    const missing: string[] = [];

    for (const match of comments) {
      const comment = match[0];

      if (!comment.includes("@default")) {
        missing.push(comment.slice(0, 60).replace(/\n/g, " "));
      }
    }

    expect(missing, `${kebab}.variants.ts: JSDoc comments missing @default:\n${missing.join("\n")}`).toEqual([]);
  });

  it.each(components)("$kebab: boolean props start with 'Whether the'", ({ dir, kebab }) => {
    const variantsPath = path.join(dir, `${kebab}.variants.ts`);

    if (!fs.existsSync(variantsPath)) return;

    const content = readFile({ file: variantsPath });
    const lines = content.split("\n");

    const offenders: string[] = [];

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index]!;
      const propMatch = line.match(/^\s{2}(\w+)\?:\s*boolean/);

      if (!propMatch) continue;

      const prevLine = lines[index - 1] ?? "";
      const comment = prevLine.trim();

      if (!comment.startsWith("/** Whether the")) {
        offenders.push(`${propMatch[1]}: ${comment}`);
      }
    }

    expect(
      offenders,
      `${kebab}.variants.ts: boolean props must start with "Whether the..." per architecture.md:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: no @example in variants.ts (belongs in Storybook)", ({ dir, kebab }) => {
    const variantsPath = path.join(dir, `${kebab}.variants.ts`);

    if (!fs.existsSync(variantsPath)) return;

    const content = readFile({ file: variantsPath });

    expect(
      content,
      `${kebab}.variants.ts contains @example — examples belong in Storybook per architecture.md`,
    ).not.toContain("@example");
  });
});

describe("LLM DX — C. Component invariants (Component.tsx)", () => {
  it.each(components)("$kebab: component has JSDoc (component-level docstring)", ({ dir, pascal }) => {
    const componentPath = path.join(dir, `${pascal}.tsx`);

    if (!fs.existsSync(componentPath)) return;

    const content = readFile({ file: componentPath });

    expect(content, `${pascal}.tsx missing component-level JSDoc (1-2 line description)`).toMatch(
      /\/\*\*[\s\S]*?\*\/\s*\n?\s*(const|function|export)\s+\w+/,
    );
  });

  it.each(components)("$kebab: destructure has NO defaults (breaks 1:1 parity)", ({ dir, pascal }) => {
    const componentPath = path.join(dir, `${pascal}.tsx`);

    if (!fs.existsSync(componentPath)) return;

    const content = readFile({ file: componentPath });
    const destructureMatch = content.match(/const\s*\{[^}]+\}\s*=\s*props/);

    if (!destructureMatch) return;

    const destructure = destructureMatch[0];

    expect(
      destructure,
      `${pascal}.tsx: destructure contains default value — defaults must live in base class CSS for parity\n${destructure}`,
    ).not.toMatch(/=\s*["']/);
  });

  it.each(components)("$kebab: sets displayName", ({ dir, pascal }) => {
    const componentPath = path.join(dir, `${pascal}.tsx`);

    if (!fs.existsSync(componentPath)) return;

    const content = readFile({ file: componentPath });

    expect(content, `${pascal}.tsx missing displayName`).toMatch(
      new RegExp(`${pascal}\\.displayName\\s*=\\s*["']${pascal}["']`),
    );
  });
});

describe("LLM DX — D. Coverage invariants", () => {
  const required = [
    { ext: ".tsx", prefix: "pascal" as const, label: "Component.tsx" },
    { ext: ".test.tsx", prefix: "kebab" as const, label: "test.tsx" },
    { ext: ".stories.tsx", prefix: "kebab" as const, label: "stories.tsx" },
    { ext: ".variants.ts", prefix: "kebab" as const, label: "variants.ts" },
  ];

  it.each(components)(
    "$kebab: has all 5 required files (Component, test, stories, variants, index)",
    ({ dir, kebab, pascal }) => {
      const missing: string[] = [];

      for (const { ext, label, prefix } of required) {
        const name = prefix === "pascal" ? pascal : kebab;
        const filePath = path.join(dir, `${name}${ext}`);

        if (!fs.existsSync(filePath)) missing.push(label);
      }

      const indexPath = path.join(dir, "index.ts");
      if (!fs.existsSync(indexPath)) missing.push("index.ts");

      expect(missing, `${kebab}/ missing required files: ${missing.join(", ")}`).toEqual([]);
    },
  );

  it("every component has an entry in parity.test.tsx", () => {
    const parityContent = readFile({ file: parityTestPath });
    const missing: string[] = [];

    for (const { pascal } of components) {
      const importPattern = new RegExp(`import\\s*\\{\\s*${pascal}\\s*\\}`);

      if (!importPattern.test(parityContent)) {
        missing.push(pascal);
      }
    }

    expect(missing, `Components missing parity test coverage (add to parity.test.tsx): ${missing.join(", ")}`).toEqual(
      [],
    );
  });
});
