import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/box/index": "src/components/box/index.ts",
    "components/aria/index": "src/components/aria/index.ts",
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
  external: ["react", "react-dom", "tailwindcss"],
});
