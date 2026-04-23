import type { Meta, StoryObj } from "@storybook/react";

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MoreIcon,
  PlusIcon,
  SettingsIcon,
  ShareIcon,
  XCircleIcon,
} from "../icons";
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
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button content (text, icons, or both)",
      type: {
        name: "other",
        value: "ReactNode",
        required: true,
      },
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
        "Visual style. **Base colors:** primary (main CTA), secondary (neutral action), accent (brand highlight), ghost (dismissive), outline (neutral outlined), success/warning/danger/info (status). **Modifiers:** -soft (pale + border), -flat (pale no border), -outline (transparent + colored border), -ghost (transparent, hover reveal). Use primary for primary CTA, accent for brand CTA, danger for destructive, ghost for cancel/dismiss.",
      table: {
        type: {
          summary:
            '"primary" | "secondary" | "accent" | "ghost" | "outline" | "success" | "warning" | "danger" | "info" | "primary-soft" | "secondary-soft" | "accent-soft" | "success-soft" | "warning-soft" | "danger-soft" | "info-soft" | "primary-flat" | "secondary-flat" | "accent-flat" | "success-flat" | "warning-flat" | "danger-flat" | "info-flat" | "primary-outline" | "secondary-outline" | "accent-outline" | "success-outline" | "warning-outline" | "danger-outline" | "info-outline" | "primary-ghost" | "secondary-ghost" | "accent-ghost" | "success-ghost" | "warning-ghost" | "danger-ghost" | "info-ghost"',
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
  args: {
    children: "Button",
  },
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const SoftVariants: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const FlatVariants: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const OutlineVariants: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const GhostVariants: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const WithIcon: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button {...args} variant="primary">
        <PlusIcon slot="icon-start" />
        Create
      </Button>

      <Button {...args} variant="info">
        <InformationCircleIcon slot="icon-start" />
        Info
      </Button>

      <Button {...args} variant="success">
        Complete
        <CheckCircleIcon slot="icon-end" />
      </Button>

      <Button {...args} variant="warning">
        <ExclamationTriangleIcon slot="icon-start" />
        Warning
      </Button>

      <Button {...args} variant="danger">
        Delete
        <XCircleIcon slot="icon-end" />
      </Button>
    </>
  ),
};

const IconOnly: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const FullWidth: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button {...args} isFullWidth>
        Full Width
      </Button>
    </>
  ),
};

const Disabled: Story = {
  args: {
    children: "Disabled",
    isDisabled: true,
  },
};

const Pending: Story = {
  args: {
    children: "Pending",
    isPending: true,
  },
};

const RenderProps: Story = {
  render: (args): React.JSX.Element => (
    <Button {...args}>{({ isHovered }): string => (isHovered ? "Hovering" : "Hover")}</Button>
  ),
};

export {
  Default,
  Variants,
  SoftVariants,
  FlatVariants,
  OutlineVariants,
  GhostVariants,
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
