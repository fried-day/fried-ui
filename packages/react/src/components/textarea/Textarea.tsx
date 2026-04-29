"use client";

import type { ComponentPropsWithRef } from "react";

import { TextArea as AriaTextArea } from "react-aria-components";

import { classes } from "../../utils/classes";

export interface TextareaProps extends Omit<ComponentPropsWithRef<typeof AriaTextArea>, "className" | "size"> {
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the textarea stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "xs" | "sm" | "md" | "lg" | "full";
  /** Resize behavior. @default 'vertical' */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "overlay";
}

/**
 * A styled multiline text input primitive. Use native HTML attrs (`disabled`, `readOnly`, `required`, `aria-invalid`) for state.
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

  return <AriaTextArea data-slot="textarea" className={textareaClassName} ref={ref} {...rest} />;
};

Textarea.displayName = "Textarea";

export { Textarea };
