"use client";

import type { ComponentPropsWithRef } from "react";
import { useContext } from "react";

import { Text as AriaText } from "react-aria-components";

import { clsx } from "clsx";

import { classes } from "../../utils/classes";
import { TextFieldContext } from "../text-field/text-field-context";

import type { DescriptionVariantsProps } from "./description.variants";

export type DescriptionProps = DescriptionVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaText>, "className" | "slot">;

/**
 * Helper text describing a form field, paired with a Label and input.
 * Use `isInvalid` for inline error messages.
 */
const Description = (props: Readonly<DescriptionProps>) => {
  const { children, className, isDisabled: isDisabledProp, isInvalid: isInvalidProp, ref, size, ...rest } = props;
  const ctx = useContext(TextFieldContext);
  const isDisabled = isDisabledProp ?? ctx?.isDisabled;
  const isInvalid = isInvalidProp ?? ctx?.isInvalid;

  const descriptionClassName = clsx(
    classes({
      block: "description",
      modifiers: {
        size,
        invalid: isInvalid,
        disabled: isDisabled,
      },
    }),
    className,
  );

  return (
    <AriaText slot="description" data-slot="description" className={descriptionClassName} ref={ref} {...rest}>
      {children}
    </AriaText>
  );
};

Description.displayName = "Description";

export { Description };
