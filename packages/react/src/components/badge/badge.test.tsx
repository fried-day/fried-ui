import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with children", () => {
    render(<Badge>3</Badge>);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders only base class without explicit props", () => {
    render(<Badge>X</Badge>);
    expect(screen.getByText("X").className).toBe("badge");
  });

  it("renders as a span element", () => {
    render(<Badge>Y</Badge>);
    expect(screen.getByText("Y").tagName).toBe("SPAN");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "accent", "success", "warning", "danger", "info", "overlay"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant).className).toContain(`badge-${variant}`);
      unmount();
    });
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["xs", "sm", "md"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByText(size).className).toContain(`badge-size-${size}`);
      unmount();
    });
  });

  it("applies all placement classes", () => {
    const placements = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;

    placements.forEach((placement) => {
      const { unmount } = render(<Badge placement={placement}>{placement}</Badge>);
      expect(screen.getByText(placement).className).toContain(`badge-placement-${placement}`);
      unmount();
    });
  });

  it("applies is-dot class and hides content when isDot is true", () => {
    const { container } = render(<Badge isDot>should-hide</Badge>);
    const badge = container.querySelector("[data-slot='badge']");
    expect(badge?.className).toContain("badge-is-dot");
    expect(badge?.textContent).toBe("");
  });

  it("applies is-standalone class when isStandalone is true", () => {
    render(<Badge isStandalone>S</Badge>);
    expect(screen.getByText("S").className).toContain("badge-is-standalone");
  });

  it("renders numeric children below max as-is", () => {
    render(<Badge max={99}>42</Badge>);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders overflow format when numeric children exceeds max", () => {
    render(<Badge max={99}>{150}</Badge>);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("does not apply overflow when max is undefined", () => {
    render(<Badge>{150}</Badge>);
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("does not apply overflow to non-numeric children", () => {
    render(<Badge max={2}>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Badge className="mt-4">Styled</Badge>);
    expect(screen.getByText("Styled").className).toContain("mt-4");
  });

  it("forwards ref to the span element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveAttribute("data-slot", "badge");
  });

  it("sets data-slot attribute", () => {
    render(<Badge>Slot</Badge>);
    expect(screen.getByText("Slot")).toHaveAttribute("data-slot", "badge");
  });

  it("sets displayName", () => {
    expect(Badge.displayName).toBe("Badge");
  });

  it("passes through native HTML attributes", () => {
    render(
      <Badge id="my-badge" data-testid="custom">
        Props
      </Badge>,
    );

    expect(screen.getByTestId("custom")).toHaveAttribute("id", "my-badge");
  });
});
