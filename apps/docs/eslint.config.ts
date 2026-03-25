import { createNextJsConfig } from "@repo/quality/eslint/next-js";

export default [
  ...createNextJsConfig(import.meta.dirname),
  {
    ignores: [".source/**"],
  },
];
