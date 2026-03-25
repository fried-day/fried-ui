import { createConfig } from "@repo/quality/eslint/base";

export default [
  ...createConfig(import.meta.dirname),
  {
    ignores: ["apps/**", "packages/**", "node_modules/**", ".next/**", "dist/**"],
  },
];
