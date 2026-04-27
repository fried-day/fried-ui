import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "react-aria-components";

import { CLASS_NAME_ARG_TYPE } from "../../storybook/argtypes";

import { FieldError } from "./FieldError";

const meta: Meta<typeof FieldError> = {
  title: "Components/FieldError",
  component: FieldError,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Error message",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Error message content shown when the parent field is invalid.",
      type: {
        name: "other",
        value: "ReactNode",
        required: true,
      },
      table: {
        type: { summary: "ReactNode" },
        category: "Children",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "Text size of the field error message on a `sqrt(phi) ≈ 1.272` ratio so adjacent sizes clear the perceptual JND threshold. **Scale:** sm (text-xs) for dense forms and secondary helpers, md (text-base, default) for standard form fields, lg (text-xl) for emphasized or large form sections. Size should match the paired Label and Description so the entire field reads at a consistent visual weight. Use md for the majority of forms, sm for compact inline validation, lg only when the form field itself uses a larger size.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
        category: "Style Variants",
      },
    },
    isDisabled: {
      control: "boolean",
      description:
        "Whether the field error is disabled (dims and removes pointer events). Match the parent field's disabled state so the error visually aligns with the rest of the form control.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Style Variants",
      },
    },
    className: CLASS_NAME_ARG_TYPE,
  },
  decorators: [
    (Story): React.JSX.Element => (
      <TextField isInvalid>
        <Story />
      </TextField>
    ),
  ],
} satisfies Meta<typeof FieldError>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Sizes: Story = {
  render: (args): React.JSX.Element => (
    <>
      <TextField isInvalid>
        <FieldError {...args} size="sm">
          Small FieldError
        </FieldError>
      </TextField>

      <TextField isInvalid>
        <FieldError {...args} size="md">
          Medium FieldError
        </FieldError>
      </TextField>

      <TextField isInvalid>
        <FieldError {...args} size="lg">
          Large FieldError
        </FieldError>
      </TextField>
    </>
  ),
  decorators: [(Story): React.JSX.Element => <Story />],
};

const Disabled: Story = {
  args: {
    children: "Disabled FieldError",
    isDisabled: true,
  },
};

export { Default, Sizes, Disabled };

export default meta;
