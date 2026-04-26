import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./Field";

const meta = {
  title: "Components/Implementation/Field",
  component: Field,
  subcomponents: {
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldSet,
    FieldLegend,
    FieldGroup,
    FieldTitle,
    FieldSeparator,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    isInvalid: false,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    isFullWidth: false,
  },
  argTypes: {
    children: {
      control: false,
      description: "Field slots — `FieldLabel`, `Input`, `FieldDescription`, `FieldError` (or any combination).",
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
      options: ["xs", "sm", "md", "lg"],
      description:
        "Wrapper gap scale between stacked slots — FieldLabel, Input, FieldDescription, and FieldError. **xs** (ultra-dense, gap-1) — pro-tool grid cells where label and input must hug. **sm** (dense, gap-1.5) — table cells, inline filters, compact admin forms. **md** (default, gap-1.5) — standard product forms. **lg** (generous, gap-2) — hero onboarding flows and marketing forms. Child slots keep their own typography via their individual `size` prop, so Field's size only controls the vertical rhythm between slots, not the size of the inputs themselves.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
      description:
        "Layout direction of children. **vertical** (default) stacks slots top-to-bottom — the canonical form layout. **horizontal** lays out inline — designed for checkbox or radio rows where the label sits beside the control. **responsive** stacks on mobile (below md) and switches to inline on md and above — useful for settings rows that compact gracefully on phones. Use vertical for most forms, horizontal for boolean rows, responsive for settings pages where each row is one logical field but should adapt to viewport.",
      table: {
        type: { summary: '"vertical" | "horizontal" | "responsive"' },
        defaultValue: { summary: "vertical" },
        category: "Style Variants",
      },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "search", "number"],
      description:
        "HTML input type attribute forwarded to the underlying `Input` element. **Text:** text (default, free-form), email (mobile email keyboard with `@` validation), password (masked, autofill grouping), tel (phone keypad on mobile), url (URL keyboard with `.com` shortcut), search (rendered with native clear icon). **Numeric:** number (numeric keypad and validation hints). The type drives the on-screen keyboard, autofill grouping, and browser validation. Use email, tel, or number for mobile-friendly forms; search for command palettes; password for credentials.",
      table: {
        type: { summary: '"text" | "email" | "password" | "tel" | "url" | "search" | "number"' },
        defaultValue: { summary: "text" },
        category: "Children",
      },
    },
    isInvalid: {
      control: "boolean",
      description: "Whether the field is in error state (enables FieldError rendering)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the field is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "Whether the field is read-only",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isRequired: {
      control: "boolean",
      description: "Whether the field is required for form submission",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isFullWidth: {
      control: "boolean",
      description: "Whether the field stretches to fill its container width",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes on the wrapper",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
  },
} satisfies Meta<typeof Field>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel optionalMessage="(Optional)">Full name</FieldLabel>
      <Input placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
  ),
};

const Required: Story = {
  args: {
    isRequired: true,
  },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
};

const Invalid: Story = {
  args: {
    isInvalid: true,
  },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  ),
};

const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel>Disabled field</FieldLabel>
      <Input placeholder="Cannot edit" />
    </Field>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Field {...args} size="xs">
        <FieldLabel size="xs">Extra Small</FieldLabel>
        <Input size="xs" placeholder="Type here" />
      </Field>

      <Field {...args} size="sm">
        <FieldLabel size="sm">Small</FieldLabel>
        <Input size="sm" placeholder="Type here" />
      </Field>

      <Field {...args} size="md">
        <FieldLabel size="md">Medium</FieldLabel>
        <Input size="md" placeholder="Type here" />
      </Field>

      <Field {...args} size="lg">
        <FieldLabel size="lg">Large</FieldLabel>
        <Input size="lg" placeholder="Type here" />
      </Field>
    </>
  ),
};

const FullWidth: Story = {
  args: {
    isFullWidth: true,
  },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel>Field label</FieldLabel>
      <Input placeholder="Full width" />
    </Field>
  ),
};

const WithFieldSet: Story = {
  render: (args): React.JSX.Element => (
    <FieldSet variant="bordered">
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>Basic information that appears on your profile.</FieldDescription>

      <FieldGroup>
        <Field {...args}>
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="Evil" />
        </Field>

        <Field {...args}>
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Rabbit" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

const WithSeparator: Story = {
  render: (args): React.JSX.Element => (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Payment</FieldLegend>

        <Field {...args}>
          <FieldLabel>Card number</FieldLabel>
          <Input placeholder="1234 5678 9012 3456" />
        </Field>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Billing</FieldLegend>

        <Field {...args}>
          <FieldLabel>Address</FieldLabel>
          <Input placeholder="123 Main St" />
        </Field>
      </FieldSet>
    </FieldGroup>
  ),
};

const WithTitle: Story = {
  render: (args): React.JSX.Element => (
    <FieldGroup>
      <FieldTitle as="h3">Account</FieldTitle>
      <FieldDescription>Manage your account settings.</FieldDescription>

      <Field {...args}>
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="evilrabbit" />
      </Field>
    </FieldGroup>
  ),
};

export { Default, Sizes, Required, Invalid, Disabled, FullWidth, WithFieldSet, WithSeparator, WithTitle };

export default meta;
