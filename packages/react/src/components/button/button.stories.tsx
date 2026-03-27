import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible button built on [React Aria Button](https://react-spectrum.adobe.com/react-aria/Button.html).",
          "",
          "### React Aria Props",
          "",
          "| Prop | Type | Description |",
          "| --- | --- | --- |",
          "| `isPending` | `boolean` | Pending state. Disables press/hover, announces to screen readers |",
          "| `isDisabled` | `boolean` | Whether the button is disabled |",
          "| `children` | `ReactNode \\| (renderProps) => ReactNode` | Button content, supports render props |",
          "| `onPress` | `(e: PressEvent) => void` | Press event handler |",
          "| `onPressStart` | `(e: PressEvent) => void` | Press start handler |",
          "| `onPressEnd` | `(e: PressEvent) => void` | Press end handler |",
          "| `onPressChange` | `(isPressed: boolean) => void` | Press state change handler |",
          "| `onHoverStart` | `(e: HoverEvent) => void` | Hover start handler |",
          "| `onHoverEnd` | `(e: HoverEvent) => void` | Hover end handler |",
          "| `onHoverChange` | `(isHovering: boolean) => void` | Hover state change handler |",
          "| `onFocus` | `(e: FocusEvent) => void` | Focus handler |",
          "| `onBlur` | `(e: FocusEvent) => void` | Blur handler |",
          "| `onFocusChange` | `(isFocused: boolean) => void` | Focus state change handler |",
          "| `onKeyDown` | `(e: KeyboardEvent) => void` | Key down handler |",
          "| `onKeyUp` | `(e: KeyboardEvent) => void` | Key up handler |",
          "| `type` | `'button' \\| 'submit' \\| 'reset'` | Button type attribute |",
          "| `form` | `string` | Form ID to associate |",
          "| `formAction` | `string` | Form action URL |",
          "| `autoFocus` | `boolean` | Auto focus on mount |",
          "| `aria-label` | `string` | Accessible label |",
          "| `aria-labelledby` | `string` | ID of labelling element |",
          "| `aria-describedby` | `string` | ID of describing element |",
          "",
          "### Render Props (CSS Selectors)",
          "",
          "| Render Prop | CSS Selector | Description |",
          "| --- | --- | --- |",
          "| `isHovered` | `[data-hovered]` | Mouse hover |",
          "| `isPressed` | `[data-pressed]` | Pressed/active |",
          "| `isFocused` | `[data-focused]` | Focused (mouse or keyboard) |",
          "| `isFocusVisible` | `[data-focus-visible]` | Keyboard focused |",
          "| `isDisabled` | `[data-disabled]` | Disabled |",
          "| `isPending` | `[data-pending]` | Pending/loading |",
        ].join("\n"),
      },
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
      table: {
        type: {
          summary: "ReactNode",
        },
        category: "Content",
      },
    },
    variant: {
      control: "select",
      options: ["primary"],
      description: "Visual style variant",
      table: {
        type: {
          summary: '"primary"',
        },
        defaultValue: {
          summary: '"primary"',
        },
        category: "Style",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Button size (golden ratio scale)",
      table: {
        type: {
          summary: '"sm" | "md" | "lg" | "xl"',
        },
        defaultValue: {
          summary: '"md"',
        },
        category: "Style",
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
      description: "Shows loading spinner, disables press/hover",
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

const Default: Story = {};

const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

const Disabled: Story = {
  args: {
    children: "Disabled",
    isDisabled: true,
  },
};

const Pending: Story = {
  args: {
    children: "Saving...",
    isPending: true,
  },
};

export { Default, Sizes, Disabled, Pending };

export default meta;
