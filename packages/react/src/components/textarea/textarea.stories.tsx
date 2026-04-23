import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type here",
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when textarea is empty",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "plain"],
      description:
        "Visual style. **primary** (default) — bordered white field for standard forms. **secondary** — filled muted background, no border, works well inside cards. **plain** — transparent, no chrome, designed for composition inside Surface/Card. Use primary for main forms, secondary for nested fields, plain inside Surface containers.",
      table: {
        type: { summary: '"primary" | "secondary" | "plain"' },
        defaultValue: { summary: "primary" },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Size scale. **sm** (text-xs, dense) — inline comments, table cells. **md** (text-sm, default) — standard form fields. **lg** (text-base, emphasized) — hero composition areas.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description:
        "Border radius scale. **none** — sharp corners. **sm** — subtle rounding. **md** (default) — standard. **lg** — emphasized. **full** — pill (rare for textarea).",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "full"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description:
        "Resize behavior via native CSS `resize`. **none** — fixed size (common for chat boxes). **vertical** (default) — user drags bottom-right to grow height. **horizontal** — width only (rare). **both** — both axes (drafting). Use vertical for most forms, none for fixed-height controls.",
      table: {
        type: { summary: '"none" | "vertical" | "horizontal" | "both"' },
        defaultValue: { summary: "vertical" },
        category: "Style Variants",
      },
    },
    isFullWidth: {
      control: "boolean",
      description: "Whether the textarea stretches to fill its container width",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    disabled: {
      control: "boolean",
      description: "Native HTML `disabled` attribute. Dims the textarea and removes pointer events.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    readOnly: {
      control: "boolean",
      description: "Native HTML `readOnly` attribute. Value is selectable but not editable.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    required: {
      control: "boolean",
      description: "Native HTML `required` attribute. Signals required-field semantics.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    "aria-invalid": {
      control: "boolean",
      description:
        "ARIA `aria-invalid` attribute. Activates error styling (red border + danger ring on focus). Pair with sibling `FieldError`.",
      table: {
        type: { summary: '"true" | "false" | boolean' },
        defaultValue: { summary: "false" },
        category: "State",
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
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex items-start gap-4">
      <Textarea {...args} variant="primary" placeholder="Primary" />
      <Textarea {...args} variant="secondary" placeholder="Secondary" />
      <Textarea {...args} variant="plain" placeholder="Plain" />
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex items-start gap-4">
      <Textarea {...args} size="sm" placeholder="Small" />
      <Textarea {...args} size="md" placeholder="Medium" />
      <Textarea {...args} size="lg" placeholder="Large" />
    </div>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex items-start gap-4">
      <Textarea {...args} radius="none" placeholder="None" />
      <Textarea {...args} radius="sm" placeholder="Small" />
      <Textarea {...args} radius="md" placeholder="Medium" />
      <Textarea {...args} radius="lg" placeholder="Large" />
    </div>
  ),
};

const Resize: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex items-start gap-4">
      <Textarea {...args} resize="none" placeholder="No resize" />
      <Textarea {...args} resize="vertical" placeholder="Vertical" />
      <Textarea {...args} resize="horizontal" placeholder="Horizontal" />
      <Textarea {...args} resize="both" placeholder="Both" />
    </div>
  ),
};

const Invalid: Story = {
  args: {
    placeholder: "Invalid value",
    "aria-invalid": "true",
  },
};

const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};

const ReadOnly: Story = {
  args: {
    defaultValue: "Read-only content",
    readOnly: true,
  },
};

const Required: Story = {
  args: {
    placeholder: "Required field",
    required: true,
  },
};

const FullWidth: Story = {
  args: {
    isFullWidth: true,
    placeholder: "Full width",
  },
  render: (args): React.JSX.Element => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export { Default, Variants, Sizes, Radius, Resize, Invalid, Disabled, ReadOnly, Required, FullWidth };

export default meta;
