import type { ReactNode } from "react";
import { createRef } from "react";

import { TextField } from "react-aria-components";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldError } from "./FieldError";

describe("FieldError", () => {
  const renderWithField = (children: ReactNode): ReturnType<typeof render> =>
    render(<TextField isInvalid>{children}</TextField>);

  it("renders with default props", () => {
    renderWithField(<FieldError>Error message</FieldError>);
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders base class without explicit modifiers", () => {
    renderWithField(<FieldError>Default</FieldError>);
    const el = screen.getByText("Default");
    expect(el.className).toBe("field-error");
  });

  it("applies all size classes", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = renderWithField(<FieldError size={size}>{size}</FieldError>);
      expect(screen.getByText(size).className).toContain(`field-error-size-${size}`);
      unmount();
    });
  });

  it("applies disabled modifier class", () => {
    renderWithField(<FieldError isDisabled>Disabled</FieldError>);
    expect(screen.getByText("Disabled").className).toContain("field-error-disabled");
  });

  it("merges custom className", () => {
    renderWithField(<FieldError className="mt-4">Styled</FieldError>);
    expect(screen.getByText("Styled").className).toContain("mt-4");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    renderWithField(<FieldError ref={ref}>Ref</FieldError>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("sets data-slot attribute", () => {
    renderWithField(<FieldError>Slot</FieldError>);
    expect(screen.getByText("Slot")).toHaveAttribute("data-slot", "field-error");
  });

  it("passes through native HTML attributes", () => {
    renderWithField(<FieldError data-testid="custom">Props</FieldError>);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("sets displayName", () => {
    expect(FieldError.displayName).toBe("FieldError");
  });
});
