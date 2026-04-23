import type { Meta, StoryObj } from "@storybook/react";

import { Description } from "./Description";

const meta = {
  title: "Components/Description",
  component: Description,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Description",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Description content",
      type: {
        name: "other",
        value: "ReactNode",
        required: true,
      },
      table: {
        type: { summary: "ReactNode" },
        category: "Children",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Text size of the description. **sm** (text-xs) — dense forms or secondary helpers. **md** (text-sm, default) — standard form fields. **lg** (text-base) — emphasized or large form sections.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Dims the description and disables pointer events",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
  },
} satisfies Meta<typeof Description>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Description {...args} size="sm">
        Small Description
      </Description>

      <Description {...args} size="md">
        Medium Description
      </Description>

      <Description {...args} size="lg">
        Large Description
      </Description>
    </>
  ),
};

const Disabled: Story = {
  args: {
    children: "Disabled Description",
    isDisabled: true,
  },
};

export { Default, Sizes, Disabled };

export default meta;
