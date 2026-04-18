import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders with default props", () => {
    const { container } = render(
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>,
    );

    expect(container.querySelector("[data-slot='avatar']")).toBeInTheDocument();
  });

  it("renders base class without explicit modifiers", () => {
    const { container } = render(
      <Avatar>
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>,
    );

    const root = container.querySelector("[data-slot='avatar']");
    expect(root?.className).toBe("fri-avatar");
  });

  it("applies all size classes", () => {
    const sizes = ["sm", "md", "lg", "xl", "2xl"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(
        <Avatar size={size}>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>,
      );

      const root = container.querySelector("[data-slot='avatar']");
      expect(root?.className).toContain(`fri-avatar--size-${size}`);
      unmount();
    });
  });

  it("applies all ring classes", () => {
    const rings = ["primary", "secondary", "accent", "success", "warning", "danger", "info"] as const;

    rings.forEach((ring) => {
      const { container, unmount } = render(
        <Avatar ring={ring}>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>,
      );

      const root = container.querySelector("[data-slot='avatar']");
      expect(root?.className).toContain(`fri-avatar--ring-${ring}`);
      unmount();
    });
  });

  it("applies all radius classes", () => {
    const radii = ["none", "sm", "md", "lg", "full"] as const;

    radii.forEach((radius) => {
      const { container, unmount } = render(
        <Avatar radius={radius}>
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>,
      );

      const root = container.querySelector("[data-slot='avatar']");
      expect(root?.className).toContain(`fri-avatar--radius-${radius}`);
      unmount();
    });
  });

  it("applies disabled modifier", () => {
    const { container } = render(
      <Avatar isDisabled>
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>,
    );

    const root = container.querySelector("[data-slot='avatar']");
    expect(root?.className).toContain("fri-avatar--disabled");
  });

  it("renders fallback content", () => {
    render(
      <Avatar>
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByText("XL")).toBeInTheDocument();
  });

  it("applies fallback class and data-slot", () => {
    const { container } = render(
      <Avatar>
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>,
    );

    const fallback = container.querySelector("[data-slot='avatar-fallback']");
    expect(fallback).toBeInTheDocument();
    expect(fallback?.className).toContain("fri-avatar__fallback");
  });

  it("merges custom className on Root", () => {
    const { container } = render(
      <Avatar className="mt-4">
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>,
    );

    const root = container.querySelector("[data-slot='avatar']");
    expect(root?.className).toContain("mt-4");
  });

  it("merges custom className on Fallback", () => {
    const { container } = render(
      <Avatar>
        <Avatar.Fallback className="font-bold">A</Avatar.Fallback>
      </Avatar>,
    );

    const fallback = container.querySelector("[data-slot='avatar-fallback']");
    expect(fallback?.className).toContain("font-bold");
  });

  it("forwards ref to span element", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Avatar ref={ref}>
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("sets displayName", () => {
    expect(Avatar.displayName).toBe("Avatar");
    expect(Avatar.Image.displayName).toBe("Avatar.Image");
    expect(Avatar.Fallback.displayName).toBe("Avatar.Fallback");
  });
});
