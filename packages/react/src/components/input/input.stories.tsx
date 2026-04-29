import type { Meta, StoryObj } from "@storybook/react";

import { CLASS_NAME_ARG_TYPE } from "../../storybook/argtypes";

import { Input } from "./Input";

const meta = {
  title: "Components/Implementation/Input",
  component: Input,
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
      description: "Placeholder text shown when input is empty",
      table: {
        type: { summary: "string" },
        category: "Children",
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "overlay"],
      description:
        "Visual style of the input field. **primary** (default) — bordered white field for standard forms. **secondary** — filled muted background with no border, works well inside cards or grouped panels. **overlay** — light field on dark media or scrim, for inputs placed over images or dark backgrounds. Use primary for main forms, secondary for nested inputs inside cards, overlay on dark or media contexts.",
      table: {
        type: { summary: '"primary" | "secondary" | "overlay"' },
        defaultValue: { summary: "primary" },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description:
        "Size scale anchored at md (text-base = formula root x = 1em = 1rem). Heights snap to the gold token grid (28 / 32 / 36 / 40 / 45 px). **xs** (28px, text-xs) — micro filter chips inside dense data tables. **sm** (32px, text-sm) — inline filters, table cells, compact admin forms. **md** (36px, text-base, default) — standard form fields, paired with Button md. **lg** (40px, text-lg) — hero search, single-input pages where the input is the primary action and must read at a distance. **xl** (45px, text-xl) — display search bars on marketing landing pages. Use sm for dense UI, md for most forms, lg/xl for emphasized single-input pages.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "full"],
      description:
        "Border radius scale of the input. Fixed-px tokens independent of font-size so inputs align with peer surfaces (Button, Card) by absolute radius across size tiers. **none** — sharp corners for data tables and admin forms. **xs** (2px) — micro softening for tight admin chrome. **sm** (4px) — subtle rounding for tight UIs. **md** (6px, default) — standard form input. **lg** (8px) — emphasized soft corners for hero forms and primary single-input pages. **full** — pill shape, the canonical search-bar look. Use md as the default form input, full for search-bar contexts, none when inputs sit flush inside table rows.",
      table: {
        type: { summary: '"none" | "xs" | "sm" | "md" | "lg" | "full"' },
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
    className: CLASS_NAME_ARG_TYPE,
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Input variant="primary" placeholder="Primary" {...args} />
      <Input variant="secondary" placeholder="Secondary" {...args} />
    </div>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 to-blue-600 p-16">
      <Input variant="overlay" placeholder="Overlay" {...args} />
    </div>
  ),
};

const Sizes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

const Radius: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Input radius="none" placeholder="None" />
      <Input radius="xs" placeholder="Extra Small" />
      <Input radius="sm" placeholder="Small" />
      <Input radius="md" placeholder="Medium" />
      <Input radius="lg" placeholder="Large" />
      <Input radius="full" placeholder="Full" />
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
    defaultValue: "Read-only value",
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
};

export { Default, Variants, OverlayVariant, Sizes, Radius, Invalid, Disabled, ReadOnly, Required, FullWidth };

export default meta;
