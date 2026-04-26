import type { Meta, StoryObj } from "@storybook/react";

import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  InformationCircleIcon,
  StarIcon,
  UserIcon,
  XCircleIcon,
} from "../icons";
import { Chip } from "./Chip";

const AVATAR_SRC = "https://images.unsplash.com/photo-1729017256081-0271b3fcc08e?w=120&auto=format&fit=crop&q=60";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Chip",
    isIconOnly: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Chip content (text, icon, avatar)",
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
      options: ["primary", "secondary", "ghost", "overlay", "accent", "success", "warning", "danger", "info"],
      description:
        "Visual style — category colors. **Brand:** primary (default filled), secondary (neutral), ghost (transparent, minimal), overlay (on dark media/scrim), accent (brand highlight). **Status:** success (positive/active), warning (caution/pending), danger (negative/error), info (neutral/notice). Use primary for main labels, ghost for low-emphasis tags, overlay on images/dark bg, success for active state, danger for expired/error, info for notices.",
      table: {
        type: {
          summary:
            '"primary" | "secondary" | "ghost" | "overlay" | "accent" | "success" | "warning" | "danger" | "info"',
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
      description:
        "Size scale for the chip — display role mirrors Button's tier shifted down by one so Chip stays smaller than Button at every tier (Chip sm = Button xs, Chip md = Button sm, Chip lg = Button md). **sm** (h-7, text-2xs) — dense tag clouds, filter rows, table cell labels. **md** (h-8, text-xs, default) — standard tags and filter chips, smaller than Input md so Chip reads as supporting metadata. **lg** (h-9, text-sm) — emphasized status pills or hero filters, paired with Input md/Button md inline. Use sm in dense list contexts, md for the typical tag UI, lg when chips need to read at a distance such as status banners or large filter rails.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description:
        "Border radius scale shaping the chip from a tab to a pill. **none** — sharp tab look (admin dashboards). **sm** — subtle softening. **md** — standard rounded tag. **lg** — emphasized soft corners. **full** (default) — pill, the canonical chip shape across Material, Apple, and Mobbin. Use full for the typical tag UI, md for square-ish status chips, none in admin or data UIs where chips align with table edges.",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "full"' },
        defaultValue: { summary: "full" },
        category: "Style Variants",
      },
    },
    isIconOnly: {
      control: "boolean",
      description: "Whether the chip is icon-only (square)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isSelected: {
      control: "boolean",
      description: "Whether the chip is in selected state (filter/input chip toggle — adds ring)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the chip is disabled (dims and blocks interactions, including dismiss button)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onPress: {
      control: false,
      description:
        "Click handler for the whole chip (assist/suggestion/filter pattern). When provided, chip renders as a button with hover/focus/pressed states.",
      table: {
        type: { summary: "(e: PressEvent) => void" },
        category: "Events",
      },
    },
    onDismiss: {
      control: false,
      description:
        "Callback fired when the dismiss (×) button is clicked. When provided, renders a dismiss button at the trailing end (filter/input chip pattern).",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    dismissLabel: {
      control: "text",
      description: "Accessible label for the dismiss button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Dismiss"' },
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
} satisfies Meta<typeof Chip>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    children: "Chip",
  },
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="primary">
        Primary
      </Chip>

      <Chip {...args} variant="secondary">
        Secondary
      </Chip>

      <Chip {...args} variant="ghost">
        Ghost
      </Chip>

      <Chip {...args} variant="accent">
        Accent
      </Chip>

      <Chip {...args} variant="success">
        Success
      </Chip>

      <Chip {...args} variant="warning">
        Warning
      </Chip>

      <Chip {...args} variant="danger">
        Danger
      </Chip>

      <Chip {...args} variant="info">
        Info
      </Chip>
    </>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Chip {...args} variant="overlay">
        Overlay
      </Chip>
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} size="sm">
        Small
      </Chip>

      <Chip {...args} size="md">
        Medium
      </Chip>

      <Chip {...args} size="lg">
        Large
      </Chip>
    </>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} radius="none">
        None
      </Chip>

      <Chip {...args} radius="sm">
        Small
      </Chip>

      <Chip {...args} radius="md">
        Medium
      </Chip>

      <Chip {...args} radius="lg">
        Large
      </Chip>

      <Chip {...args} radius="full">
        Full
      </Chip>
    </>
  ),
};

