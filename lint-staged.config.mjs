/** @type {import("lint-staged").Config} */
const config = {
  "*.{ts,tsx,js,jsx,mjs}": ["prettier --write", "eslint --fix"],
  "*.{json,css,md,mdx}": ["prettier --write"],
};

export default config;
