"use client";

import type { ComponentPropsWithRef } from "react";

import { Input as AriaInput } from "react-aria-components";

import { classes } from "../../utils/classes";

import type { InputVariantsProps } from "./input.variants";

type AriaInputProps = Omit<ComponentPropsWithRef<typeof AriaInput>, "className" | "children" | "size">;

export type InputProps = InputVariantsProps & {
  className?: string;
} & AriaInputProps;

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
