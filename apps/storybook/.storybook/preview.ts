import type { Preview } from "@storybook/react";
import "./styles.css";

const PREVIEW: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default PREVIEW;