const WithIcon: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="primary">
        <StarIcon slot="icon-start" />
        Featured
      </Chip>

      <Chip {...args} variant="success">
        <CheckCircleIcon slot="icon-start" />
        Verified
      </Chip>

      <Chip {...args} variant="warning">
        <ExclamationTriangleIcon slot="icon-start" />
        Pending
      </Chip>

      <Chip {...args} variant="danger">
        <XCircleIcon slot="icon-start" />
        Expired
      </Chip>

      <Chip {...args} variant="info">
        <InformationCircleIcon slot="icon-start" />
        Beta
      </Chip>
    </>
  ),
};

const WithAvatar: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="secondary">
        <img slot="avatar" alt="" src={AVATAR_SRC} />
        Colm Tuite
      </Chip>

      <Chip {...args} variant="secondary">
        <UserIcon slot="avatar" />
        Guest User
      </Chip>
    </>
  ),
};

const IconOnly: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} aria-label="Featured" isIconOnly>
        <StarIcon slot="icon" />
      </Chip>

      <Chip {...args} variant="accent" aria-label="Notification" isIconOnly>
        <BellIcon slot="icon" />
      </Chip>

      <Chip {...args} variant="success" aria-label="Favorite" isIconOnly>
        <HeartIcon slot="icon" />
      </Chip>
    </>
  ),
};

const Selected: Story = {
  args: {
    isSelected: true,
  },
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="primary">
        Primary
      </Chip>

      <Chip {...args} variant="secondary">
        Secondary
      </Chip>

      <Chip {...args} variant="ghost">
        Ghost
      </Chip>

      <Chip {...args} variant="success">
        Success
      </Chip>

      <Chip {...args} variant="info">
        Info
      </Chip>
    </>
  ),
};

const Clickable: Story = {
  args: {
    onPress: (): void => {},
  },
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="primary">
        Assist
      </Chip>

      <Chip {...args} variant="secondary">
        <StarIcon slot="icon-start" />
        Suggestion
      </Chip>

      <Chip {...args} variant="ghost">
        Filter
      </Chip>
    </>
  ),
};

const Dismissible: Story = {
  args: {
    onDismiss: (): void => {},
  },
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="secondary">
        React
      </Chip>

      <Chip {...args} variant="secondary">
        TypeScript
      </Chip>

      <Chip {...args} variant="secondary">
        <img slot="avatar" alt="" src={AVATAR_SRC} />
        Colm Tuite
      </Chip>

      <Chip {...args} variant="primary">
        Tailwind
      </Chip>
    </>
  ),
};

const FilterChip: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="ghost" onPress={(): void => {}}>
        All
      </Chip>

      <Chip {...args} variant="ghost" onPress={(): void => {}} isSelected>
        Design
      </Chip>

      <Chip {...args} variant="ghost" onPress={(): void => {}} onDismiss={(): void => {}} isSelected>
        Engineering
      </Chip>

      <Chip {...args} variant="ghost" onPress={(): void => {}}>
        Marketing
      </Chip>
    </>
  ),
};

const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args): React.JSX.Element => (
    <>
      <Chip {...args} variant="primary">
        Primary
      </Chip>

      <Chip {...args} variant="secondary" onDismiss={(): void => {}}>
        Dismissible
      </Chip>

      <Chip {...args} variant="ghost" onPress={(): void => {}}>
        Clickable
      </Chip>
    </>
  ),
};

export {
  Default,
  Variants,
  OverlayVariant,
  Sizes,
  Radius,
  Selected,
  Disabled,
  Clickable,
  WithIcon,
  WithAvatar,
  IconOnly,
  Dismissible,
  FilterChip,
};

export default meta;
