import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Label } from "./Label";

describe("Label", () => {
  it("renders with default props", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders base class without explicit modifiers", () => {
    render(<Label>Default</Label>);
    const el = screen.getByText("Default");
    expect(el.className).toBe("label");
  });

  it("applies all size classes", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Label size={size}>{size}</Label>);
      expect(screen.getByText(size).className).toContain(`label-size-${size}`);
      unmount();
    });
  });

  it("applies all weight classes", () => {
    const weights = ["normal", "medium", "semibold"] as const;

    weights.forEach((weight) => {
      const { unmount } = render(<Label weight={weight}>{weight}</Label>);
      expect(screen.getByText(weight).className).toContain(`label-weight-${weight}`);
      unmount();
    });
  });

  it("renders required asterisk when isRequired is true", () => {
    render(<Label isRequired>Password</Label>);
    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk.className).toContain("label-required");
  });

  it("does not render asterisk when isRequired is false", () => {
    render(<Label>Email</Label>);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("applies required modifier class", () => {
    const { container } = render(<Label isRequired>Password</Label>);
    const label = container.querySelector("[data-slot='label']");
    expect(label?.className).toContain("label-required");
  });

  it("renders optional text when provided", () => {
    render(<Label optionalMessage="(Optional)">Phone</Label>);
    const optional = screen.getByText("(Optional)");
    expect(optional).toBeInTheDocument();
    expect(optional.className).toContain("label-optional");
  });

  it("applies invalid modifier class", () => {
    const { container } = render(<Label isInvalid>Email</Label>);
    const label = container.querySelector("[data-slot='label']");
    expect(label?.className).toContain("label-invalid");
  });

  it("applies disabled modifier class", () => {
    const { container } = render(<Label isDisabled>Username</Label>);
    const label = container.querySelector("[data-slot='label']");
    expect(label?.className).toContain("label-disabled");
  });

  it("passes htmlFor attribute", () => {
    const { container } = render(<Label htmlFor="email-input">Email</Label>);
    const label = container.querySelector("[data-slot='label']");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("merges custom className", () => {
    render(<Label className="mt-4">Styled</Label>);
    expect(screen.getByText("Styled").className).toContain("mt-4");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("sets data-slot attribute", () => {
    const { container } = render(<Label>Slot</Label>);
    expect(container.querySelector("[data-slot='label']")).toBeInTheDocument();
  });

  it("sets displayName", () => {
    expect(Label.displayName).toBe("Label");
  });
});
