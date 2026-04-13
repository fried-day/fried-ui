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
            '"primary" | "secondary" | "outline" | "success" | "warning" | "danger" | "info" | "primary-soft" | "secondary-soft" | "success-soft" | "warning-soft" | "danger-soft" | "info-soft" | "primary-outline" | "secondary-outline" | "success-outline" | "warning-outline" | "danger-outline" | "info-outline"',
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
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the badge",
      table: {
        type: {
          summary: '"none" | "sm" | "md" | "lg" | "full"',
        },
        defaultValue: {
          summary: "full",
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
    <div className="flex flex-wrap items-end gap-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
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
    <div className="flex flex-wrap items-end gap-4">
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

const OutlineVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const OutlineVariants = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge variant="primary-outline">Primary</Badge>
      <Badge variant="secondary-outline">Secondary</Badge>
      <Badge variant="success-outline">Success</Badge>
      <Badge variant="warning-outline">Warning</Badge>
      <Badge variant="danger-outline">Danger</Badge>
      <Badge variant="info-outline">Info</Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Badge {...args} variant="primary-outline">
        Primary
      </Badge>

      <Badge {...args} variant="secondary-outline">
        Secondary
      </Badge>

      <Badge {...args} variant="success-outline">
        Success
      </Badge>

      <Badge {...args} variant="warning-outline">
        Warning
      </Badge>

      <Badge {...args} variant="danger-outline">
        Danger
      </Badge>

      <Badge {...args} variant="info-outline">
        Info
      </Badge>
    </div>
  ),
};

const Radius: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const Radius = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge radius="none">None</Badge>
      <Badge radius="sm">Small</Badge>
      <Badge radius="md">Medium</Badge>
      <Badge radius="lg">Large</Badge>
      <Badge radius="full">Full</Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Badge {...args} radius="none">
        None
      </Badge>

      <Badge {...args} radius="sm">
        Small
      </Badge>

      <Badge {...args} radius="md">
        Medium
      </Badge>

      <Badge {...args} radius="lg">
        Large
      </Badge>

      <Badge {...args} radius="full">
        Full
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

const WithIcon = () => {
  return (
    <div className="flex items-end gap-4">
      <Badge>
        <SettingsIcon slot="icon-start" />
        Settings
      </Badge>

      <Badge variant="success">
        <SettingsIcon slot="icon-start" />
        Active
      </Badge>

      <Badge variant="danger">
        <SettingsIcon slot="icon-start" />
        Error
      </Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Badge {...args}>
        <SettingsIcon slot="icon-start" />
        Settings
      </Badge>

      <Badge {...args} variant="success">
        <SettingsIcon slot="icon-start" />
        Active
      </Badge>

      <Badge {...args} variant="danger">
        <SettingsIcon slot="icon-start" />
        Error
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
    <div className="flex items-end gap-4">
      <Badge size="sm" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>

      <Badge size="md" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>

      <Badge size="lg" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>
    </div>
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

export { Default, Variants, SoftVariants, OutlineVariants, Radius, Sizes, WithIcon, IconOnly };

export default meta;
