"use client";

import type { ComponentPropsWithRef } from "react";

import { Input as AriaInput } from "react-aria-components";

import { classes } from "../../utils/classes";

export interface InputProps extends Omit<ComponentPropsWithRef<typeof AriaInput>, "className" | "size"> {
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the input stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "overlay";
}

/**
 * A styled text input primitive. Use native HTML attrs (`disabled`, `readOnly`, `required`, `aria-invalid`) for state.
 * For leading/trailing icons, text affixes, buttons, or pending state, wrap in `InputGroup` with `InputGroupAddon`.
 */
const Input = (props: Readonly<InputProps>) => {
  const { className, isFullWidth, radius, ref, size, variant, ...rest } = props;

  const inputClassName = classes({
    block: "input",
    modifiers: {
      variant,
      size,
      radius,
      "full-width": isFullWidth,
    },
    className,
  });

  return <AriaInput {...rest} data-slot="input" className={inputClassName} ref={ref} />;
};

Input.displayName = "Input";

export { Input };
