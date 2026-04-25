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
      options: ["default", "subtle", "plain", "overlay"],
      description:
        "Background layer tone (layer cake). **default** — neutral gray (neutral-50, standard card on white page). **subtle** — deeper gray (neutral-100, nested or inset, deeper emphasis). **plain** — pure white (layer-0, inverted or elevated card on dimmed bg). **overlay** — surface on top of a dim scrim (popover/modal content). Use default for standard cards, subtle for nested blocks, plain for modals on dimmed bg, overlay for content above scrim overlays.",
      table: {
        type: { summary: '"default" | "subtle" | "plain" | "overlay"' },
        defaultValue: { summary: "default" },
        category: "Style Variants",
      },
    },
    isBordered: {
      control: "boolean",
      description: "Whether the surface has an emphasis border",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description:
        "Border radius scale of the surface container. **none** — sharp architectural corners, common in admin or data dashboards. **sm** — subtle rounding for tight nested cards. **md** (default) — standard product card. **lg** — emphasized soft corners for hero or feature cards. **xl** — large hero cards and marketing splashes. Use md for typical content blocks, lg and xl for hero cards where the surface needs to feel softer, none inside data dashboards.",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description:
        "Elevation depth via box-shadow tokens. **none** (default) — flat surface that sits on the page background. **sm** — subtle lift, useful for inset cards or hover states. **md** — standard card elevation, the typical product card. **lg** — popovers, dropdowns, and floating panels. **xl** — modals, dialogs, and large floating sheets. Use none for inline content, md for cards, lg for popover-tier elements, xl for modal-tier dialogs.",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: "none" },
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
        <p className="mt-2 text-sm">Standard card (neutral-50)</p>
      </Surface>

      <Surface {...args} variant="subtle" className="p-6">
        <p className="font-bold">Subtle</p>
        <p className="mt-2 text-sm">Nested deeper (neutral-100)</p>
      </Surface>

      <Surface {...args} variant="plain" className="p-6">
        <p className="font-bold">Plain</p>
        <p className="mt-2 text-sm">Pure white (layer-0)</p>
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
        <p className="mt-2 text-sm">Standard card (neutral-50)</p>
      </Surface>

      <Surface {...args} variant="subtle" className="p-6">
        <p className="font-bold">Subtle</p>
        <p className="mt-2 text-sm">Nested deeper (neutral-100)</p>
      </Surface>

      <Surface {...args} variant="plain" className="p-6">
        <p className="font-bold">Plain</p>
        <p className="mt-2 text-sm">Pure white (layer-0)</p>
      </Surface>
    </>
  ),
};

const OverlayVariant: Story = {
  render: (args): React.JSX.Element => (
    <div className="flex h-56 w-160 items-center justify-center bg-linear-to-br from-fuchsia-500 via-purple-500 via-purple-600 to-blue-600 p-16">
      <Surface {...args} variant="overlay" className="p-6">
        <p className="font-bold">Overlay</p>
        <p className="mt-2 text-sm">On scrim (popover/modal)</p>
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

export { Default, Variants, OverlayVariant, Radius, Shadow, Bordered };

export default meta;
