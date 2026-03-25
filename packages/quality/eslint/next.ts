import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
import nextfriday from "eslint-plugin-nextfriday";
import { createConfig } from "./base";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 */
export function createNextJsConfig(tsconfigRootDir: string) {
  return [
    ...createConfig(tsconfigRootDir),
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    nextfriday.configs["nextjs/recommended"],
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
    {
      ...pluginReact.configs.flat?.recommended,
      languageOptions: {
        ...pluginReact.configs.flat?.recommended?.languageOptions,
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
      settings: { react: { version: "detect" } },
      rules: {
        ...pluginReactHooks.configs.recommended.rules,
        "react/react-in-jsx-scope": "off",
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
  ];
}
