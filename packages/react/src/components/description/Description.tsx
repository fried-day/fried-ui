"use client";

import type { ComponentPropsWithRef } from "react";

import { Text as AriaText } from "react-aria-components";

import { classes } from "../../utils/classes";

import type { DescriptionVariantsProps } from "./description.variants";

export type DescriptionProps = DescriptionVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaText>, "className" | "slot">;

/**
 * Helper text describing a form field, paired with a Label and input.
 */
const Description = (props: Readonly<DescriptionProps>) => {
  const { children, className, isDisabled, ref, size, ...rest } = props;

  const descriptionClassName = classes({
    block: "description",
    modifiers: {
      size,
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
