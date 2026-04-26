"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { classes } from "../../utils/classes";

export interface BadgeProps extends Omit<ComponentPropsWithRef<"span">, "children" | "className"> {
  /** Anchor element (Avatar, Button, Icon) followed by a `BadgeIndicator` (text/number) or `BadgeIcon` (icon) subpart positioned at one of its corners. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
}

/**
 * A positioning wrapper that anchors a `BadgeIndicator` (text/number pill) or
 * `BadgeIcon` (icon square) to one of an element's corners. For binary presence
 * (online/offline, unread/read) use the standalone `SignalDot` instead.
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
  /** Indicator content — text or number such as `"NEW"`, `"99+"`, or `12`. The pill expands width to fit content. For icons use `BadgeIcon`; for binary presence use the standalone `SignalDot`. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the halo border (page-background colored, separates badge from anchor) is hidden — set to `true` for flat badges that sit on a matching surface. @default false */
  isBorderless?: boolean;
  /** Cap numeric content — render as `${max}+` when exceeded. @default 99 */
  max?: number;
  /** Placement corner relative to the wrapped anchor. @default 'top-right' */
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay";
}

/**
 * A pill-shaped indicator for multi-character text or number content (e.g. `"NEW"`, `"99+"`, `12`).
 * Width expands with content; padding scales with size. For icon content use `BadgeIcon` (1:1 square);
 * for binary presence use the standalone `SignalDot`.
 */
const BadgeIndicator = (props: Readonly<BadgeIndicatorProps>) => {
  const { children, className, isBorderless, max, placement, ref, size, variant, ...rest } = props;

  const indicatorClassName = classes({
    block: "badge-indicator",
    modifiers: {
      variant,
      size,
      placement,
      borderless: isBorderless,
    },
    className,
  });

  const isOverflow = typeof children === "number" && max !== undefined && children > max;
  const content = isOverflow ? `${String(max)}+` : children;

  return (
    <span role="status" data-slot="badge-indicator" className={indicatorClassName} ref={ref} {...rest}>
      {content}
    </span>
  );
};

BadgeIndicator.displayName = "BadgeIndicator";

export interface BadgeIconProps extends Omit<ComponentPropsWithRef<"span">, "children" | "className"> {
  /** Icon content rendered in a 1:1 square container. For text or number content, use `BadgeIndicator`; for binary presence use the standalone `SignalDot`. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the halo border (page-background colored, separates badge from anchor) is hidden — set to `true` for flat badges that sit on a matching surface. @default false */
  isBorderless?: boolean;
  /** Placement corner relative to the wrapped anchor. @default 'top-right' */
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay";
}

/**
 * A square (1:1 aspect ratio) badge anchored at the corner of a parent element. Holds an
 * icon or single character. For multi-character text or numbers use `BadgeIndicator` (pill);
 * for binary presence use the standalone `SignalDot`.
 */
const BadgeIcon = (props: Readonly<BadgeIconProps>) => {
  const { children, className, isBorderless, placement, ref, size, variant, ...rest } = props;

  const iconClassName = classes({
    block: "badge-icon",
    modifiers: {
      variant,
      size,
      placement,
      borderless: isBorderless,
    },
    className,
  });

  return (
    <span role="status" data-slot="badge-icon" className={iconClassName} ref={ref} {...rest}>
      {children}
    </span>
  );
};

BadgeIcon.displayName = "BadgeIcon";

export { Badge, BadgeIcon, BadgeIndicator };
