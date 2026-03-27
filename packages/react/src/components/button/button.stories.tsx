import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary"],
    },
    size: {
      control: "select",
      options: ["md"],
    },
    isDisabled: {
      control: "boolean",
    },
    isPending: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PRIMARY: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const DISABLED: Story = {
  args: {
    children: "Disabled",
    isDisabled: true,
  },
};

export const PENDING: Story = {
  args: {
    children: "Saving...",
    isPending: true,
  },
};
