import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useState } from "react";

import { CheckCircleIcon, InformationCircleIcon, LockIcon } from "../icons";
import { Description } from "../description";
import { FieldError } from "../field-error";
import { Input } from "../input";
import { Label } from "../label";
import { Surface } from "../surface";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
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
        "Wrapper gap scale between stacked slots (Label → Input → Description → FieldError). **Scale:** sm (dense gap, 0.75rem/2.058), md (standard gap, 0.875rem/2.058, default), lg (generous gap, 1rem/2.058). **Note:** This controls ONLY the vertical spacing between slots — child slots keep their own typography via their individual `size` prop. Use sm for table cells and compact filter bars, md for standard forms, lg for hero/landing flows where field spacing should read generous.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "search", "number"],
      description:
        "HTML input type attribute forwarded to the underlying Input element. Controls native browser behavior (keyboard hints on mobile, input validation). Use `email` for email fields, `tel` for phone numbers, `url` for web addresses, `number` for numeric input, `password` for masked input, `search` for search boxes, and `text` (default) for general text.",
      table: {
        type: { summary: '"text" | "email" | "password" | "tel" | "url" | "search" | "number"' },
        defaultValue: { summary: "text" },
        category: "Content",
      },
    },
    isInvalid: {
      control: "boolean",
      description: "Whether the text field is in error state (enables FieldError rendering)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the text field is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "Whether the text field is read-only",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isRequired: {
      control: "boolean",
      description: "Whether the text field is required for form submission",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isFullWidth: {
      control: "boolean",
      description: "Whether the text field stretches to fill its container width",
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
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const Basic = () => {
  return (
    <TextField>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  ),
};

const WithDescription: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input, Description } from "@fried-ui/react";

const WithDescription = () => {
  return (
    <TextField>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <Description>Help text describing the field</Description>
    </TextField>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <Description>Help text describing the field</Description>
    </TextField>
  ),
};

const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input, FieldError } from "@fried-ui/react";

const WithError = () => {
  return (
    <TextField isInvalid>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <FieldError>Error message</FieldError>
    </TextField>
  );
};`,
      },
    },
  },
  args: {
    isInvalid: true,
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <FieldError>Error message</FieldError>
    </TextField>
  ),
};

const Required: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const Required = () => {
  return (
    <TextField isRequired>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  );
};`,
      },
    },
  },
  args: {
    isRequired: true,
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  ),
};

const Optional: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const Optional = () => {
  return (
    <TextField>
      <Label optionalMessage="(Optional)">Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label optionalMessage="(Optional)">Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  ),
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const Disabled = () => {
  return (
    <TextField isDisabled>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  );
};`,
      },
    },
  },
  args: {
    isDisabled: true,
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  ),
};

const ReadOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const ReadOnly = () => {
  return (
    <TextField isReadOnly defaultValue="Read-only value">
      <Label>Field label</Label>
      <Input />
    </TextField>
  );
};`,
      },
    },
  },
  args: {
    isReadOnly: true,
    defaultValue: "Read-only value",
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input />
    </TextField>
  ),
};

const Invalid: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input, Description, FieldError } from "@fried-ui/react";

const Invalid = () => {
  return (
    <TextField isInvalid>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <Description>Help text describing the field</Description>
      <FieldError>Error message</FieldError>
    </TextField>
  );
};`,
      },
    },
  },
  args: {
    isInvalid: true,
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <Description>Help text describing the field</Description>
      <FieldError>Error message</FieldError>
    </TextField>
  ),
};

const Pending: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const Pending = () => {
  return (
    <TextField defaultValue="Validating">
      <Label>Field label</Label>
      <Input isPending />
    </TextField>
  );
};`,
      },
    },
  },
  args: {
    defaultValue: "Validating",
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input isPending />
    </TextField>
  ),
};

const WithIcons: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input, CheckCircleIcon, InformationCircleIcon, LockIcon } from "@fried-ui/react";

const WithIcons = () => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <TextField>
        <Label>Leading icon</Label>
        <Input placeholder="Type here" startIcon={<InformationCircleIcon />} />
      </TextField>
      <TextField>
        <Label>Trailing icon</Label>
        <Input placeholder="Type here" endIcon={<CheckCircleIcon />} />
      </TextField>
      <TextField>
        <Label>Both icons</Label>
        <Input placeholder="Type here" startIcon={<LockIcon />} endIcon={<CheckCircleIcon />} />
      </TextField>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <TextField {...args}>
        <Label>Leading icon</Label>
        <Input placeholder="Type here" startIcon={<InformationCircleIcon />} />
      </TextField>

      <TextField {...args}>
        <Label>Trailing icon</Label>
        <Input placeholder="Type here" endIcon={<CheckCircleIcon />} />
      </TextField>

      <TextField {...args}>
        <Label>Both icons</Label>
        <Input placeholder="Type here" startIcon={<LockIcon />} endIcon={<CheckCircleIcon />} />
      </TextField>
    </div>
  ),
};

const WithPrefix: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const WithPrefix = () => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <TextField>
        <Label>Amount</Label>
        <Input prefix="$" placeholder="0.00" />
      </TextField>
      <TextField>
        <Label>Domain</Label>
        <Input suffix=".com" placeholder="example" />
      </TextField>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <TextField {...args}>
        <Label>Amount</Label>
        <Input prefix="$" placeholder="0.00" />
      </TextField>

      <TextField {...args}>
        <Label>Domain</Label>
        <Input suffix=".com" placeholder="example" />
      </TextField>
    </div>
  ),
};

