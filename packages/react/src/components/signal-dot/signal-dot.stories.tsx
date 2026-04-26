import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_1 from "@fried-ui/assets/story/avatar-1.jpg";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { SignalDot } from "./SignalDot";

const meta: Meta<typeof SignalDot> = {
  title: "Components/SignalDot",
  component: SignalDot,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: false,
      description:
        "Anchor element (Avatar, Button, Icon) the dot positions at the corner of. Optional — when omitted, the dot renders against an empty wrapper.",
      type: {
        name: "other",
        value: "ReactNode",
        required: false,
      },
      table: {
        type: { summary: "ReactNode" },
        category: "Children",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes appended to the wrapper.",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "success", "warning", "danger", "info", "overlay"],
      description:
        "Visual style — semantic dot color. **Brand:** primary (default focus), secondary (neutral gray), accent (brand highlight). **Status:** success (online/active), warning (away/pending), danger (busy/error), info (notice/unread). **Surface:** overlay (on dark media or scrim). Use success for online presence, danger for busy or unread alerts, warning for away states, info for neutral notifications, primary as the generic attention dot.",
      table: {
        type: {
          summary: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay"',
        },
        defaultValue: { summary: "primary" },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Size scale of the dot. **sm** (size-1, 4px) — dense lists, compact toolbars, navigation icons. **md** (size-1.5, 6px, default) — standard avatar presence, matches Material Design 3 small badge. **lg** (size-2, 8px) — emphasized presence, hero avatars, profile headers where the status reads at a glance. Pair the size with the parent anchor scale: sm with avatar sm, md with avatar md, lg with avatar lg or larger.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    placement: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description:
        "Placement corner relative to the wrapped anchor. **top-right** (default) — standard notification or unread placement, matches Material Design 3 upper trailing edge. **top-left** — mirrors the default for right-to-left layouts or when the right edge holds a primary action. **bottom-right** — common for online-presence dots on avatars. **bottom-left** — used when the bottom-right is reserved for an action chip. Choose top-right for alerts and bottom-right for presence.",
      table: {
        type: { summary: '"top-right" | "top-left" | "bottom-right" | "bottom-left"' },
        defaultValue: { summary: "top-right" },
        category: "Style Variants",
      },
    },
    isBorderless: {
      control: "boolean",
      description:
        "Whether the halo border (page-background colored, separates the dot from the anchor) is hidden — set to `true` when the dot sits on a matching surface.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
  },
} satisfies Meta<typeof SignalDot>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args): React.JSX.Element => (
    <SignalDot {...args}>
      <Avatar>
        <AvatarImage alt="User" src={AVATAR_1} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>
    </SignalDot>
  ),
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      {(["primary", "secondary", "accent", "success", "warning", "danger", "info"] as const).map((variant) => (
        <SignalDot {...args} key={variant} variant={variant}>
          <Avatar>
            <AvatarImage alt={variant} src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
        </SignalDot>
      ))}
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <SignalDot {...args} variant="success" key={size} size={size}>
          <Avatar size={size}>
            <AvatarImage alt={size} src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
        </SignalDot>
      ))}
    </div>
  ),
};

const Borderless: Story = {
  render: (args): React.JSX.Element => (
    <SignalDot {...args} variant="success" isBorderless>
      <Avatar>
        <AvatarImage alt="Borderless" src={AVATAR_1} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>
    </SignalDot>
  ),
};

const Placements: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      {(["top-right", "top-left", "bottom-right", "bottom-left"] as const).map((placement) => (
        <SignalDot {...args} variant="success" key={placement} placement={placement}>
          <Avatar>
            <AvatarImage alt={placement} src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
        </SignalDot>
      ))}
    </div>
  ),
};

export { Default, Variants, Sizes, Borderless, Placements };

export default meta;
