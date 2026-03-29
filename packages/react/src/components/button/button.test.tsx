import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const el = screen.getByRole("button", { name: "Click me" });
    expect(el).toBeInTheDocument();
  });

  it("renders only base class without explicit props", () => {
    render(<Button>Default</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("fri-button");
    expect(el.className).not.toContain("fri-button--primary");
    expect(el.className).not.toContain("fri-button--size-md");
    expect(el.className).not.toContain("fri-button--radius-md");
  });

  it("fires onPress when clicked", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Button onPress={onPress}>Press</Button>);

    await user.click(screen.getByRole("button"));

    expect(onPress).toHaveBeenCalledOnce();
  });

  it("does not fire onPress when disabled", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onPress={onPress} isDisabled>
        Disabled
      </Button>,
    );

    await user.click(screen.getByRole("button"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("applies variant class only when explicitly set", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--primary");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "ghost", "outline", "success", "warning", "danger", "info"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button").className).toContain(`fri-button--${variant}`);
      unmount();
    });
  });

  it("applies size class with key-value format", () => {
    const sizes = ["sm", "md", "lg", "xl"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole("button").className).toContain(`fri-button--size-${size}`);
      unmount();
    });
  });

  it("applies radius class with key-value format", () => {
    const radii = ["none", "sm", "md", "lg", "xl", "full"] as const;

    radii.forEach((radius) => {
      const { unmount } = render(<Button radius={radius}>{radius}</Button>);
      expect(screen.getByRole("button").className).toContain(`fri-button--radius-${radius}`);
      unmount();
    });
  });

  it("merges custom className", () => {
    render(<Button className="mt-4">Styled</Button>);
    expect(screen.getByRole("button").className).toContain("mt-4");
  });

  it("renders as disabled with aria attribute", () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("passes through additional props", () => {
    render(<Button data-testid="custom-btn">Props</Button>);
    expect(screen.getByTestId("custom-btn")).toBeInTheDocument();
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies shadow class when isShadow is true", () => {
    render(<Button isShadow>Shadow</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--shadow");
  });

  it("does not apply shadow class when isShadow is false", () => {
    render(<Button>No shadow</Button>);
    expect(screen.getByRole("button").className).not.toContain("fri-button--shadow");
  });

  it("applies icon-only class", () => {
    render(
      <Button aria-label="Close" isIconOnly>
        <svg />
      </Button>,
    );

    expect(screen.getByRole("button").className).toContain("fri-button--icon-only");
  });

  it("applies disabled class", () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--disabled");
  });

  it("applies full-width class", () => {
    render(<Button isFullWidth>Full</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--full-width");
  });

  it("applies pending class", () => {
    render(<Button isPending>Saving</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--pending");
  });

  it("sets data-slot attribute", () => {
    render(<Button>Slot</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
  });

  it("sets displayName", () => {
    expect(Button.displayName).toBe("Button");
  });

  it("supports className as render prop function", () => {
    render(
      <Button className={({ isHovered }): string => (isHovered ? "hovered-class" : "idle-class")}>Dynamic</Button>,
    );

    const el = screen.getByRole("button");
    expect(el.className).toContain("fri-button");
    expect(el.className).toContain("idle-class");
  });

  it("supports render props children", () => {
    render(<Button>{({ isPressed }): string => (isPressed ? "Pressed" : "Idle")}</Button>);
    expect(screen.getByRole("button", { name: "Idle" })).toBeInTheDocument();
  });
});
