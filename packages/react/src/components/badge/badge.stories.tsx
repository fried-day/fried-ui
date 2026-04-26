import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_1 from "@fried-ui/assets/story/avatar-1.jpg";

import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { Button } from "../button";
import { Badge, BadgeIndicator, BadgeStatus } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  subcomponents: {
    BadgeIndicator,
    BadgeStatus,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: false,
      description:
        "Anchor element plus `BadgeIndicator` or `BadgeStatus` subpart. Badge provides the positioning container.",
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
    className: {
      control: "text",
      description: "Additional CSS classes on the Badge wrapper",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "success", "warning", "danger", "info", "overlay"],
      description:
        "Visual style for `BadgeIndicator` (count/label, default `danger`) and `BadgeStatus` (presence dot, default `success`). **Brand:** primary (main brand color), secondary (neutral gray), accent (purple highlight for promo). **Status:** success (online/active), warning (away/pending), danger (busy/unread/error), info (notification or notice). **Dark contexts:** overlay (light dot or pill on dark scrim or media surfaces). Use danger for unread counts, success for online presence, warning for away, accent for promo or featured user, overlay on dark hero blocks.",
      table: {
        type: { summary: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay"' },
        defaultValue: { summary: "danger (Indicator), success (Status)" },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
      description:
        "Size scale shared by `BadgeIndicator` (count pill) and `BadgeStatus` (dot). **xs** — minimum-legible 14px pill / 4px dot for very dense rows. **sm** — 16px pill / 6px dot for compact lists. **md** (default) — 20px pill / 8px dot for standard rows. Pair with the anchor's size — xs/sm beside Avatar size-6, md beside Avatar size-8 and above.",
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
        "Corner of the wrapped anchor where the indicator or status dot sits. **top-right** (default for `BadgeIndicator`) — count badges on Avatars/Buttons. **bottom-right** (default for `BadgeStatus`) — presence dot on Avatars. **top-left / bottom-left** — when locale or layout reverses reading direction. Pick the corner that matches reading flow and keeps the dot away from anchor content.",
      table: {
        type: { summary: '"top-right" | "top-left" | "bottom-right" | "bottom-left"' },
        defaultValue: { summary: "top-right (Indicator), bottom-right (Status)" },
        category: "Style Variants",
      },
    },
    isInset: {
      control: "boolean",
      description:
        "Whether the indicator/status sits inside the anchor's perimeter (true) or hangs over the corner edge (false). Use `true` with round anchors such as Avatar so the badge lands on the circle's 45-degree edge — looks cleaner than the floating-corner default.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    max: {
      control: "number",
      description:
        "BadgeIndicator only — caps numeric children. Renders as `${max}+` when the child number exceeds `max` (e.g., `<BadgeIndicator max={99}>{150}</BadgeIndicator>` shows `99+`).",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "99" },
        category: "State",
      },
    },
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args): React.JSX.Element => (
    <Badge {...args}>
      <Avatar>
        <AvatarImage alt="Avatar" src={AVATAR_1} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <BadgeIndicator isInset>3</BadgeIndicator>
    </Badge>
  ),
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="primary">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="secondary">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="accent">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="success">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="warning">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="danger">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="info">3</BadgeIndicator>
      </Badge>
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator size="xs">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator size="sm">3</BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator size="md">3</BadgeIndicator>
      </Badge>
    </div>
  ),
};

const NumericOverflow: Story = {
  render: (args): React.JSX.Element => (
    <Badge {...args}>
      <Avatar>
        <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <BadgeIndicator max={99}>{150}</BadgeIndicator>
    </Badge>
  ),
};

const TextLabel: Story = {
  render: (args): React.JSX.Element => (
    <Badge {...args}>
      <Button>Inbox</Button>
      <BadgeIndicator variant="success">NEW</BadgeIndicator>
    </Badge>
  ),
};

const StatusOnAvatar: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge {...args}>
        <Avatar>
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="success" placement="bottom-right" isInset />
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarFallback>MO</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="warning" placement="bottom-right" isInset />
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="danger" placement="bottom-right" isInset />
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="secondary" placement="bottom-right" isInset />
      </Badge>
    </div>
  ),
};

const IndicatorOnAvatar: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge {...args}>
        <Avatar>
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator placement="top-right" isInset>
          3
        </BadgeIndicator>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarFallback>MO</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="success" placement="top-right" isInset>
          NEW
        </BadgeIndicator>
      </Badge>
    </div>
  ),
};

const OnButton: Story = {
  render: (args): React.JSX.Element => (
    <Badge {...args}>
      <Button variant="secondary">Inbox</Button>
      <BadgeIndicator>12</BadgeIndicator>
    </Badge>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 to-blue-600 p-16">
      <Badge {...args}>
        <div className="inline-flex size-12 items-center justify-center rounded-md bg-background">
          <Avatar>
            <AvatarImage alt="Avatar" src="https://example.com/avatar.jpg" />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
        </div>

        <BadgeIndicator variant="overlay">3</BadgeIndicator>
      </Badge>
    </div>
  ),
};

export {
  Default,
  Variants,
  OverlayVariant,
  Sizes,
  IndicatorOnAvatar,
  NumericOverflow,
  OnButton,
  StatusOnAvatar,
  TextLabel,
};

export default meta;
