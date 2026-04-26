"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { Label as AriaLabel } from "react-aria-components";

import { classes } from "../../utils/classes";

export interface LabelProps extends Omit<ComponentPropsWithRef<typeof AriaLabel>, "children" | "className"> {
  /** Label text content identifying the paired form field. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the label is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Whether the label is in error state (text in danger color). @default false */
  isInvalid?: boolean;
  /** Whether the field is required (shows red asterisk). @default false */
  isRequired?: boolean;
  /** Text shown in muted gray when field is NOT required (e.g. '(Optional)'). Ignored when isRequired is true. @default undefined */
  optionalMessage?: string;
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg";
  /** Font weight. @default 'medium' */
  weight?: "normal" | "medium" | "semibold";
}

/**
 * A label identifies a form field, paired with `htmlFor` to link to the input.
 * Use `isRequired` to show the asterisk or `optionalMessage` to mark optional fields.
 */
const Label = (props: Readonly<LabelProps>) => {
  const { children, className, isDisabled, isInvalid, isRequired, optionalMessage, ref, size, weight, ...rest } = props;

  const labelClassName = classes({
    block: "label",
    modifiers: {
      size,
      weight,
      invalid: isInvalid,
      disabled: isDisabled,
    },
    className,
  });

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
