import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { loadSource } from "../helpers/ast";
import { components, parityTestPath } from "../helpers/components";

describe("Audit — file + parity coverage", () => {
  it.each(components)(
    "$kebab: has all required files (Component, test, stories, variants, index)",
    ({ dir, kebab, pascal }) => {
      const required = [
        { label: "Component.tsx", name: `${pascal}.tsx` },
        { label: "test.tsx", name: `${kebab}.test.tsx` },
        { label: "stories.tsx", name: `${kebab}.stories.tsx` },
        { label: "variants.ts", name: `${kebab}.variants.ts` },
        { label: "index.ts", name: "index.ts" },
      ];

      const missing = required.filter(({ name }) => !fs.existsSync(path.join(dir, name))).map(({ label }) => label);

      expect(missing, `${kebab}/ missing required files: ${missing.join(", ")}`).toEqual([]);
    },
  );

  it("every component has an entry in parity.test.tsx", () => {
    const source = loadSource({ file: parityTestPath });

    if (!source) {
      expect.fail("parity.test.tsx not found");

      return;
    }

    const importedNames = new Set<string>();

    for (const importDecl of source.getImportDeclarations()) {
      for (const named of importDecl.getNamedImports()) {
        importedNames.add(named.getName());
      }
    }

    const missing = components.map((component) => component.pascal).filter((pascal) => !importedNames.has(pascal));

    expect(missing, `Components missing parity test coverage (add to parity.test.tsx): ${missing.join(", ")}`).toEqual(
      [],
    );
  });
});
