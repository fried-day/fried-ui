import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarFallback } from "../avatar";
import { AvatarGroup } from "./AvatarGroup";

describe("AvatarGroup", () => {
  it("renders with default props", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(container.querySelector("[data-slot='avatar-group']")).toBeInTheDocument();
  });

  it("renders only base class without explicit spacing prop (default lives in CSS)", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const root = container.querySelector("[data-slot='avatar-group']");
    expect(root?.className).toBe("avatar-group");
  });

  it("applies all size classes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(
        <AvatarGroup size={size}>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </AvatarGroup>,
      );

      const root = container.querySelector("[data-slot='avatar-group']");
      expect(root?.className).toContain(`avatar-group-size-${size}`);
      unmount();
    });
  });

  it("applies all spacing classes", () => {
    const spacings = ["tighter", "tight", "default", "wide", "wider"] as const;

    spacings.forEach((spacing) => {
      const { container, unmount } = render(
        <AvatarGroup spacing={spacing}>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </AvatarGroup>,
      );

      const root = container.querySelector("[data-slot='avatar-group']");
      expect(root?.className).toContain(`avatar-group-spacing-${spacing}`);
      unmount();
    });
  });

  it("forwards size prop to child avatars when not set", () => {
    const { container } = render(
      <AvatarGroup size="lg">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const avatars = container.querySelectorAll("[data-slot='avatar']");

    avatars.forEach((avatar) => {
      expect(avatar.className).toContain("avatar-size-lg");
    });
  });

  it("preserves child avatar's own size prop over group size", () => {
    const { container } = render(
      <AvatarGroup size="lg">
        <Avatar size="sm">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const avatar = container.querySelector("[data-slot='avatar']");
    expect(avatar?.className).toContain("avatar-size-sm");
  });

  it("limits visible avatars when max is set and renders +N counter", () => {
    const { container } = render(
      <AvatarGroup max={2}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>D</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const avatars = container.querySelectorAll("[data-slot='avatar']");
    expect(avatars).toHaveLength(3);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("renders all avatars with no counter when max is not set", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const avatars = container.querySelectorAll("[data-slot='avatar']");
    expect(avatars).toHaveLength(3);
    expect(container.querySelector(".avatar-group-counter")).toBeNull();
  });

  it("uses total prop to compute counter value when provided", () => {
    render(
      <AvatarGroup max={2} total={10}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(screen.getByText("+8")).toBeInTheDocument();
  });

  it("omits counter when max is greater than or equal to children count", () => {
    const { container } = render(
      <AvatarGroup max={5}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(container.querySelector(".avatar-group-counter")).toBeNull();
  });

  it("applies counter class and size to the +N avatar", () => {
    const { container } = render(
      <AvatarGroup size="xl" max={1}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const counter = container.querySelector(".avatar-group-counter");
    expect(counter).toBeInTheDocument();
    expect(counter?.className).toContain("avatar-size-xl");
  });

  it("applies hoverable modifier class when isHoverable is true", () => {
    const { container } = render(
      <AvatarGroup isHoverable>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const root = container.querySelector("[data-slot='avatar-group']");
    expect(root?.className).toContain("avatar-group-hoverable");
  });

  it("does not apply hoverable modifier when isHoverable is false or omitted", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const root = container.querySelector("[data-slot='avatar-group']");
    expect(root?.className).not.toContain("avatar-group-hoverable");
  });

  it("merges custom className", () => {
    const { container } = render(
      <AvatarGroup className="mt-4">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    const root = container.querySelector("[data-slot='avatar-group']");
    expect(root?.className).toContain("mt-4");
  });

  it("forwards ref to div element", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <AvatarGroup ref={ref}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(AvatarGroup.displayName).toBe("AvatarGroup");
  });

  it("passes through native HTML attributes", () => {
    render(
      <AvatarGroup id="my-group" data-testid="custom">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(screen.getByTestId("custom")).toHaveAttribute("id", "my-group");
  });
});
