import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, BadgeIndicator, BadgeStatus } from "./Badge";

describe("Badge (wrapper)", () => {
  it("renders anchor children", () => {
    render(
      <Badge>
        <button type="button">Mail</button>
      </Badge>,
    );

    expect(screen.getByRole("button", { name: "Mail" })).toBeInTheDocument();
  });

  it("emits only the base class with no modifier props", () => {
    const { container } = render(<Badge>X</Badge>);
    const badge = container.querySelector("[data-slot='badge']");
    expect(badge?.className).toBe("badge");
  });

  it("renders as a span element", () => {
    const { container } = render(<Badge>Y</Badge>);
    expect(container.querySelector("[data-slot='badge']")?.tagName).toBe("SPAN");
  });

  it("merges custom className", () => {
    const { container } = render(<Badge className="mt-4">anchor</Badge>);
    expect(container.querySelector("[data-slot='badge']")?.className).toContain("mt-4");
  });

  it("forwards ref to the wrapper span", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>anchor</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveAttribute("data-slot", "badge");
  });

  it("sets data-slot='badge'", () => {
    render(<Badge>anchor</Badge>);
    expect(screen.getByText("anchor")).toHaveAttribute("data-slot", "badge");
  });

  it("sets displayName", () => {
    expect(Badge.displayName).toBe("Badge");
  });

  it("passes through native HTML attributes", () => {
    const { container } = render(
      <Badge id="my-badge" data-testid="custom">
        anchor
      </Badge>,
    );

    const badge = container.querySelector("[data-slot='badge']");
    expect(badge).toHaveAttribute("id", "my-badge");
    expect(badge).toHaveAttribute("data-testid", "custom");
  });
});

describe("BadgeIndicator", () => {
  it("renders children content", () => {
    render(<BadgeIndicator>3</BadgeIndicator>);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("emits only the base class with no modifier props", () => {
    const { container } = render(<BadgeIndicator>1</BadgeIndicator>);
    const el = container.querySelector("[data-slot='badge-indicator']");
    expect(el?.className).toBe("badge-indicator");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "accent", "success", "warning", "danger", "info", "overlay"] as const;

    variants.forEach((variant) => {
      const { container, unmount } = render(<BadgeIndicator variant={variant}>1</BadgeIndicator>);
      const el = container.querySelector("[data-slot='badge-indicator']");
      expect(el?.className).toContain(`badge-indicator-${variant}`);
      unmount();
    });
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["xs", "sm", "md"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(<BadgeIndicator size={size}>1</BadgeIndicator>);
      const el = container.querySelector("[data-slot='badge-indicator']");
      expect(el?.className).toContain(`badge-indicator-size-${size}`);
      unmount();
    });
  });

  it("applies all placement classes", () => {
    const placements = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;

    placements.forEach((placement) => {
      const { container, unmount } = render(<BadgeIndicator placement={placement}>1</BadgeIndicator>);
      const el = container.querySelector("[data-slot='badge-indicator']");
      expect(el?.className).toContain(`badge-indicator-placement-${placement}`);
      unmount();
    });
  });

  it("applies is-inset class when isInset is true", () => {
    const { container } = render(<BadgeIndicator isInset>1</BadgeIndicator>);
    const el = container.querySelector("[data-slot='badge-indicator']");
    expect(el?.className).toContain("badge-indicator-is-inset");
  });

  it("renders numeric children below max as-is", () => {
    render(<BadgeIndicator max={99}>{42}</BadgeIndicator>);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders overflow format when numeric children exceeds max", () => {
    render(<BadgeIndicator max={99}>{150}</BadgeIndicator>);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("keeps numeric children as-is when max is undefined", () => {
    render(<BadgeIndicator>{150}</BadgeIndicator>);
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("keeps non-numeric children as-is regardless of max", () => {
    render(<BadgeIndicator max={2}>NEW</BadgeIndicator>);
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("sets role='status' for live-region announcements", () => {
    const { container } = render(<BadgeIndicator>3</BadgeIndicator>);
    const el = container.querySelector("[data-slot='badge-indicator']");
    expect(el).toHaveAttribute("role", "status");
  });

  it("merges custom className", () => {
    const { container } = render(<BadgeIndicator className="extra-class">1</BadgeIndicator>);
    const el = container.querySelector("[data-slot='badge-indicator']");
    expect(el?.className).toContain("extra-class");
  });

  it("forwards ref to the indicator span", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<BadgeIndicator ref={ref}>1</BadgeIndicator>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveAttribute("data-slot", "badge-indicator");
  });

  it("sets displayName", () => {
    expect(BadgeIndicator.displayName).toBe("BadgeIndicator");
  });
});

describe("BadgeStatus", () => {
  it("emits only the base class with no modifier props", () => {
    const { container } = render(<BadgeStatus />);
    const el = container.querySelector("[data-slot='badge-status']");
    expect(el?.className).toBe("badge-status");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "accent", "success", "warning", "danger", "info", "overlay"] as const;

    variants.forEach((variant) => {
      const { container, unmount } = render(<BadgeStatus variant={variant} />);
      const el = container.querySelector("[data-slot='badge-status']");
      expect(el?.className).toContain(`badge-status-${variant}`);
      unmount();
    });
  });

  it("applies all size classes", () => {
    const sizes = ["xs", "sm", "md"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(<BadgeStatus size={size} />);
      const el = container.querySelector("[data-slot='badge-status']");
      expect(el?.className).toContain(`badge-status-size-${size}`);
      unmount();
    });
  });

  it("applies all placement classes", () => {
    const placements = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;

    placements.forEach((placement) => {
      const { container, unmount } = render(<BadgeStatus placement={placement} />);
      const el = container.querySelector("[data-slot='badge-status']");
      expect(el?.className).toContain(`badge-status-placement-${placement}`);
      unmount();
    });
  });

  it("applies is-inset class when isInset is true", () => {
    const { container } = render(<BadgeStatus isInset />);
    const el = container.querySelector("[data-slot='badge-status']");
    expect(el?.className).toContain("badge-status-is-inset");
  });

  it("sets aria-hidden='true' for decorative presence", () => {
    const { container } = render(<BadgeStatus />);
    const el = container.querySelector("[data-slot='badge-status']");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("merges custom className", () => {
    const { container } = render(<BadgeStatus className="extra-class" />);
    const el = container.querySelector("[data-slot='badge-status']");
    expect(el?.className).toContain("extra-class");
  });

  it("forwards ref to the status span", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<BadgeStatus ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveAttribute("data-slot", "badge-status");
  });

  it("sets displayName", () => {
    expect(BadgeStatus.displayName).toBe("BadgeStatus");
  });
});
