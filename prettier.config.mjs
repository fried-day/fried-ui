/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "apps/docs/src/app/globals.css",
  tailwindAttributes: ["className", "classNames"],
  tailwindFunctions: ["tv", "clsx", "cn"],
};

export default config;
