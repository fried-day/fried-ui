import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import nextfriday from "eslint-plugin-nextfriday";

/**
 * A shared ESLint configuration for the repository.
 */
export function createConfig(tsconfigRootDir: string) {
  return [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir,
        },
      },
    },
    nextfriday.configs["base/recommended"],
    {
      plugins: {
        turbo: turboPlugin,
      },
      rules: {
        "turbo/no-undeclared-env-vars": "warn",
      },
    },
    {
      ignores: ["dist/**", "sample/**"],
    },
  ];
}
