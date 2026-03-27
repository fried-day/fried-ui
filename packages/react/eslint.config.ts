import { createReactConfig } from "@repo/quality/eslint/react-internal";

export default [
  ...createReactConfig(import.meta.dirname),
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "nextfriday/no-relative-imports": "off",
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "nextfriday/jsx-pascal-case": "off",
    },
  },
  {
    files: ["src/components/**/*.stories.tsx"],
    rules: {
      "nextfriday/enforce-constant-case": "off",
    },
  },
];
