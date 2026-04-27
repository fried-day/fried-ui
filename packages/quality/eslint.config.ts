import type { Linter } from "eslint";
import { createConfig } from "./eslint/base";

const config: Linter.Config[] = createConfig(import.meta.dirname);

export default config;
