import fs from "node:fs";
import path from "node:path";

const componentsDir = path.resolve(import.meta.dirname, "..", "..", "components");
const parityTestPath = path.resolve(import.meta.dirname, "..", "audit", "parity.test.tsx");

const ignoredDirs = new Set(["icons"]);

export interface ComponentDir {
  componentFile: string;
  dir: string;
  kebab: string;
  pascal: string;
  storiesFile: string;
  variantsFile: string;
}

function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function buildComponent(name: string): ComponentDir {
  const kebab = name;
  const pascal = kebabToPascal(kebab);
  const dir = path.join(componentsDir, kebab);
  const componentFile = path.join(dir, `${pascal}.tsx`);
  const variantsFile = path.join(dir, `${kebab}.variants.ts`);
  const storiesFile = path.join(dir, `${kebab}.stories.tsx`);

  return { componentFile, dir, kebab, pascal, storiesFile, variantsFile };
}

function listComponents(): ComponentDir[] {
  return fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !ignoredDirs.has(entry.name))
    .map((entry) => buildComponent(entry.name));
}

const components = listComponents();

export { components, parityTestPath };
