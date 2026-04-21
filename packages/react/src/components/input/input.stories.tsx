import type { Meta, StoryObj } from "@storybook/react";

import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, LockIcon, XCircleIcon } from "../icons";
import { Surface } from "../surface";
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
    isInvalid: false,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    isPending: false,
    isFullWidth: false,
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
    startIcon: {
      control: false,
      description: "Icon rendered at the leading edge of the input",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
    endIcon: {
      control: false,
      description: "Icon rendered at the trailing edge of the input",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
    prefix: {
      control: "text",
      description: "Text rendered before the input value (e.g. '$')",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
    suffix: {
      control: "text",
      description: "Text rendered after the input value (e.g. '.com')",
      table: {
        type: { summary: "ReactNode" },
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
    isInvalid: {
      control: "boolean",
      description: "Whether the input is in error state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "Whether the input is read-only",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isRequired: {
      control: "boolean",
      description: "Whether the input is required for form submission",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isPending: {
      control: "boolean",
      description: "Whether the input is in a loading state (shows spinner, read-only)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
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
    </div>
  ),
};

const PlainVariant: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input, Surface } from "@fried-ui/react";

const PlainVariant = () => {
  return (
    <Surface variant="default" radius="lg" className="p-6">
      <Input variant="plain" placeholder="Search anything" />
    </Surface>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Surface variant="default" radius="lg" className="p-6">
      <Input {...args} variant="plain" placeholder="Search anything" />
    </Surface>
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

const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input, CheckCircleIcon, InformationCircleIcon, LockIcon, XCircleIcon } from "@fried-ui/react";

const WithIcon = () => {
  return (
    <div className="flex items-center gap-4">
      <Input placeholder="Leading icon" startIcon={<InformationCircleIcon />} />
      <Input placeholder="Trailing icon" endIcon={<CheckCircleIcon />} />
      <Input placeholder="Both icons" startIcon={<LockIcon />} endIcon={<XCircleIcon />} />
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <Input {...args} placeholder="Leading icon" startIcon={<InformationCircleIcon />} />
      <Input {...args} placeholder="Trailing icon" endIcon={<CheckCircleIcon />} />
      <Input {...args} placeholder="Both icons" startIcon={<LockIcon />} endIcon={<XCircleIcon />} />
    </div>
  ),
};

const PrefixSuffix: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const PrefixSuffix = () => {
  return (
    <div className="flex items-center gap-4">
      <Input prefix="$" placeholder="0.00" />
      <Input suffix=".com" placeholder="example" />
      <Input prefix="Path" placeholder="src/app" />
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <Input {...args} prefix="$" placeholder="0.00" />
      <Input {...args} suffix=".com" placeholder="example" />
      <Input {...args} prefix="Path" placeholder="src/app" />
    </div>
  ),
};

const Invalid: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input, ExclamationTriangleIcon, XCircleIcon } from "@fried-ui/react";

const Invalid = () => {
  return (
    <Input
      isInvalid
      placeholder="Invalid value"
      startIcon={<ExclamationTriangleIcon />}
      endIcon={<XCircleIcon />}
    />
  );
};`,
      },
    },
  },
  args: {
    isInvalid: true,
    placeholder: "Invalid value",
  },
  render: (args): React.JSX.Element => (
    <Input {...args} startIcon={<ExclamationTriangleIcon />} endIcon={<XCircleIcon />} />
  ),
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Disabled = () => {
  return <Input isDisabled placeholder="Disabled" />;
};`,
      },
    },
  },
  args: {
    isDisabled: true,
    placeholder: "Disabled",
  },
};

const ReadOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const ReadOnly = () => {
  return <Input isReadOnly defaultValue="Read-only value" />;
};`,
      },
    },
  },
  args: {
    isReadOnly: true,
    defaultValue: "Read-only value",
  },
};

const Required: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input, LockIcon } from "@fried-ui/react";

const Required = () => {
  return <Input isRequired placeholder="Required field" startIcon={<LockIcon />} />;
};`,
      },
    },
  },
  args: {
    isRequired: true,
    placeholder: "Required field",
  },
  render: (args): React.JSX.Element => <Input {...args} startIcon={<LockIcon />} />,
};

const Pending: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@fried-ui/react";

const Pending = () => {
  return <Input isPending defaultValue="Validating" />;
};`,
      },
    },
  },
  args: {
    isPending: true,
    defaultValue: "Validating",
  },
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

export {
  Default,
  Variants,
  PlainVariant,
  Sizes,
  Radius,
  WithIcon,
  PrefixSuffix,
  Invalid,
  Disabled,
  ReadOnly,
  Required,
  Pending,
  FullWidth,
};

export default meta;
