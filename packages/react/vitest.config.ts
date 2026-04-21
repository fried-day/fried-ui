import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/test-setup.ts"],
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
