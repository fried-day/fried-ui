"use client";

import type { ComponentPropsWithRef } from "react";

import { FieldError as AriaFieldError } from "react-aria-components";

import { clsx } from "clsx";

import { classes } from "../../utils/classes";

import type { FieldErrorVariantsProps } from "./field-error.variants";

export type FieldErrorProps = FieldErrorVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaFieldError>, "className">;

/**
 * An error message for a form field. Renders inside TextField (or similar) and auto-shows when the field is invalid.
 */
const FieldError = (props: Readonly<FieldErrorProps>) => {
  const { children, className, isDisabled, ref, size, ...rest } = props;

  const fieldErrorClassName = clsx(
    classes({
      block: "field-error",
      modifiers: {
        size,
        disabled: isDisabled,
      },
    }),
    className,
  );

  return (
    <AriaFieldError data-slot="field-error" className={fieldErrorClassName} ref={ref} {...rest}>
      {children}
    </AriaFieldError>
  );
};

FieldError.displayName = "FieldError";

export { FieldError };
