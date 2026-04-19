import type { Meta, StoryObj } from "@storybook/react";

import { ArrowRightIcon, MoreIcon, PlusIcon, SettingsIcon, ShareIcon } from "../icons";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    radius: "md",
    isIconOnly: false,
    isFullWidth: false,
    isDisabled: false,
    isPending: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button content (text, icons, or both)",
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
        "ghost",
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
        "primary-ghost",
        "secondary-ghost",
        "accent-ghost",
        "success-ghost",
        "warning-ghost",
        "danger-ghost",
        "info-ghost",
      ],
      description:
        "Visual style. **Base colors:** primary (main CTA), secondary (neutral action), accent (brand highlight), ghost (dismissive), outline (neutral outlined), success/warning/danger/info (status). **Modifiers:** -soft (pale + border), -flat (pale no border), -outline (transparent + colored border), -ghost (transparent, hover reveal). **Special:** glass (frosted + border), frost (frosted no border), overlay (dark scrim). Use primary for primary CTA, accent for brand CTA, danger for destructive, ghost for cancel/dismiss.",
      table: {
        type: {
          summary:
            '"primary" | "secondary" | "accent" | "ghost" | "outline" | "glass" | "frost" | "overlay" | "success" | "warning" | "danger" | "info" | "primary-soft" | "secondary-soft" | "accent-soft" | "success-soft" | "warning-soft" | "danger-soft" | "info-soft" | "primary-flat" | "secondary-flat" | "accent-flat" | "success-flat" | "warning-flat" | "danger-flat" | "info-flat" | "primary-outline" | "secondary-outline" | "accent-outline" | "success-outline" | "warning-outline" | "danger-outline" | "info-outline" | "primary-ghost" | "secondary-ghost" | "accent-ghost" | "success-ghost" | "warning-ghost" | "danger-ghost" | "info-ghost"',
        },
        defaultValue: {
          summary: "primary",
        },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the button",
      table: {
        type: {
          summary: '"sm" | "md" | "lg" | "xl"',
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
      description: "The border radius of the button",
      table: {
        type: {
          summary: '"none" | "sm" | "md" | "lg" | "full"',
        },
        defaultValue: {
          summary: "md",
        },
        category: "Style Variants",
      },
    },
    isIconOnly: {
      control: "boolean",
      description: "Whether the button is icon-only (square)",
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
    isFullWidth: {
      control: "boolean",
      description: "Whether the button takes full width of its container",
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
    isDisabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "State",
      },
    },
    isPending: {
      control: "boolean",
      description: "Whether the button shows a loading spinner",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "State",
      },
    },
    onPress: {
      control: false,
      description: "Handler called when the button is pressed",
      table: {
        type: {
          summary: "(e: PressEvent) => void",
        },
        category: "Events",
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
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Basic = () => {
  return <Button onPress={() => console.log("pressed")}>Click me</Button>;
};`,
      },
    },
  },
};

const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Variants = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>

      <Button {...args} variant="secondary">
        Secondary
      </Button>

      <Button {...args} variant="accent">
        Accent
      </Button>

      <Button {...args} variant="success">
        Success
      </Button>

      <Button {...args} variant="warning">
        Warning
      </Button>

      <Button {...args} variant="danger">
        Danger
      </Button>

      <Button {...args} variant="info">
        Info
      </Button>
    </div>
  ),
};

const SoftVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const SoftVariants = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary-soft">Primary</Button>
      <Button variant="secondary-soft">Secondary</Button>
      <Button variant="accent-soft">Accent</Button>
      <Button variant="success-soft">Success</Button>
      <Button variant="warning-soft">Warning</Button>
      <Button variant="danger-soft">Danger</Button>
      <Button variant="info-soft">Info</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Button {...args} variant="primary-soft">
        Primary
      </Button>

      <Button {...args} variant="secondary-soft">
        Secondary
      </Button>

      <Button {...args} variant="accent-soft">
        Accent
      </Button>

      <Button {...args} variant="success-soft">
        Success
      </Button>

      <Button {...args} variant="warning-soft">
        Warning
      </Button>

      <Button {...args} variant="danger-soft">
        Danger
      </Button>

      <Button {...args} variant="info-soft">
        Info
      </Button>
    </div>
  ),
};

const FlatVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const FlatVariants = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary-flat">Primary</Button>
      <Button variant="secondary-flat">Secondary</Button>
      <Button variant="accent-flat">Accent</Button>
      <Button variant="success-flat">Success</Button>
      <Button variant="warning-flat">Warning</Button>
      <Button variant="danger-flat">Danger</Button>
      <Button variant="info-flat">Info</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Button {...args} variant="primary-flat">
        Primary
      </Button>

      <Button {...args} variant="secondary-flat">
        Secondary
      </Button>

      <Button {...args} variant="accent-flat">
        Accent
      </Button>

      <Button {...args} variant="success-flat">
        Success
      </Button>

      <Button {...args} variant="warning-flat">
        Warning
      </Button>

      <Button {...args} variant="danger-flat">
        Danger
      </Button>

      <Button {...args} variant="info-flat">
        Info
      </Button>
    </div>
  ),
};

const OutlineVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const OutlineVariants = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary-outline">Primary</Button>
      <Button variant="secondary-outline">Secondary</Button>
      <Button variant="accent-outline">Accent</Button>
      <Button variant="success-outline">Success</Button>
      <Button variant="warning-outline">Warning</Button>
      <Button variant="danger-outline">Danger</Button>
      <Button variant="info-outline">Info</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Button {...args} variant="primary-outline">
        Primary
      </Button>

      <Button {...args} variant="secondary-outline">
        Secondary
      </Button>

      <Button {...args} variant="accent-outline">
        Accent
      </Button>

      <Button {...args} variant="success-outline">
        Success
      </Button>

      <Button {...args} variant="warning-outline">
        Warning
      </Button>

      <Button {...args} variant="danger-outline">
        Danger
      </Button>

      <Button {...args} variant="info-outline">
        Info
      </Button>
    </div>
  ),
};

const GhostVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const GhostVariants = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary-ghost">Primary</Button>
      <Button variant="secondary-ghost">Secondary</Button>
      <Button variant="accent-ghost">Accent</Button>
      <Button variant="success-ghost">Success</Button>
      <Button variant="warning-ghost">Warning</Button>
      <Button variant="danger-ghost">Danger</Button>
      <Button variant="info-ghost">Info</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Button {...args} variant="primary-ghost">
        Primary
      </Button>

      <Button {...args} variant="secondary-ghost">
        Secondary
      </Button>

      <Button {...args} variant="accent-ghost">
        Accent
      </Button>

      <Button {...args} variant="success-ghost">
        Success
      </Button>

      <Button {...args} variant="warning-ghost">
        Warning
      </Button>

      <Button {...args} variant="danger-ghost">
        Danger
      </Button>

      <Button {...args} variant="info-ghost">
        Info
      </Button>
    </div>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} size="sm">
        Small
      </Button>

      <Button {...args} size="md">
        Medium
      </Button>

      <Button {...args} size="lg">
        Large
      </Button>

      <Button {...args} size="xl">
        Extra Large
      </Button>
    </div>
  ),
};

const Radius: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Radius = () => {
  return (
    <div className="flex items-end gap-4">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="full">Full</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} radius="none">
        None
      </Button>

      <Button {...args} radius="sm">
        Small
      </Button>

      <Button {...args} radius="md">
        Medium
      </Button>

      <Button {...args} radius="lg">
        Large
      </Button>

      <Button {...args} radius="full">
        Full
      </Button>
    </div>
  ),
};

const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button, ArrowRightIcon } from "@fried-ui/react";

const WithIcon = () => {
  return (
    <div className="flex items-end gap-4">
      <Button size="sm">
        <ArrowRightIcon slot="icon-start" />
        Next
      </Button>

      <Button size="md">
        <ArrowRightIcon slot="icon-start" />
        Next
      </Button>

      <Button size="lg">
        <ArrowRightIcon slot="icon-start" />
        Next
      </Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} size="sm">
        <ArrowRightIcon slot="icon-start" />
        Next
      </Button>

      <Button {...args} size="md">
        <ArrowRightIcon slot="icon-start" />
        Next
      </Button>

      <Button {...args} size="lg">
        <ArrowRightIcon slot="icon-start" />
        Next
      </Button>
    </div>
  ),
};

const IconOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button, MoreIcon, PlusIcon, SettingsIcon, ShareIcon } from "@fried-ui/react";

const IconOnly = () => {
  return (
    <div className="flex items-end gap-4">
      <Button aria-label="Settings" isIconOnly>
        <SettingsIcon className="size-match-font" />
      </Button>

      <Button variant="secondary" aria-label="More" isIconOnly>
        <MoreIcon className="size-match-font" />
      </Button>

      <Button variant="outline" aria-label="Add" isIconOnly>
        <PlusIcon className="size-match-font" />
      </Button>

      <Button variant="ghost" aria-label="Share" isIconOnly>
        <ShareIcon className="size-match-font" />
      </Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} aria-label="Settings" isIconOnly>
        <SettingsIcon className="size-match-font" />
      </Button>

      <Button {...args} variant="secondary" aria-label="More" isIconOnly>
        <MoreIcon className="size-match-font" />
      </Button>

      <Button {...args} variant="outline" aria-label="Add" isIconOnly>
        <PlusIcon className="size-match-font" />
      </Button>

      <Button {...args} variant="ghost" aria-label="Share" isIconOnly>
        <ShareIcon className="size-match-font" />
      </Button>
    </div>
  ),
};

const FullWidth: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const FullWidth = () => {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Button isFullWidth>Full Width</Button>

      <Button variant="secondary" isFullWidth>
        Full Width Secondary
      </Button>

      <Button variant="outline" isFullWidth>
        Full Width Outline
      </Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex w-80 flex-col gap-4">
      <Button {...args} isFullWidth>
        Full Width
      </Button>

      <Button {...args} variant="secondary" isFullWidth>
        Full Width Secondary
      </Button>

      <Button {...args} variant="outline" isFullWidth>
        Full Width Outline
      </Button>
    </div>
  ),
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Disabled = () => {
  return <Button isDisabled>Disabled</Button>;
};`,
      },
    },
  },
  args: {
    children: "Disabled",
    isDisabled: true,
  },
};

