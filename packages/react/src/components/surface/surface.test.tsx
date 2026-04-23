import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Surface } from "./Surface";

describe("Surface", () => {
  it("renders with default props", () => {
    render(<Surface>Content</Surface>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders only base class without explicit props", () => {
    render(<Surface>Default</Surface>);
    expect(screen.getByText("Default").className).toBe("surface");
  });

  it("applies all variant classes", () => {
    const variants = ["default", "success", "warning", "danger", "info"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Surface variant={variant}>{variant}</Surface>);
      expect(screen.getByText(variant).className).toContain(`surface-${variant}`);
      unmount();
    });
  });

  it("applies bordered modifier class", () => {
    render(<Surface isBordered>Bordered</Surface>);
    expect(screen.getByText("Bordered").className).toContain("surface-bordered");
  });

  it("applies radius class with key-value format", () => {
    const radiusValues = ["none", "sm", "md", "lg", "xl"] as const;

    radiusValues.forEach((radius) => {
      const { unmount } = render(<Surface radius={radius}>{radius}</Surface>);
      expect(screen.getByText(radius).className).toContain(`surface-radius-${radius}`);
      unmount();
    });
  });

  it("applies shadow class with key-value format", () => {
    const shadowValues = ["none", "sm", "md", "lg", "xl"] as const;

    shadowValues.forEach((shadow) => {
      const { unmount } = render(<Surface shadow={shadow}>{shadow}</Surface>);
      expect(screen.getByText(shadow).className).toContain(`surface-shadow-${shadow}`);
      unmount();
    });
  });

  it("combines variant + isBordered + radius + shadow", () => {
    render(
      <Surface variant="info" radius="lg" shadow="md" isBordered>
        Combined
      </Surface>,
    );

    const el = screen.getByText("Combined");
    expect(el.className).toContain("surface-info");
    expect(el.className).toContain("surface-bordered");
    expect(el.className).toContain("surface-radius-lg");
    expect(el.className).toContain("surface-shadow-md");
  });

  it("merges custom className", () => {
    render(<Surface className="p-6">Styled</Surface>);
    expect(screen.getByText("Styled").className).toContain("p-6");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Surface ref={ref}>Ref</Surface>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets data-slot attribute", () => {
    render(<Surface>Slot</Surface>);
    expect(screen.getByText("Slot")).toHaveAttribute("data-slot", "surface");
  });

  it("sets displayName", () => {
    expect(Surface.displayName).toBe("Surface");
  });

  it("passes through native HTML attributes", () => {
    render(
      <Surface id="my-surface" data-testid="custom">
        Props
      </Surface>,
    );

    expect(screen.getByTestId("custom")).toHaveAttribute("id", "my-surface");
  });
});
