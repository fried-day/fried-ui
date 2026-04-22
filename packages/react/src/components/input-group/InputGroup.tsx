"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { Input as AriaInput, TextArea as AriaTextArea } from "react-aria-components";

import { classes } from "../../utils/classes";

import type { InputGroupAddonVariantsProps, InputGroupVariantsProps } from "./input-group.variants";

export type InputGroupProps = InputGroupVariantsProps & {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<"div">, "className" | "children">;

export type InputGroupAddonProps = InputGroupAddonVariantsProps & {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<"span">, "className" | "children">;

export type InputGroupInputProps = Omit<ComponentPropsWithRef<typeof AriaInput>, "className" | "children"> & {
  className?: string;
};

export type InputGroupTextareaProps = Omit<ComponentPropsWithRef<typeof AriaTextArea>, "className" | "children"> & {
  className?: string;
};

/**
 * A wrapper that combines an input with addons (icons, buttons, text) in a single bordered row.
 * Compose with `InputGroupAddon`, `InputGroupInput`, and `InputGroupTextarea`. Use existing `Button` as a children of `InputGroupAddon` for action buttons.
 */
const InputGroup = (props: Readonly<InputGroupProps>) => {
  const { children, className, isFullWidth, radius, ref, size, variant, ...rest } = props;

  const groupClassName = classes({
    block: "input-group",
    modifiers: {
      variant,
      size,
      radius,
      "full-width": isFullWidth,
    },
    className,
  });

  return (
    <div data-slot="input-group" className={groupClassName} ref={ref} {...rest}>
      {children}
    </div>
  );
};

InputGroup.displayName = "InputGroup";

/**
 * An addon slot inside InputGroup for icons, text, or action buttons.
 * Position via the `align` prop. Children render directly — put `<SearchIcon />`, `"12 results"`, or `<Button size="sm" variant="ghost">Go</Button>` inside.
 */
const InputGroupAddon = (props: Readonly<InputGroupAddonProps>) => {
  const { align, children, className, ref, ...rest } = props;

  const addonClassName = classes({
    block: "input-group-addon",
    modifiers: {
      align,
    },
    className,
  });

  return (
    <span data-slot="input-group-addon" className={addonClassName} ref={ref} {...rest}>
      {children}
    </span>
  );
};

InputGroupAddon.displayName = "InputGroupAddon";

/**
 * A plain `<input>` styled for use inside InputGroup.
 * Ships without its own border, background, or ring so the InputGroup wrapper owns the visual chrome. Use `Input` standalone for bare inputs outside a group.
 */
const InputGroupInput = (props: Readonly<InputGroupInputProps>) => {
  const { className, ref, ...rest } = props;

  const inputClassName = classes({
    block: "input-group-input",
    modifiers: {},
    className,
  });

  return <AriaInput {...rest} data-slot="input-group-input" className={inputClassName} ref={ref} />;
};

InputGroupInput.displayName = "InputGroupInput";

/**
 * A plain `<textarea>` styled for use inside InputGroup.
 * Ships without its own border, background, or ring so the InputGroup wrapper owns the visual chrome. Use `Textarea` standalone for bare textareas outside a group.
 */
const InputGroupTextarea = (props: Readonly<InputGroupTextareaProps>) => {
  const { className, ref, ...rest } = props;

  const textareaClassName = classes({
    block: "input-group-textarea",
    modifiers: {},
    className,
  });

  return <AriaTextArea {...rest} data-slot="input-group-textarea" className={textareaClassName} ref={ref} />;
};

InputGroupTextarea.displayName = "InputGroupTextarea";

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea };
