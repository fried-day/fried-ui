import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { AvatarGroup } from "./AvatarGroup";

const SRC_1 =
  "https://images.unsplash.com/photo-1729017256081-0271b3fcc08e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwcm9maWxlfGVufDB8fDB8fHww";

const SRC_2 =
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHByb2ZpbGUlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D";

const SRC_3 =
  "https://images.unsplash.com/photo-1576348076752-6085814e5a51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhciUyMGN1dGUlMjBnaXJsfGVufDB8fDB8fHww";

const SRC_4 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D";

const SRC_5 =
  "https://images.unsplash.com/photo-1724690336308-02af024b76ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwY3V0ZXxlbnwwfHwwfHx8MA%3D%3D";

const SRC_6 =
  "https://images.unsplash.com/photo-1596554002543-83af3d801c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHdvbWVuJTIwY3V0ZXxlbnwwfHwwfHx8MA%3D%3D";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    spacing: "md",
    isHoverable: false,
  },
  argTypes: {
    children: {
      control: false,
      description: "A collection of `<Avatar />` elements to render in the stack",
      table: {
        type: { summary: "ReactNode" },
        category: "Children",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
      description:
        "Size scale applied to every avatar in the group. **sm** (size-8, 32px) — dense toolbars, compact lists. **md** (size-10, 40px, default) — standard team/member rosters. **lg** (size-12, 48px) — emphasized cards, profile headers. **xl** (size-14, 56px) — hero sections, featured contributors. **2xl** (size-16, 64px) — showcase blocks, marketing pages. Use sm when count matters more than identity, md as default, lg/xl/2xl when individual face recognition is important.",
      table: {
        type: { summary: '"sm" | "md" | "lg" | "xl" | "2xl"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    spacing: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Overlap amount between adjacent avatars. **Spacing scale:** sm (light overlap — airy, shows more of each face), md (balanced stack — default social-proof look), lg (tight overlap — compact stack for long rosters). Use sm when faces need recognition, md as the standard default for team/attendee groups, lg for dense lists like contributors or shared threads where overall count matters more than individual identity.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
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
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, AvatarGroup } from "@fried-ui/react";

const Basic = () => {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage alt="Avatar 1" src="${SRC_1}" />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src="${SRC_2}" />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src="${SRC_3}" />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={SRC_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SRC_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SRC_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const WithMax: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, AvatarGroup } from "@fried-ui/react";

const WithMax = () => {
  return (
    <AvatarGroup max={3}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src="${SRC_1}" />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src="${SRC_2}" />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src="${SRC_3}" />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 4" src="${SRC_4}" />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 5" src="${SRC_5}" />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 6" src="${SRC_6}" />
        <AvatarFallback>A6</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
};`,
      },
    },
  },
  args: {
    max: 3,
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={SRC_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SRC_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SRC_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 4" src={SRC_4} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 5" src={SRC_5} />
        <AvatarFallback>A5</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 6" src={SRC_6} />
        <AvatarFallback>A6</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const WithTotal: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, AvatarGroup } from "@fried-ui/react";

const WithTotal = () => {
  return (
    <AvatarGroup max={3} total={42}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src="${SRC_1}" />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src="${SRC_2}" />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src="${SRC_3}" />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
};`,
      },
    },
  },
  args: {
    max: 3,
    total: 42,
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={SRC_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SRC_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SRC_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

const Spacing: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, AvatarGroup } from "@fried-ui/react";

const Spacing = () => {
  return (
    <div className="flex items-center gap-8">
      <AvatarGroup spacing="sm">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup spacing="md">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup spacing="lg">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-8">
      <AvatarGroup {...args} spacing="sm">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} spacing="md">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} spacing="lg">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, AvatarGroup } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-center gap-8">
      <AvatarGroup size="sm">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup size="md">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup size="lg">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup size="xl">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup size="2xl">
        <Avatar>
          <AvatarImage alt="Avatar 1" src="${SRC_1}" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src="${SRC_2}" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src="${SRC_3}" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-center gap-8">
      <AvatarGroup {...args} size="sm">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="md">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="lg">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="xl">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <AvatarGroup {...args} size="2xl">
        <Avatar>
          <AvatarImage alt="Avatar 1" src={SRC_1} />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 2" src={SRC_2} />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage alt="Avatar 3" src={SRC_3} />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  ),
};

const WithFallback: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, AvatarGroup } from "@fried-ui/react";

const WithFallback = () => {
  return (
    <AvatarGroup max={4}>
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
  );
};`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import { Avatar, AvatarGroup } from "@fried-ui/react";

const Hoverable = () => {
  return (
    <AvatarGroup isHoverable>
      <Avatar>
        <AvatarImage alt="Avatar 1" src="${SRC_1}" />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src="${SRC_2}" />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src="${SRC_3}" />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 4" src="${SRC_4}" />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
};`,
      },
    },
  },
  args: {
    isHoverable: true,
  },
  render: (args): React.JSX.Element => (
    <AvatarGroup {...args}>
      <Avatar>
        <AvatarImage alt="Avatar 1" src={SRC_1} />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 2" src={SRC_2} />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 3" src={SRC_3} />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Avatar 4" src={SRC_4} />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

export { Default, WithMax, WithTotal, Spacing, Sizes, Hoverable, WithFallback };

export default meta;
