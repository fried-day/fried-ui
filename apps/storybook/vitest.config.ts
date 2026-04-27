import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      include: [path.resolve(here, "../../packages/react/src/**/*.{ts,tsx}")],
      exclude: [
        path.resolve(here, "../../packages/react/src/**/*.stories.tsx"),
        path.resolve(here, "../../packages/react/src/**/*.test.{ts,tsx}"),
        "**/*.d.ts",
      ],
      allowExternal: true,
    },
  },
  plugins: [
    storybookTest({
      configDir: path.join(here, ".storybook"),
      storybookScript: "pnpm dev",
      tags: {
        include: ["autodocs", "test"],
        exclude: [],
        skip: [],
      },
    }),
  ],
});
