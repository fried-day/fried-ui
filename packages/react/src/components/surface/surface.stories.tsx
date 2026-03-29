import type { Meta, StoryObj } from "@storybook/react";

import { Surface } from "./Surface";

const meta = {
  title: "Components/Surface",
  component: Surface,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Surface content",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Surface content",
      table: {
        type: {
          summary: "ReactNode",
        },
        category: "Children",
      },
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "glass", "primary"],
      description: "The visual style of the surface",
      table: {
        type: {
          summary: '"default" | "bordered" | "glass" | "primary"',
        },
        defaultValue: {
          summary: "default",
        },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Border radius",
      table: {
        type: {
          summary: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
        },
        defaultValue: {
          summary: "md",
        },
        category: "Style Variants",
      },
    },
    isShadow: {
      control: "boolean",
      description: "Whether to show a drop shadow",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "Style Variants",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: {
          summary: "string",
        },
        category: "Styling",
      },
    },
  },
} satisfies Meta<typeof Surface>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const Card = () => {
  return (
    <Surface radius="lg" className="p-6">
      <h2>Card Title</h2>
      <p>Content goes here.</p>
    </Surface>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Surface {...args} className="p-6">
      <p className="font-bold">Card Title</p>
      <p className="mt-2 text-sm">Content goes here.</p>
    </Surface>
  ),
};

const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const Variants = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Surface variant="default" className="p-4">Default</Surface>
      <Surface variant="bordered" className="p-4">Bordered</Surface>
      <Surface variant="glass" className="p-4">Glass</Surface>
      <Surface variant="primary" className="p-4">Primary</Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <Surface {...args} variant="default" className="p-4">
        Default
      </Surface>

      <Surface {...args} variant="bordered" className="p-4">
        Bordered
      </Surface>

      <Surface {...args} variant="glass" className="p-4">
        Glass
      </Surface>

      <Surface {...args} variant="primary" className="p-4">
        Primary
      </Surface>
    </div>
  ),
};

const Shadow: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const Shadow = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Surface className="p-4">No shadow</Surface>
      <Surface isShadow className="p-4">With shadow</Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <Surface {...args} className="p-4">
        No shadow
      </Surface>

      <Surface {...args} className="p-4" isShadow>
        With shadow
      </Surface>
    </div>
  ),
};

const Radius: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const Radius = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Surface radius="none" className="p-4">none</Surface>
      <Surface radius="sm" className="p-4">sm</Surface>
      <Surface radius="md" className="p-4">md</Surface>
      <Surface radius="lg" className="p-4">lg</Surface>
      <Surface radius="xl" className="p-4">xl</Surface>
      <Surface radius="full" className="px-6 py-4">full</Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <Surface {...args} radius="none" className="p-4">
        none
      </Surface>

      <Surface {...args} radius="sm" className="p-4">
        sm
      </Surface>

      <Surface {...args} radius="md" className="p-4">
        md
      </Surface>

      <Surface {...args} radius="lg" className="p-4">
        lg
      </Surface>

      <Surface {...args} radius="xl" className="p-4">
        xl
      </Surface>

      <Surface {...args} radius="full" className="px-6 py-4">
        full
      </Surface>
    </div>
  ),
};

const Glass: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const Glass = () => {
  return (
    <div className="relative">
      <img src="..." alt="background" />
      <Surface variant="glass" radius="lg" className="absolute inset-4 p-6">
        Content over image
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="relative rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-16">
      <Surface {...args} variant="glass" radius="lg" className="p-6">
        <p className="font-bold">Glass Surface</p>
        <p className="mt-2 text-sm">Content over a gradient background.</p>
      </Surface>
    </div>
  ),
};

export { Default, Glass, Radius, Shadow, Variants };

export default meta;
