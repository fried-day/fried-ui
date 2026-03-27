import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/button/index": "src/components/button/index.ts",
    "utils/cn/index": "src/utils/cn/index.ts",
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
