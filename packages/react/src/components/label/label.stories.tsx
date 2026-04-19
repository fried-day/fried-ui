import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Label",
    size: "md",
    weight: "medium",
    isRequired: false,
    isInvalid: false,
    isDisabled: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Label content",
      table: {
        type: { summary: "ReactNode" },
        category: "Children",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Text size of the label. **sm** (text-xs) — dense forms or secondary labels. **md** (text-sm, default) — standard form fields. **lg** (text-base) — emphasized or large form sections.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold"],
      description:
        "Font weight. **normal** (400) — subtle labels. **medium** (500, default) — standard emphasis. **semibold** (600) — strong emphasis for section headings.",
      table: {
        type: { summary: '"normal" | "medium" | "semibold"' },
        defaultValue: { summary: "medium" },
        category: "Style Variants",
      },
    },
    isRequired: {
      control: "boolean",
      description: "Shows red asterisk to indicate required field",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isInvalid: {
      control: "boolean",
      description: "Error state — label text in danger color",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Dims the label and disables pointer events",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    htmlFor: {
      control: "text",
      description: "ID of the form field this label is associated with",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    optionalMessage: {
      control: "text",
      description:
        "Optional text shown in muted gray when field is NOT required (e.g. '(Optional)'). Ignored when `isRequired` is true.",
      table: {
        type: { summary: "string" },
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
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@fried-ui/react";

const Basic = () => {
  return <Label>Label</Label>;
};`,
      },
    },
  },
};

const Required: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@fried-ui/react";

const Required = () => {
  return <Label isRequired>Required Label</Label>;
};`,
      },
    },
  },
  args: {
    children: "Required Label",
    isRequired: true,
  },
};

const Optional: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@fried-ui/react";

const Optional = () => {
  return <Label optionalMessage="(Optional)">Optional Label</Label>;
};`,
      },
    },
  },
  args: {
    children: "Optional Label",
    optionalMessage: "(Optional)",
  },
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-center gap-8">
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-8">
      <Label {...args} size="sm">
        Small Label
      </Label>

      <Label {...args} size="md">
        Medium Label
      </Label>

      <Label {...args} size="lg">
        Large Label
      </Label>
    </div>
  ),
};

const Weights: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@fried-ui/react";

const Weights = () => {
  return (
    <div className="flex gap-8">
      <Label weight="normal">Normal (400)</Label>
      <Label weight="medium">Medium (500)</Label>
      <Label weight="semibold">Semibold (600)</Label>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex gap-8">
      <Label {...args} weight="normal">
        Normal (400)
      </Label>

      <Label {...args} weight="medium">
        Medium (500)
      </Label>

      <Label {...args} weight="semibold">
        Semibold (600)
      </Label>
    </div>
  ),
};

const Invalid: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@fried-ui/react";

const Invalid = () => {
  return <Label isInvalid>Invalid Label</Label>;
};`,
      },
    },
  },
  args: {
    children: "Invalid Label",
    isInvalid: true,
  },
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@fried-ui/react";

const Disabled = () => {
  return <Label isDisabled>Disabled Label</Label>;
};`,
      },
    },
  },
  args: {
    children: "Disabled Label",
    isDisabled: true,
  },
};

export { Default, Required, Optional, Invalid, Disabled, Sizes, Weights };

export default meta;
