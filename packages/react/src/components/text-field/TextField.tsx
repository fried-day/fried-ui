"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { useMemo } from "react";

import { TextField as AriaTextField } from "react-aria-components";

import { clsx } from "clsx";

import { classes } from "../../utils/classes";
import { TextFieldContext } from "./text-field-context";

import type { TextFieldVariantsProps } from "./text-field.variants";

type AriaTextFieldProps = Omit<ComponentPropsWithRef<typeof AriaTextField>, "className" | "children">;

export type TextFieldProps = TextFieldVariantsProps & {
  children: ReactNode;
  className?: string;
} & AriaTextFieldProps;

/**
 * A container for a labeled text input with description and error-message slots.
 * Compose children with Label, Input, Description, and FieldError in the order you want them rendered.
 */
const TextField = (props: Readonly<TextFieldProps>) => {
  const { children, className, isDisabled, isFullWidth, isInvalid, isReadOnly, isRequired, ref, size, ...rest } = props;

  const wrapperClassName = clsx(
    classes({
      block: "text-field",
      modifiers: {
        size,
        "full-width": isFullWidth,
      },
    }),
    className,
  );

  const contextValue = useMemo(() => {
    return { isDisabled, isInvalid, isReadOnly, isRequired };
  }, [isDisabled, isInvalid, isReadOnly, isRequired]);

  return (
    <TextFieldContext.Provider value={contextValue}>
      <AriaTextField
        data-slot="text-field"
        className={wrapperClassName}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        ref={ref}
        {...rest}
      >
        {children}
      </AriaTextField>
    </TextFieldContext.Provider>
  );
};

TextField.displayName = "TextField";

export { TextField };
