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
    children: "We'll never share your email with anyone else.",
    size: "md",
    isInvalid: false,
    isDisabled: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Description content",
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
    isInvalid: {
      control: "boolean",
      description: "Error state — description text in danger color (use for error messages)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Description } from "@fried-ui/react";

const Basic = () => {
  return <Description>We'll never share your email with anyone else.</Description>;
};`,
      },
    },
  },
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Description } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-center gap-8">
      <Description size="sm">Small helper text</Description>
      <Description size="md">Medium helper text</Description>
      <Description size="lg">Large helper text</Description>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-8">
      <Description {...args} size="sm">
        Small helper text
      </Description>

      <Description {...args} size="md">
        Medium helper text
      </Description>

      <Description {...args} size="lg">
        Large helper text
      </Description>
    </div>
  ),
};

const Invalid: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Description } from "@fried-ui/react";

const Invalid = () => {
  return <Description isInvalid>Email format is invalid</Description>;
};`,
      },
    },
  },
  args: {
    children: "Email format is invalid",
    isInvalid: true,
  },
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Description } from "@fried-ui/react";

const Disabled = () => {
  return <Description isDisabled>This field is currently unavailable</Description>;
};`,
      },
    },
  },
  args: {
    children: "This field is currently unavailable",
    isDisabled: true,
  },
};

export { Default, Sizes, Invalid, Disabled };

export default meta;
