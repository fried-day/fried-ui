import fs from "node:fs";
import path from "node:path";

const stylesComponentsDir = path.resolve(import.meta.dirname, "..", "..", "..", "..", "styles", "src", "components");

interface ReadCssParams {
  file: string;
}

interface ExtractRulesParams {
  classPattern: RegExp;
  content: string;
}

function listCssFiles(): string[] {
  return fs.readdirSync(stylesComponentsDir).filter((file) => file.endsWith(".css"));
}

function readCss({ file }: Readonly<ReadCssParams>): string {
  return fs.readFileSync(path.join(stylesComponentsDir, file), "utf8");
}

function extractRules({ classPattern, content }: Readonly<ExtractRulesParams>): string[] {
  const rules: string[] = [];
  const lines = content.split("\n");
  let isCapturing = false;
  let depth = 0;
  let current = "";

  for (const line of lines) {
    if (!isCapturing && classPattern.test(line) && line.includes("{")) {
      isCapturing = true;
      depth = 1;
      current = line + "\n";
      continue;
    }

    if (isCapturing) {
      current += line + "\n";
      depth += (line.match(/\{/g) ?? []).length;
      depth -= (line.match(/\}/g) ?? []).length;

      if (depth === 0) {
        rules.push(current);
        isCapturing = false;
        current = "";
      }
    }
  }

  return rules;
}

export { extractRules, listCssFiles, readCss };
