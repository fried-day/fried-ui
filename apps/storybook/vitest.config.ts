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
