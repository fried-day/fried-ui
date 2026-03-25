import react from "@vitejs/plugin-react";
import { defineProject, mergeConfig } from "vitest/config";

import { baseConfig } from "./base";

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["@fried-ui/vitest/setup"],
      include: ["src/**/*.test.{ts,tsx}"],
    },
  }),
);
