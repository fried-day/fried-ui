"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { Input as AriaInput, TextArea as AriaTextArea } from "react-aria-components";

import { classes } from "../../utils/classes";

export interface InputGroupProps extends Omit<ComponentPropsWithRef<"div">, "children" | "className"> {
  /** Composition slots — `InputGroupAddon`, `InputGroupInput`, `InputGroupTextarea`, or `Button`. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the group stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "overlay";
}

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

export interface InputGroupAddonProps extends Omit<ComponentPropsWithRef<"span">, "children" | "className"> {
  /** Position of the addon relative to the input. @default 'inline-start' */
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
  /** Addon content — icon, text, or an action `Button`. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
}

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

export interface InputGroupInputProps extends Omit<ComponentPropsWithRef<typeof AriaInput>, "className"> {
  /** Additional CSS classes appended after the base class. */
  className?: string;
}

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

export interface InputGroupTextareaProps extends Omit<ComponentPropsWithRef<typeof AriaTextArea>, "className"> {
  /** Additional CSS classes appended after the base class. */
  className?: string;
}

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
