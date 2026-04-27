import { describe, expect, it } from "vitest";

import { listCssFiles, readCss } from "../helpers/css";

describe("CSS audit — index.css imports", () => {
  it("every component CSS file must be @imported in index.css", () => {
    const allFiles = listCssFiles();
    const indexContent = readCss({ file: "index.css" });

    const missing: string[] = [];

    for (const file of allFiles) {
      if (file === "index.css") continue;

      const escapedFile = file.replace(".", String.raw`\.`);
      const importPattern = new RegExp(String.raw`@import\s+["']\./${escapedFile}["']`);

      if (!importPattern.test(indexContent)) {
        missing.push(file);
      }
    }

    const missingImports = missing.map((file) => `  @import "./${file}";`).join("\n");

    expect(
      missing,
      `Component CSS files exist but are NOT @imported in packages/styles/src/components/index.css. Consumers loading the barrel will miss these styles — size/variant/radius modifier classes will render without Tailwind-compiled rules and tests pass while visual styles silently break.\n\nMissing imports:\n${missingImports}`,
    ).toEqual([]);
  });
});
