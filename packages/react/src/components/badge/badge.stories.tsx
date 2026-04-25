import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_1 from "@fried-ui/assets/story/avatar-1.jpg";

import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { Button } from "../button";
import { Badge, BadgeIndicator, BadgeStatus } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
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
