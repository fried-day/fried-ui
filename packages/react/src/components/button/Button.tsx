"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button as AriaButton, composeRenderProps } from "react-aria-components";
import type { ButtonRenderProps } from "react-aria-components";

import { clsx } from "clsx";

import { Spinner } from "../icons";
import { classes } from "../../utils/classes";

export interface ButtonProps extends Omit<ComponentPropsWithRef<typeof AriaButton>, "className" | "children"> {
  /** Button content — text, icons via `slot="icon-start" | "icon-end" | "icon"`, or a render-prop function receiving the current state. */
  children: ReactNode | ((renderProps: ButtonRenderProps) => ReactNode);
  /** Additional CSS classes appended after the base class. Accepts a render-prop function for state-aware styling. */
  className?: string | ((renderProps: ButtonRenderProps) => string);
  /** Whether the button stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Whether the button renders as a square icon-only button. @default false */
  isIconOnly?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg" | "xl";
  /** Visual style following Mobbin hierarchy (primary/secondary/outline/ghost + destructive + overlay + accent). @default 'primary' */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "overlay" | "accent";
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 * Children with `slot="icon-start" | "icon-end" | "icon"` render as icons.
 */
const Button = (props: Readonly<ButtonProps>) => {
  const { children, className, isFullWidth, isIconOnly, radius, ref, size, variant, ...rest } = props;

  const baseClassName = classes({
    block: "button",
    modifiers: {
      variant,
      size,
      radius,
      "full-width": isFullWidth,
      "icon-only": isIconOnly,
      disabled: rest.isDisabled,
      pending: rest.isPending,
    },
  });

  const buttonClassName = composeRenderProps(className, (consumerClassName) => clsx(baseClassName, consumerClassName));

  return (
    <AriaButton {...rest} data-slot="button" className={buttonClassName} ref={ref}>
      {composeRenderProps(children, (child, { isPending }) => (
        <>
          {child}
          {isPending && <Spinner className="button-spinner" aria-hidden="true" />}
        </>
      ))}
    </AriaButton>
  );
};

Button.displayName = "Button";

export { Button };
