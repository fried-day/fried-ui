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
    variant: "default",
    radius: "md",
    shadow: "none",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Surface content (ReactNode)",
      table: {
        type: {
          summary: "ReactNode",
        },
        category: "Children",
      },
    },
    variant: {
      control: "select",
      options: [
        "default",
        "default-bordered",
        "plain",
        "plain-bordered",
        "success",
        "success-bordered",
        "warning",
        "warning-bordered",
        "danger",
        "danger-bordered",
        "info",
        "info-bordered",
        "glass",
        "frost",
        "overlay",
      ],
      description:
        "Visual style. **Base:** default/plain (neutral cards). **Status:** success/warning/danger/info (pale bg — alert/callout boxes). **Special:** glass/frost/overlay (media overlays). Add `-bordered` suffix for emphasis border. Use default on white pages, plain on gray pages, status for alerts.",
      table: {
        type: {
          summary:
            '"default" | "default-bordered" | "plain" | "plain-bordered" | "success" | "success-bordered" | "warning" | "warning-bordered" | "danger" | "danger-bordered" | "info" | "info-bordered" | "glass" | "frost" | "overlay"',
        },
        defaultValue: {
          summary: "default",
        },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "The border radius of the surface",
      table: {
        type: {
          summary: '"none" | "sm" | "md" | "lg" | "xl"',
        },
        defaultValue: {
          summary: "md",
        },
        category: "Style Variants",
      },
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Elevation shadow — orthogonal to variant",
      table: {
        type: {
          summary: '"none" | "sm" | "md" | "lg" | "xl"',
        },
        defaultValue: {
          summary: "none",
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
    <Surface className="p-6">
      <p className="font-bold">Card Title</p>
      <p className="mt-2 text-sm">Content goes here.</p>
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
      <Surface variant="default" className="p-6">
        <p className="font-bold">Default</p>
        <p className="mt-2 text-sm">Subtle gray card on white.</p>
      </Surface>

      <Surface variant="default-bordered" className="p-6">
        <p className="font-bold">Default Bordered</p>
        <p className="mt-2 text-sm">Gray card with emphasis border.</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <Surface {...args} variant="default" className="p-6">
        <p className="font-bold">Default</p>
        <p className="mt-2 text-sm">Subtle gray card on white.</p>
      </Surface>

      <Surface {...args} variant="default-bordered" className="p-6">
        <p className="font-bold">Default Bordered</p>
        <p className="mt-2 text-sm">Gray card with emphasis border.</p>
      </Surface>
    </div>
  ),
};

const StatusVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const StatusVariants = () => {
  return (
    <div className="flex flex-col gap-4">
      <Surface variant="success" className="p-4">
        <p className="font-bold">Success</p>
        <p className="mt-1 text-sm">Your changes have been saved.</p>
      </Surface>
      <Surface variant="warning-bordered" className="p-4">
        <p className="font-bold">Warning</p>
        <p className="mt-1 text-sm">Your session expires in 5 minutes.</p>
      </Surface>
      <Surface variant="danger" className="p-4">
        <p className="font-bold">Error</p>
        <p className="mt-1 text-sm">Unable to connect to the server.</p>
      </Surface>
      <Surface variant="info-bordered" className="p-4">
        <p className="font-bold">Info</p>
        <p className="mt-1 text-sm">New feature available — check it out!</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-col gap-4">
      <Surface {...args} variant="success" className="p-4">
        <p className="font-bold">Success</p>
        <p className="mt-1 text-sm">Your changes have been saved.</p>
      </Surface>

      <Surface {...args} variant="warning-bordered" className="p-4">
        <p className="font-bold">Warning</p>
        <p className="mt-1 text-sm">Your session expires in 5 minutes.</p>
      </Surface>

      <Surface {...args} variant="danger" className="p-4">
        <p className="font-bold">Error</p>
        <p className="mt-1 text-sm">Unable to connect to the server.</p>
      </Surface>

      <Surface {...args} variant="info-bordered" className="p-4">
        <p className="font-bold">Info</p>
        <p className="mt-1 text-sm">New feature available — check it out!</p>
      </Surface>
    </div>
  ),
};

const PlainVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const PlainVariants = () => {
  return (
    <div className="flex h-80 w-160 items-center justify-center gap-4 bg-background-secondary p-16">
      <Surface variant="plain" radius="lg" className="p-6">
        <p className="font-bold">Plain</p>
        <p className="mt-2 text-sm">Pure white card on gray page.</p>
      </Surface>

      <Surface variant="plain-bordered" radius="lg" className="p-6">
        <p className="font-bold">Plain Bordered</p>
        <p className="mt-2 text-sm">White card with emphasis border.</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-80 w-160 items-center justify-center gap-4 bg-background-secondary p-16">
      <Surface {...args} variant="plain" radius="lg" className="p-6">
        <p className="font-bold">Plain</p>
        <p className="mt-2 text-sm">Pure white card on gray page.</p>
      </Surface>

      <Surface {...args} variant="plain-bordered" radius="lg" className="p-6">
        <p className="font-bold">Plain Bordered</p>
        <p className="mt-2 text-sm">White card with emphasis border.</p>
      </Surface>
    </div>
  ),
};

const GlassVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const GlassVariants = () => {
  return (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Surface variant="glass" radius="lg" className="p-6">
        <p className="font-bold">Glass Surface</p>
        <p className="mt-2 text-sm">Content over a gradient background.</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Surface {...args} variant="glass" radius="lg" className="p-6">
        <p className="font-bold">Glass Surface</p>
        <p className="mt-2 text-sm">Content over a gradient background.</p>
      </Surface>
    </div>
  ),
};

const FrostVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const FrostVariants = () => {
  return (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-emerald-400 via-teal-500 via-cyan-500 via-sky-500 to-purple-600 p-16">
      <Surface variant="frost" radius="lg" className="p-6">
        <p className="font-bold">Frost Surface</p>
        <p className="mt-2 text-sm">Frosted content without a border.</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-emerald-400 via-cyan-500 via-sky-500 via-teal-500 to-purple-600 p-16">
      <Surface {...args} variant="frost" radius="lg" className="p-6">
        <p className="font-bold">Frost Surface</p>
        <p className="mt-2 text-sm">Frosted content without a border.</p>
      </Surface>
    </div>
  ),
};

const OverlayVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const OverlayVariants = () => {
  return (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-orange-400 via-rose-500 via-fuchsia-500 via-purple-500 to-purple-600 p-16">
      <Surface variant="overlay" radius="lg" className="p-6">
        <p className="font-bold">Overlay Surface</p>
        <p className="mt-2 text-sm">Dark scrim over media content.</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-orange-400 via-fuchsia-500 via-purple-500 via-rose-500 to-purple-600 p-16">
      <Surface {...args} variant="overlay" radius="lg" className="p-6">
        <p className="font-bold">Overlay Surface</p>
        <p className="mt-2 text-sm">Dark scrim over media content.</p>
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
      <Surface radius="none" className="p-6">
        <p className="font-bold">None</p>
        <p className="mt-2 text-sm">No rounded corners.</p>
      </Surface>

      <Surface radius="sm" className="p-6">
        <p className="font-bold">Small</p>
        <p className="mt-2 text-sm">Subtle rounding.</p>
      </Surface>

      <Surface radius="md" className="p-6">
        <p className="font-bold">Medium</p>
        <p className="mt-2 text-sm">Balanced rounding.</p>
      </Surface>

      <Surface radius="lg" className="p-6">
        <p className="font-bold">Large</p>
        <p className="mt-2 text-sm">Soft rounding.</p>
      </Surface>

      <Surface radius="xl" className="p-6">
        <p className="font-bold">Extra Large</p>
        <p className="mt-2 text-sm">Very rounded corners.</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-4">
      <Surface {...args} radius="none" className="p-6">
        <p className="font-bold">None</p>
        <p className="mt-2 text-sm">No rounded corners.</p>
      </Surface>

      <Surface {...args} radius="sm" className="p-6">
        <p className="font-bold">Small</p>
        <p className="mt-2 text-sm">Subtle rounding.</p>
      </Surface>

      <Surface {...args} radius="md" className="p-6">
        <p className="font-bold">Medium</p>
        <p className="mt-2 text-sm">Balanced rounding.</p>
      </Surface>

      <Surface {...args} radius="lg" className="p-6">
        <p className="font-bold">Large</p>
        <p className="mt-2 text-sm">Soft rounding.</p>
      </Surface>

      <Surface {...args} radius="xl" className="p-6">
        <p className="font-bold">Extra Large</p>
        <p className="mt-2 text-sm">Very rounded corners.</p>
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
    <div className="flex flex-wrap gap-8">
      <Surface shadow="none" className="p-6">
        <p className="font-bold">None</p>
        <p className="mt-2 text-sm">No shadow.</p>
      </Surface>

      <Surface shadow="sm" className="p-6">
        <p className="font-bold">Small</p>
        <p className="mt-2 text-sm">Subtle lift.</p>
      </Surface>

      <Surface shadow="md" className="p-6">
        <p className="font-bold">Medium</p>
        <p className="mt-2 text-sm">Noticeable elevation.</p>
      </Surface>

      <Surface shadow="lg" className="p-6">
        <p className="font-bold">Large</p>
        <p className="mt-2 text-sm">Floating card.</p>
      </Surface>

      <Surface shadow="xl" className="p-6">
        <p className="font-bold">Extra Large</p>
        <p className="mt-2 text-sm">Strong elevation.</p>
      </Surface>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-start gap-8">
      <Surface {...args} shadow="none" className="p-6">
        <p className="font-bold">None</p>
        <p className="mt-2 text-sm">No shadow.</p>
      </Surface>

      <Surface {...args} shadow="sm" className="p-6">
        <p className="font-bold">Small</p>
        <p className="mt-2 text-sm">Subtle lift.</p>
      </Surface>

      <Surface {...args} shadow="md" className="p-6">
        <p className="font-bold">Medium</p>
        <p className="mt-2 text-sm">Noticeable elevation.</p>
      </Surface>

      <Surface {...args} shadow="lg" className="p-6">
        <p className="font-bold">Large</p>
        <p className="mt-2 text-sm">Floating card.</p>
      </Surface>

      <Surface {...args} shadow="xl" className="p-6">
        <p className="font-bold">Extra Large</p>
        <p className="mt-2 text-sm">Strong elevation.</p>
      </Surface>
    </div>
  ),
};

const CustomStyle: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Surface } from "@fried-ui/react";

const CustomStyle = () => {
  return (
    <Surface className="w-64 p-6 bg-linear-to-br from-pink-200 via-purple-200 to-blue-200">
      <p className="font-bold">Gradient Card</p>
      <p className="mt-2 text-sm">Pastel gradient via className.</p>
    </Surface>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Surface {...args} className="w-64 bg-linear-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      <p className="font-bold">Gradient Card</p>
      <p className="mt-2 text-sm">Pastel gradient via className.</p>
    </Surface>
  ),
};

export {
  Default,
  Variants,
  StatusVariants,
  PlainVariants,
  GlassVariants,
  FrostVariants,
  OverlayVariants,
  Radius,
  Shadow,
  CustomStyle,
};

export default meta;
