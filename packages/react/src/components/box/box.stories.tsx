import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./box";

const meta: Meta<typeof Box> = {
  title: "Primitives/Box",
  component: Box,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: "I am a Box",
    className: "p-4 bg-blue-100 rounded-lg",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    children: "I am a section",
    className: "p-8 bg-green-100 border border-green-300 rounded-xl",
  },
};

export const Nested: Story = {
  render: () => (
    <Box className="space-y-4 rounded-xl bg-gray-50 p-6">
      <Box className="rounded-lg bg-white p-4 shadow">Card 1</Box>
      <Box className="rounded-lg bg-white p-4 shadow">Card 2</Box>
      <Box className="rounded-lg bg-white p-4 shadow">Card 3</Box>
    </Box>
  ),
};
