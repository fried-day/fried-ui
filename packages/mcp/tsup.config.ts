import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  outExtension: () => ({ js: ".mjs" }),
  banner: {
    js: "#!/usr/bin/env node",
  },
  clean: true,
});
