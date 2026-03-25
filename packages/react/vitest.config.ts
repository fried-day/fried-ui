import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const plugins = [react()];

const JSON_REPORTER = [
  "json",
  {
    file: "../coverage.json",
  },
] as const;

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      src: path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["@fried-ui/vitest/setup"],
    include: ["src/**/*.test.{ts,tsx}", "src/**/*Test.{ts,tsx}"],
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: [JSON_REPORTER],
    },
  },
});
