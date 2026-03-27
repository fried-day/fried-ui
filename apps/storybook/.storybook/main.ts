import path from "node:path";

import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const reactPkg = path.resolve(import.meta.dirname, "../../../packages/react");

const config: StorybookConfig = {
  stories: ["../../../packages/react/src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",

  viteFinal(config) {
    config.plugins = [...(config.plugins || []), tailwindcss()];

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        src: path.join(reactPkg, "src"),
      },
    };

    return config;
  },

  addons: ["@storybook/addon-docs"],
};

export default config;
