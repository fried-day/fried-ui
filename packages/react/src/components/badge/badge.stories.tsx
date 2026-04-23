import type { Meta, StoryObj } from "@storybook/react";

import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  InformationCircleIcon,
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
    isIconOnly: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Badge content (text or icon)",
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
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "success", "warning", "danger", "info"],
      description:
        "Visual style — status tag colors. **Brand:** primary (default filled), secondary (neutral), accent (brand highlight). **Status:** success (positive/active), warning (caution/pending), danger (negative/error), info (neutral/notice). Use primary for main labels, success for active state, danger for expired/error, info for notices.",
      table: {
        type: {
          summary: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info"',
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
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the badge",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "full"' },
        defaultValue: { summary: "full" },
        category: "Style Variants",
      },
    },
    isIconOnly: {
      control: "boolean",
      description: "Whether the badge is icon-only (square)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    children: "Badge",
  },
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Badge {...args} size="sm">
        Small
      </Badge>

      <Badge {...args} size="md">
        Medium
      </Badge>

      <Badge {...args} size="lg">
        Large
      </Badge>
    </>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
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
    </>
  ),
};

const WithIcon: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Badge {...args} variant="primary">
        <StarIcon slot="icon-start" />
        Featured
      </Badge>

      <Badge {...args} variant="success">
        <CheckCircleIcon slot="icon-start" />
        Verified
      </Badge>

      <Badge {...args} variant="warning">
        <ExclamationTriangleIcon slot="icon-start" />
        Pending
      </Badge>

      <Badge {...args} variant="danger">
        <XCircleIcon slot="icon-start" />
        Expired
      </Badge>

      <Badge {...args} variant="info">
        <InformationCircleIcon slot="icon-start" />
        Beta
      </Badge>
    </>
  ),
};

const IconOnly: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Badge {...args} aria-label="Featured" isIconOnly>
        <StarIcon slot="icon" />
      </Badge>

      <Badge {...args} variant="accent" aria-label="Notification" isIconOnly>
        <BellIcon slot="icon" />
      </Badge>

      <Badge {...args} variant="success" aria-label="Favorite" isIconOnly>
        <HeartIcon slot="icon" />
      </Badge>
    </>
  ),
};

export { Default, Variants, Sizes, Radius, WithIcon, IconOnly };

export default meta;
