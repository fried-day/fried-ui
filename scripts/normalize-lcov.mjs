#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process, { stderr, stdout } from "node:process";
import { fileURLToPath } from "node:url";

const lcovArg = process.argv[2];

if (!lcovArg) {
  stderr.write("usage: normalize-lcov.mjs <path-to-lcov.info>\n");
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const lcovPath = path.resolve(lcovArg);
const vitestCwd = path.dirname(path.dirname(lcovPath));

const original = readFileSync(lcovPath, "utf8");

const normalized = original.replaceAll(/^SF:(.+)$/gm, (_, sfPath) => {
  const absolute = path.resolve(vitestCwd, sfPath.trim());
  const fromRoot = path.relative(projectRoot, absolute);

  return `SF:${fromRoot}`;
});

writeFileSync(lcovPath, normalized);

stdout.write(
  `Normalized ${path.relative(projectRoot, lcovPath)} (cwd ${path.relative(projectRoot, vitestCwd) || "."})\n`,
);
