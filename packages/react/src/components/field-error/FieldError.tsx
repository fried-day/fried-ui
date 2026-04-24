"use client";

import type { ComponentPropsWithRef } from "react";

import { FieldError as AriaFieldError } from "react-aria-components";

import { classes } from "../../utils/classes";

export interface FieldErrorProps extends Omit<ComponentPropsWithRef<typeof AriaFieldError>, "className"> {
  className?: string;
  /** Whether the field error is disabled. @default false */
  isDisabled?: boolean;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

/**
 * An error message for a form field. Renders inside TextField (or similar) and auto-shows when the field is invalid.
 */
const FieldError = (props: Readonly<FieldErrorProps>) => {
  const { children, className, isDisabled, ref, size, ...rest } = props;

  const fieldErrorClassName = classes({
    block: "field-error",
    modifiers: {
      size,
      disabled: isDisabled,
    },
    className,
  });

  return (
    <AriaFieldError data-slot="field-error" className={fieldErrorClassName} ref={ref} {...rest}>
      {children}
    </AriaFieldError>
  );
};

FieldError.displayName = "FieldError";

export { FieldError };
