import type { Meta, StoryObj } from "@storybook/react";

import { ArrowRightIcon, MoreIcon, PlusIcon, SettingsIcon, ShareIcon } from "../icons";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    radius: "md",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
      table: {
        type: {
          summary: "ReactNode",
        },
        category: "Children",
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "success", "warning", "danger", "info"],
      description: "The visual variant of the button",
      table: {
        type: {
          summary: '"primary" | "secondary" | "ghost" | "outline" | "success" | "warning" | "danger" | "info"',
        },
        defaultValue: {
          summary: "primary",
        },
        category: "Style Variants",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the button",
      table: {
        type: {
          summary: '"sm" | "md" | "lg" | "xl"',
        },
        defaultValue: {
          summary: "md",
        },
        category: "Style Variants",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "The border radius of the button",
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
    isIconOnly: {
      control: "boolean",
      description: "Whether the button is icon-only (square)",
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
    isFullWidth: {
      control: "boolean",
      description: "Whether the button takes full width of its container",
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
    isDisabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "State",
      },
    },
    isPending: {
      control: "boolean",
      description: "Whether the button shows a loading spinner",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
        category: "State",
      },
    },
    onPress: {
      control: false,
      description: "Handler called when the button is pressed",
      table: {
        type: {
          summary: "(e: PressEvent) => void",
        },
        category: "Events",
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
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Basic = () => {
  return <Button onPress={() => console.log("pressed")}>Click me</Button>;
};`,
      },
    },
  },
};

const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Variants = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>

      <Button {...args} variant="secondary">
        Secondary
      </Button>

      <Button {...args} variant="ghost">
        Ghost
      </Button>

      <Button {...args} variant="outline">
        Outline
      </Button>

      <Button {...args} variant="success">
        Success
      </Button>

      <Button {...args} variant="warning">
        Warning
      </Button>

      <Button {...args} variant="danger">
        Danger
      </Button>

      <Button {...args} variant="info">
        Info
      </Button>
    </div>
  ),
};

const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Sizes = () => {
  return (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} size="sm">
        Small
      </Button>

      <Button {...args} size="md">
        Medium
      </Button>

      <Button {...args} size="lg">
        Large
      </Button>

      <Button {...args} size="xl">
        Extra Large
      </Button>
    </div>
  ),
};

const Radii: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Radii = () => {
  return (
    <div className="flex items-end gap-4">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="xl">XL</Button>
      <Button radius="full">Full</Button>
    </div>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} radius="none">
        None
      </Button>

      <Button {...args} radius="sm">
        Small
      </Button>

      <Button {...args} radius="md">
        Medium
      </Button>

      <Button {...args} radius="lg">
        Large
      </Button>

      <Button {...args} radius="xl">
        XL
      </Button>

      <Button {...args} radius="full">
        Full
      </Button>
    </div>
  ),
};

const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button, ArrowRightIcon } from "@fried-ui/react";

// Option 1: slot="icon" (recommended)
const WithIcon = () => {
  return (
    <Button>
      <ArrowRightIcon slot="icon" />
      Next
    </Button>
  );
};

// Option 2: className
const WithIconAlt = () => {
  return (
    <Button>
      <ArrowRightIcon className="size-match-font" />
      Next
    </Button>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} size="sm">
        <ArrowRightIcon slot="icon" />
        Next
      </Button>

      <Button {...args} size="md">
        <ArrowRightIcon slot="icon" />
        Next
      </Button>

      <Button {...args} size="lg">
        <ArrowRightIcon slot="icon" />
        Next
      </Button>
    </div>
  ),
};

const IconOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button, SettingsIcon } from "@fried-ui/react";

// Option 1: slot="icon" (recommended)
const IconOnly = () => {
  return (
    <Button aria-label="Settings" isIconOnly>
      <SettingsIcon slot="icon" />
    </Button>
  );
};

// Option 2: className
const IconOnlyAlt = () => {
  return (
    <Button aria-label="Settings" isIconOnly>
      <SettingsIcon className="size-match-font" />
    </Button>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Button {...args} aria-label="Settings" isIconOnly>
        <SettingsIcon className="size-match-font" />
      </Button>

      <Button {...args} variant="secondary" aria-label="More" isIconOnly>
        <MoreIcon className="size-match-font" />
      </Button>

      <Button {...args} variant="outline" aria-label="Add" isIconOnly>
        <PlusIcon className="size-match-font" />
      </Button>

      <Button {...args} variant="ghost" aria-label="Share" isIconOnly>
        <ShareIcon className="size-match-font" />
      </Button>
    </div>
  ),
};

const FullWidth: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const FullWidth = () => {
  return <Button isFullWidth>Full Width</Button>;
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <div className="flex w-80 flex-col gap-4">
      <Button {...args} isFullWidth>
        Full Width
      </Button>

      <Button {...args} variant="secondary" isFullWidth>
        Full Width Secondary
      </Button>

      <Button {...args} variant="outline" isFullWidth>
        Full Width Outline
      </Button>
    </div>
  ),
};

const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Disabled = () => {
  return <Button isDisabled>Disabled</Button>;
};`,
      },
    },
  },
  args: {
    children: "Disabled",
    isDisabled: true,
  },
};

const Pending: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const Pending = () => {
  return <Button isPending>Saving...</Button>;
};`,
      },
    },
  },
  args: {
    children: "Saving...",
    isPending: true,
  },
};

const RenderProps: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button } from "@fried-ui/react";

const RenderProps = () => {
  return (
    <Button>
      {({ isHovered }) => (isHovered ? "Hovering!" : "Hover me")}
    </Button>
  );
};`,
      },
    },
  },
  render: (args): React.JSX.Element => (
    <Button {...args}>{({ isHovered }): string => (isHovered ? "Hovering!" : "Hover me")}</Button>
  ),
};

export { Default, Variants, Sizes, Radii, WithIcon, IconOnly, FullWidth, Disabled, Pending, RenderProps };

export default meta;
