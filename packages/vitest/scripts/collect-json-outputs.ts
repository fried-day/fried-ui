import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";

const destDir = path.resolve("coverage/raw");

fs.mkdirSync(destDir, { recursive: true });

const patterns = ["../../apps/*/coverage.json", "../../packages/*/coverage.json"];

for (const pattern of patterns) {
  const files = await glob(pattern);

  for (const file of files) {
    const segments = file.split(path.sep);
    const name = segments[segments.length - 2];
    const dest = path.join(destDir, `${name}-coverage.json`);

    fs.copyFileSync(file, dest);
    console.log(`[vitest] collected: ${name} -> ${dest}`);
  }
}

console.log(`[vitest] done. ${fs.readdirSync(destDir).length} reports collected.`);
