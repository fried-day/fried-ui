import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "../input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./Field";

describe("Field", () => {
  it("renders compound children", () => {
    render(
      <Field>
        <FieldLabel>Field label</FieldLabel>
        <Input placeholder="Value" />
      </Field>,
    );

    expect(screen.getByText("Field label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();
  });

  it("renders only base class without explicit size/full-width props", () => {
    const { container } = render(
      <Field>
        <Input placeholder="Value" />
      </Field>,
    );

    const wrapper = container.querySelector('[data-slot="field"]');
    expect(wrapper?.className).toBe("field");
  });

  it("applies all size classes with key-value format", () => {
    const sizes = ["xs", "sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(
        <Field size={size}>
          <Input placeholder={size} />
        </Field>,
      );

      const wrapper = container.querySelector('[data-slot="field"]');
      expect(wrapper?.className).toContain(`field-size-${size}`);
      unmount();
    });
  });

  it("applies all orientation classes", () => {
    const orientations = ["vertical", "horizontal", "responsive"] as const;

    orientations.forEach((orientation) => {
      const { container, unmount } = render(
        <Field orientation={orientation}>
          <Input placeholder={orientation} />
        </Field>,
      );

      const wrapper = container.querySelector('[data-slot="field"]');
      expect(wrapper?.className).toContain(`field-orientation-${orientation}`);
      unmount();
    });
  });

  it("applies full-width modifier class when isFullWidth is true", () => {
    const { container } = render(
      <Field isFullWidth>
        <Input placeholder="Value" />
      </Field>,
    );

    const wrapper = container.querySelector('[data-slot="field"]');
    expect(wrapper?.className).toContain("field-full-width");
  });

  it("forwards isRequired to AriaTextField", () => {
    const { container } = render(
      <Field isRequired>
        <FieldLabel>Field label</FieldLabel>
        <Input />
      </Field>,
    );

    const wrapper = container.querySelector('[data-slot="field"]');
    expect(wrapper).toHaveAttribute("data-required", "true");
  });

  it("forwards isInvalid to AriaTextField", () => {
    const { container } = render(
      <Field isInvalid>
        <FieldLabel>Field label</FieldLabel>
        <Input />
      </Field>,
    );

    const wrapper = container.querySelector('[data-slot="field"]');
    expect(wrapper).toHaveAttribute("data-invalid", "true");
  });

  it("forwards isDisabled to AriaTextField", () => {
    const { container } = render(
      <Field isDisabled>
        <FieldLabel>Field label</FieldLabel>
        <Input />
      </Field>,
    );

    const wrapper = container.querySelector('[data-slot="field"]');
    expect(wrapper).toHaveAttribute("data-disabled", "true");
  });

  it("forwards isReadOnly to AriaTextField", () => {
    const { container } = render(
      <Field defaultValue="Hello" isReadOnly>
        <Input />
      </Field>,
    );

    const wrapper = container.querySelector('[data-slot="field"]');
    expect(wrapper).toHaveAttribute("data-readonly", "true");
  });

  it("renders FieldLabel child", () => {
    const { container } = render(
      <Field>
        <FieldLabel>Field label</FieldLabel>
        <Input />
      </Field>,
    );

    const labelEl = container.querySelector('[data-slot="field-label"]');
    expect(labelEl).toBeInTheDocument();
    expect(labelEl).toHaveTextContent("Field label");
  });

  it("renders FieldDescription child", () => {
    const { container } = render(
      <Field>
        <FieldLabel>Field label</FieldLabel>
        <Input />
        <FieldDescription>Help text</FieldDescription>
      </Field>,
    );

    const descEl = container.querySelector('[data-slot="field-description"]');
    expect(descEl).toBeInTheDocument();
    expect(descEl).toHaveTextContent("Help text");
  });

  it("renders FieldError when field is invalid", () => {
    const { container } = render(
      <Field isInvalid>
        <FieldLabel>Field label</FieldLabel>
        <Input />
        <FieldError>Error message</FieldError>
      </Field>,
    );

    const errorEl = container.querySelector('[data-slot="field-error"]');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveTextContent("Error message");
  });

  it("does not render FieldError when field is not invalid", () => {
    const { container } = render(
      <Field>
        <FieldLabel>Field label</FieldLabel>
        <Input />
        <FieldError>Error message</FieldError>
      </Field>,
    );

    const errorEl = container.querySelector('[data-slot="field-error"]');
    expect(errorEl).not.toBeInTheDocument();
  });

  it("fires onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Field onChange={onChange}>
        <Input placeholder="Value" />
      </Field>,
    );

    await user.type(screen.getByPlaceholderText("Value"), "hi");

    expect(onChange).toHaveBeenCalled();
    expect((screen.getByPlaceholderText("Value") as HTMLInputElement).value).toBe("hi");
  });

  it("sets data-slot='field' on the wrapper", () => {
    const { container } = render(
      <Field>
        <Input />
      </Field>,
    );

    expect(container.querySelector('[data-slot="field"]')).toBeInTheDocument();
  });

  it("merges custom className onto the wrapper", () => {
    const { container } = render(
      <Field className="mt-4">
        <Input />
      </Field>,
    );

    const wrapper = container.querySelector('[data-slot="field"]');
    expect(wrapper?.className).toContain("field");
    expect(wrapper?.className).toContain("mt-4");
  });

  it("forwards ref to the wrapper div", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Field ref={ref}>
        <Input />
      </Field>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(Field.displayName).toBe("Field");
  });

  it("passes through native HTML attributes (name, autoComplete, type)", () => {
    render(
      <Field name="field-name" autoComplete="off" type="text">
        <Input placeholder="Value" />
      </Field>,
    );

    const input = screen.getByPlaceholderText("Value");
    expect(input).toHaveAttribute("name", "field-name");
    expect(input).toHaveAttribute("autoComplete", "off");
    expect(input).toHaveAttribute("type", "text");
  });

  it("passes defaultValue to the underlying input", () => {
    render(
      <Field defaultValue="Initial">
        <Input placeholder="Value" />
      </Field>,
    );

    expect((screen.getByPlaceholderText("Value") as HTMLInputElement).value).toBe("Initial");
  });

  it("propagates isDisabled to FieldLabel via context", () => {
    const { container } = render(
      <Field isDisabled>
        <FieldLabel>Field label</FieldLabel>
        <Input />
      </Field>,
    );

    const label = container.querySelector('[data-slot="field-label"]');
    expect(label?.className).toContain("field-label-disabled");
  });

  it("propagates isRequired to FieldLabel via context (shows asterisk)", () => {
    render(
      <Field isRequired>
        <FieldLabel>Field label</FieldLabel>
        <Input />
      </Field>,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("explicit prop on FieldLabel overrides context value", () => {
    const { container } = render(
      <Field isDisabled>
        <FieldLabel isDisabled={false}>Field label</FieldLabel>
        <Input />
      </Field>,
    );

    const label = container.querySelector('[data-slot="field-label"]');
    expect(label?.className).not.toContain("field-label-disabled");
  });
});

describe("FieldLabel", () => {
  it("shows optionalMessage when not required", () => {
    render(<FieldLabel optionalMessage="(Optional)">Label</FieldLabel>);
    expect(screen.getByText("(Optional)")).toBeInTheDocument();
  });

  it("shows asterisk when isRequired", () => {
    render(<FieldLabel isRequired>Label</FieldLabel>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows asterisk even when both isRequired and optionalMessage set (isRequired wins)", () => {
    render(
      <FieldLabel optionalMessage="(Optional)" isRequired>
        Label
      </FieldLabel>,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.queryByText("(Optional)")).not.toBeInTheDocument();
  });

  it("applies weight classes", () => {
    const weights = ["normal", "medium", "semibold"] as const;

    weights.forEach((weight) => {
      const { container, unmount } = render(<FieldLabel weight={weight}>{weight}</FieldLabel>);
      const label = container.querySelector('[data-slot="field-label"]');
      expect(label?.className).toContain(`field-label-weight-${weight}`);
      unmount();
    });
  });

  it("sets displayName", () => {
    expect(FieldLabel.displayName).toBe("FieldLabel");
  });
});

describe("FieldDescription", () => {
  it("renders children", () => {
    render(<FieldDescription>Help text</FieldDescription>);
    expect(screen.getByText("Help text")).toBeInTheDocument();
  });

  it("does not react to isInvalid from context (Description stays neutral)", () => {
    const { container } = render(
      <Field isInvalid>
        <Input />
        <FieldDescription>Help text</FieldDescription>
      </Field>,
    );

    const desc = container.querySelector('[data-slot="field-description"]');
    expect(desc?.className).not.toContain("field-description-invalid");
  });

  it("sets displayName", () => {
    expect(FieldDescription.displayName).toBe("FieldDescription");
  });
});

describe("FieldError", () => {
  it("renders inside invalid Field", () => {
    const { container } = render(
      <Field isInvalid>
        <Input />
        <FieldError>Error</FieldError>
      </Field>,
    );

    const err = container.querySelector('[data-slot="field-error"]');
    expect(err?.className).toContain("field-error");
  });

  it("sets displayName", () => {
    expect(FieldError.displayName).toBe("FieldError");
  });
});

describe("FieldSet", () => {
  it("renders as <fieldset>", () => {
    const { container } = render(
      <FieldSet>
        <Input />
      </FieldSet>,
    );

    expect(container.querySelector("fieldset")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const variants = ["default", "bordered"] as const;

    variants.forEach((variant) => {
      const { container, unmount } = render(<FieldSet variant={variant}>content</FieldSet>);
      const el = container.querySelector('[data-slot="field-set"]');
      expect(el?.className).toContain(`field-set-${variant}`);
      unmount();
    });
  });

  it("sets data-slot='field-set'", () => {
    const { container } = render(<FieldSet>content</FieldSet>);
    expect(container.querySelector('[data-slot="field-set"]')).toBeInTheDocument();
  });

  it("disables all children via native disabled", () => {
    render(
      <FieldSet disabled>
        <Input placeholder="Child" />
      </FieldSet>,
    );

    expect(screen.getByPlaceholderText("Child")).toBeDisabled();
  });

  it("sets displayName", () => {
    expect(FieldSet.displayName).toBe("FieldSet");
  });
});

describe("FieldLegend", () => {
  it("renders as <legend>", () => {
    const { container } = render(
      <FieldSet>
        <FieldLegend>Title</FieldLegend>
      </FieldSet>,
    );

    expect(container.querySelector("legend")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    const sizes = ["xs", "sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(<FieldLegend size={size}>{size}</FieldLegend>);
      const el = container.querySelector('[data-slot="field-legend"]');
      expect(el?.className).toContain(`field-legend-size-${size}`);
      unmount();
    });
  });

  it("sets displayName", () => {
    expect(FieldLegend.displayName).toBe("FieldLegend");
  });
});

describe("FieldGroup", () => {
  it("applies orientation classes", () => {
    const orientations = ["vertical", "horizontal", "responsive"] as const;

    orientations.forEach((orientation) => {
      const { container, unmount } = render(<FieldGroup orientation={orientation}>group</FieldGroup>);
      const el = container.querySelector('[data-slot="field-group"]');
      expect(el?.className).toContain(`field-group-orientation-${orientation}`);
      unmount();
    });
  });

  it("applies size classes", () => {
    const sizes = ["xs", "sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { container, unmount } = render(<FieldGroup size={size}>group</FieldGroup>);
      const el = container.querySelector('[data-slot="field-group"]');
      expect(el?.className).toContain(`field-group-size-${size}`);
      unmount();
    });
  });

  it("has role=group", () => {
    const { container } = render(<FieldGroup>content</FieldGroup>);
    const el = container.querySelector('[data-slot="field-group"]');
    expect(el).toHaveAttribute("role", "group");
  });

  it("sets displayName", () => {
    expect(FieldGroup.displayName).toBe("FieldGroup");
  });
});

describe("FieldTitle", () => {
  it("renders as h3 by default", () => {
    const { container } = render(<FieldTitle>Section</FieldTitle>);
    expect(container.querySelector("h3")).toBeInTheDocument();
  });

  it("renders configurable heading level via `as`", () => {
    const levels = ["h2", "h3", "h4"] as const;

    levels.forEach((level) => {
      const { container, unmount } = render(<FieldTitle as={level}>{level}</FieldTitle>);
      expect(container.querySelector(level)).toBeInTheDocument();
      unmount();
    });
  });

  it("sets displayName", () => {
    expect(FieldTitle.displayName).toBe("FieldTitle");
  });
});

describe("FieldSeparator", () => {
  it("renders as <hr>", () => {
    const { container } = render(<FieldSeparator />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const variants = ["solid", "dashed", "dotted"] as const;

    variants.forEach((variant) => {
      const { container, unmount } = render(<FieldSeparator variant={variant} />);
      const el = container.querySelector('[data-slot="field-separator"]');
      expect(el?.className).toContain(`field-separator-${variant}`);
      unmount();
    });
  });

  it("sets displayName", () => {
    expect(FieldSeparator.displayName).toBe("FieldSeparator");
  });
});
