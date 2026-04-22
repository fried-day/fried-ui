import { describe, expect, it } from "vitest";

import { classes } from "./classes";

describe("classes()", () => {
  it("returns block alone when modifiers are empty", () => {
    expect(classes({ block: "button", modifiers: {} })).toBe("button");
  });

  it("emits variant as value-only modifier (no key prefix)", () => {
    expect(classes({ block: "button", modifiers: { variant: "primary" } })).toBe("button button-primary");
  });

  it("emits non-variant string modifier with key-value pattern", () => {
    expect(classes({ block: "button", modifiers: { size: "md" } })).toBe("button button-size-md");
  });

  it("emits boolean true modifier as key-only (no value)", () => {
    expect(classes({ block: "button", modifiers: { disabled: true } })).toBe("button button-disabled");
  });

  it("skips boolean false modifier", () => {
    expect(classes({ block: "button", modifiers: { disabled: false } })).toBe("button");
  });

  it("skips undefined modifier value", () => {
    expect(classes({ block: "button", modifiers: { variant: undefined } })).toBe("button");
  });

  it("skips empty string modifier value", () => {
    expect(classes({ block: "button", modifiers: { variant: "" } })).toBe("button");
  });

  it("combines multiple modifiers (variant + size + boolean + undefined)", () => {
    expect(
      classes({
        block: "button",
        modifiers: {
          variant: "danger",
          size: "lg",
          disabled: true,
          radius: undefined,
        },
      }),
    ).toBe("button button-danger button-size-lg button-disabled");
  });

  it("appends className last (user class wins on cascade)", () => {
    expect(
      classes({
        block: "button",
        modifiers: { variant: "primary" },
        className: "mt-4 text-lg",
      }),
    ).toBe("button button-primary mt-4 text-lg");
  });

  it("omits className when undefined", () => {
    expect(classes({ block: "button", modifiers: {}, className: undefined })).toBe("button");
  });

  it("omits className when empty string", () => {
    expect(classes({ block: "button", modifiers: {}, className: "" })).toBe("button");
  });

  it("supports daisyUI-style single-dash naming without prefix", () => {
    expect(
      classes({
        block: "text-field",
        modifiers: { "full-width": true },
      }),
    ).toBe("text-field text-field-full-width");
  });

  it("handles compound variant values (e.g. primary-soft)", () => {
    expect(
      classes({
        block: "button",
        modifiers: { variant: "primary-soft" },
      }),
    ).toBe("button button-primary-soft");
  });

  it("preserves modifier insertion order in output", () => {
    expect(
      classes({
        block: "input",
        modifiers: {
          size: "sm",
          variant: "secondary",
          radius: "full",
        },
      }),
    ).toBe("input input-size-sm input-secondary input-radius-full");
  });

  it("folds multi-class className string (clsx joins whitespace-separated)", () => {
    expect(
      classes({
        block: "badge",
        modifiers: {},
        className: "custom-1 custom-2",
      }),
    ).toBe("badge custom-1 custom-2");
  });
});
