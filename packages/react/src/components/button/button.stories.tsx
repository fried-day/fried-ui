import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";

import { CLASS_NAME_ARG_TYPE } from "../../storybook/argtypes";

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
      options: ["sm", "md", "lg", "xl"],
      description:
        "Size scale on a `sqrt(phi) ≈ 1.272` ratio so adjacent sizes clear the perceptual JND threshold. **sm** (h-8, text-xs) — toolbars, dense tables, secondary CTAs in cards. **md** (h-10, text-base, default) — standard call-to-action across most surfaces, form-aligned with Input md. **lg** (h-13, text-xl) — landing pages, marketing CTAs, hero blocks. **xl** (h-16, text-2xl) — display CTAs, pricing tiers, splash screens. Use sm for inline actions and toolbars, md for forms and cards, lg and xl for marketing surfaces where the button must read across a wide viewport.",
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
    className: CLASS_NAME_ARG_TYPE,
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
      <Button variant="primary" {...args}>
        Primary
      </Button>

      <Button variant="secondary" {...args}>
        Secondary
      </Button>

      <Button variant="outline" {...args}>
        Outline
      </Button>

      <Button variant="ghost" {...args}>
        Ghost
      </Button>

      <Button variant="destructive" {...args}>
        Destructive
      </Button>

      <Button variant="accent" {...args}>
        Accent
      </Button>
    </>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 to-blue-600 p-16">
      <Button variant="overlay" {...args}>
        Overlay
      </Button>
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button size="sm" {...args}>
        Small
      </Button>

      <Button size="md" {...args}>
        Medium
      </Button>

      <Button size="lg" {...args}>
        Large
      </Button>

      <Button size="xl" {...args}>
        Extra Large
      </Button>
    </>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button radius="none" {...args}>
        None
      </Button>

      <Button radius="sm" {...args}>
        Small
      </Button>

      <Button radius="md" {...args}>
        Medium
      </Button>

      <Button radius="lg" {...args}>
        Large
      </Button>

      <Button radius="full" {...args}>
        Full
      </Button>
    </>
  ),
};

const WithIcon: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button variant="primary" {...args}>
        <PlusIcon slot="icon-start" />
        Create
      </Button>

      <Button variant="secondary" {...args}>
        <InformationCircleIcon slot="icon-start" />
        Info
      </Button>

      <Button variant="outline" {...args}>
        <CheckCircleIcon slot="icon-start" />
        Complete
      </Button>

      <Button variant="destructive" {...args}>
        <XCircleIcon slot="icon-start" />
        Delete
      </Button>
    </>
  ),
};

const IconOnly: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Button variant="primary" aria-label="Settings" isIconOnly {...args}>
        <SettingsIcon className="size-match-font" />
      </Button>

      <Button variant="secondary" aria-label="More" isIconOnly {...args}>
        <MoreIcon className="size-match-font" />
      </Button>

      <Button variant="outline" aria-label="Add" isIconOnly {...args}>
        <PlusIcon className="size-match-font" />
      </Button>

      <Button variant="ghost" aria-label="Share" isIconOnly {...args}>
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
    onPress: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /disabled/i });

    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onPress).not.toHaveBeenCalled();
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
