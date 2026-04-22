import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "./InputGroup";

describe("InputGroup", () => {
  it("renders with default props", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>,
    );

    expect(screen.getByTestId("group")).toBeInTheDocument();
  });

  it("renders only base class without explicit variant/size/radius props", () => {
    render(<InputGroup data-testid="group" />);
    const group = screen.getByTestId("group");
    expect(group.className).toContain("input-group");
    expect(group.className).not.toContain("input-group-primary");
    expect(group.className).not.toContain("input-group-size-md");
    expect(group.className).not.toContain("input-group-radius-md");
  });

  it("applies all variant classes", () => {
    const variants = ["primary", "secondary"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<InputGroup variant={variant} data-testid={variant} />);
      const group = screen.getByTestId(variant);
      expect(group.className).toContain(`input-group-${variant}`);
      unmount();
    });
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<InputGroup size={size} data-testid={size} />);
      const group = screen.getByTestId(size);
      expect(group.className).toContain(`input-group-size-${size}`);
      unmount();
    });
  });

  it("applies all radius classes with key-value format", () => {
    const radiusValues = ["none", "sm", "md", "lg", "full"] as const;

    radiusValues.forEach((radius) => {
      const { unmount } = render(<InputGroup radius={radius} data-testid={radius} />);
      const group = screen.getByTestId(radius);
      expect(group.className).toContain(`input-group-radius-${radius}`);
      unmount();
    });
  });

  it("applies full-width modifier class when isFullWidth is true", () => {
    render(<InputGroup data-testid="group" isFullWidth />);
    const group = screen.getByTestId("group");
    expect(group.className).toContain("input-group-full-width");
  });

  it("sets data-slot='input-group' on wrapper", () => {
    render(<InputGroup data-testid="group" />);
    const group = screen.getByTestId("group");
    expect(group).toHaveAttribute("data-slot", "input-group");
  });

  it("merges custom className", () => {
    render(<InputGroup className="mt-4" data-testid="group" />);
    const group = screen.getByTestId("group");
    expect(group.className).toContain("input-group");
    expect(group.className).toContain("mt-4");
  });

  it("forwards ref to the wrapper element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<InputGroup ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(InputGroup.displayName).toBe("InputGroup");
  });
});

describe("InputGroupAddon", () => {
  it("renders with default props", () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">Hello</InputGroupAddon>
      </InputGroup>,
    );

    expect(screen.getByTestId("addon")).toHaveTextContent("Hello");
  });

  it("applies all align classes with key-value format", () => {
    const aligns = ["inline-start", "inline-end", "block-start", "block-end"] as const;

    aligns.forEach((align) => {
      const { unmount } = render(<InputGroupAddon align={align} data-testid={align} />);
      const addon = screen.getByTestId(align);
      expect(addon.className).toContain(`input-group-addon-align-${align}`);
      unmount();
    });
  });

  it("renders only base class without explicit align prop", () => {
    render(<InputGroupAddon data-testid="addon" />);
    const addon = screen.getByTestId("addon");
    expect(addon.className).toContain("input-group-addon");
    expect(addon.className).not.toContain("input-group-addon-align-inline-start");
  });

  it("sets data-slot='input-group-addon'", () => {
    render(<InputGroupAddon data-testid="addon" />);
    const addon = screen.getByTestId("addon");
    expect(addon).toHaveAttribute("data-slot", "input-group-addon");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<InputGroupAddon ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("sets displayName", () => {
    expect(InputGroupAddon.displayName).toBe("InputGroupAddon");
  });
});

describe("InputGroupInput", () => {
  it("renders with default props", () => {
    render(<InputGroupInput placeholder="Type" />);
    expect(screen.getByPlaceholderText("Type")).toBeInTheDocument();
  });

  it("applies base class", () => {
    render(<InputGroupInput placeholder="Base" />);
    const input = screen.getByPlaceholderText("Base");
    expect(input.className).toContain("input-group-input");
  });

  it("sets data-slot='input-group-input'", () => {
    render(<InputGroupInput placeholder="Slot" />);
    const input = screen.getByPlaceholderText("Slot");
    expect(input).toHaveAttribute("data-slot", "input-group-input");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputGroupInput placeholder="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("passes through native HTML attributes", () => {
    render(<InputGroupInput name="q" placeholder="Attrs" data-testid="group-input" />);
    const input = screen.getByTestId("group-input");
    expect(input).toHaveAttribute("name", "q");
  });

  it("sets displayName", () => {
    expect(InputGroupInput.displayName).toBe("InputGroupInput");
  });
});

describe("InputGroupTextarea", () => {
  it("renders with default props", () => {
    render(<InputGroupTextarea placeholder="Type" />);
    expect(screen.getByPlaceholderText("Type")).toBeInTheDocument();
  });

  it("applies base class", () => {
    render(<InputGroupTextarea placeholder="Base" />);
    const textarea = screen.getByPlaceholderText("Base");
    expect(textarea.className).toContain("input-group-textarea");
  });

  it("sets data-slot='input-group-textarea'", () => {
    render(<InputGroupTextarea placeholder="Slot" />);
    const textarea = screen.getByPlaceholderText("Slot");
    expect(textarea).toHaveAttribute("data-slot", "input-group-textarea");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<InputGroupTextarea placeholder="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("sets displayName", () => {
    expect(InputGroupTextarea.displayName).toBe("InputGroupTextarea");
  });
});
