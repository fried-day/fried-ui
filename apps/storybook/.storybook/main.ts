import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../../../packages/react/src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",

  viteFinal(config) {
    config.plugins = [...(config.plugins || []), tailwindcss()];

    return config;
  },

  addons: ["@storybook/addon-docs"],
};

export default config;
