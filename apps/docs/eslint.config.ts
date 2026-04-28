import { createNextJsConfig } from "@repo/eslint-config/next-js";

export default [
  ...createNextJsConfig(import.meta.dirname),
  {
    ignores: [".source/**"],
  },
];
