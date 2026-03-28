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

  it("applies variant class", () => {
    render(<Button variant="primary">Primary</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("fri-button--primary");
  });

  it("applies size classes", () => {
    const { unmount: u1 } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--sm");
    u1();

    const { unmount: u2 } = render(<Button size="md">Medium</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--md");
    u2();

    const { unmount: u3 } = render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--lg");
    u3();

    render(<Button size="xl">Extra Large</Button>);
    expect(screen.getByRole("button").className).toContain("fri-button--xl");
  });

  it("applies default variant and size", () => {
    render(<Button>Default</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("fri-button--primary");
    expect(el.className).toContain("fri-button--md");
  });

  it("merges custom className", () => {
    render(<Button className="mt-4">Styled</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("mt-4");
  });

  it("renders as disabled with aria attribute", () => {
    render(<Button isDisabled>Disabled</Button>);
    const el = screen.getByRole("button");
    expect(el).toBeDisabled();
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

  it("applies icon-only class", () => {
    render(
      <Button aria-label="Close" isIconOnly>
        <svg />
      </Button>,
    );

    const el = screen.getByRole("button");
    expect(el.className).toContain("fri-button--icon-only");
  });

  it("supports render props children", () => {
    render(<Button>{({ isPressed }): string => (isPressed ? "Pressed" : "Idle")}</Button>);
    expect(screen.getByRole("button", { name: "Idle" })).toBeInTheDocument();
  });
});
