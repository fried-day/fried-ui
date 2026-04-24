import { createReactConfig } from "@repo/quality/eslint/react-internal";

export default [
  ...createReactConfig(import.meta.dirname),
  {
    ignores: ["scripts/**"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "nextfriday/no-relative-imports": "off",
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}", "src/tests/**/*.{ts,tsx}"],
    rules: {
      "nextfriday/jsx-pascal-case": "off",
    },
  },
  {
    files: ["src/tests/globals.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    files: ["src/components/**/*.stories.tsx"],
    rules: {
      "nextfriday/enforce-constant-case": "off",
    },
  },
  {
    files: ["src/components/**/*-context.ts"],
    rules: {
      "nextfriday/enforce-camel-case": "off",
    },
  },
  {
    files: ["src/components/field/Field.tsx"],
    rules: {
      "nextfriday/prefer-import-type": "off",
    },
  },
];
