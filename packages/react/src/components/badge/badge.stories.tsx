import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_1 from "@fried-ui/assets/story/avatar-1.jpg";
import AVATAR_3 from "@fried-ui/assets/story/avatar-3.jpg";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { BellIcon } from "../icons";
import { Badge, BadgeIcon, BadgeIndicator } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  subcomponents: {
    BadgeIndicator,
    BadgeIcon,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: false,
      description:
        "Anchor element (Avatar, Button, Icon) plus a `BadgeIndicator` (text/number) or `BadgeIcon` (icon) subpart. Badge provides the positioning container. For binary presence (online/offline), use the standalone `SignalDot` instead.",
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
      description: "Additional CSS classes on the Badge wrapper.",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args): React.JSX.Element => (
    <Badge {...args}>
      <Avatar>
        <AvatarImage alt="User" src={AVATAR_1} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <BadgeIndicator>NEW</BadgeIndicator>
    </Badge>
  ),
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {(["primary", "secondary", "accent", "success", "warning", "danger", "info"] as const).map((variant) => (
        <Badge key={variant} {...args}>
          <Avatar>
            <AvatarImage alt={variant} src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>

          <BadgeIndicator variant={variant}>NEW</BadgeIndicator>
        </Badge>
      ))}
    </div>
  ),
};

const OverlayVariant: Story = {
  render: (): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 to-blue-600 p-16">
      <Badge>
        <div className="inline-flex size-12 items-center justify-center rounded-md bg-background">
          <Avatar>
            <AvatarImage alt="On overlay" src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
        </div>

        <BadgeIndicator variant="overlay">NEW</BadgeIndicator>
      </Badge>
    </div>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Badge key={size} {...args}>
          <Avatar size={size}>
            <AvatarImage alt={size} src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>

          <BadgeIndicator size={size}>NEW</BadgeIndicator>
        </Badge>
      ))}
    </div>
  ),
};

const ICON_SIZES = [
  { size: "sm", alt: "Icon avatar sm" },
  { size: "md", alt: "Icon avatar md" },
  { size: "lg", alt: "Icon avatar lg" },
] as const;

const IconSizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {ICON_SIZES.map((item) => (
        <Badge key={item.size} {...args}>
          <Avatar size={item.size}>
            <AvatarImage alt={item.alt} src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>

          <BadgeIcon placement="bottom-right" variant="success" size={item.size} />
        </Badge>
      ))}
    </div>
  ),
};

const Borderless: Story = {
  render: (args): React.JSX.Element => (
    <Badge {...args}>
      <Avatar>
        <AvatarImage alt="Borderless" src={AVATAR_1} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <BadgeIndicator isBorderless>NEW</BadgeIndicator>
    </Badge>
  ),
};

const Placements: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {(["top-right", "top-left", "bottom-right", "bottom-left"] as const).map((placement) => (
        <Badge key={placement} {...args}>
          <Avatar>
            <AvatarImage alt={placement} src={AVATAR_1} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>

          <BadgeIndicator placement={placement}>NEW</BadgeIndicator>
        </Badge>
      ))}
    </div>
  ),
};

const NumericOverflow: Story = {
  render: (args): React.JSX.Element => (
    <Badge {...args}>
      <Avatar>
        <AvatarImage alt="Many notifications" src={AVATAR_3} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <BadgeIndicator max={99}>{150}</BadgeIndicator>
    </Badge>
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

const IconContent: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Bell icon" src={AVATAR_1} />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIcon variant="accent">
          <BellIcon className="size-3" />
        </BadgeIcon>
      </Badge>

      <Badge {...args}>
        <Avatar>
          <AvatarImage alt="Single char" src={AVATAR_1} />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIcon variant="danger">5</BadgeIcon>
      </Badge>
    </div>
  ),
};

export {
  Default,
  Variants,
  OverlayVariant,
  Sizes,
  Borderless,
  IconSizes,
  Placements,
  NumericOverflow,
  OnButton,
  IconContent,
};

export default meta;