const Pending: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Pending = () => {
  return <Button isPending>Pending</Button>;
};`,
      },
    },
  },
  args: {
    children: "Pending",
    isPending: true,
  },
};

const RenderProps: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const RenderProps = () => {
  return (
    <Button>
      {({ isHovered }) => (isHovered ? "Hovering" : "Idle")}
    </Button>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Button {...args}>{({ isHovered }): string => (isHovered ? "Hovering" : "Idle")}</Button>
  ),
};

const GlassVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const GlassVariants = () => {
  return (
    <div className="flex w-[640px] h-56 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-600 via-purple-500 to-blue-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Button variant="glass">Primary</Button>
        <Button variant="glass">Secondary</Button>
        <Button variant="glass">Tertiary</Button>
      </div>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-[640px] items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Button {...args} variant="glass">
          Primary
        </Button>

        <Button {...args} variant="glass">
          Secondary
        </Button>

        <Button {...args} variant="glass">
          Tertiary
        </Button>
      </div>
    </div>
  ),
};

const FrostVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const FrostVariants = () => {
  return (
    <div className="flex w-[640px] h-56 items-center justify-center bg-linear-to-br from-emerald-400 via-teal-500 via-cyan-500 via-sky-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Button variant="frost">Primary</Button>
        <Button variant="frost">Secondary</Button>
        <Button variant="frost">Tertiary</Button>
      </div>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-[640px] items-center justify-center bg-linear-to-br from-emerald-400 via-cyan-500 via-sky-500 via-teal-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Button {...args} variant="frost">
          Primary
        </Button>

        <Button {...args} variant="frost">
          Secondary
        </Button>

        <Button {...args} variant="frost">
          Tertiary
        </Button>
      </div>
    </div>
  ),
};

const OverlayVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const OverlayVariants = () => {
  return (
    <div className="flex w-[640px] h-56 items-center justify-center bg-linear-to-br from-orange-400 via-rose-500 via-fuchsia-500 via-purple-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Button variant="overlay">Play</Button>
        <Button variant="overlay">Pause</Button>
        <Button variant="overlay">Mute</Button>
      </div>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-[640px] items-center justify-center bg-linear-to-br from-orange-400 via-fuchsia-500 via-purple-500 via-rose-500 to-purple-600 p-16">
      <div className="flex flex-wrap items-end gap-4">
        <Button {...args} variant="overlay">
          Play
        </Button>

        <Button {...args} variant="overlay">
          Pause
        </Button>

        <Button {...args} variant="overlay">
          Mute
        </Button>
      </div>
    </div>
  ),
};

export {
  Default,
  Variants,
  SoftVariants,
  FlatVariants,
  OutlineVariants,
  GhostVariants,
  GlassVariants,
  FrostVariants,
  OverlayVariants,
  Sizes,
  Radius,
  WithIcon,
  IconOnly,
  FullWidth,
  Disabled,
  Pending,
  RenderProps,
};

export default meta;
