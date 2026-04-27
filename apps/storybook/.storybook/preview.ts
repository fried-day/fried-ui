import "./styles.css";

import type { Preview } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

import { formatSource } from "./format-source";

const preview: Preview = {
  parameters: {
    a11y: {
      test: "todo",
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      },
    },
    backgrounds: {
      default: "light",
      options: {
        light: {
          name: "light",
          value: "var(--color-background, #fff)",
        },
        dark: {
          name: "dark",
          value: "var(--color-background, #000)",
        },
      },
    },
    docs: {
      codePanel: true,
      source: {
        type: "dynamic",
        transform: formatSource,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  decorators: [
    (Story, context) => {
      const bg = context.globals?.backgrounds?.value;
      const isDark = bg?.includes("dark") || bg?.includes("000");
      const theme = isDark ? "dark" : "light";

      document.documentElement.dataset.theme = theme;

      return Story();
    },
  ],
};

export default preview;
