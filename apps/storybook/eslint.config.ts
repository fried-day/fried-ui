import { createReactConfig } from "@repo/quality/eslint/react-internal";

export default [
  ...createReactConfig(import.meta.dirname),
  {
    files: [".storybook/**/*.ts"],
    rules: {
      "nextfriday/no-relative-imports": "off",
      "nextfriday/enforce-constant-case": "off",
    },
  },
];
