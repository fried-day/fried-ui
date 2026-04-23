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
    const input = screen.getByPlaceholderText("Default");
    expect(input.className).toContain("input");
    expect(input.className).not.toContain("input-primary");
    expect(input.className).not.toContain("input-size-md");
    expect(input.className).not.toContain("input-radius-md");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "overlay"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Input variant={variant} placeholder={variant} />);
      const input = screen.getByPlaceholderText(variant);
      expect(input.className).toContain(`input-${variant}`);
      unmount();
    });
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Input size={size} placeholder={size} />);
      const input = screen.getByPlaceholderText(size);
      expect(input.className).toContain(`input-size-${size}`);
      unmount();
    });
  });

  it("applies all radius classes with key-value format", () => {
    const radiusValues = ["none", "sm", "md", "lg", "full"] as const;

    radiusValues.forEach((radius) => {
      const { unmount } = render(<Input radius={radius} placeholder={radius} />);
      const input = screen.getByPlaceholderText(radius);
      expect(input.className).toContain(`input-radius-${radius}`);
      unmount();
    });
  });

  it("sets aria-invalid when aria-invalid is true", () => {
    render(<Input placeholder="Invalid" aria-invalid="true" />);
    expect(screen.getByPlaceholderText("Invalid")).toHaveAttribute("aria-invalid", "true");
  });

  it("disables input when disabled prop is true", () => {
    render(<Input placeholder="Disabled" disabled />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("sets readOnly attribute when readOnly prop is true", () => {
    render(<Input placeholder="ReadOnly" readOnly />);
    expect(screen.getByPlaceholderText("ReadOnly")).toHaveAttribute("readonly");
  });

  it("sets required attribute when required prop is true", () => {
    render(<Input placeholder="Required" required />);
    expect(screen.getByPlaceholderText("Required")).toBeRequired();
  });

  it("applies full-width modifier class when isFullWidth is true", () => {
    render(<Input placeholder="FullWidth" isFullWidth />);
    const input = screen.getByPlaceholderText("FullWidth");
    expect(input.className).toContain("input-full-width");
  });

  it("focuses the input via keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Focus" />);
    const input = screen.getByPlaceholderText("Focus");

    await user.tab();

    expect(input).toHaveFocus();
  });

  it("sets data-slot='input' on the input element", () => {
    render(<Input placeholder="Slot" />);
    const input = screen.getByPlaceholderText("Slot");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("merges custom className onto the input", () => {
    render(<Input className="mt-4" placeholder="Styled" />);
    const input = screen.getByPlaceholderText("Styled");
    expect(input.className).toContain("input");
    expect(input.className).toContain("mt-4");
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
});
