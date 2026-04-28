import type { Linter } from "eslint";
import { createConfig } from "./base";

const config: Linter.Config[] = createConfig(import.meta.dirname);

export default config;
