import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback } from "../avatar";
import { BellIcon } from "../icons";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: 3,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Badge content (number for count, text for status label, or empty when isDot)",
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
      options: ["primary", "secondary", "accent", "success", "warning", "danger", "info", "overlay"],
      description:
        "Visual style — category colors for the badge fill. **Brand:** primary (neutral emphasis), secondary (low contrast), accent (brand highlight), overlay (on dark media/scrim). **Status:** success (positive/active), warning (caution), danger (default — notifications/errors), info (neutral notice). Use danger for notification counts, success for active/online, warning for pending, overlay on images or dark backgrounds.",
      table: {
        type: {
          summary: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay"',
        },
        defaultValue: { summary: "danger" },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
      description:
        "Size scale. **xs** — compact dot or tight layouts. **sm** — dense lists. **md** (default) — standard overlay count.",
      table: {
        type: { summary: '"xs" | "sm" | "md"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    placement: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description:
        "Placement corner relative to the anchor. **top-right** (default) — notification count, standard M3 position. **top-left** — icon badge in LTR contexts. **bottom-right** — presence/online dot on avatars. **bottom-left** — rarely used, secondary indicator.",
      table: {
        type: { summary: '"top-right" | "top-left" | "bottom-right" | "bottom-left"' },
        defaultValue: { summary: "top-right" },
        category: "Style Variants",
      },
    },
    isDot: {
      control: "boolean",
      description: "Whether the badge is a dot-only indicator (no content, small circle)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isStandalone: {
      control: "boolean",
      description: "Whether the badge renders in-flow without absolute positioning",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    max: {
      control: "number",
      description: "Cap numeric children — render as `${max}+` when exceeded",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "99" },
        category: "Children",
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
  decorators: [
    (Story): React.JSX.Element => (
      <div className="relative inline-flex size-12 items-center justify-center rounded-md bg-secondary">
        <BellIcon className="size-6" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-6">
      <Badge {...args} variant="primary" />
      <Badge {...args} variant="secondary" />
      <Badge {...args} variant="accent" />
      <Badge {...args} variant="success" />
      <Badge {...args} variant="warning" />
      <Badge {...args} variant="danger" />
      <Badge {...args} variant="info" />
    </div>
  ),
  decorators: [
    (Story): React.JSX.Element => (
      <div className="flex flex-wrap items-center gap-6 p-8">
        <Story />
      </div>
    ),
  ],
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-6">
      <Badge {...args} size="xs" />
      <Badge {...args} size="sm" />
      <Badge {...args} size="md" />
    </div>
  ),
  decorators: [
    (Story): React.JSX.Element => (
      <div className="flex flex-wrap items-center gap-6 p-8">
        <Story />
      </div>
    ),
  ],
};

const AllPlacements: Story = {
  render: (args): React.JSX.Element => (
    <div className="grid grid-cols-2 gap-10">
      <div className="relative inline-flex size-12 items-center justify-center rounded-md bg-secondary">
        <BellIcon className="size-6" />
        <Badge {...args} placement="top-right" />
      </div>

      <div className="relative inline-flex size-12 items-center justify-center rounded-md bg-secondary">
        <BellIcon className="size-6" />
        <Badge {...args} placement="top-left" />
      </div>

      <div className="relative inline-flex size-12 items-center justify-center rounded-md bg-secondary">
        <BellIcon className="size-6" />
        <Badge {...args} placement="bottom-right" />
      </div>

      <div className="relative inline-flex size-12 items-center justify-center rounded-md bg-secondary">
        <BellIcon className="size-6" />
        <Badge {...args} placement="bottom-left" />
      </div>
    </div>
  ),
  decorators: [
    (Story): React.JSX.Element => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

const Dot: Story = {
  args: {
    isDot: true,
    children: "",
  },
};

const NumericOverflow: Story = {
  args: {
    max: 99,
    children: 150,
  },
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-[640px] items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <div className="relative inline-flex size-12 items-center justify-center rounded-md bg-background">
        <BellIcon className="size-6" />
        <Badge {...args} variant="overlay" />
      </div>
    </div>
  ),
  decorators: [(Story): React.JSX.Element => <Story />],
};

const Standalone: Story = {
  args: {
    isStandalone: true,
  },
  decorators: [(Story): React.JSX.Element => <Story />],
};

const OnAvatar: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative inline-flex">
        <Avatar>
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <Badge {...args} variant="success" placement="bottom-right" isDot />
      </div>

      <div className="relative inline-flex">
        <Avatar>
          <AvatarFallback>RT</AvatarFallback>
        </Avatar>

        <Badge {...args} variant="warning" placement="bottom-right" isDot />
      </div>

      <div className="relative inline-flex">
        <Avatar>
          <AvatarFallback>YK</AvatarFallback>
        </Avatar>

        <Badge {...args} variant="danger" placement="bottom-right" isDot />
      </div>
    </div>
  ),
  decorators: [(Story): React.JSX.Element => <Story />],
};

export { Default, Variants, Sizes, AllPlacements, Dot, NumericOverflow, OverlayVariant, Standalone, OnAvatar };

export default meta;
