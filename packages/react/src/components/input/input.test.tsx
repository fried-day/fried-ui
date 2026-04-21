import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("renders only base class without explicit variant/size/radius props", () => {
    render(<Input placeholder="Default" />);
    const wrapper = screen.getByPlaceholderText("Default").parentElement;
    expect(wrapper?.className).toContain("fri-input");
    expect(wrapper?.className).not.toContain("fri-input--primary");
    expect(wrapper?.className).not.toContain("fri-input--size-md");
    expect(wrapper?.className).not.toContain("fri-input--radius-md");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "plain"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Input variant={variant} placeholder={variant} />);
      const wrapper = screen.getByPlaceholderText(variant).parentElement;
      expect(wrapper?.className).toContain(`fri-input--${variant}`);
      unmount();
    });
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Input size={size} placeholder={size} />);
      const wrapper = screen.getByPlaceholderText(size).parentElement;
      expect(wrapper?.className).toContain(`fri-input--size-${size}`);
      unmount();
    });
  });

  it("applies all radius classes with key-value format", () => {
    const radiusValues = ["none", "sm", "md", "lg", "full"] as const;

    radiusValues.forEach((radius) => {
      const { unmount } = render(<Input radius={radius} placeholder={radius} />);
      const wrapper = screen.getByPlaceholderText(radius).parentElement;
      expect(wrapper?.className).toContain(`fri-input--radius-${radius}`);
      unmount();
    });
  });

  it("sets aria-invalid when isInvalid is true", () => {
    render(<Input placeholder="Invalid" isInvalid />);
    expect(screen.getByPlaceholderText("Invalid")).toHaveAttribute("aria-invalid", "true");
  });

  it("disables input when isDisabled is true", () => {
    render(<Input placeholder="Disabled" isDisabled />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("sets readOnly attribute when isReadOnly is true", () => {
    render(<Input placeholder="ReadOnly" isReadOnly />);
    expect(screen.getByPlaceholderText("ReadOnly")).toHaveAttribute("readonly");
  });

  it("sets required attribute when isRequired is true", () => {
    render(<Input placeholder="Required" isRequired />);
    expect(screen.getByPlaceholderText("Required")).toBeRequired();
  });

  it("applies full-width modifier class when isFullWidth is true", () => {
    render(<Input placeholder="FullWidth" isFullWidth />);
    const wrapper = screen.getByPlaceholderText("FullWidth").parentElement;
    expect(wrapper?.className).toContain("fri-input--full-width");
  });

  it("focuses the input via keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Focus" />);
    const input = screen.getByPlaceholderText("Focus");

    await user.tab();

    expect(input).toHaveFocus();
  });

  it("sets data-slot='input-wrapper' on wrapper and data-slot='input' on input", () => {
    render(<Input placeholder="Slot" />);
    const input = screen.getByPlaceholderText("Slot");
    expect(input).toHaveAttribute("data-slot", "input");
    expect(input.parentElement).toHaveAttribute("data-slot", "input-wrapper");
  });

  it("merges custom className onto the wrapper", () => {
    render(<Input className="mt-4" placeholder="Styled" />);
    const wrapper = screen.getByPlaceholderText("Styled").parentElement;
    expect(wrapper?.className).toContain("fri-input");
    expect(wrapper?.className).toContain("mt-4");
  });

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input placeholder="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("sets displayName", () => {
    expect(Input.displayName).toBe("Input");
  });

  it("passes through native HTML attributes to the input", () => {
    render(<Input name="username" placeholder="Attrs" data-testid="custom-input" />);
    const input = screen.getByTestId("custom-input");
    expect(input).toHaveAttribute("name", "username");
  });

  it("fires onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input placeholder="Type" onChange={onChange} />);

    await user.type(screen.getByPlaceholderText("Type"), "hello");

    expect(onChange).toHaveBeenCalled();
    expect((screen.getByPlaceholderText("Type") as HTMLInputElement).value).toBe("hello");
  });

  it("renders startIcon and endIcon in the wrapper", () => {
    render(
      <Input
        placeholder="Icons"
        startIcon={<svg data-testid="start-icon" />}
        endIcon={<svg data-testid="end-icon" />}
      />,
    );

    const wrapper = screen.getByPlaceholderText("Icons").parentElement;
    expect(wrapper).toContainElement(screen.getByTestId("start-icon"));
    expect(wrapper).toContainElement(screen.getByTestId("end-icon"));
  });
});
