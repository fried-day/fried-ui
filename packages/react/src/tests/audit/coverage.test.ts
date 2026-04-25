import fs from "node:fs";
import path from "node:path";

import { Node, Project } from "ts-morph";
import { describe, expect, it } from "vitest";

import { loadSource } from "../helpers/ast";
import { components, parityTestPath } from "../helpers/components";

const reactPackageRoot = path.resolve(import.meta.dirname, "..", "..", "..");

describe("Audit — file + parity coverage", () => {
  it.each(components)("$kebab: has all required files (Component, test, stories, index)", ({ dir, kebab, pascal }) => {
    const required = [
      { label: "Component.tsx", name: `${pascal}.tsx` },
      { label: "test.tsx", name: `${kebab}.test.tsx` },
      { label: "stories.tsx", name: `${kebab}.stories.tsx` },
      { label: "index.ts", name: "index.ts" },
    ];

    const missing = required.filter(({ name }) => !fs.existsSync(path.join(dir, name))).map(({ label }) => label);

    expect(missing, `${kebab}/ missing required files: ${missing.join(", ")}`).toEqual([]);
  });

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

describe("Audit — build wiring parity", () => {
  it("every component has a tsup.config.ts entry and a package.json exports entry", () => {
    const tsupContent = fs.readFileSync(path.join(reactPackageRoot, "tsup.config.ts"), "utf-8");

    const packageJson = JSON.parse(fs.readFileSync(path.join(reactPackageRoot, "package.json"), "utf-8")) as {
      exports?: Record<string, unknown>;
    };

    const missing: string[] = [];

    for (const { kebab } of components) {
      const tsupKey = `"components/${kebab}/index"`;
      const exportKey = `./${kebab}`;

      if (!tsupContent.includes(tsupKey)) {
        missing.push(`tsup.config.ts missing entry: ${tsupKey}`);
      }

      if (!packageJson.exports?.[exportKey]) {
        missing.push(`package.json exports missing: "${exportKey}"`);
      }
    }

    expect(
      missing,
      `Build wiring drift — every component needs a tsup entry plus a package.json exports map entry:\n${missing.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: index.ts re-exports {Pascal} and {Pascal}Props", ({ dir, kebab, pascal }) => {
    const indexPath = path.join(dir, "index.ts");

    if (!fs.existsSync(indexPath)) {
      expect.fail(`${kebab}/index.ts not found`);

      return;
    }

    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const source = project.addSourceFileAtPath(indexPath);

    const exportNames = new Set<string>();

    for (const exportDecl of source.getExportDeclarations()) {
      for (const named of exportDecl.getNamedExports()) {
        exportNames.add(named.getName());
      }
    }

    for (const stmt of source.getStatements()) {
      if (!Node.isExportDeclaration(stmt)) continue;

      for (const named of stmt.getNamedExports()) {
        exportNames.add(named.getName());
      }
    }

    const missing: string[] = [];

    if (!exportNames.has(pascal)) missing.push(pascal);
    if (!exportNames.has(`${pascal}Props`)) missing.push(`${pascal}Props`);

    expect(missing, `${kebab}/index.ts must re-export: ${missing.join(", ")}`).toEqual([]);
  });
});
