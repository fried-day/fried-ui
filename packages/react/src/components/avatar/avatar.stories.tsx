import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_GIRL from "@fried-ui/assets/story/avatar-girl.jpg";

import { UserIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
  argTypes: {
    children: {
      control: false,
      description: "Compound children — `<AvatarImage />` and `<AvatarFallback />`",
      table: {
        type: { summary: "ReactNode" },
        category: "Children",
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description:
        "Size scale of the avatar circle. **xs** (size-6) — dense list rows or chat avatars beside a username. **sm** (size-8) — compact tables, comment threads. **md** (size-10, default) — standard cards and member lists. **lg** (size-12) — profile headers. **xl** (size-14) — hero blocks. **2xl** (size-16) — settings pages or large profile views. Use md as the default; reach for xs and sm in dense lists, lg and above for emphasized profile contexts.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description:
        "Border radius scale shaping the avatar from a square to a pill. **none** — sharp square (logos, brand glyphs). **sm** — subtle softening, fits app icons. **md** — standard rounded square (workspace icons, brand avatars). **lg** — emphasized soft corners, common in modern social UIs. **full** (default) — circle, the canonical shape for human avatars. Use full for people, md and lg for organizations or workspaces, sm and none for product or brand glyphs.",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "full"' },
        defaultValue: { summary: "full" },
        category: "Style Variants",
      },
    },
    ring: {
      control: "select",
      options: [undefined, "primary", "secondary", "accent", "success", "warning", "danger", "info"],
      description:
        "Colored ring around the avatar acting as a status or emphasis indicator. **Brand:** primary (main focus), secondary (neutral gray), accent (brand highlight). **Status:** success (online), warning (away), danger (busy or do-not-disturb), info (notification or unread mention). Use success for online presence, danger for busy, warning for away, primary for selected, accent for featured or pro user, info for unread mentions and notifications.",
      table: {
        type: {
          summary: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info"',
        },
        category: "Style Variants",
      },
    },
    isBordered: {
      control: "boolean",
      description:
        "Whether the avatar shows a 2px ring matching the background — separates the avatar visually when placed over a photo or colored background",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Dims the avatar and disables pointer events",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
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
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    children: [
      <AvatarImage key="img" alt="Avatar 1" src={AVATAR_GIRL} />,
      <AvatarFallback key="fb">CT</AvatarFallback>,
    ],
  },
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args} size="xs">
        <AvatarImage alt="Avatar 1" src={AVATAR_GIRL} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="sm">
        <AvatarImage alt="Yuna Kim" src={AVATAR_GIRL} />
        <AvatarFallback>YK</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="md">
        <AvatarImage alt="Rio Tanaka" src={AVATAR_GIRL} />
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="lg">
        <AvatarImage alt="Sofia Marchetti" src={AVATAR_GIRL} />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="xl">
        <AvatarImage alt="Aria Park" src={AVATAR_GIRL} />
        <AvatarFallback>AP</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="2xl">
        <AvatarImage alt="Diego Silva" src={AVATAR_GIRL} />
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args} radius="none">
        <AvatarImage alt="Avatar 1" src={AVATAR_GIRL} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="sm">
        <AvatarImage alt="Yuna Kim" src={AVATAR_GIRL} />
        <AvatarFallback>YK</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="md">
        <AvatarImage alt="Rio Tanaka" src={AVATAR_GIRL} />
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="lg">
        <AvatarImage alt="Sofia Marchetti" src={AVATAR_GIRL} />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="full">
        <AvatarImage alt="Aria Park" src={AVATAR_GIRL} />
        <AvatarFallback>AP</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const Rings: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args} ring="primary">
        <AvatarImage alt="Avatar 1" src={AVATAR_GIRL} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="secondary">
        <AvatarImage alt="Yuna Kim" src={AVATAR_GIRL} />
        <AvatarFallback>YK</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="accent">
        <AvatarImage alt="Rio Tanaka" src={AVATAR_GIRL} />
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="success">
        <AvatarImage alt="Sofia Marchetti" src={AVATAR_GIRL} />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="warning">
        <AvatarImage alt="Aria Park" src={AVATAR_GIRL} />
        <AvatarFallback>AP</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="danger">
        <AvatarImage alt="Diego Silva" src={AVATAR_GIRL} />
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="info">
        <AvatarImage alt="Maya Chen" src={AVATAR_GIRL} />
        <AvatarFallback>MC</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const FallbackVariants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args}>
        <AvatarFallback variant="primary">CT</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="secondary">YK</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="accent">RT</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="success">SM</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="warning">AP</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="danger">DS</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="info">MC</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const Disabled: Story = {
  args: {
    isDisabled: true,
    children: [
      <AvatarImage key="img" alt="Sofia Marchetti" src={AVATAR_GIRL} />,
      <AvatarFallback key="fb">SM</AvatarFallback>,
    ],
  },
};

const Bordered: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Avatar {...args} isBordered>
        <AvatarImage alt="Avatar 1" src={AVATAR_GIRL} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const Fallback: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args}>
        <AvatarFallback variant="primary">FR</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback>NA</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback>
          <UserIcon className="size-5" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

const BrokenImage: Story = {
  args: {
    children: [
      <AvatarImage key="img" alt="Diego Silva" src="https://broken.url/avatar.png" />,
      <AvatarFallback key="fb">FR</AvatarFallback>,
    ],
  },
};

export { Default, Sizes, Radius, Rings, FallbackVariants, Disabled, Bordered, Fallback, BrokenImage };

export default meta;
