import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible button component built on React Aria. Supports semantic variants, golden-ratio spacing, and pending state with spinner.",
      },
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
      table: {
        type: {
          summary: "ReactNode",
        },
        category: "Content",
      },
    },
    variant: {
      control: "select",
      options: ["primary"],
      description: "Visual style variant",
      table: {
        type: {
          summary: '"primary"',
        },
        defaultValue: {
          summary: '"primary"',
        },
        category: "Style",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
      table: {
        type: {
          summary: '"sm" | "md" | "lg"',
        },
        defaultValue: {
          summary: '"md"',
        },
        category: "Style",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "State",
      },
    },
    isPending: {
      control: "boolean",
      description: "Whether the button shows a loading spinner",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "State",
      },
    },
    onPress: {
      control: false,
      description: "Handler called when the button is pressed",
      table: {
        type: {
          summary: "(e: PressEvent) => void",
        },
        category: "Events",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: {
          summary: "string",
        },
        category: "Styling",
      },
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    children: "Button",
  },
  render: (args) => <Button {...args} />,
};

const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-x-4">
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </div>
  ),
};

export { Default, Sizes };

export default meta;
