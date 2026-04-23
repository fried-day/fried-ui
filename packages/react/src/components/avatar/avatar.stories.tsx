import type { Meta, StoryObj } from "@storybook/react";

import { UserIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const RADIUS_SRC = "https://images.unsplash.com/photo-1656919380078-f0ff7bcd1d92?w=500&auto=format&fit=crop&q=60";
const SAMPLE_SRC_1 = "https://images.unsplash.com/photo-1729017256081-0271b3fcc08e?w=500&auto=format&fit=crop&q=60";
const SAMPLE_SRC_2 = "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=500&auto=format&fit=crop&q=60";
const SAMPLE_SRC_3 = "https://images.unsplash.com/photo-1576348076752-6085814e5a51?w=500&auto=format&fit=crop&q=60";
const SAMPLE_SRC_4 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60";
const SAMPLE_SRC_5 = "https://images.unsplash.com/photo-1724690336308-02af024b76ab?w=500&auto=format&fit=crop&q=60";
const SAMPLE_SRC_6 = "https://images.unsplash.com/photo-1596554002543-83af3d801c6f?w=500&auto=format&fit=crop&q=60";

const SAMPLE_SRC_7 =
  "https://images.unsplash.com/flagged/photo-1557610650-841aa71a5c3d?w=500&auto=format&fit=crop&q=60";

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
      description: "The size of the avatar",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the avatar",
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
        "Colored ring around the avatar (status indicator). **Brand:** primary (main focus), secondary (neutral gray), accent (brand highlight). **Status:** success (online), warning (away), danger (busy / do-not-disturb), info (notification). Use success for online, danger for busy, warning for away, primary for selected, accent for featured/pro user.",
      table: {
        type: {
          summary: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info"',
        },
        category: "Style Variants",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Dims the avatar and disables pointer events",
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
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    children: [
      <AvatarImage key="img" alt="Colm Tuite" src={SAMPLE_SRC_1} />,
      <AvatarFallback key="fb">CT</AvatarFallback>,
    ],
  },
};

const WithFallback: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Avatar {...args}>
        <AvatarFallback>YK</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarFallback>
          <UserIcon className="size-5" />
        </AvatarFallback>
      </Avatar>
    </>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Avatar {...args} size="xs">
        <AvatarImage alt="Avatar 1" src={SAMPLE_SRC_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="sm">
        <AvatarImage alt="Avatar 2" src={SAMPLE_SRC_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="md">
        <AvatarImage alt="Avatar 3" src={SAMPLE_SRC_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="lg">
        <AvatarImage alt="Avatar 4" src={SAMPLE_SRC_4} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="xl">
        <AvatarImage alt="Avatar 5" src={SAMPLE_SRC_5} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar {...args} size="2xl">
        <AvatarImage alt="Avatar 6" src={SAMPLE_SRC_6} />
        <AvatarFallback>A6</AvatarFallback>
      </Avatar>
    </>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Avatar {...args} radius="none">
        <AvatarImage alt="Avatar" src={RADIUS_SRC} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="sm">
        <AvatarImage alt="Avatar" src={RADIUS_SRC} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="md">
        <AvatarImage alt="Avatar" src={RADIUS_SRC} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="lg">
        <AvatarImage alt="Avatar" src={RADIUS_SRC} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <Avatar {...args} radius="full">
        <AvatarImage alt="Avatar" src={RADIUS_SRC} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </>
  ),
};

const Ring: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Avatar {...args} ring="primary">
        <AvatarImage alt="Colm Tuite" src={SAMPLE_SRC_1} />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="secondary">
        <AvatarImage alt="Rio Tanaka" src={SAMPLE_SRC_2} />
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="accent">
        <AvatarImage alt="Yuna Kim" src={SAMPLE_SRC_3} />
        <AvatarFallback>YK</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="success">
        <AvatarImage alt="Nova Vega" src={SAMPLE_SRC_4} />
        <AvatarFallback>NV</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="warning">
        <AvatarImage alt="Iris Ono" src={SAMPLE_SRC_5} />
        <AvatarFallback>IO</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="danger">
        <AvatarImage alt="Zoe Xu" src={SAMPLE_SRC_6} />
        <AvatarFallback>ZX</AvatarFallback>
      </Avatar>

      <Avatar {...args} ring="info">
        <AvatarImage alt="Aria Park" src={SAMPLE_SRC_7} />
        <AvatarFallback>AP</AvatarFallback>
      </Avatar>
    </>
  ),
};

const Disabled: Story = {
  args: {
    isDisabled: true,
    children: [
      <AvatarImage key="img" alt="Luna Park" src={SAMPLE_SRC_1} />,
      <AvatarFallback key="fb">LP</AvatarFallback>,
    ],
  },
};

const BrokenImage: Story = {
  args: {
    children: [
      <AvatarImage key="img" alt="Zoe Xu" src="https://broken.url/image.jpg" />,
      <AvatarFallback key="fb">ZX</AvatarFallback>,
    ],
  },
};

export { Default, WithFallback, Sizes, Radius, Ring, Disabled, BrokenImage };

export default meta;
