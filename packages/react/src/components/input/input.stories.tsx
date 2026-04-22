import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type here",
    variant: "primary",
    size: "md",
    radius: "md",
    isFullWidth: false,
    disabled: false,
    readOnly: false,
    required: false,
    "aria-invalid": false,
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when input is empty",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "plain"],
      description:
        "Visual style. **primary** (default) — bordered white field for standard forms. **secondary** — filled muted background, no border, works well inside cards. **plain** — transparent, no chrome, designed for composition inside Surface/Card (search bars, inline edit). Use primary for main forms, secondary for nested inputs, plain inside Surface containers.",
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
        "Size scale. **sm** (text-xs, dense) — inline filters, table cells, compact forms. **md** (text-sm, default) — standard form fields. **lg** (text-base, emphasized) — hero search, primary forms. Use sm for dense UI, md for most forms, lg for emphasized single-input pages.",
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
        "Border radius scale. **none** — sharp corners (data tables). **sm** — subtle rounding. **md** (default) — standard. **lg** — emphasized. **full** — pill shape (search bars).",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "full"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    isFullWidth: {
      control: "boolean",
      description: "Whether the input stretches to fill its container width",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Native HTML `disabled` attribute. Dims the input and removes pointer events. Forwarded to the underlying `<input>` element. Inside TextField, React Aria propagates this via slot context automatically.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    readOnly: {
      control: "boolean",
      description:
        "Native HTML `readOnly` attribute. Value is selectable but not editable. Forwarded to the underlying `<input>` element. Inside TextField, React Aria propagates this via slot context automatically.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    required: {
      control: "boolean",
      description:
        "Native HTML `required` attribute. Signals required-field semantics (use Label `isRequired` for the visible asterisk). Does not change the input's border or ring.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    "aria-invalid": {
      control: "boolean",
      description:
        "ARIA `aria-invalid` attribute. Activates error styling (red border + danger ring on focus). Pair with a sibling `FieldError` so the message reads out to assistive tech.",
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
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Basic = () => {
  return <Input placeholder="Type here" />;
};`,
      },
    },
  },
};

const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Variants = () => {
  return (
    <div className="flex items-center gap-4">
      <Input variant="primary" placeholder="Primary" />
      <Input variant="secondary" placeholder="Secondary" />
      <Input variant="plain" placeholder="Plain" />
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <Input {...args} variant="primary" placeholder="Primary" />
      <Input {...args} variant="secondary" placeholder="Secondary" />
      <Input {...args} variant="plain" placeholder="Plain" />
    </div>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-center gap-4">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <Input {...args} size="sm" placeholder="Small" />
      <Input {...args} size="md" placeholder="Medium" />
      <Input {...args} size="lg" placeholder="Large" />
    </div>
  ),
};

const Radius: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Radius = () => {
  return (
    <div className="flex items-center gap-4">
      <Input radius="none" placeholder="None" />
      <Input radius="sm" placeholder="Small" />
      <Input radius="md" placeholder="Medium" />
      <Input radius="lg" placeholder="Large" />
      <Input radius="full" placeholder="Full" />
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <Input {...args} radius="none" placeholder="None" />
      <Input {...args} radius="sm" placeholder="Small" />
      <Input {...args} radius="md" placeholder="Medium" />
      <Input {...args} radius="lg" placeholder="Large" />
      <Input {...args} radius="full" placeholder="Full" />
    </div>
  ),
};

const Invalid: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Invalid = () => {
  return <Input aria-invalid="true" placeholder="Invalid value" />;
};`,
      },
    },
  },
  args: {
    placeholder: "Invalid value",
  },
  render: (args): React.JSX.Element => <Input {...args} aria-invalid="true" />,
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Disabled = () => {
  return <Input disabled placeholder="Disabled" />;
};`,
      },
    },
  },
  args: {
    placeholder: "Disabled",
  },
  render: (args): React.JSX.Element => <Input {...args} disabled />,
};

const ReadOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const ReadOnly = () => {
  return <Input readOnly defaultValue="Read-only value" />;
};`,
      },
    },
  },
  args: {
    defaultValue: "Read-only value",
  },
  render: (args): React.JSX.Element => <Input {...args} readOnly />,
};

const Required: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Required = () => {
  return <Input required placeholder="Required field" />;
};`,
      },
    },
  },
  args: {
    placeholder: "Required field",
  },
  render: (args): React.JSX.Element => <Input {...args} required />,
};

const FullWidth: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const FullWidth = () => {
  return (
    <div className="w-80">
      <Input isFullWidth placeholder="Full width" />
    </div>
  );
};`,
      },
    },
  },
  args: {
    isFullWidth: true,
    placeholder: "Full width",
  },
  render: (args): React.JSX.Element => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
};

export { Default, Variants, Sizes, Radius, Invalid, Disabled, ReadOnly, Required, FullWidth };

export default meta;
