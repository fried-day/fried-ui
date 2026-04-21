"use client";

import type { ComponentPropsWithRef } from "react";

import { clsx } from "clsx";

import { classes } from "../../utils/classes";

import type { BadgeVariantsProps } from "./badge.variants";

export type BadgeProps = Omit<ComponentPropsWithRef<"span">, "className"> &
  BadgeVariantsProps & {
    className?: string;
  };

/**
 * A badge displays a small status indicator or label, non-interactive.
 * Children with `slot="icon-start" | "icon-end" | "icon"` render as icons.
 */
const Badge = (props: Readonly<BadgeProps>) => {
  const { children, className, isIconOnly, radius, ref, size, variant, ...rest } = props;

  const badgeClassName = clsx(
    classes({
      block: "badge",
      modifiers: {
        variant,
        size,
        radius,
        "icon-only": isIconOnly,
      },
    }),
    className,
  );

  const role = isIconOnly ? "img" : undefined;

  return (
    <span data-slot="badge" role={role} className={badgeClassName} ref={ref} {...rest}>
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export { Badge };
