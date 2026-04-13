import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const plugins = [react()];

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
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "src/**/*Test.{ts,tsx}"],
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: [
        [
          "json",
          {
            file: "../coverage.json",
          },
        ],
        "lcov",
      ],
    },
  },
});
