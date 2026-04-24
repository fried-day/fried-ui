import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback } from "../avatar";
import { Button } from "../button";
import { BellIcon } from "../icons";
import { Badge, BadgeIndicator, BadgeStatus } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
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
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (): React.JSX.Element => (
    <Badge>
      <BellIcon className="size-6" />
      <BadgeIndicator>3</BadgeIndicator>
    </Badge>
  ),
};

const Variants: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator variant="primary">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator variant="secondary">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator variant="accent">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator variant="success">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator variant="warning">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator variant="danger">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator variant="info">3</BadgeIndicator>
      </Badge>
    </div>
  ),
};

const Sizes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator size="xs">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator size="sm">3</BadgeIndicator>
      </Badge>

      <Badge>
        <BellIcon className="size-6" />
        <BadgeIndicator size="md">3</BadgeIndicator>
      </Badge>
    </div>
  ),
};

const NumericOverflow: Story = {
  render: (): React.JSX.Element => (
    <Badge>
      <BellIcon className="size-6" />
      <BadgeIndicator max={99}>{150}</BadgeIndicator>
    </Badge>
  ),
};

const TextLabel: Story = {
  render: (): React.JSX.Element => (
    <Badge>
      <Button>Inbox</Button>
      <BadgeIndicator variant="success">NEW</BadgeIndicator>
    </Badge>
  ),
};

const StatusOnAvatar: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge>
        <Avatar>
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="success" placement="bottom-right" isInset />
      </Badge>

      <Badge>
        <Avatar>
          <AvatarFallback>RT</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="warning" placement="bottom-right" isInset />
      </Badge>

      <Badge>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="danger" placement="bottom-right" isInset />
      </Badge>

      <Badge>
        <Avatar>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>

        <BadgeStatus variant="secondary" placement="bottom-right" isInset />
      </Badge>
    </div>
  ),
};

const IndicatorOnAvatar: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-8">
      <Badge>
        <Avatar>
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>

        <BadgeIndicator placement="top-right" isInset>
          3
        </BadgeIndicator>
      </Badge>

      <Badge>
        <Avatar>
          <AvatarFallback>RT</AvatarFallback>
        </Avatar>

        <BadgeIndicator variant="success" placement="top-right" isInset>
          NEW
        </BadgeIndicator>
      </Badge>
    </div>
  ),
};

const OnButton: Story = {
  render: (): React.JSX.Element => (
    <Badge>
      <Button variant="secondary">Inbox</Button>
      <BadgeIndicator>12</BadgeIndicator>
    </Badge>
  ),
};

const OverlayVariant: Story = {
  render: (): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 to-blue-600 p-16">
      <Badge>
        <div className="inline-flex size-12 items-center justify-center rounded-md bg-background">
          <BellIcon className="size-6" />
        </div>

        <BadgeIndicator variant="overlay">3</BadgeIndicator>
      </Badge>
    </div>
  ),
};

export {
  Default,
  IndicatorOnAvatar,
  NumericOverflow,
  OnButton,
  OverlayVariant,
  Sizes,
  StatusOnAvatar,
  TextLabel,
  Variants,
};

export default meta;
