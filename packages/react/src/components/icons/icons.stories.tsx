import type { ComponentType, SVGProps } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import * as Icons from "./index";

const iconList = Object.entries(Icons) as [string, ComponentType<SVGProps<SVGSVGElement>>][];

const meta = {
  title: "Components/Icons",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Gallery: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-4">
      {iconList.map(([name, Icon]) => (
        <span key={name} title={name}>
          <Icon className="size-6" />
        </span>
      ))}
    </div>
  ),
};

export { Gallery };

export default meta;
