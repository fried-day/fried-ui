import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "utils/index": "src/utils/index.ts",
    "components/index": "src/components/index.ts",
  },
  format: ["esm"],
  outExtension: () => ({ js: ".mjs" }),
  dts: {
    compilerOptions: {
      module: "ESNext",
      moduleResolution: "Bundler",
    },
  },
  splitting: true,
  treeshake: true,
  clean: true,
  external: ["tailwindcss"],
});
