import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Description } from "../description";
import { FieldError } from "../field-error";
import { Input } from "../input";
import { Label } from "../label";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("renders compound children", () => {
    render(
      <TextField>
        <Label>Field label</Label>
        <Input placeholder="Value" />
      </TextField>,
    );

    expect(screen.getByText("Field label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();
  });

  it("renders only base class without explicit size/full-width props", () => {
    const { container } = render(
      <TextField>
        <Input placeholder="Value" />
      </TextField>,
    );

    const wrapper = container.querySelector('[data-slot="text-field"]');
    expect(wrapper?.className).toBe("text-field");
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(
        <TextField size={size}>
          <Input placeholder={size} />
        </TextField>,
      );

      const wrapper = container.querySelector('[data-slot="text-field"]');
      expect(wrapper?.className).toContain(`text-field-size-${size}`);
      unmount();
    });
  });

  it("applies full-width modifier class when isFullWidth is true", () => {
    const { container } = render(
      <TextField isFullWidth>
        <Input placeholder="Value" />
      </TextField>,
    );

    const wrapper = container.querySelector('[data-slot="text-field"]');
    expect(wrapper?.className).toContain("text-field-full-width");
  });

  it("forwards isRequired to AriaTextField", () => {
    const { container } = render(
      <TextField isRequired>
        <Label>Field label</Label>
        <Input />
      </TextField>,
    );

    const wrapper = container.querySelector('[data-slot="text-field"]');
    expect(wrapper).toHaveAttribute("data-required", "true");
  });

  it("forwards isInvalid to AriaTextField", () => {
    const { container } = render(
      <TextField isInvalid>
        <Label>Field label</Label>
        <Input />
      </TextField>,
    );

    const wrapper = container.querySelector('[data-slot="text-field"]');
    expect(wrapper).toHaveAttribute("data-invalid", "true");
  });

  it("forwards isDisabled to AriaTextField", () => {
    const { container } = render(
      <TextField isDisabled>
        <Label>Field label</Label>
        <Input />
      </TextField>,
    );

    const wrapper = container.querySelector('[data-slot="text-field"]');
    expect(wrapper).toHaveAttribute("data-disabled", "true");
  });

  it("forwards isReadOnly to AriaTextField", () => {
    const { container } = render(
      <TextField defaultValue="Hello" isReadOnly>
        <Input />
      </TextField>,
    );

    const wrapper = container.querySelector('[data-slot="text-field"]');
    expect(wrapper).toHaveAttribute("data-readonly", "true");
  });

  it("renders Label child", () => {
    const { container } = render(
      <TextField>
        <Label>Field label</Label>
        <Input />
      </TextField>,
    );

    const labelEl = container.querySelector('[data-slot="label"]');
    expect(labelEl).toBeInTheDocument();
    expect(labelEl).toHaveTextContent("Field label");
  });

  it("renders Description child", () => {
    const { container } = render(
      <TextField>
        <Label>Field label</Label>
        <Input />
        <Description>Help text</Description>
      </TextField>,
    );

    const descEl = container.querySelector('[data-slot="description"]');
    expect(descEl).toBeInTheDocument();
    expect(descEl).toHaveTextContent("Help text");
  });

  it("renders FieldError when field is invalid", () => {
    const { container } = render(
      <TextField isInvalid>
        <Label>Field label</Label>
        <Input />
        <FieldError>Error message</FieldError>
      </TextField>,
    );

    const errorEl = container.querySelector('[data-slot="field-error"]');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveTextContent("Error message");
  });

  it("does not render FieldError when field is not invalid", () => {
    const { container } = render(
      <TextField>
        <Label>Field label</Label>
        <Input />
        <FieldError>Error message</FieldError>
      </TextField>,
    );

    const errorEl = container.querySelector('[data-slot="field-error"]');
    expect(errorEl).not.toBeInTheDocument();
  });

  it("fires onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TextField onChange={onChange}>
        <Input placeholder="Value" />
      </TextField>,
    );

    await user.type(screen.getByPlaceholderText("Value"), "hi");

    expect(onChange).toHaveBeenCalled();
    expect((screen.getByPlaceholderText("Value") as HTMLInputElement).value).toBe("hi");
  });

  it("sets data-slot='text-field' on the wrapper", () => {
    const { container } = render(
      <TextField>
        <Input />
      </TextField>,
    );

    expect(container.querySelector('[data-slot="text-field"]')).toBeInTheDocument();
  });

  it("merges custom className onto the wrapper", () => {
    const { container } = render(
      <TextField className="mt-4">
        <Input />
      </TextField>,
    );

    const wrapper = container.querySelector('[data-slot="text-field"]');
    expect(wrapper?.className).toContain("text-field");
    expect(wrapper?.className).toContain("mt-4");
  });

  it("forwards ref to the wrapper div", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <TextField ref={ref}>
        <Input />
      </TextField>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(TextField.displayName).toBe("TextField");
  });

  it("passes through native HTML attributes (name, autoComplete, type)", () => {
    render(
      <TextField name="field-name" autoComplete="off" type="text">
        <Input placeholder="Value" />
      </TextField>,
    );

    const input = screen.getByPlaceholderText("Value");
    expect(input).toHaveAttribute("name", "field-name");
    expect(input).toHaveAttribute("autoComplete", "off");
    expect(input).toHaveAttribute("type", "text");
  });

  it("passes defaultValue to the underlying input", () => {
    render(
      <TextField defaultValue="Initial">
        <Input placeholder="Value" />
      </TextField>,
    );

    expect((screen.getByPlaceholderText("Value") as HTMLInputElement).value).toBe("Initial");
  });

  it("propagates isDisabled to Label via context", () => {
    const { container } = render(
      <TextField isDisabled>
        <Label>Field label</Label>
        <Input />
      </TextField>,
    );

    const label = container.querySelector('[data-slot="label"]');
    expect(label?.className).toContain("label-disabled");
  });

  it("propagates isInvalid to Description via context", () => {
    const { container } = render(
      <TextField isInvalid>
        <Label>Field label</Label>
        <Input />
        <Description>Help text</Description>
      </TextField>,
    );

    const description = container.querySelector('[data-slot="description"]');
    expect(description?.className).toContain("description-invalid");
  });

  it("propagates isRequired to Label via context (shows asterisk)", () => {
    render(
      <TextField isRequired>
        <Label>Field label</Label>
        <Input />
      </TextField>,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("explicit prop on Label overrides context value", () => {
    const { container } = render(
      <TextField isDisabled>
        <Label isDisabled={false}>Field label</Label>
        <Input />
      </TextField>,
    );

    const label = container.querySelector('[data-slot="label"]');
    expect(label?.className).not.toContain("label-disabled");
  });
});
