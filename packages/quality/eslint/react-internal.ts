import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import nextfriday from "eslint-plugin-nextfriday";
import { createConfig } from "./base";

/**
 * A custom ESLint configuration for libraries that use React.
 */
export function createReactConfig(tsconfigRootDir: string) {
  return [
    ...createConfig(tsconfigRootDir),
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    nextfriday.configs["react/recommended"],
    pluginReact.configs.flat.recommended,
    {
      languageOptions: {
        ...pluginReact.configs.flat.recommended.languageOptions,
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
      settings: { react: { version: "detect" } },
      rules: {
        ...pluginReactHooks.configs.recommended.rules,
        "react/react-in-jsx-scope": "off",
      },
    },
  ];
}
