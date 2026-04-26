import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_1 from "@fried-ui/assets/story/avatar-1.jpg";
import AVATAR_2 from "@fried-ui/assets/story/avatar-2.jpg";
import AVATAR_3 from "@fried-ui/assets/story/avatar-3.jpg";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { AvatarGroup } from "./AvatarGroup";

import { UserIcon } from "../icons";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: false,
      description: "A collection of `<Avatar />` elements to render in the stack",
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
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description:
        "Size scale applied to every avatar in the group. **xs** (size-6, 24px) — inline hints, comment metadata, dense tables. **sm** (size-8, 32px) — dense toolbars, compact lists. **md** (size-9, 36px, default) — standard team/member rosters, form-aligned with Input/Button md. **lg** (size-10, 40px) — emphasized cards, profile headers. **xl** (size-12, 48px) — hero sections, featured contributors. **2xl** (size-14, 56px) — showcase blocks, marketing pages. Use xs/sm when count matters more than identity, md as default, lg/xl/2xl when individual face recognition is important.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"' },
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
    max: {
      control: "number",
      description: "Maximum number of avatars before collapsing the rest into a +N counter",
      table: {
        type: { summary: "number" },
        category: "State",
      },
    },
    total: {
      control: "number",
      description: "Override for the +N counter (defaults to the number of children)",
      table: {
        type: { summary: "number" },
        category: "State",
      },
    },
    counterVariant: {
      control: "select",
      options: ["fallback", "text"],
      description:
        "Counter render mode for the hidden-avatar count. **fallback** (default) — renders the +N as another circular Avatar inside the stack, ideal for dense rosters and contributor strips where every slot reads as a face-shaped tile. **text** — renders compact-notation text (`+10K`, `+1.2M`) beside the stack, ideal for hero banners and social-proof rows where the count itself is the message. Pair `text` with a high `total` (e.g. attendee count, view count) and a small `max` so the stack stays balanced beside the figure.",
      table: {
        type: { summary: '"fallback" | "text"' },
        defaultValue: { summary: "fallback" },
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
      description: "Whether avatars lift on hover",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
} satisfies Meta<typeof AvatarGroup>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    children: [
      <Avatar key="a1">
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>,
      <Avatar key="a2">
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>,
      <Avatar key="a3">
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>,
    ],
  },
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <AvatarGroup {...args} size="xs">
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

      <AvatarGroup {...args} size="sm">
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

      <AvatarGroup {...args} size="md">
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

      <AvatarGroup {...args} size="lg">
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

      <AvatarGroup {...args} size="xl">
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

      <AvatarGroup {...args} size="2xl">
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
    </div>
  ),
};

const Spacing: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <AvatarGroup {...args} spacing="wider">
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

      <AvatarGroup {...args} spacing="wide">
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

      <AvatarGroup {...args} spacing="default">
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

      <AvatarGroup {...args} spacing="tight">
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

      <AvatarGroup {...args} spacing="tighter">
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

const WithMax: Story = {
  args: {
    max: 3,
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

      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A6</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const WithTotal: Story = {
  args: {
    max: 3,
    total: 42,
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

const WithFallback: Story = {
  args: {
    max: 4,
  },
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

const WithTextCounter: Story = {
  args: {
    max: 7,
    total: 10234,
    counterVariant: "text",
    size: "lg",
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

      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={AVATAR_2} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={AVATAR_3} />
        <AvatarFallback>A6</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A7</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

export { Default, Sizes, Spacing, Borderless, Hoverable, WithMax, WithTotal, WithFallback, WithTextCounter };

export default meta;
