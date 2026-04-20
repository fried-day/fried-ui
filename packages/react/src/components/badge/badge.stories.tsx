import type { Meta, StoryObj } from "@storybook/react";

import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  InformationCircleIcon,
  LockIcon,
  StarIcon,
  XCircleIcon,
} from "../icons";
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
    radius: "full",
    isIconOnly: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Badge content (text or icon)",
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
        "accent",
        "outline",
        "glass",
        "frost",
        "overlay",
        "success",
        "warning",
        "danger",
        "info",
        "primary-soft",
        "secondary-soft",
        "accent-soft",
        "success-soft",
        "warning-soft",
        "danger-soft",
        "info-soft",
        "primary-flat",
        "secondary-flat",
        "accent-flat",
        "success-flat",
        "warning-flat",
        "danger-flat",
        "info-flat",
        "primary-outline",
        "secondary-outline",
        "accent-outline",
        "success-outline",
        "warning-outline",
        "danger-outline",
        "info-outline",
      ],
      description:
        "Visual style. **Base colors:** primary (default), secondary (neutral), accent (brand), success/warning/danger/info (status). **Style modifiers:** -soft (pale bg + border), -flat (pale bg no border), -outline (transparent + colored border). **Special:** glass (frosted + border), frost (frosted no border), overlay (dark scrim). Use primary for main labels, success/danger for status, -soft for subtle tags.",
      table: {
        type: {
          summary:
            '"primary" | "secondary" | "accent" | "outline" | "glass" | "frost" | "overlay" | "success" | "warning" | "danger" | "info" | "primary-soft" | "secondary-soft" | "accent-soft" | "success-soft" | "warning-soft" | "danger-soft" | "info-soft" | "primary-flat" | "secondary-flat" | "accent-flat" | "success-flat" | "warning-flat" | "danger-flat" | "info-flat" | "primary-outline" | "secondary-outline" | "accent-outline" | "success-outline" | "warning-outline" | "danger-outline" | "info-outline"',
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
      <Badge variant="accent">Accent</Badge>
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

      <Badge {...args} variant="accent">
        Accent
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
      <Badge variant="accent-soft">Accent</Badge>
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

      <Badge {...args} variant="accent-soft">
        Accent
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

const FlatVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const FlatVariants = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge variant="primary-flat">Primary</Badge>
      <Badge variant="secondary-flat">Secondary</Badge>
      <Badge variant="accent-flat">Accent</Badge>
      <Badge variant="success-flat">Success</Badge>
      <Badge variant="warning-flat">Warning</Badge>
      <Badge variant="danger-flat">Danger</Badge>
      <Badge variant="info-flat">Info</Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Badge {...args} variant="primary-flat">
        Primary
      </Badge>

      <Badge {...args} variant="secondary-flat">
        Secondary
      </Badge>

      <Badge {...args} variant="accent-flat">
        Accent
      </Badge>

      <Badge {...args} variant="success-flat">
        Success
      </Badge>

      <Badge {...args} variant="warning-flat">
        Warning
      </Badge>

      <Badge {...args} variant="danger-flat">
        Danger
      </Badge>

      <Badge {...args} variant="info-flat">
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
      <Badge variant="accent-outline">Accent</Badge>
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

      <Badge {...args} variant="accent-outline">
        Accent
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

const GlassVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const GlassVariants = () => {
  return (
    <div className="flex w-160 h-56 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Badge variant="glass">
          <StarIcon slot="icon-start" />
          Featured
        </Badge>

        <Badge variant="glass">
          New
          <BellIcon slot="icon-end" />
        </Badge>

        <Badge variant="glass">
          <LockIcon slot="icon-start" />
          Premium
        </Badge>
      </div>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Badge {...args} variant="glass">
          <StarIcon slot="icon-start" />
          Featured
        </Badge>

        <Badge {...args} variant="glass">
          New
          <BellIcon slot="icon-end" />
        </Badge>

        <Badge {...args} variant="glass">
          <LockIcon slot="icon-start" />
          Premium
        </Badge>
      </div>
    </div>
  ),
};

const FrostVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const FrostVariants = () => {
  return (
    <div className="flex w-160 h-56 items-center justify-center bg-linear-to-br from-emerald-400 via-teal-500 via-cyan-500 via-sky-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Badge variant="frost">
          <CheckCircleIcon slot="icon-start" />
          Verified
        </Badge>

        <Badge variant="frost">
          Favorite
          <HeartIcon slot="icon-end" />
        </Badge>

        <Badge variant="frost">
          <StarIcon slot="icon-start" />
          Top Rated
        </Badge>
      </div>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-emerald-400 via-cyan-500 via-sky-500 via-teal-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Badge {...args} variant="frost">
          <CheckCircleIcon slot="icon-start" />
          Verified
        </Badge>

        <Badge {...args} variant="frost">
          Favorite
          <HeartIcon slot="icon-end" />
        </Badge>

        <Badge {...args} variant="frost">
          <StarIcon slot="icon-start" />
          Top Rated
        </Badge>
      </div>
    </div>
  ),
};

const OverlayVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@fried-ui/react";

const OverlayVariants = () => {
  return (
    <div className="flex w-160 h-56 items-center justify-center bg-linear-to-br from-orange-400 via-rose-500 via-fuchsia-500 via-purple-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Badge variant="overlay">
          <BellIcon slot="icon-start" />
          Live
        </Badge>

        <Badge variant="overlay">
          HD
          <StarIcon slot="icon-end" />
        </Badge>

        <Badge variant="overlay">
          <CheckCircleIcon slot="icon-start" />
          4K
        </Badge>
      </div>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-orange-400 via-fuchsia-500 via-purple-500 via-rose-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Badge {...args} variant="overlay">
          <BellIcon slot="icon-start" />
          Live
        </Badge>

        <Badge {...args} variant="overlay">
          HD
          <StarIcon slot="icon-end" />
        </Badge>

        <Badge {...args} variant="overlay">
          <CheckCircleIcon slot="icon-start" />
          4K
        </Badge>
      </div>
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

const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, StarIcon, XCircleIcon } from "@fried-ui/react";

const WithIcon = () => {
  return (
    <div className="flex items-end gap-4">
      <Badge variant="primary">
        <StarIcon slot="icon-start" />
        Featured
      </Badge>

      <Badge variant="info">
        <InformationCircleIcon slot="icon-start" />
        Info
      </Badge>

      <Badge variant="success">
        Success
        <CheckCircleIcon slot="icon-end" />
      </Badge>

      <Badge variant="warning">
        <ExclamationTriangleIcon slot="icon-start" />
        Warning
      </Badge>

      <Badge variant="danger">
        Danger
        <XCircleIcon slot="icon-end" />
      </Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Badge {...args} variant="primary">
        <StarIcon slot="icon-start" />
        Featured
      </Badge>

      <Badge {...args} variant="info">
        <InformationCircleIcon slot="icon-start" />
        Info
      </Badge>

      <Badge {...args} variant="success">
        Success
        <CheckCircleIcon slot="icon-end" />
      </Badge>

      <Badge {...args} variant="warning">
        <ExclamationTriangleIcon slot="icon-start" />
        Warning
      </Badge>

      <Badge {...args} variant="danger">
        Danger
        <XCircleIcon slot="icon-end" />
      </Badge>
    </div>
  ),
};

const IconOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge, BellIcon, HeartIcon, LockIcon, StarIcon } from "@fried-ui/react";

const IconOnly = () => {
  return (
    <div className="flex items-end gap-4">
      <Badge aria-label="Featured" isIconOnly>
        <StarIcon slot="icon" />
      </Badge>

      <Badge variant="secondary" aria-label="Notification" isIconOnly>
        <BellIcon slot="icon" />
      </Badge>

      <Badge variant="outline" aria-label="Favorite" isIconOnly>
        <HeartIcon slot="icon" />
      </Badge>

      <Badge variant="ghost" aria-label="Private" isIconOnly>
        <LockIcon slot="icon" />
      </Badge>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Badge {...args} aria-label="Featured" isIconOnly>
        <StarIcon slot="icon" />
      </Badge>

      <Badge {...args} variant="secondary" aria-label="Notification" isIconOnly>
        <BellIcon slot="icon" />
      </Badge>

      <Badge {...args} variant="outline" aria-label="Favorite" isIconOnly>
        <HeartIcon slot="icon" />
      </Badge>

      <Badge {...args} variant="ghost" aria-label="Private" isIconOnly>
        <LockIcon slot="icon" />
      </Badge>
    </div>
  ),
};

export {
  Default,
  Variants,
  SoftVariants,
  FlatVariants,
  OutlineVariants,
  GlassVariants,
  FrostVariants,
  OverlayVariants,
  Sizes,
  Radius,
  WithIcon,
  IconOnly,
};

export default meta;
