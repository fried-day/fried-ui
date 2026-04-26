import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/avatar/index": "src/components/avatar/index.ts",
    "components/avatar-group/index": "src/components/avatar-group/index.ts",
    "components/badge/index": "src/components/badge/index.ts",
    "components/button/index": "src/components/button/index.ts",
    "components/chip/index": "src/components/chip/index.ts",
    "components/description/index": "src/components/description/index.ts",
    "components/field/index": "src/components/field/index.ts",
    "components/field-error/index": "src/components/field-error/index.ts",
    "components/icons/index": "src/components/icons/index.ts",
    "components/input/index": "src/components/input/index.ts",
    "components/input-group/index": "src/components/input-group/index.ts",
    "components/label/index": "src/components/label/index.ts",
    "components/signal-dot/index": "src/components/signal-dot/index.ts",
    "components/surface/index": "src/components/surface/index.ts",
    "components/textarea/index": "src/components/textarea/index.ts",
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
