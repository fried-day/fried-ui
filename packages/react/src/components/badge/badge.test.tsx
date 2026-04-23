import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with default props", () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText("Badge")).toBeInTheDocument();
  });

  it("renders only base class without explicit props", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default").className).toBe("badge");
  });

  it("renders as a span element", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag").tagName).toBe("SPAN");
  });

  it("applies variant class only when explicitly set", () => {
    render(<Badge variant="success">Done</Badge>);
    expect(screen.getByText("Done").className).toContain("badge-success");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "accent", "success", "warning", "danger", "info"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant).className).toContain(`badge-${variant}`);
      unmount();
    });
  });

  it("applies size class with key-value format", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByText(size).className).toContain(`badge-size-${size}`);
      unmount();
    });
  });

  it("applies radius class with key-value format", () => {
    const radiusValues = ["none", "sm", "md", "lg", "full"] as const;

    radiusValues.forEach((radius) => {
      const { unmount } = render(<Badge radius={radius}>{radius}</Badge>);
      expect(screen.getByText(radius).className).toContain(`badge-radius-${radius}`);
      unmount();
    });
  });

  it("applies icon-only class", () => {
    render(<Badge isIconOnly>X</Badge>);
    expect(screen.getByText("X").className).toContain("badge-icon-only");
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
      <Badge id="my-badge" data-testid="custom-badge">
        Props
      </Badge>,
    );

    expect(screen.getByTestId("custom-badge")).toHaveAttribute("id", "my-badge");
  });
});
