/** @type {import("lint-staged").Config} */
const CONFIG = {
  "*.{css,md,mdx}": ["prettier --write"],
  "*.{ts,tsx,js,jsx,mjs}": ["prettier --write", "eslint --fix"],
  "package.json": ["sort-package-json", "prettier --write"],
};

export default CONFIG;