const Controlled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { TextField, Label, Input, Description } from "@fried-ui/react";

const Controlled = () => {
  const [value, setValue] = useState("");
  return (
    <TextField value={value} onChange={setValue}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <Description>Characters: {value.length}</Description>
    </TextField>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => <ControlledDemo {...args} />,
};

const ControlledDemo = (args: Readonly<ComponentProps<typeof TextField>>): React.JSX.Element => {
  const [value, setValue] = useState("");
  const description = `Characters: ${value.length}`;

  return (
    <TextField {...args} value={value} onChange={setValue}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
      <Description>{description}</Description>
    </TextField>
  );
};

const Uncontrolled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const Uncontrolled = () => {
  return (
    <TextField defaultValue="Default value">
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  );
};`,
      },
    },
  },
  args: {
    defaultValue: "Default value",
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label>Field label</Label>
      <Input placeholder="Type here" />
    </TextField>
  ),
};

const InputTypes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const InputTypes = () => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <TextField type="text"><Label>Text</Label><Input placeholder="Plain text" /></TextField>
      <TextField type="password"><Label>Secret</Label><Input placeholder="Secret value" /></TextField>
      <TextField type="number"><Label>Number</Label><Input placeholder="42" /></TextField>
      <TextField type="url"><Label>URL</Label><Input placeholder="https://example.com" /></TextField>
      <TextField type="tel"><Label>Tel</Label><Input placeholder="+1 555 000 0000" /></TextField>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <TextField {...args} type="text">
        <Label>Text</Label>
        <Input placeholder="Plain text" />
      </TextField>

      <TextField {...args} type="password">
        <Label>Secret</Label>
        <Input placeholder="Secret value" />
      </TextField>

      <TextField {...args} type="number">
        <Label>Number</Label>
        <Input placeholder="42" />
      </TextField>

      <TextField {...args} type="url">
        <Label>URL</Label>
        <Input placeholder="https://example.com" />
      </TextField>

      <TextField {...args} type="tel">
        <Label>Tel</Label>
        <Input placeholder="+1 555 000 0000" />
      </TextField>
    </div>
  ),
};

const InSurface: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input, Description, Surface } from "@fried-ui/react";

const InSurface = () => {
  return (
    <Surface variant="default" radius="lg" className="w-96 p-6">
      <TextField isFullWidth>
        <Label>Field label</Label>
        <Input variant="plain" placeholder="Search anything" />
        <Description>Composed inside a Surface container</Description>
      </TextField>
    </Surface>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Surface variant="default" radius="lg" className="w-96 p-6">
      <TextField {...args} isFullWidth>
        <Label>Field label</Label>
        <Input variant="plain" placeholder="Search anything" />
        <Description>Composed inside a Surface container</Description>
      </TextField>
    </Surface>
  ),
};

const SlotCustomization: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input, Description } from "@fried-ui/react";

const SlotCustomization = () => {
  return (
    <TextField>
      <Label weight="semibold">Field label</Label>
      <Input className="font-mono" placeholder="Custom styled slots" />
      <Description size="sm">Override individual slot props and classes</Description>
    </TextField>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <TextField {...args}>
      <Label weight="semibold">Field label</Label>
      <Input className="font-mono" placeholder="Custom styled slots" />
      <Description size="sm">Override individual slot props and classes</Description>
    </TextField>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <TextField size="sm">
        <Label size="sm">Small TextField</Label>
        <Input size="sm" placeholder="Type here" />
      </TextField>
      <TextField size="md">
        <Label size="md">Medium TextField</Label>
        <Input size="md" placeholder="Type here" />
      </TextField>
      <TextField size="lg">
        <Label size="lg">Large TextField</Label>
        <Input size="lg" placeholder="Type here" />
      </TextField>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <TextField {...args} size="sm">
        <Label size="sm">Small TextField</Label>
        <Input size="sm" placeholder="Type here" />
      </TextField>

      <TextField {...args} size="md">
        <Label size="md">Medium TextField</Label>
        <Input size="md" placeholder="Type here" />
      </TextField>

      <TextField {...args} size="lg">
        <Label size="lg">Large TextField</Label>
        <Input size="lg" placeholder="Type here" />
      </TextField>
    </div>
  ),
};

const FullWidth: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TextField, Label, Input } from "@fried-ui/react";

const FullWidth = () => {
  return (
    <div className="w-96">
      <TextField isFullWidth>
        <Label>Field label</Label>
        <Input placeholder="Full width" />
      </TextField>
    </div>
  );
};`,
      },
    },
  },
  args: {
    isFullWidth: true,
  },
  render: (args): React.JSX.Element => (
    <div className="w-96">
      <TextField {...args}>
        <Label>Field label</Label>
        <Input placeholder="Full width" />
      </TextField>
    </div>
  ),
};

export {
  Default,
  WithDescription,
  WithError,
  Required,
  Optional,
  Disabled,
  ReadOnly,
  Invalid,
  Pending,
  WithIcons,
  WithPrefix,
  Controlled,
  Uncontrolled,
  InputTypes,
  InSurface,
  SlotCustomization,
  Sizes,
  FullWidth,
};

export default meta;
