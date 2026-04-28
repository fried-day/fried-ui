import type { Linter } from "eslint";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import eslintReact from "@eslint-react/eslint-plugin";
import globals from "globals";
import nextfriday from "eslint-plugin-nextfriday";
import { createConfig } from "./base";

/**
 * A custom ESLint configuration for libraries that use React.
 */
function createReactConfig(tsconfigRootDir: string): Linter.Config[] {
  return [
    ...createConfig(tsconfigRootDir),
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    nextfriday.configs["react/recommended"],
    eslintReact.configs["recommended-typescript"],
    {
      languageOptions: {
        globals: {
          ...globals.serviceworker,
          ...globals.browser,
        },
      },
    },
    {
      plugins: {
        "react-hooks": pluginReactHooks,
      },
      rules: {
        ...pluginReactHooks.configs.recommended.rules,
      },
    },
  ] as Linter.Config[];
}

export { createReactConfig };
