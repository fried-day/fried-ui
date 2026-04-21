"use client";

import type { ComponentPropsWithRef } from "react";

import { Label as AriaLabel } from "react-aria-components";

import { clsx } from "clsx";

import { bem } from "../../utils/bem";

import type { LabelVariantsProps } from "./label.variants";

export type LabelProps = LabelVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaLabel>, "className">;

/**
 * A label identifies a form field, paired with `htmlFor` to link to the input.
 * Use `isRequired` to show the asterisk or `optionalMessage` to mark optional fields.
 */
const Label = (props: Readonly<LabelProps>) => {
  const { children, className, isDisabled, isInvalid, isRequired, optionalMessage, ref, size, weight, ...rest } = props;

  const labelClassName = clsx(
    bem({
      block: "fri-label",
      modifiers: {
        size,
        weight,
        required: isRequired,
        invalid: isInvalid,
        disabled: isDisabled,
      },
    }),
    className,
  );

  return (
    <AriaLabel data-slot="label" className={labelClassName} ref={ref} {...rest}>
      {children}

      {optionalMessage && <span className="fri-label__optional">{optionalMessage}</span>}

      {isRequired && (
        <span className="fri-label__required" aria-hidden="true">
          *
        </span>
      )}
    </AriaLabel>
  );
};

Label.displayName = "Label";

export { Label };
