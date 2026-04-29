import type { Meta, StoryObj } from "@storybook/react";

import { CLASS_NAME_ARG_TYPE } from "../../storybook/argtypes";

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
      options: ["sm", "md", "lg", "xl"],
      description:
        "Size scale on the display-role rhythm — anchored at text-sm (14px) so chips sit one Tailwind step below form-aligned Button and Input at the same tier name. Geometry scales via em formulas — height, padding, and gap recompute proportionally per tier; only font-size shifts across tiers. **sm** (text-xs) — dense tag clouds, filter rows, table cell labels. **md** (text-sm, default) — standard tags and filter chips paired with Input md inline. **lg** (text-base) — emphasized status pills or hero filters paired with Input lg. **xl** (text-lg) — large display chips for marketing surfaces or status banners. Use md for the typical tag UI, sm in dense list contexts, lg/xl for marketing emphasis.",
      table: {
        type: { summary: '"sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "full"],
      description:
        "Border radius scale shaping the chip from a tab to a pill. Fixed-px tokens independent of font-size so chips align with peer surfaces (Button, Card) by absolute radius. **none** — sharp tab look (admin dashboards). **xs** (2px) — micro softening for tight chip rows. **sm** (4px) — subtle softening. **md** (6px) — standard rounded tag. **lg** (8px) — emphasized soft corners. **full** (default) — pill, the canonical chip shape across Material, Apple, and Mobbin. Use full for the typical tag UI, md for square-ish status chips, none in admin or data UIs where chips align with table edges.",
      table: {
        type: { summary: '"none" | "xs" | "sm" | "md" | "lg" | "full"' },
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
    className: CLASS_NAME_ARG_TYPE,
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
      <Chip variant="primary" {...args}>
        Primary
      </Chip>

      <Chip variant="secondary" {...args}>
        Secondary
      </Chip>

      <Chip variant="ghost" {...args}>
        Ghost
      </Chip>

      <Chip variant="accent" {...args}>
        Accent
      </Chip>

      <Chip variant="success" {...args}>
        Success
      </Chip>

      <Chip variant="warning" {...args}>
        Warning
      </Chip>

      <Chip variant="danger" {...args}>
        Danger
      </Chip>

      <Chip variant="info" {...args}>
        Info
      </Chip>
    </>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 to-blue-600 p-16">
      <Chip variant="overlay" {...args}>
        Overlay
      </Chip>
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip size="sm" {...args}>
        Small
      </Chip>

      <Chip size="md" {...args}>
        Medium
      </Chip>

      <Chip size="lg" {...args}>
        Large
      </Chip>

      <Chip size="xl" {...args}>
        Extra Large
      </Chip>
    </>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip radius="none" {...args}>
        None
      </Chip>

      <Chip radius="xs" {...args}>
        Extra Small
      </Chip>

      <Chip radius="sm" {...args}>
        Small
      </Chip>

      <Chip radius="md" {...args}>
        Medium
      </Chip>

      <Chip radius="lg" {...args}>
        Large
      </Chip>

      <Chip radius="full" {...args}>
        Full
      </Chip>
    </>
  ),
};

const WithIcon: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip variant="primary" {...args}>
        <StarIcon slot="icon-start" />
        Featured
      </Chip>

      <Chip variant="success" {...args}>
        <CheckCircleIcon slot="icon-start" />
        Verified
      </Chip>

      <Chip variant="warning" {...args}>
        <ExclamationTriangleIcon slot="icon-start" />
        Pending
      </Chip>

      <Chip variant="danger" {...args}>
        <XCircleIcon slot="icon-start" />
        Expired
      </Chip>

      <Chip variant="info" {...args}>
        <InformationCircleIcon slot="icon-start" />
        Beta
      </Chip>
    </>
  ),
};

const WithAvatar: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip variant="secondary" {...args}>
        <img slot="avatar" alt="" src={AVATAR_SRC} />
        {"Colm Tuite"}
      </Chip>

      <Chip variant="secondary" {...args}>
        <UserIcon slot="avatar" />
        Guest User
      </Chip>
    </>
  ),
};

const IconOnly: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip aria-label="Featured" isIconOnly {...args}>
        <StarIcon slot="icon" />
      </Chip>

      <Chip variant="accent" aria-label="Notification" isIconOnly {...args}>
        <BellIcon slot="icon" />
      </Chip>

      <Chip variant="success" aria-label="Favorite" isIconOnly {...args}>
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
      <Chip variant="primary" {...args}>
        Primary
      </Chip>

      <Chip variant="secondary" {...args}>
        Secondary
      </Chip>

      <Chip variant="ghost" {...args}>
        Ghost
      </Chip>

      <Chip variant="success" {...args}>
        Success
      </Chip>

      <Chip variant="info" {...args}>
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
      <Chip variant="primary" {...args}>
        Assist
      </Chip>

      <Chip variant="secondary" {...args}>
        <StarIcon slot="icon-start" />
        Suggestion
      </Chip>

      <Chip variant="ghost" {...args}>
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
      <Chip variant="secondary" {...args}>
        React
      </Chip>

      <Chip variant="secondary" {...args}>
        TypeScript
      </Chip>

      <Chip variant="secondary" {...args}>
        <img slot="avatar" alt="" src={AVATAR_SRC} />
        {"Colm Tuite"}
      </Chip>

      <Chip variant="primary" {...args}>
        Tailwind
      </Chip>
    </>
  ),
};

const FilterChip: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Chip variant="ghost" onPress={(): void => {}} {...args}>
        All
      </Chip>

      <Chip variant="ghost" onPress={(): void => {}} isSelected {...args}>
        Design
      </Chip>

      <Chip variant="ghost" onPress={(): void => {}} onDismiss={(): void => {}} isSelected {...args}>
        Engineering
      </Chip>

      <Chip variant="ghost" onPress={(): void => {}} {...args}>
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
      <Chip variant="primary" {...args}>
        Primary
      </Chip>

      <Chip variant="secondary" onDismiss={(): void => {}} {...args}>
        Dismissible
      </Chip>

      <Chip variant="ghost" onPress={(): void => {}} {...args}>
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
