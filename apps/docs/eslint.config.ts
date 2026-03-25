import { nextJsConfig } from "@repo/quality/eslint/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    ignores: [".source/**"],
  },
];
