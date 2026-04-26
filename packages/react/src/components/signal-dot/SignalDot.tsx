"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { classes } from "../../utils/classes";

export interface SignalDotProps extends Omit<ComponentPropsWithRef<"span">, "children" | "className"> {
  /** Anchor element (Avatar, Button, Icon) the dot is positioned at the corner of. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the halo border (page-background colored, separates the dot from the anchor) is hidden — set to `true` when the dot sits on a matching surface. @default false */
  isBorderless?: boolean;
  /** Placement corner relative to the wrapped anchor. @default 'top-right' */
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay";
}

/**
 * A presence dot anchored at the corner of an element. Communicates binary status —
 * online/offline, unread/read, new/seen — without text. Decorative by default
 * (`aria-hidden`); pair the parent anchor with `aria-label` when the dot carries meaning.
 */
const SignalDot = (props: Readonly<SignalDotProps>) => {
  const { children, className, isBorderless, placement, ref, size, variant, ...rest } = props;

  const wrapperClassName = classes({
    block: "signal-dot",
    modifiers: {
      variant,
      size,
      placement,
      borderless: isBorderless,
    },
    className,
  });

  return (
    <span data-slot="signal-dot" className={wrapperClassName} ref={ref} {...rest}>
      {children}
      <span className="signal-dot__indicator" data-slot="signal-dot-indicator" aria-hidden />
    </span>
  );
};

SignalDot.displayName = "SignalDot";

export { SignalDot };
