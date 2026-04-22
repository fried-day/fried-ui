"use client";

import type { ComponentPropsWithRef } from "react";

import { Text as AriaText } from "react-aria-components";

import { classes } from "../../utils/classes";
import { useFieldState } from "../field/use-field-state";

import type { DescriptionVariantsProps } from "./description.variants";

export type DescriptionProps = DescriptionVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaText>, "className" | "slot">;

/**
 * Helper text describing a form field, paired with a Label and input.
 * Use `isInvalid` for inline error messages.
 */
const Description = (props: Readonly<DescriptionProps>) => {
  const { children, className, ref, size, ...rest } = props;
  const { isDisabled, isInvalid } = useFieldState(props);

  const descriptionClassName = classes({
    block: "description",
    modifiers: {
      size,
      invalid: isInvalid,
      disabled: isDisabled,
    },
    className,
  });

  return (
    <AriaText slot="description" data-slot="description" className={descriptionClassName} ref={ref} {...rest}>
      {children}
    </AriaText>
  );
};

Description.displayName = "Description";

export { Description };
