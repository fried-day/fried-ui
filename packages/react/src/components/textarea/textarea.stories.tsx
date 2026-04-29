import type { Meta, StoryObj } from "@storybook/react";

import { CLASS_NAME_ARG_TYPE } from "../../storybook/argtypes";

import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Implementation/Textarea",
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
        category: "Children",
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "overlay"],
      description:
        "Visual style of the textarea field. **primary** (default) — bordered white field for standard forms. **secondary** — filled muted background with no border, works well inside cards or grouped panels. **overlay** — light field on dark media or scrim, for textareas placed over images or dark backgrounds. Use primary for main forms, secondary for nested fields inside cards, overlay on dark or media contexts.",
      table: {
        type: { summary: '"primary" | "secondary" | "overlay"' },
        defaultValue: { summary: "primary" },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Size scale anchored at the form-aligned tier (md = text-base, the formula's `x = 1em` root). Geometry scales via em formulas — padding recomputes proportionally per tier; only font-size shifts across tiers. **sm** (text-sm) — inline comments, table cells, compact admin forms. **md** (text-base, default) — standard composition fields, post bodies, comment boxes. **lg** (text-lg) — hero composition areas like message editors and long-form drafts. Use sm for dense comment threads, md for standard product textareas, lg for editor-class composition where the textarea is the primary surface.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "full"],
      description:
        "Border radius scale of the textarea. Fixed-px tokens independent of font-size. **none** — sharp corners for data tables and admin UIs. **xs** (2px) — micro softening for tight admin chrome. **sm** (4px) — subtle rounding for tight nested forms. **md** (6px, default) — standard textarea. **lg** (8px) — emphasized soft corners for hero composition areas. **full** — pill shape, rare for textarea since most textareas are multi-line. Use md as the default, lg for editor-style composition, none inside data dashboards or admin UIs.",
      table: {
        type: { summary: '"none" | "xs" | "sm" | "md" | "lg" | "full"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description:
        "Resize behavior via native CSS `resize`. **none** — fixed size, common for chat input boxes and command bars. **vertical** (default) — user drags the bottom-right corner to grow height, the canonical product textarea. **horizontal** — width only, rare and usually unhelpful. **both** — both axes, useful for drafting tools and design surfaces. Use vertical for most forms, none for fixed-height controls like chat composers.",
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
    className: CLASS_NAME_ARG_TYPE,
  },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Textarea variant="primary" placeholder="Primary" {...args} />
      <Textarea variant="secondary" placeholder="Secondary" {...args} />
    </div>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-600 to-blue-600 p-16">
      <Textarea variant="overlay" placeholder="Overlay" {...args} />
    </div>
  ),
};

const Sizes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
    </div>
  ),
};

const Radius: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Textarea radius="none" placeholder="None" />
      <Textarea radius="xs" placeholder="Extra Small" />
      <Textarea radius="sm" placeholder="Small" />
      <Textarea radius="md" placeholder="Medium" />
      <Textarea radius="lg" placeholder="Large" />
    </div>
  ),
};

const Resize: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Textarea resize="none" placeholder="No resize" />
      <Textarea resize="vertical" placeholder="Vertical" />
      <Textarea resize="horizontal" placeholder="Horizontal" />
      <Textarea resize="both" placeholder="Both" />
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
};

export { Default, Variants, OverlayVariant, Sizes, Radius, Resize, Invalid, Disabled, ReadOnly, Required, FullWidth };

export default meta;
