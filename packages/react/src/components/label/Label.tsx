"use client";

import type { ComponentPropsWithRef } from "react";
import { useContext } from "react";

import { Label as AriaLabel } from "react-aria-components";

import { clsx } from "clsx";

import { classes } from "../../utils/classes";
import { TextFieldContext } from "../text-field/text-field-context";

import type { LabelVariantsProps } from "./label.variants";

export type LabelProps = LabelVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaLabel>, "className">;

/**
 * A label identifies a form field, paired with `htmlFor` to link to the input.
 * Use `isRequired` to show the asterisk or `optionalMessage` to mark optional fields.
 */
const Label = (props: Readonly<LabelProps>) => {
  const {
    children,
    className,
    isDisabled: isDisabledProp,
    isInvalid: isInvalidProp,
    isRequired: isRequiredProp,
    optionalMessage,
    ref,
    size,
    weight,
    ...rest
  } = props;

  const ctx = useContext(TextFieldContext);
  const isDisabled = isDisabledProp ?? ctx?.isDisabled;
  const isInvalid = isInvalidProp ?? ctx?.isInvalid;
  const isRequired = isRequiredProp ?? ctx?.isRequired;

  const labelClassName = clsx(
    classes({
      block: "label",
      modifiers: {
        size,
        weight,
        invalid: isInvalid,
        disabled: isDisabled,
      },
    }),
    className,
  );

  return (
    <AriaLabel slot="label" data-slot="label" className={labelClassName} ref={ref} {...rest}>
      {children}

      {isRequired ? (
        <span className="label-required" aria-hidden="true">
          *
        </span>
      ) : (
        optionalMessage && <span className="label-optional">{optionalMessage}</span>
      )}
    </AriaLabel>
  );
};

Label.displayName = "Label";

export { Label };
