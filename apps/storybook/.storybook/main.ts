import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../../../packages/react/src/**/*.stories.@(ts|tsx)", "../../../packages/react/src/**/*Stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(config) {
    config.plugins = [...(config.plugins || []), tailwindcss()];
    return config;
  },
};

export default config;
