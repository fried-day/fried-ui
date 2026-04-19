import type { Meta, StoryObj } from "@storybook/react";

import { UserIcon } from "../icons";
import { Avatar } from "./Avatar";

const SAMPLE_SRC_1 =
  "https://images.unsplash.com/photo-1729017256081-0271b3fcc08e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwcm9maWxlfGVufDB8fDB8fHww";

const SAMPLE_SRC_2 =
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHByb2ZpbGUlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D";

const SAMPLE_SRC_3 =
  "https://images.unsplash.com/photo-1576348076752-6085814e5a51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhciUyMGN1dGUlMjBnaXJsfGVufDB8fDB8fHww";

const RADIUS_SRC =
  "https://images.unsplash.com/photo-1656919380078-f0ff7bcd1d92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE5fHxwYXN0ZWx8ZW58MHx8MHx8fDA%3D";

const SAMPLE_SRC_4 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D";

const SAMPLE_SRC_5 =
  "https://images.unsplash.com/photo-1724690336308-02af024b76ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwY3V0ZXxlbnwwfHwwfHx8MA%3D%3D";

const SAMPLE_SRC_6 =
  "https://images.unsplash.com/photo-1596554002543-83af3d801c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHdvbWVuJTIwY3V0ZXxlbnwwfHwwfHx8MA%3D%3D";

const SAMPLE_SRC_7 =
  "https://images.unsplash.com/flagged/photo-1557610650-841aa71a5c3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHx3b21lbiUyMGN1dGV8ZW58MHx8MHx8fDA%3D";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    radius: "full",
    isDisabled: false,
  },
  argTypes: {
    children: {
      control: false,
      description: "Compound children — `<Avatar.Image />` and `<Avatar.Fallback />`",
      table: {
        type: { summary: "ReactNode" },
        category: "Children",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
      description: "The size of the avatar",
      table: {
        type: { summary: '"sm" | "md" | "lg" | "xl" | "2xl"' },
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
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from "@fried-ui/react";

const Basic = () => {
  return (
    <Avatar>
      <Avatar.Image alt="Colm Tuite" src="${SAMPLE_SRC_1}" />
      <Avatar.Fallback>CT</Avatar.Fallback>
    </Avatar>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Avatar {...args}>
      <Avatar.Image alt="Colm Tuite" src={SAMPLE_SRC_1} />
      <Avatar.Fallback>CT</Avatar.Fallback>
    </Avatar>
  ),
};

const WithFallback: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, UserIcon } from "@fried-ui/react";

const WithFallback = () => {
  return (
    <div className="flex items-end gap-4">
      <Avatar>
        <Avatar.Fallback>YK</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>RT</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>
          <UserIcon className="size-match-font" />
        </Avatar.Fallback>
      </Avatar>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Avatar {...args}>
        <Avatar.Fallback>YK</Avatar.Fallback>
      </Avatar>

      <Avatar {...args}>
        <Avatar.Fallback>RT</Avatar.Fallback>
      </Avatar>

      <Avatar {...args}>
        <Avatar.Fallback>
          <UserIcon className="size-match-font" />
        </Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-end gap-4">
      <Avatar size="sm">
        <Avatar.Image alt="Avatar 1" src="${SAMPLE_SRC_1}" />
        <Avatar.Fallback>A1</Avatar.Fallback>
      </Avatar>

      <Avatar size="md">
        <Avatar.Image alt="Avatar 2" src="${SAMPLE_SRC_2}" />
        <Avatar.Fallback>A2</Avatar.Fallback>
      </Avatar>

      <Avatar size="lg">
        <Avatar.Image alt="Avatar 3" src="${SAMPLE_SRC_3}" />
        <Avatar.Fallback>A3</Avatar.Fallback>
      </Avatar>

      <Avatar size="xl">
        <Avatar.Image alt="Avatar 4" src="${SAMPLE_SRC_4}" />
        <Avatar.Fallback>A4</Avatar.Fallback>
      </Avatar>

      <Avatar size="2xl">
        <Avatar.Image alt="Avatar 5" src="${SAMPLE_SRC_5}" />
        <Avatar.Fallback>A5</Avatar.Fallback>
      </Avatar>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Avatar {...args} size="sm">
        <Avatar.Image alt="Avatar 1" src={SAMPLE_SRC_1} />
        <Avatar.Fallback>A1</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} size="md">
        <Avatar.Image alt="Avatar 2" src={SAMPLE_SRC_2} />
        <Avatar.Fallback>A2</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} size="lg">
        <Avatar.Image alt="Avatar 3" src={SAMPLE_SRC_3} />
        <Avatar.Fallback>A3</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} size="xl">
        <Avatar.Image alt="Avatar 4" src={SAMPLE_SRC_4} />
        <Avatar.Fallback>A4</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} size="2xl">
        <Avatar.Image alt="Avatar 5" src={SAMPLE_SRC_5} />
        <Avatar.Fallback>A5</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

const Radius: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from "@fried-ui/react";

const Radius = () => {
  return (
    <div className="flex items-end gap-4">
      <Avatar radius="none">
        <Avatar.Image alt="Avatar" src="${RADIUS_SRC}" />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar radius="sm">
        <Avatar.Image alt="Avatar" src="${RADIUS_SRC}" />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar radius="md">
        <Avatar.Image alt="Avatar" src="${RADIUS_SRC}" />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar radius="lg">
        <Avatar.Image alt="Avatar" src="${RADIUS_SRC}" />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar radius="full">
        <Avatar.Image alt="Avatar" src="${RADIUS_SRC}" />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Avatar {...args} radius="none">
        <Avatar.Image alt="Avatar" src={RADIUS_SRC} />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} radius="sm">
        <Avatar.Image alt="Avatar" src={RADIUS_SRC} />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} radius="md">
        <Avatar.Image alt="Avatar" src={RADIUS_SRC} />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} radius="lg">
        <Avatar.Image alt="Avatar" src={RADIUS_SRC} />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} radius="full">
        <Avatar.Image alt="Avatar" src={RADIUS_SRC} />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

