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
    children: "Content",
  },
  argTypes: {
    children: {
      control: false,
      description: "Content (ReactNode)",
      type: {
        name: "other",
        value: "ReactNode",
        required: true,
      },
      table: {
        type: {
          summary: "ReactNode",
        },
        category: "Children",
      },
    },
    variant: {
      control: "select",
      options: ["default", "plain", "success", "warning", "danger", "info", "glass", "frost", "overlay"],
      description:
        "Visual style. **Base:** default (neutral gray on white pages), plain (pure white on gray pages). **Status:** success (positive — completed actions), warning (caution — needs attention), danger (negative — destructive/error), info (neutral notice). **Special:** glass (frosted blur with border — premium overlay on media), frost (heavier blur no border — text-heavy overlay), overlay (dark scrim — subtitle/caption over images). Pair with `isBordered` for emphasis border on any variant. Use default for cards on white background, plain for cards on gray background, status variants for alert/callout boxes, glass/frost/overlay for media-heavy designs.",
      table: {
        type: {
          summary: '"default" | "plain" | "success" | "warning" | "danger" | "info" | "glass" | "frost" | "overlay"',
        },
        defaultValue: {
          summary: "default",
        },
        category: "Style Variants",
      },
    },
    isBordered: {
      control: "boolean",
      description: "Adds emphasis border using variant-specific border token",
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
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description:
        "Border radius scale. **none** — sharp corners (data tables, embedded). **sm** — subtle rounding. **md** (default) — standard cards. **lg** — emphasized cards/dialogs. **xl** — hero cards/banners.",
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
      description:
        "Elevation depth (orthogonal to variant — combine freely). **none** (default) — flat. **sm** — subtle lift (hover hint). **md** — noticeable elevation (cards). **lg** — floating (popovers). **xl** — strong elevation (modals/dialogs).",
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
  args: {
    className: "p-6",
    children: [
      <p key="title" className="font-bold">
        Title
      </p>,
      <p key="body" className="mt-2 text-sm">
        Content
      </p>,
    ],
  },
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Surface {...args} variant="default" className="p-6">
        <p className="font-bold">Default</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="default" className="p-6" isBordered>
        <p className="font-bold">Default Bordered</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </>
  ),
};

const StatusVariants: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Surface {...args} variant="success" className="p-4">
        <p className="font-bold">Success</p>
        <p className="mt-1 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="warning" className="p-4" isBordered>
        <p className="font-bold">Warning</p>
        <p className="mt-1 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="danger" className="p-4">
        <p className="font-bold">Danger</p>
        <p className="mt-1 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="info" className="p-4" isBordered>
        <p className="font-bold">Info</p>
        <p className="mt-1 text-sm">Content</p>
      </Surface>
    </>
  ),
};

const PlainVariants: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Surface {...args} variant="plain" radius="lg" className="p-6">
        <p className="font-bold">Plain</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </>
  ),
};

const GlassVariants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Surface {...args} variant="glass" radius="lg" className="p-6" isBordered>
        <p className="font-bold">Glass Surface</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </div>
  ),
};

const FrostVariants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-emerald-400 via-cyan-500 via-sky-500 via-teal-500 to-purple-600 p-16">
      <Surface {...args} variant="frost" radius="lg" className="p-6">
        <p className="font-bold">Frost Surface</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </div>
  ),
};

const OverlayVariants: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-80 w-160 items-center justify-center bg-linear-to-br from-orange-400 via-fuchsia-500 via-purple-500 via-rose-500 to-purple-600 p-16">
      <Surface {...args} variant="overlay" radius="lg" className="p-6" isBordered>
        <p className="font-bold">Overlay Surface</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </div>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Surface {...args} radius="none" className="p-6">
        <p className="font-bold">None</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} radius="sm" className="p-6">
        <p className="font-bold">Small</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} radius="md" className="p-6">
        <p className="font-bold">Medium</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} radius="lg" className="p-6">
        <p className="font-bold">Large</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} radius="xl" className="p-6">
        <p className="font-bold">Extra Large</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </>
  ),
};

const Shadow: Story = {
  render: (args): React.JSX.Element => (
    <>
      <Surface {...args} shadow="none" className="p-6">
        <p className="font-bold">None</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} shadow="sm" className="p-6">
        <p className="font-bold">Small</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} shadow="md" className="p-6">
        <p className="font-bold">Medium</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} shadow="lg" className="p-6">
        <p className="font-bold">Large</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} shadow="xl" className="p-6">
        <p className="font-bold">Extra Large</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </>
  ),
};

const Bordered: Story = {
  args: {
    isBordered: true,
  },
  render: (args): React.JSX.Element => (
    <>
      <Surface {...args} variant="default" className="p-6">
        <p className="font-bold">Default</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="success" className="p-6">
        <p className="font-bold">Success</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="warning" className="p-6">
        <p className="font-bold">Warning</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="danger" className="p-6">
        <p className="font-bold">Danger</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>

      <Surface {...args} variant="info" className="p-6">
        <p className="font-bold">Info</p>
        <p className="mt-2 text-sm">Content</p>
      </Surface>
    </>
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
  Bordered,
  Radius,
  Shadow,
};

export default meta;
