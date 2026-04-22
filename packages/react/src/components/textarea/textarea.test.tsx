import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders with default props", () => {
    render(<Textarea placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("renders only base class without explicit variant/size/radius/resize props", () => {
    render(<Textarea placeholder="Default" />);
    const textarea = screen.getByPlaceholderText("Default");
    expect(textarea.className).toContain("textarea");
    expect(textarea.className).not.toContain("textarea-primary");
    expect(textarea.className).not.toContain("textarea-size-md");
    expect(textarea.className).not.toContain("textarea-radius-md");
    expect(textarea.className).not.toContain("textarea-resize-vertical");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "plain"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Textarea variant={variant} placeholder={variant} />);
      const textarea = screen.getByPlaceholderText(variant);
      expect(textarea.className).toContain(`textarea-${variant}`);
      unmount();
    });
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Textarea size={size} placeholder={size} />);
      const textarea = screen.getByPlaceholderText(size);
      expect(textarea.className).toContain(`textarea-size-${size}`);
      unmount();
    });
  });

  it("applies all radius classes with key-value format", () => {
    const radiusValues = ["none", "sm", "md", "lg", "full"] as const;

    radiusValues.forEach((radius) => {
      const { unmount } = render(<Textarea radius={radius} placeholder={radius} />);
      const textarea = screen.getByPlaceholderText(radius);
      expect(textarea.className).toContain(`textarea-radius-${radius}`);
      unmount();
    });
  });

  it("applies all resize classes with key-value format", () => {
    const resizeValues = ["none", "vertical", "horizontal", "both"] as const;

    resizeValues.forEach((resize) => {
      const { unmount } = render(<Textarea resize={resize} placeholder={resize} />);
      const textarea = screen.getByPlaceholderText(resize);
      expect(textarea.className).toContain(`textarea-resize-${resize}`);
      unmount();
    });
  });

  it("sets aria-invalid when aria-invalid is true", () => {
    render(<Textarea placeholder="Invalid" aria-invalid="true" />);
    expect(screen.getByPlaceholderText("Invalid")).toHaveAttribute("aria-invalid", "true");
  });

  it("disables textarea when disabled prop is true", () => {
    render(<Textarea placeholder="Disabled" disabled />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("sets readOnly attribute when readOnly prop is true", () => {
    render(<Textarea placeholder="ReadOnly" readOnly />);
    expect(screen.getByPlaceholderText("ReadOnly")).toHaveAttribute("readonly");
  });

  it("sets required attribute when required prop is true", () => {
    render(<Textarea placeholder="Required" required />);
    expect(screen.getByPlaceholderText("Required")).toBeRequired();
  });

  it("applies full-width modifier class when isFullWidth is true", () => {
    render(<Textarea placeholder="FullWidth" isFullWidth />);
    const textarea = screen.getByPlaceholderText("FullWidth");
    expect(textarea.className).toContain("textarea-full-width");
  });

  it("focuses the textarea via keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Focus" />);
    const textarea = screen.getByPlaceholderText("Focus");

    await user.tab();

    expect(textarea).toHaveFocus();
  });

  it("sets data-slot='textarea' on the textarea element", () => {
    render(<Textarea placeholder="Slot" />);
    const textarea = screen.getByPlaceholderText("Slot");
    expect(textarea).toHaveAttribute("data-slot", "textarea");
  });

  it("merges custom className", () => {
    render(<Textarea className="mt-4" placeholder="Styled" />);
    const textarea = screen.getByPlaceholderText("Styled");
    expect(textarea.className).toContain("textarea");
    expect(textarea.className).toContain("mt-4");
  });

  it("forwards ref to the textarea element", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea placeholder="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("sets displayName", () => {
    expect(Textarea.displayName).toBe("Textarea");
  });

  it("passes through native HTML attributes", () => {
    render(<Textarea name="bio" placeholder="Attrs" data-testid="custom-textarea" />);
    const textarea = screen.getByTestId("custom-textarea");
    expect(textarea).toHaveAttribute("name", "bio");
  });

  it("fires onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea placeholder="Type" onChange={onChange} />);

    await user.type(screen.getByPlaceholderText("Type"), "hello");

    expect(onChange).toHaveBeenCalled();
    expect((screen.getByPlaceholderText("Type") as HTMLTextAreaElement).value).toBe("hello");
  });
});
