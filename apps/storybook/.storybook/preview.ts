import type { Preview } from "@storybook/react";

import "./styles.css";

const preview: Preview = {
  parameters: {
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
        type: "code",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const bg = context.globals?.backgrounds?.value;
      const isDark = bg?.includes("dark") || bg?.includes("000");
      const theme = isDark ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", theme);

      return Story();
    },
  ],
};

export default preview;
