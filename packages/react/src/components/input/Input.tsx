"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { Input as AriaInput } from "react-aria-components";

import { clsx } from "clsx";

import { Spinner } from "../icons";
import { bem } from "../../utils/bem";

import type { InputVariantsProps } from "./input.variants";

type AriaInputProps = Omit<ComponentPropsWithRef<typeof AriaInput>, "className" | "children">;

export type InputProps = InputVariantsProps & {
  className?: string;
  endIcon?: ReactNode;
  prefix?: ReactNode;
  startIcon?: ReactNode;
  suffix?: ReactNode;
} & AriaInputProps;

/**
 * A styled text input primitive for forms. Use inside TextField to pair with Label + Description.
 * Pass icons via `startIcon` / `endIcon` props.
 */
const Input = (props: Readonly<InputProps>) => {
  const {
    className,
    endIcon,
    isDisabled,
    isFullWidth,
    isInvalid,
    isPending,
    isReadOnly,
    isRequired,
    prefix,
    radius,
    ref,
    size,
    startIcon,
    suffix,
    variant,
    ...rest
  } = props;

  const wrapperClassName = clsx(
    bem({
      block: "fri-input",
      modifiers: {
        variant,
        size,
        radius,
        "full-width": isFullWidth,
      },
    }),
    className,
  );

  const isAriaInvalid = isInvalid || undefined;
  const isPendingState = isPending || undefined;
  const isReadOnlyOrPending = isReadOnly || isPending;

  return (
    <div data-slot="input-wrapper" data-pending={isPendingState} className={wrapperClassName}>
      {startIcon && (
        <span className="fri-input__icon-start" data-slot="input-icon-start" aria-hidden="true">
          {startIcon}
        </span>
      )}

      {prefix && (
        <span className="fri-input__prefix" data-slot="input-prefix">
          {prefix}
        </span>
      )}

      <AriaInput
        className="fri-input__field"
        data-slot="input"
        aria-invalid={isAriaInvalid}
        disabled={isDisabled}
        readOnly={isReadOnlyOrPending}
        ref={ref}
        required={isRequired}
        {...rest}
      />

      {suffix && (
        <span className="fri-input__suffix" data-slot="input-suffix">
          {suffix}
        </span>
      )}

      {isPending ? (
        <Spinner className="fri-input__spinner" data-slot="input-spinner" aria-hidden="true" />
      ) : (
        endIcon && (
          <span className="fri-input__icon-end" data-slot="input-icon-end" aria-hidden="true">
            {endIcon}
          </span>
        )
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
