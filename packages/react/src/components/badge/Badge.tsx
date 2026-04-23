"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { classes } from "../../utils/classes";

import type { BadgeVariantsProps } from "./badge.variants";

export type BadgeProps = BadgeVariantsProps & {
  children?: ReactNode;
  className?: string;
  /** Cap numeric children — render as `${max}+` when exceeded. @default 99 */
  max?: number;
} & Omit<ComponentPropsWithRef<"span">, "className" | "children">;

/**
 * A badge displays a small count or status indicator overlaid on an anchor element.
 * Wrap the anchor in a `position: relative` container — Badge absolutely positions itself at a corner.
 */
const Badge = (props: Readonly<BadgeProps>) => {
  const { children, className, isDot, isStandalone, max, placement, ref, size, variant, ...rest } = props;

  const badgeClassName = classes({
    block: "badge",
    modifiers: {
      variant,
      size,
      placement,
      "is-dot": isDot,
      "is-standalone": isStandalone,
    },
    className,
  });

  const resolveContent = (): ReactNode => {
    if (isDot === true) return null;

    if (typeof children === "number" && max !== undefined && children > max) {
      return `${max}+`;
    }

    return children;
  };

  const content = resolveContent();

  return (
    <span data-slot="badge" className={badgeClassName} ref={ref} {...rest}>
      {content}
    </span>
  );
};

Badge.displayName = "Badge";

export { Badge };
