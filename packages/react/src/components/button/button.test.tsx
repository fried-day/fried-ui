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

  it("applies size class", () => {
    render(<Button size="md">Medium</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("fri-button--md");
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
});
