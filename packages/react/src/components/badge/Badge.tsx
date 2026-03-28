"use client";

import type { ComponentPropsWithRef } from "react";

import { clsx } from "clsx";

import { bem } from "../../utils/bem";

import type { BadgeVariantsProps } from "./badge.variants";

export type BadgeProps = Omit<ComponentPropsWithRef<"span">, "className"> &
  BadgeVariantsProps & {
    className?: string;
  };

const Badge = (props: Readonly<BadgeProps>) => {
  const { children, className, ref, size, variant, ...rest } = props;

  const badgeClassName = clsx(
    bem({
      block: "fri-badge",
      modifiers: {
        variant,
        size,
      },
    }),
    className,
  );

  return (
    <span data-slot="badge" className={badgeClassName} ref={ref} {...rest}>
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export { Badge };
