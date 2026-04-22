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
  title: "Components/Field",
  component: Field,
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
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Wrapper gap scale between stacked slots (FieldLabel, Input, FieldDescription, FieldError). **sm** (dense) — table cells, compact filters. **md** (default) — standard forms. **lg** (generous) — hero flows. Child slots keep their own typography via their individual `size` prop.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
      description:
        "Layout direction of children. **vertical** (default) stacks top-to-bottom. **horizontal** lays out inline (checkbox + label). **responsive** stacks on mobile, inline on md+.",
      table: {
        type: { summary: '"vertical" | "horizontal" | "responsive"' },
        defaultValue: { summary: "vertical" },
        category: "Style Variants",
      },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "search", "number"],
      description: "HTML input type attribute forwarded to the underlying Input element.",
      table: {
        type: { summary: '"text" | "email" | "password" | "tel" | "url" | "search" | "number"' },
        defaultValue: { summary: "text" },
        category: "Content",
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
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, FieldDescription, Input } from "@fried-ui/react";

const Basic = () => {
  return (
    <Field>
      <FieldLabel optionalMessage="(Optional)">Full name</FieldLabel>
      <Input placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel optionalMessage="(Optional)">Full name</FieldLabel>
      <Input placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
  ),
};

const Required: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, Input } from "@fried-ui/react";

const Required = () => {
  return (
    <Field isRequired>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  );
};`,
      },
    },
  },
  args: { isRequired: true },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
};

const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, FieldError, Input } from "@fried-ui/react";

const WithError = () => {
  return (
    <Field isInvalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  );
};`,
      },
    },
  },
  args: { isInvalid: true },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  ),
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, Input } from "@fried-ui/react";

const Disabled = () => {
  return (
    <Field isDisabled>
      <FieldLabel>Disabled field</FieldLabel>
      <Input placeholder="Cannot edit" />
    </Field>
  );
};`,
      },
    },
  },
  args: { isDisabled: true },
  render: (args): React.JSX.Element => (
    <Field {...args}>
      <FieldLabel>Disabled field</FieldLabel>
      <Input placeholder="Cannot edit" />
    </Field>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, Input } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <Field size="sm"><FieldLabel size="sm">Small</FieldLabel><Input size="sm" placeholder="Type here" /></Field>
      <Field size="md"><FieldLabel size="md">Medium</FieldLabel><Input size="md" placeholder="Type here" /></Field>
      <Field size="lg"><FieldLabel size="lg">Large</FieldLabel><Input size="lg" placeholder="Type here" /></Field>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
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
    </div>
  ),
};

const FullWidth: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, Input } from "@fried-ui/react";

const FullWidth = () => {
  return (
    <div className="w-96">
      <Field isFullWidth>
        <FieldLabel>Field label</FieldLabel>
        <Input placeholder="Full width" />
      </Field>
    </div>
  );
};`,
      },
    },
  },
  args: { isFullWidth: true },
  render: (args): React.JSX.Element => (
    <div className="w-96">
      <Field {...args}>
        <FieldLabel>Field label</FieldLabel>
        <Input placeholder="Full width" />
      </Field>
    </div>
  ),
};

const WithFieldSet: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, FieldSet, FieldLegend, FieldDescription, FieldGroup, Input } from "@fried-ui/react";

const WithFieldSet = () => {
  return (
    <FieldSet variant="bordered">
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>Basic information that appears on your profile.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="Evil" />
        </Field>
        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Rabbit" />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};`,
      },
    },
  },
  render: (): React.JSX.Element => (
    <FieldSet variant="bordered">
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>Basic information that appears on your profile.</FieldDescription>

      <FieldGroup>
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="Evil" />
        </Field>

        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Rabbit" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

const WithSeparator: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, FieldSeparator, FieldSet, FieldLegend, Input } from "@fried-ui/react";

const WithSeparator = () => {
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Payment</FieldLegend>
        <Field><FieldLabel>Card number</FieldLabel><Input placeholder="1234 5678 9012 3456" /></Field>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Billing</FieldLegend>
        <Field><FieldLabel>Address</FieldLabel><Input placeholder="123 Main St" /></Field>
      </FieldSet>
    </FieldGroup>
  );
};`,
      },
    },
  },
  render: (): React.JSX.Element => (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Payment</FieldLegend>

        <Field>
          <FieldLabel>Card number</FieldLabel>
          <Input placeholder="1234 5678 9012 3456" />
        </Field>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Billing</FieldLegend>

        <Field>
          <FieldLabel>Address</FieldLabel>
          <Input placeholder="123 Main St" />
        </Field>
      </FieldSet>
    </FieldGroup>
  ),
};

const WithTitle: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Field, FieldLabel, FieldTitle, FieldDescription, FieldGroup, Input } from "@fried-ui/react";

const WithTitle = () => {
  return (
    <FieldGroup>
      <FieldTitle as="h3">Account</FieldTitle>
      <FieldDescription>Manage your account settings.</FieldDescription>
      <Field>
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="evilrabbit" />
      </Field>
    </FieldGroup>
  );
};`,
      },
    },
  },
  render: (): React.JSX.Element => (
    <FieldGroup>
      <FieldTitle as="h3">Account</FieldTitle>
      <FieldDescription>Manage your account settings.</FieldDescription>

      <Field>
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="evilrabbit" />
      </Field>
    </FieldGroup>
  ),
};

export { Default, Required, WithError, Disabled, Sizes, FullWidth, WithFieldSet, WithSeparator, WithTitle };

export default meta;
