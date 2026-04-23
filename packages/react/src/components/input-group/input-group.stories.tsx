import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { InformationCircleIcon, CheckCircleIcon, Spinner } from "../icons";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "./InputGroup";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "primary",
    size: "md",
    radius: "md",
    isFullWidth: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description:
        "Visual style of the group wrapper. **primary** (default) — bordered white field matching `Input` primary. **secondary** — filled muted background. Use primary for main forms and search bars, secondary for nested groups inside cards.",
      table: {
        type: { summary: '"primary" | "secondary"' },
        defaultValue: { summary: "primary" },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Size scale. **sm** (text-xs) — compact filters. **md** (text-sm, default) — standard. **lg** (text-base) — hero search. Children (InputGroupInput / Button / addons) inherit via font-size.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description:
        "Border radius scale. **none** — sharp. **sm** — subtle. **md** (default) — standard. **lg** — emphasized. **full** — pill (common for search bars).",
      table: {
        type: { summary: '"none" | "sm" | "md" | "lg" | "full"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    isFullWidth: {
      control: "boolean",
      description: "Whether the group stretches to fill its container width",
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
} satisfies Meta<typeof InputGroup>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <InformationCircleIcon />
      </InputGroupAddon>

      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

const WithTrailingText: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  ),
};

const WithButton: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Search..." />

      <InputGroupAddon align="inline-end">
        <Button size="sm" variant="outline">
          Search
        </Button>
      </InputGroupAddon>
    </InputGroup>
  ),
};

const WithPrefixSuffix: Story = {
  render: (args): React.JSX.Element => (
    <>
      <InputGroup {...args}>
        <InputGroupAddon>$</InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
      </InputGroup>

      <InputGroup {...args}>
        <InputGroupInput placeholder="example" />
        <InputGroupAddon align="inline-end">.com</InputGroupAddon>
      </InputGroup>
    </>
  ),
};

const WithPending: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args}>
      <InputGroupInput defaultValue="Validating" readOnly />

      <InputGroupAddon align="inline-end">
        <Spinner className="size-4 animate-spin" />
      </InputGroupAddon>
    </InputGroup>
  ),
};

const Variants: Story = {
  render: (args): React.JSX.Element => (
    <>
      <InputGroup {...args} variant="primary">
        <InputGroupInput placeholder="Primary" />
      </InputGroup>

      <InputGroup {...args} variant="secondary">
        <InputGroupInput placeholder="Secondary" />
      </InputGroup>
    </>
  ),
};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <InputGroup {...args} size="sm">
        <InputGroupInput placeholder="Small" />
      </InputGroup>

      <InputGroup {...args} size="md">
        <InputGroupInput placeholder="Medium" />
      </InputGroup>

      <InputGroup {...args} size="lg">
        <InputGroupInput placeholder="Large" />
      </InputGroup>
    </>
  ),
};

const Radius: Story = {
  render: (args): React.JSX.Element => (
    <>
      <InputGroup {...args} radius="none">
        <InputGroupInput placeholder="None" />
      </InputGroup>

      <InputGroup {...args} radius="md">
        <InputGroupInput placeholder="Medium" />
      </InputGroup>

      <InputGroup {...args} radius="full">
        <InputGroupInput placeholder="Full" />
      </InputGroup>
    </>
  ),
};

const WithTextarea: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args} className="w-80">
      <InputGroupTextarea placeholder="Write a message..." rows={4} />

      <InputGroupAddon align="block-end">
        <Button size="sm" variant="primary">
          Send
        </Button>
      </InputGroupAddon>
    </InputGroup>
  ),
};

const WithIconAndButton: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <InformationCircleIcon />
      </InputGroupAddon>

      <InputGroupInput placeholder="Search..." />

      <InputGroupAddon align="inline-end">
        <Button size="sm" variant="ghost">
          Clear
        </Button>
      </InputGroupAddon>
    </InputGroup>
  ),
};

const Invalid: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Invalid value" aria-invalid="true" />

      <InputGroupAddon align="inline-end">
        <CheckCircleIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
};

const Disabled: Story = {
  render: (args): React.JSX.Element => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Disabled" disabled />
    </InputGroup>
  ),
};

const FullWidth: Story = {
  args: { isFullWidth: true },
  render: (args): React.JSX.Element => (
    <>
      <InputGroup {...args}>
        <InputGroupInput placeholder="Full width" />
      </InputGroup>
    </>
  ),
};

export {
  Default,
  WithTrailingText,
  WithButton,
  WithPrefixSuffix,
  WithPending,
  WithIconAndButton,
  WithTextarea,
  Variants,
  Sizes,
  Radius,
  Invalid,
  Disabled,
  FullWidth,
};

export default meta;
