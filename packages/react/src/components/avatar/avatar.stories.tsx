import type { Meta, StoryObj } from "@storybook/react";

import AVATAR_1 from "@fried-ui/assets/story/avatar-1.jpg";

import { CLASS_NAME_ARG_TYPE } from "../../storybook/argtypes";

import { UserIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  subcomponents: {
    AvatarImage,
    AvatarFallback,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: false,
      description: "Compound children — `<AvatarImage />` and `<AvatarFallback />`",
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
        "Size scale of the avatar circle on a `sqrt(phi)` ratio so adjacent sizes clear the perceptual JND threshold. **Compact:** xs (24px) — inline beside body text, mention pills, dense table cells; sm (32px) — comment threads, message previews, list rows. **Standard:** md (40px, default) — header user menus, list items, conversation cards. **Emphasis:** lg (52px) — feature cards, profile previews; xl (64px) — hero blocks, settings pages. Use md as default; reach for xs only when paired inline with body text, xl for standalone profile contexts where the face is the focal point.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl"' },
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
    className: CLASS_NAME_ARG_TYPE,
  },
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args): React.JSX.Element => (
    <Avatar {...args}>
      <AvatarImage alt="Avatar 1" src={AVATAR_1} />
      <AvatarFallback>A1</AvatarFallback>
    </Avatar>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args} size="xs">
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="sm">
        <AvatarImage alt="Yuna Kim" src={AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="md">
        <AvatarImage alt="Rio Tanaka" src={AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="lg">
        <AvatarImage alt="Sofia Marchetti" src={AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="xl">
        <AvatarImage alt="Aria Park" src={AVATAR_1} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args} radius="none">
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="sm">
        <AvatarImage alt="Yuna Kim" src={AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="md">
        <AvatarImage alt="Rio Tanaka" src={AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="lg">
        <AvatarImage alt="Sofia Marchetti" src={AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="full">
        <AvatarImage alt="Aria Park" src={AVATAR_1} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const Rings: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args} ring="primary">
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="secondary">
        <AvatarImage alt="Yuna Kim" src={AVATAR_1} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="accent">
        <AvatarImage alt="Rio Tanaka" src={AVATAR_1} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="success">
        <AvatarImage alt="Sofia Marchetti" src={AVATAR_1} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="warning">
        <AvatarImage alt="Aria Park" src={AVATAR_1} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="danger">
        <AvatarImage alt="Diego Silva" src={AVATAR_1} />
        <AvatarFallback>A6</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="info">
        <AvatarImage alt="Maya Chen" src={AVATAR_1} />
        <AvatarFallback>A7</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const FallbackVariants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar {...args}>
        <AvatarFallback variant="primary">PR</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="secondary">SE</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="accent">AC</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="success">SU</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="warning">WA</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="danger">DA</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback variant="info">IN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const Disabled: Story = {
  args: {
    isDisabled: true,
    children: [
      <AvatarImage key="img" alt="Sofia Marchetti" src={AVATAR_1} />,
      <AvatarFallback key="fb">A1</AvatarFallback>,
    ],
  },
};

const Bordered: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Avatar {...args} isBordered>
        <AvatarImage alt="Avatar 1" src={AVATAR_1} />
        <AvatarFallback>A1</AvatarFallback>
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
      <AvatarImage key="img" alt="Diego Silva" src="/intentionally-broken.png" />,
      <AvatarFallback key="fb">FR</AvatarFallback>,
    ],
  },
};

export { Default, Sizes, Radius, Rings, FallbackVariants, Disabled, Bordered, Fallback, BrokenImage };

export default meta;
