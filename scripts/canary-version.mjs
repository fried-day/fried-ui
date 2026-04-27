#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import process, { stderr, stdout } from "node:process";

const suffix = process.env.CANARY_SUFFIX;

if (!suffix) {
  stderr.write("CANARY_SUFFIX env var is required (format: canary.<timestamp>.<sha>)\n");
  process.exit(1);
}

const RELEASABLE_PACKAGES = ["packages/react", "packages/styles"];

for (const pkgDir of RELEASABLE_PACKAGES) {
  const manifestPath = `${pkgDir}/package.json`;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.version = manifest.version.replace(/^(\d+\.\d+\.\d+).*/, `$1-${suffix}`);

  writeFileSync(manifestPath, `${JSON.stringify(manifest, undefined, 2)}\n`);
  stdout.write(`${manifest.name}@${manifest.version}\n`);
}
