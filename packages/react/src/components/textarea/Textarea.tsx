"use client";

import type { ComponentPropsWithRef } from "react";

import { TextArea as AriaTextArea } from "react-aria-components";

import { classes } from "../../utils/classes";

import type { TextareaVariantsProps } from "./textarea.variants";

type AriaTextAreaProps = Omit<ComponentPropsWithRef<typeof AriaTextArea>, "className" | "children" | "size">;

export type TextareaProps = TextareaVariantsProps & {
  className?: string;
} & AriaTextAreaProps;

/**
 * A styled multiline text input primitive. Use native HTML attrs (`disabled`, `readOnly`, `required`, `aria-invalid`) for state.
 * For leading/trailing icons, buttons, or block-aligned send buttons, wrap in `InputGroup` with `InputGroupAddon`.
 */
const Textarea = (props: Readonly<TextareaProps>) => {
  const { className, isFullWidth, radius, ref, resize, size, variant, ...rest } = props;

  const textareaClassName = classes({
    block: "textarea",
    modifiers: {
      variant,
      size,
      radius,
      resize,
      "full-width": isFullWidth,
    },
    className,
  });

  return <AriaTextArea {...rest} data-slot="textarea" className={textareaClassName} ref={ref} />;
};

Textarea.displayName = "Textarea";

export { Textarea };
