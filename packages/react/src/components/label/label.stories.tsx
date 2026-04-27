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
        "Text size of the label on a `sqrt(phi) ≈ 1.272` ratio so adjacent sizes clear the perceptual JND threshold. **sm** (text-xs) — dense forms, secondary labels below subtle inputs, table cell headers. **md** (text-base, default) — standard form fields paired with Input md and most product UIs. **lg** (text-xl) — emphasized labels above hero forms, settings sections, or primary onboarding inputs. Use md as the default product form label, sm in dense table or filter UIs, lg when the label sits above a single hero input.",
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
        "Font weight controlling label emphasis. **normal** (400) — subtle labels for secondary forms or dense table headers. **medium** (500, default) — standard form-field emphasis, the canonical product label. **semibold** (600) — strong emphasis for section headings or grouped legend titles inside FieldSet. Use medium for most labels, normal in dense data UIs where the label is informational, semibold when the label doubles as a section heading.",
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
        category: "Children",
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

const Default: Story = {};

const Required: Story = {
  args: {
    children: "Required Label",
    isRequired: true,
  },
};

const Optional: Story = {
  args: {
    children: "Optional Label",
    optionalMessage: "(Optional)",
  },
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Label {...args} size="sm">
        Small Label
      </Label>

      <Label {...args} size="md">
        Medium Label
      </Label>

      <Label {...args} size="lg">
        Large Label
      </Label>
    </>
  ),
};

const Weights: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Label {...args} weight="normal">
        Normal (400)
      </Label>

      <Label {...args} weight="medium">
        Medium (500)
      </Label>

      <Label {...args} weight="semibold">
        Semibold (600)
      </Label>
    </>
  ),
};

const Invalid: Story = {
  args: {
    children: "Invalid Label",
    isInvalid: true,
  },
};

const Disabled: Story = {
  args: {
    children: "Disabled Label",
    isDisabled: true,
  },
};

export { Default, Sizes, Weights, Required, Optional, Invalid, Disabled };

export default meta;
