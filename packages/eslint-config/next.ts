import eslintConfigPrettier from "eslint-config-prettier";
import eslintReact from "@eslint-react/eslint-plugin";
import globals from "globals";
import js from "@eslint/js";
import nextfriday from "eslint-plugin-nextfriday";
import pluginNext from "@next/eslint-plugin-next";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import { createConfig } from "./base";
import type { Linter } from "eslint";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 */
function createNextJsConfig(tsconfigRootDir: string): Linter.Config[] {
  return [
    ...createConfig(tsconfigRootDir),
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    nextfriday.configs["nextjs/recommended"],
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
    eslintReact.configs["recommended-typescript"],
    {
      languageOptions: {
        globals: {
          ...globals.serviceworker,
        },
      },
    },
    {
      plugins: {
        "@next/next": pluginNext,
      },
      rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs["core-web-vitals"].rules,
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
    {
      files: [
        "**/app/**/layout.tsx",
        "**/app/**/page.tsx",
        "**/app/**/loading.tsx",
        "**/app/**/error.tsx",
        "**/app/**/not-found.tsx",
        "**/app/**/template.tsx",
        "**/app/**/default.tsx",
        "**/app/**/route.ts",
        "**/app/**/opengraph-image.tsx",
        "**/app/**/sitemap.ts",
        "**/app/**/robots.ts",
      ],
      rules: {
        "nextfriday/jsx-pascal-case": "off",
        "nextfriday/enforce-constant-case": "off",
      },
    },
  ] as Linter.Config[];
}

export { createNextJsConfig };
