"use client";

import type { ComponentPropsWithRef } from "react";

import { clsx } from "clsx";

import { bem } from "../../utils/bem";

import type { SurfaceVariantsProps } from "./surface.variants";

export type SurfaceProps = Omit<ComponentPropsWithRef<"div">, "className"> &
  SurfaceVariantsProps & {
    className?: string;
  };

const Surface = (props: Readonly<SurfaceProps>) => {
  const { children, className, isShadow, radius, ref, variant, ...rest } = props;

  const surfaceClassName = clsx(
    bem({
      block: "fri-surface",
      modifiers: {
        variant,
        radius,
        shadow: isShadow,
      },
    }),
    className,
  );

  return (
    <div data-slot="surface" className={surfaceClassName} ref={ref} {...rest}>
      {children}
    </div>
  );
};

Surface.displayName = "Surface";

export { Surface };
