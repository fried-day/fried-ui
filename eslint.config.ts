import { config } from "@repo/quality/eslint/base";

export default [
  ...config,
  {
    ignores: ["apps/**", "packages/**", "node_modules/**", ".next/**", "dist/**"],
  },
];
