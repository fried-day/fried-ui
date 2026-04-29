import type { Linter } from "eslint";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import nextfriday from "eslint-plugin-nextfriday";

function createConfig(tsconfigRootDir: string): Linter.Config[] {
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
    ...nextfriday.configs.sonarjs,
    ...nextfriday.configs.unicorn,
    {
      plugins: {
        turbo: turboPlugin,
      },
      rules: {
        "turbo/no-undeclared-env-vars": "warn",
      },
    },
    {
      ignores: ["dist/**", "coverage/**", "**/coverage/**"],
    },
  ] as Linter.Config[];
}

export { createConfig };
