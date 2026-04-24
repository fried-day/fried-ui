import type { Meta, StoryObj } from "@storybook/react";

import SAMPLE_AVATAR_1 from "@fried-ui/assets/story/avatar-01.png";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { AvatarGroup } from "./AvatarGroup";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
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
        "Size scale applied to every avatar in the group. **xs** (size-6, 24px) — inline hints, comment metadata, dense tables. **sm** (size-8, 32px) — dense toolbars, compact lists. **md** (size-10, 40px, default) — standard team/member rosters. **lg** (size-12, 48px) — emphasized cards, profile headers. **xl** (size-14, 56px) — hero sections, featured contributors. **2xl** (size-16, 64px) — showcase blocks, marketing pages. Use xs/sm when count matters more than identity, md as default, lg/xl/2xl when individual face recognition is important.",
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
    isHoverable: {
      control: "boolean",
      description: "Whether avatars lift on hover",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    counterVariant: {
      control: "select",
      options: ["avatar", "text"],
      description:
        "Counter display style when more avatars are hidden than shown. **avatar** (default) renders an Avatar-sized `+N` circle at the end of the stack — matches the visual weight of the avatars and works well for small hidden counts (e.g. `+2`, `+39`). **text** renders plain inline text beside the stack using compact number notation (e.g. `+10K`, `+1.5K`) — suited for large counts where an avatar-sized circle is overkill or visually heavy. Use avatar for team rosters or attendee lists with modest overflow, text for social-proof banners or follower counts at scale.",
      table: {
        type: { summary: '"avatar" | "text"' },
        defaultValue: { summary: "avatar" },
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
        <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>,
      <Avatar key="a2">
        <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>,
      <Avatar key="a3">
        <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>,
    ],
  },
};

const WithMax: Story = {
  args: {
    max: 3,
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 4" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 5" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 6" src={SAMPLE_AVATAR_1} />
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
        <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const Spacing: Story = {
  render: (args): React.JSX.Element => (
    <>
      <AvatarGroup {...args} spacing="wider">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} spacing="wide">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} spacing="default">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} spacing="tight">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} spacing="tighter">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <AvatarGroup {...args} size="xs">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="sm">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="md">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="lg">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="xl">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="2xl">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </>
  ),
};

const WithFallback: Story = {
  args: {
    max: 4,
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>A6</AvatarFallback>
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
        <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 4" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const WithTextCounter: Story = {
  args: {
    max: 7,
    total: 10000,
    counterVariant: "text",
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 4" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 5" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 6" src={SAMPLE_AVATAR_1} />
        <AvatarFallback>A6</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

export { Default, WithMax, WithTotal, WithTextCounter, Spacing, Sizes, Hoverable, WithFallback };

export default meta;
