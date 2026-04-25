"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { classes } from "../../utils/classes";

export interface BadgeProps extends Omit<ComponentPropsWithRef<"span">, "children" | "className"> {
  /** Anchor element plus a `BadgeIndicator` or `BadgeStatus` subpart. Badge provides the positioning container. */
  children: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
}

/**
 * A badge wraps an anchor element (Button, Avatar, Icon) and provides a positioning
 * container for overlay subparts. Compose with `BadgeIndicator` for counts or labels,
 * or with `BadgeStatus` for a presence dot.
 */
const Badge = (props: Readonly<BadgeProps>) => {
  const { children, className, ref, ...rest } = props;

  const badgeClassName = classes({
    block: "badge",
    modifiers: {},
    className,
  });

  return (
    <span data-slot="badge" className={badgeClassName} ref={ref} {...rest}>
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export interface BadgeIndicatorProps extends Omit<ComponentPropsWithRef<"span">, "children" | "className"> {
  /** Indicator content — count, short label, or any ReactNode rendered at the anchor's corner. */
  children: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the indicator sits on the anchor's perimeter — use with round anchors such as Avatar so the indicator lands on the edge at 45 degrees. @default false */
  isInset?: boolean;
  /** Cap numeric content — render as `${max}+` when exceeded. @default 99 */
  max?: number;
  /** Placement corner relative to the wrapped anchor. @default 'top-right' */
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md";
  /** Visual style. @default 'danger' */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay";
}
/**
 * An overlay indicator rendered inside a Badge. Shows a count, a short label, or any
 * ReactNode at a corner of the wrapped anchor. Announces via `role="status"` so
 * screen readers pick up count changes.
 */
const BadgeIndicator = (props: Readonly<BadgeIndicatorProps>) => {
  const { children, className, isInset, max, placement, ref, size, variant, ...rest } = props;

  const indicatorClassName = classes({
    block: "badge-indicator",
    modifiers: {
      variant,
      size,
      placement,
      "is-inset": isInset,
    },
    className,
  });

  const resolveContent = (): ReactNode => {
    if (typeof children === "number" && max !== undefined && children > max) {
      return `${max}+`;
    }

    return children;
  };

  const content = resolveContent();

  return (
    <span role="status" data-slot="badge-indicator" className={indicatorClassName} ref={ref} {...rest}>
      {content}
    </span>
  );
};

BadgeIndicator.displayName = "BadgeIndicator";

export interface BadgeStatusProps extends Omit<ComponentPropsWithRef<"span">, "className"> {
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the status dot sits on the anchor's perimeter — use with round anchors such as Avatar. @default false */
  isInset?: boolean;
  /** Placement corner relative to the wrapped anchor. @default 'bottom-right' */
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md";
  /** Visual style. @default 'success' */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay";
}

/**
 * A presence dot rendered inside a Badge. Decorative by default (`aria-hidden`);
 * pair the anchor with an `aria-label` when the dot carries meaning.
 */
const BadgeStatus = (props: Readonly<BadgeStatusProps>) => {
  const { className, isInset, placement, ref, size, variant, ...rest } = props;

  const statusClassName = classes({
    block: "badge-status",
    modifiers: {
      variant,
      size,
      placement,
      "is-inset": isInset,
    },
    className,
  });

  return <span data-slot="badge-status" className={statusClassName} ref={ref} aria-hidden {...rest} />;
};

BadgeStatus.displayName = "BadgeStatus";

export { Badge, BadgeIndicator, BadgeStatus };