const Ring: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from "@fried-ui/react";

const Ring = () => {
  return (
    <div className="flex items-end gap-6">
      <Avatar ring="primary">
        <Avatar.Image alt="Colm Tuite" src="${SAMPLE_SRC_1}" />
        <Avatar.Fallback>CT</Avatar.Fallback>
      </Avatar>

      <Avatar ring="secondary">
        <Avatar.Image alt="Rio Tanaka" src="${SAMPLE_SRC_2}" />
        <Avatar.Fallback>RT</Avatar.Fallback>
      </Avatar>

      <Avatar ring="accent">
        <Avatar.Image alt="Yuna Kim" src="${SAMPLE_SRC_3}" />
        <Avatar.Fallback>YK</Avatar.Fallback>
      </Avatar>

      <Avatar ring="success">
        <Avatar.Image alt="Nova Vega" src="${SAMPLE_SRC_4}" />
        <Avatar.Fallback>NV</Avatar.Fallback>
      </Avatar>

      <Avatar ring="warning">
        <Avatar.Image alt="Iris Ono" src="${SAMPLE_SRC_5}" />
        <Avatar.Fallback>IO</Avatar.Fallback>
      </Avatar>

      <Avatar ring="danger">
        <Avatar.Image alt="Zoe Xu" src="${SAMPLE_SRC_6}" />
        <Avatar.Fallback>ZX</Avatar.Fallback>
      </Avatar>

      <Avatar ring="info">
        <Avatar.Image alt="Aria Park" src="${SAMPLE_SRC_7}" />
        <Avatar.Fallback>AP</Avatar.Fallback>
      </Avatar>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-6">
      <Avatar {...args} ring="primary">
        <Avatar.Image alt="Colm Tuite" src={SAMPLE_SRC_1} />
        <Avatar.Fallback>CT</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} ring="secondary">
        <Avatar.Image alt="Rio Tanaka" src={SAMPLE_SRC_2} />
        <Avatar.Fallback>RT</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} ring="accent">
        <Avatar.Image alt="Yuna Kim" src={SAMPLE_SRC_3} />
        <Avatar.Fallback>YK</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} ring="success">
        <Avatar.Image alt="Nova Vega" src={SAMPLE_SRC_4} />
        <Avatar.Fallback>NV</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} ring="warning">
        <Avatar.Image alt="Iris Ono" src={SAMPLE_SRC_5} />
        <Avatar.Fallback>IO</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} ring="danger">
        <Avatar.Image alt="Zoe Xu" src={SAMPLE_SRC_6} />
        <Avatar.Fallback>ZX</Avatar.Fallback>
      </Avatar>

      <Avatar {...args} ring="info">
        <Avatar.Image alt="Aria Park" src={SAMPLE_SRC_7} />
        <Avatar.Fallback>AP</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from "@fried-ui/react";

const Disabled = () => {
  return (
    <Avatar isDisabled>
      <Avatar.Image alt="Luna Park" src="${SAMPLE_SRC_1}" />
      <Avatar.Fallback>LP</Avatar.Fallback>
    </Avatar>
  );
};`,
      },
    },
  },
  args: {
    isDisabled: true,
  },
  render: (args): React.JSX.Element => (
    <Avatar {...args}>
      <Avatar.Image alt="Luna Park" src={SAMPLE_SRC_1} />
      <Avatar.Fallback>LP</Avatar.Fallback>
    </Avatar>
  ),
};

const BrokenImage: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from "@fried-ui/react";

const BrokenImage = () => {
  return (
    <Avatar>
      <Avatar.Image alt="Zoe Xu" src="https://broken.url/image.jpg" />
      <Avatar.Fallback>ZX</Avatar.Fallback>
    </Avatar>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Avatar {...args}>
      <Avatar.Image alt="Zoe Xu" src="https://broken.url/image.jpg" />
      <Avatar.Fallback>ZX</Avatar.Fallback>
    </Avatar>
  ),
};

export { Default, WithFallback, Sizes, Radius, Ring, Disabled, BrokenImage };

export default meta;
