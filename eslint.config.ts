import { createConfig } from "@repo/eslint-config/base";

export default [
  ...createConfig(import.meta.dirname),
  {
    ignores: ["apps/**", "packages/**", "node_modules/**", ".next/**", "dist/**"],
  },
];
