import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/avatar/index": "src/components/avatar/index.ts",
    "components/badge/index": "src/components/badge/index.ts",
    "components/button/index": "src/components/button/index.ts",
    "components/icons/index": "src/components/icons/index.ts",
    "components/label/index": "src/components/label/index.ts",
    "components/surface/index": "src/components/surface/index.ts",
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
  external: ["react", "react-dom", "tailwindcss", "@fried-ui/styles", /^@fried-ui\/styles\//],
});
