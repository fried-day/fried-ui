import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_1 from "@fried-ui/assets/story/avatar-1.jpg";

import AVATAR_2 from "@fried-ui/assets/story/avatar-2.jpg";
import AVATAR_3 from "@fried-ui/assets/story/avatar-3.jpg";
import { CLASS_NAME_ARG_TYPE } from "../../storybook/argtypes";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { UserIcon } from "../icons";
import { AvatarGroup, AvatarGroupCounter } from "./AvatarGroup";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  subcomponents: {
    AvatarGroupCounter,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: false,
      description:
        "A sequence of `<Avatar />` siblings, optionally followed by an `<AvatarGroupCounter />` for the overflow indicator.",
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
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description:
        "Size scale applied to every avatar in the group on a `sqrt(phi)` ratio so adjacent sizes are visibly distinguishable. **Compact:** xs (24px) — inline metadata, count-first activity indicators; sm (32px) — dense rosters, compact toolbars. **Standard:** md (40px, default) — team and member rosters, attendee lists. **Emphasis:** lg (52px) — featured contributors, emphasized cards; xl (64px) — hero showcases, marketing spotlights. Use xs/sm when count matters more than identity, md as default, lg/xl when individual face recognition is essential.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    spacing: {
      control: "select",
      options: ["tighter", "tight", "default", "wide", "wider"],
      description:
        "Overlap amount between adjacent avatars (mirrors Tailwind `tracking-*` letter-spacing semantics applied horizontally to avatar stacking). **tighter** — 35% overlap, densest pack for long activity logs, contributor counts, or dense tables. **tight** — 30% overlap, compact stack for rosters where count matters more than identity. **default** — 20% overlap, balanced social-proof look for team/attendee groups. **wide** — 10% overlap, airy layout that preserves face recognition for profile highlights. **wider** — 5% overlap, nearly separated tiles for hero sections or showcase marketing blocks where each face is the focal point.",
      table: {
        type: { summary: '"tighter" | "tight" | "default" | "wide" | "wider"' },
        defaultValue: { summary: "default" },
        category: "Style Variants",
      },
    },
    isBorderless: {
      control: "boolean",
      description:
        "Whether the group hides the 2px outline around each avatar — produces a solid stack with no background-colored separator. The default keeps the outline for visual clarity on overlapping avatars.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isHoverable: {
      control: "boolean",
      description:
        "Whether avatars lift on hover — adds a subtle upward scale and z-index boost when the cursor enters an avatar. The default keeps avatars static, ideal for read-only rosters or dense activity logs where pointer hover is incidental.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    className: CLASS_NAME_ARG_TYPE,
  },
} satisfies Meta<typeof AvatarGroup>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <AvatarGroup {...args} key={size} size={size}>
          <Avatar>
            <AvatarImage alt="Avatar 1" src={AVATAR_1} />
            <AvatarFallback>A1</AvatarFallback>
          </Avatar>

          <Avatar>
            <AvatarImage alt="Avatar 2" src={AVATAR_2} />
            <AvatarFallback>A2</AvatarFallback>
          </Avatar>

          <Avatar>
            <AvatarImage alt="Avatar 3" src={AVATAR_3} />
            <AvatarFallback>A3</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      ))}
    </div>
  ),
};

const Spacing: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      {(["wider", "wide", "default", "tight", "tighter"] as const).map((spacing) => (
        <AvatarGroup {...args} key={spacing} spacing={spacing}>
          <Avatar>
            <AvatarImage alt="Avatar 1" src={AVATAR_1} />
            <AvatarFallback>A1</AvatarFallback>
          </Avatar>

          <Avatar>
            <AvatarImage alt="Avatar 2" src={AVATAR_2} />
            <AvatarFallback>A2</AvatarFallback>
          </Avatar>

          <Avatar>
            <AvatarImage alt="Avatar 3" src={AVATAR_3} />
            <AvatarFallback>A3</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      ))}
    </div>
  ),
};

const Borderless: Story = {
  args: {
    isBorderless: true,
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const Hoverable: Story = {
  args: {
    isHoverable: true,
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const WithCounter: Story = {
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <AvatarGroupCounter aria-label="42 more">+42</AvatarGroupCounter>
    </AvatarGroup>
  ),
};

const WithTextCounter: Story = {
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <AvatarGroupCounter variant="text" aria-label="10234 more">
        +10.2K
      </AvatarGroupCounter>
    </AvatarGroup>
  ),
};

const WithFallback: Story = {
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarFallback>FR</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback variant="danger">NA</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback variant="accent">
          <UserIcon className="size-5" />
        </AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const StandaloneCounter: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <AvatarGroupCounter aria-label="42 more">+42</AvatarGroupCounter>

      <AvatarGroupCounter variant="text" aria-label="10234 more">
        +10.2K
      </AvatarGroupCounter>
    </div>
  ),
};

export {
  Default,
  Sizes,
  Spacing,
  Borderless,
  Hoverable,
  WithCounter,
  WithTextCounter,
  WithFallback,
  StandaloneCounter,
};

export default meta;
