import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders with default props", () => {
    render(<Chip>Chip</Chip>);
    expect(screen.getByText("Chip")).toBeInTheDocument();
  });

  it("renders only base class without explicit props", () => {
    render(<Chip>Default</Chip>);
    expect(screen.getByText("Default").className).toBe("chip");
  });

  it("renders as a span element by default", () => {
    render(<Chip>Tag</Chip>);
    expect(screen.getByText("Tag").tagName).toBe("SPAN");
  });

  it("renders as a button when onPress is provided", () => {
    render(<Chip onPress={(): void => {}}>Clickable</Chip>);
    expect(screen.getByText("Clickable").tagName).toBe("BUTTON");
  });

  it("applies variant class only when explicitly set", () => {
    render(<Chip variant="success">Done</Chip>);
    expect(screen.getByText("Done").className).toContain("chip-success");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary", "ghost", "accent", "success", "warning", "danger", "info"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Chip variant={variant}>{variant}</Chip>);
      expect(screen.getByText(variant).className).toContain(`chip-${variant}`);
      unmount();
    });
  });

  it("applies size class with key-value format", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Chip size={size}>{size}</Chip>);
      expect(screen.getByText(size).className).toContain(`chip-size-${size}`);
      unmount();
    });
  });

  it("applies radius class with key-value format", () => {
    const radiusValues = ["none", "sm", "md", "lg", "full"] as const;

    radiusValues.forEach((radius) => {
      const { unmount } = render(<Chip radius={radius}>{radius}</Chip>);
      expect(screen.getByText(radius).className).toContain(`chip-radius-${radius}`);
      unmount();
    });
  });

  it("applies icon-only class", () => {
    render(<Chip isIconOnly>X</Chip>);
    expect(screen.getByText("X").className).toContain("chip-icon-only");
  });

  it("applies selected class", () => {
    render(<Chip isSelected>Selected</Chip>);
    expect(screen.getByText("Selected").className).toContain("chip-selected");
  });

  it("sets aria-pressed on filter chip (isSelected + onPress)", () => {
    render(
      <Chip onPress={(): void => {}} isSelected>
        Filter
      </Chip>,
    );

    expect(screen.getByText("Filter")).toHaveAttribute("aria-pressed", "true");
  });

  it("sets aria-pressed false on unselected interactive chip", () => {
    render(
      <Chip isSelected={false} onPress={(): void => {}}>
        Filter
      </Chip>,
    );

    expect(screen.getByText("Filter")).toHaveAttribute("aria-pressed", "false");
  });

  it("does not set aria-pressed on static selected chip (no onPress)", () => {
    render(<Chip isSelected>Static</Chip>);
    expect(screen.getByText("Static")).not.toHaveAttribute("aria-pressed");
  });

  it("applies disabled class on span mode", () => {
    render(<Chip isDisabled>Disabled</Chip>);
    const el = screen.getByText("Disabled");
    expect(el.className).toContain("chip-disabled");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("applies interactive class when onPress is provided", () => {
    render(<Chip onPress={(): void => {}}>Clickable</Chip>);
    expect(screen.getByText("Clickable").className).toContain("chip-interactive");
  });

  it("fires onPress when clicked", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Chip onPress={onPress}>Press</Chip>);

    await user.click(screen.getByText("Press"));

    expect(onPress).toHaveBeenCalledOnce();
  });

  it("does not fire onPress when disabled", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();

    render(
      <Chip onPress={onPress} isDisabled>
        Disabled
      </Chip>,
    );

    await user.click(screen.getByText("Disabled"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("renders dismiss button when onDismiss is provided", () => {
    render(<Chip onDismiss={(): void => {}}>Tag</Chip>);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("fires onDismiss when dismiss button is clicked", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<Chip onDismiss={onDismiss}>Tag</Chip>);

    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("uses custom dismissLabel", () => {
    render(
      <Chip dismissLabel="Remove tag" onDismiss={(): void => {}}>
        Tag
      </Chip>,
    );

    expect(screen.getByRole("button", { name: "Remove tag" })).toBeInTheDocument();
  });

  it("does not fire onDismiss when chip is disabled", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();

    render(
      <Chip onDismiss={onDismiss} isDisabled>
        Tag
      </Chip>,
    );

    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("combines onPress and onDismiss without collision", async () => {
    const onPress = vi.fn();
    const onDismiss = vi.fn();
    const user = userEvent.setup();

    render(
      <Chip onPress={onPress} onDismiss={onDismiss}>
        Filter
      </Chip>,
    );

    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(onPress).not.toHaveBeenCalled();
  });

  it("merges custom className", () => {
    render(<Chip className="mt-4">Styled</Chip>);
    expect(screen.getByText("Styled").className).toContain("mt-4");
  });

  it("forwards ref to the span element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Chip ref={ref}>Ref</Chip>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveAttribute("data-slot", "chip");
  });

  it("sets data-slot attribute", () => {
    render(<Chip>Slot</Chip>);
    expect(screen.getByText("Slot")).toHaveAttribute("data-slot", "chip");
  });

  it("sets data-slot attribute on interactive chip", () => {
    render(<Chip onPress={(): void => {}}>Slot</Chip>);
    expect(screen.getByText("Slot")).toHaveAttribute("data-slot", "chip");
  });

  it("sets displayName", () => {
    expect(Chip.displayName).toBe("Chip");
  });

  it("passes through native HTML attributes", () => {
    render(
      <Chip id="my-chip" data-testid="custom-chip">
        Props
      </Chip>,
    );

    expect(screen.getByTestId("custom-chip")).toHaveAttribute("id", "my-chip");
  });
});
