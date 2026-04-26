import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../../../packages/react/src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      include: ["../../packages/react/src/**/*.tsx"],
      tsconfigPath: "../../packages/react/tsconfig.json",
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },

  viteFinal(config) {
    config.plugins = [...(config.plugins || []), tailwindcss()];

    return config;
  },

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest", "@chromatic-com/storybook"],
};

export default config;
