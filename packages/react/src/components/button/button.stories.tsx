import type { Meta, StoryObj } from "@storybook/react";

import {
  CheckCircleIcon,
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
    isIconOnly: false,
    isFullWidth: false,
    isDisabled: false,
    isPending: false,
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
      options: ["primary", "secondary", "outline", "ghost", "destructive", "overlay", "accent"],
      description:
        "Visual style following Mobbin hierarchy. **Hierarchy:** primary (main CTA — dominant), secondary (paired alt — neutral filled), outline (tertiary — border only), ghost (quaternary — transparent). **Special:** destructive (red — safety-critical like delete), overlay (gray on dark bg — for dark surfaces/media), accent (brand highlight — marketing/promo CTA). Use primary for main action, secondary for cancel pair, outline/ghost for subdued actions, destructive for delete, overlay for dark contexts, accent for promo.",
      table: {
        type: {
          summary: '"primary" | "secondary" | "outline" | "ghost" | "destructive" | "overlay" | "accent"',
        },
        defaultValue: {
          summary: "primary",
        },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description:
        "Size scale matching interactive hierarchy with a consistent +4px step. **xs** (h-7, text-2xs) — inline data-table row actions, dense admin tools, cell-inline buttons in spreadsheet-style UIs. **sm** (h-8, text-xs) — toolbars, dense tables, secondary CTAs in cards. **md** (h-9, text-sm, default) — standard call-to-action across most surfaces, form-aligned with Input md. **lg** (h-10, text-base) — landing pages, marketing CTAs, hero blocks. **xl** (h-11, text-lg) — display CTAs, pricing tiers, splash screens. Use xs only on dense desktop UIs (below WCAG mobile touch target — pair with `::after` hit-area extension for mobile), sm for inline actions and toolbars, md for forms and cards, lg and xl for marketing surfaces where the button must read across a wide viewport.",
      table: {
        type: {
          summary: '"xs" | "sm" | "md" | "lg" | "xl"',
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
      description:
        "Border radius scale shaping the button from a tab to a pill. **none** — architectural sharp edge (data tables, fixed bars). **sm** — subtle softening for tight UIs. **md** (default) — standard CTA roundness, the canonical product button. **lg** — emphasized soft corners for hero buttons. **full** — fully rounded pill, matches search bars and chip-paired actions. Use md for most buttons, full for chip-paired actions, none inside dense data UIs.",
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
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isFullWidth: {
      control: "boolean",
      description: "Whether the button takes full width of its container",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    isPending: {
      control: "boolean",
      description: "Whether the button shows a loading spinner",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onPress: {
      control: false,
      description: "Handler called when the button is pressed",
      table: {
        type: { summary: "(e: PressEvent) => void" },
        category: "Events",
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

      <Button {...args} variant="outline">
        Outline
      </Button>

      <Button {...args} variant="ghost">
        Ghost
      </Button>

      <Button {...args} variant="destructive">
        Destructive
      </Button>

      <Button {...args} variant="accent">
        Accent
      </Button>
    </>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Button {...args} variant="overlay">
        Overlay
      </Button>
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button {...args} size="xs">
        Extra Small
      </Button>

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

      <Button {...args} variant="secondary">
        <InformationCircleIcon slot="icon-start" />
        Info
      </Button>

      <Button {...args} variant="outline">
        <CheckCircleIcon slot="icon-start" />
        Complete
      </Button>

      <Button {...args} variant="destructive">
        <XCircleIcon slot="icon-start" />
        Delete
      </Button>
    </>
  ),
};

const IconOnly: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button {...args} variant="primary" aria-label="Settings" isIconOnly>
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
  args: {
    isFullWidth: true,
    children: "Full Width",
  },
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
    <Button {...args}>{({ isHovered }): string => (isHovered ? "Hovered!" : "Hover")}</Button>
  ),
};

export {
  Default,
  Variants,
  OverlayVariant,
  Sizes,
  Radius,
  Disabled,
  Pending,
  FullWidth,
  WithIcon,
  IconOnly,
  RenderProps,
};

export default meta;
