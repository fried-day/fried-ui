import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Description } from "./Description";

describe("Description", () => {
  it("renders with default props", () => {
    render(<Description>Help text</Description>);
    expect(screen.getByText("Help text")).toBeInTheDocument();
  });

  it("renders base class without explicit modifiers", () => {
    render(<Description>Default</Description>);
    const el = screen.getByText("Default");
    expect(el.className).toBe("fri-description");
  });

  it("applies all size classes", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Description size={size}>{size}</Description>);
      expect(screen.getByText(size).className).toContain(`fri-description--size-${size}`);
      unmount();
    });
  });

  it("applies invalid modifier class", () => {
    render(<Description isInvalid>Error</Description>);
    expect(screen.getByText("Error").className).toContain("fri-description--invalid");
  });

  it("applies disabled modifier class", () => {
    render(<Description isDisabled>Disabled</Description>);
    expect(screen.getByText("Disabled").className).toContain("fri-description--disabled");
  });

  it("merges custom className", () => {
    render(<Description className="mt-4">Styled</Description>);
    expect(screen.getByText("Styled").className).toContain("mt-4");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    render(<Description ref={ref}>Ref</Description>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("sets data-slot attribute", () => {
    render(<Description>Slot</Description>);
    expect(screen.getByText("Slot")).toHaveAttribute("data-slot", "description");
  });

  it("sets slot=description attribute", () => {
    render(<Description>Slot</Description>);
    expect(screen.getByText("Slot")).toHaveAttribute("slot", "description");
  });

  it("passes through native HTML attributes", () => {
    render(<Description data-testid="custom">Props</Description>);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("sets displayName", () => {
    expect(Description.displayName).toBe("Description");
  });
});
