/** @type {import("lint-staged").Config} */
const config = {
  "*.{ts,tsx,js,jsx,mjs}": ["prettier --write", "eslint --fix"],
  "package.json": ["sort-package-json", "prettier --write"],
  "*.{css,md,mdx}": ["prettier --write"],
};

export default config;
