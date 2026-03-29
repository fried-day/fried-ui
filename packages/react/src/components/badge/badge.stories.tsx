import type { Meta, StoryObj } from "@storybook/react";

import { InformationCircleIcon, SettingsIcon } from "../icons";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Badge",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Badge content",
      table: {
        type: {
          summary: "ReactNode",
        },
        category: "Children",
      },
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "ghost",
        "outline",
        "success",
        "warning",
        "danger",
        "info",
        "primary-soft",
        "secondary-soft",
        "success-soft",
        "warning-soft",
        "danger-soft",
        "info-soft",
        "primary-outline",
        "secondary-outline",
        "success-outline",
        "warning-outline",
        "danger-outline",
        "info-outline",
      ],
      description: "The visual variant of the badge",
      table: {
        type: {
          summary:
            '"primary" | "secondary" | "ghost" | "outline" | "success" | "warning" | "danger" | "info" | "primary-soft" | "secondary-soft" | "success-soft" | "warning-soft" | "danger-soft" | "info-soft" | "primary-outline" | "secondary-outline" | "success-outline" | "warning-outline" | "danger-outline" | "info-outline"',
        },
        defaultValue: {
          summary: "primary",
        },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the badge",
      table: {
        type: {
          summary: '"sm" | "md" | "lg"',
        },
        defaultValue: {
          summary: "md",
        },
        category: "Style Variants",
      },
    },
    isIconOnly: {
      control: "boolean",
      description: "Whether the badge is icon-only (square)",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "Style Variants",
      },
    },
    isShadow: {
      control: "boolean",
      description: "Whether to show a colored drop shadow",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "Style Variants",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: {
          summary: "string",
        },
        category: "Styling",
      },
    },
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const Basic = () => {
  return <Badge>New</Badge>;
};`,
      },
    },
  },
};

const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const Variants = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="primary-soft">Primary Soft</Badge>
      <Badge variant="secondary-soft">Secondary Soft</Badge>
      <Badge variant="success-soft">Success Soft</Badge>
      <Badge variant="warning-soft">Warning Soft</Badge>
      <Badge variant="danger-soft">Danger Soft</Badge>
      <Badge variant="info-soft">Info Soft</Badge>
      <Badge variant="primary-outline">Primary Outline</Badge>
      <Badge variant="secondary-outline">Secondary Outline</Badge>
      <Badge variant="success-outline">Success Outline</Badge>
      <Badge variant="warning-outline">Warning Outline</Badge>
      <Badge variant="danger-outline">Danger Outline</Badge>
      <Badge variant="info-outline">Info Outline</Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Badge {...args} variant="primary">
        Primary
      </Badge>

      <Badge {...args} variant="secondary">
        Secondary
      </Badge>

      <Badge {...args} variant="ghost">
        Ghost
      </Badge>

      <Badge {...args} variant="outline">
        Outline
      </Badge>

      <Badge {...args} variant="success">
        Success
      </Badge>

      <Badge {...args} variant="warning">
        Warning
      </Badge>

      <Badge {...args} variant="danger">
        Danger
      </Badge>

      <Badge {...args} variant="info">
        Info
      </Badge>

      <Badge {...args} variant="primary-soft">
        Primary Soft
      </Badge>

      <Badge {...args} variant="secondary-soft">
        Secondary Soft
      </Badge>

      <Badge {...args} variant="success-soft">
        Success Soft
      </Badge>

      <Badge {...args} variant="warning-soft">
        Warning Soft
      </Badge>

      <Badge {...args} variant="danger-soft">
        Danger Soft
      </Badge>

      <Badge {...args} variant="info-soft">
        Info Soft
      </Badge>

      <Badge {...args} variant="primary-outline">
        Primary Outline
      </Badge>

      <Badge {...args} variant="secondary-outline">
        Secondary Outline
      </Badge>

      <Badge {...args} variant="success-outline">
        Success Outline
      </Badge>

      <Badge {...args} variant="warning-outline">
        Warning Outline
      </Badge>

      <Badge {...args} variant="danger-outline">
        Danger Outline
      </Badge>

      <Badge {...args} variant="info-outline">
        Info Outline
      </Badge>
    </div>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-end gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Badge {...args} size="sm">
        Small
      </Badge>

      <Badge {...args} size="md">
        Medium
      </Badge>

      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};

const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge, SettingsIcon } from "@fried-ui/react";

// Option 1: slot="icon" (recommended)
const WithIcon = () => {
  return (
    <Badge>
      <SettingsIcon slot="icon" />
      Settings
    </Badge>
  );
};

// Option 2: className
const WithIconAlt = () => {
  return (
    <Badge>
      <SettingsIcon className="size-match-font" />
      Settings
    </Badge>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Badge {...args}>
        <SettingsIcon slot="icon" />
        Settings
      </Badge>

      <Badge {...args} variant="success">
        <SettingsIcon slot="icon" />
        Active
      </Badge>

      <Badge {...args} variant="danger">
        <SettingsIcon slot="icon" />
        Error
      </Badge>
    </div>
  ),
};

const Shadow: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const Shadow = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge isShadow>Primary</Badge>
      <Badge variant="success" isShadow>Success</Badge>
      <Badge variant="warning" isShadow>Warning</Badge>
      <Badge variant="danger" isShadow>Danger</Badge>
      <Badge variant="info" isShadow>Info</Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Badge {...args} isShadow>
        Primary
      </Badge>

      <Badge {...args} variant="success" isShadow>
        Success
      </Badge>

      <Badge {...args} variant="warning" isShadow>
        Warning
      </Badge>

      <Badge {...args} variant="danger" isShadow>
        Danger
      </Badge>

      <Badge {...args} variant="info" isShadow>
        Info
      </Badge>
    </div>
  ),
};

const IconOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge, InformationCircleIcon } from "@fried-ui/react";

const IconOnly = () => {
  return (
    <Badge aria-label="Info" isIconOnly>
      <InformationCircleIcon slot="icon" />
    </Badge>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Badge {...args} size="sm" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>

      <Badge {...args} size="md" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>

      <Badge {...args} size="lg" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>
    </div>
  ),
};

const SoftVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const SoftVariants = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary-soft">Primary</Badge>
      <Badge variant="secondary-soft">Secondary</Badge>
      <Badge variant="success-soft">Success</Badge>
      <Badge variant="warning-soft">Warning</Badge>
      <Badge variant="danger-soft">Danger</Badge>
      <Badge variant="info-soft">Info</Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Badge {...args} variant="primary-soft">
        Primary
      </Badge>

      <Badge {...args} variant="secondary-soft">
        Secondary
      </Badge>

      <Badge {...args} variant="success-soft">
        Success
      </Badge>

      <Badge {...args} variant="warning-soft">
        Warning
      </Badge>

      <Badge {...args} variant="danger-soft">
        Danger
      </Badge>

      <Badge {...args} variant="info-soft">
        Info
      </Badge>
    </div>
  ),
};

export { Default, Variants, SoftVariants, Sizes, Shadow, WithIcon, IconOnly };

export default meta;
