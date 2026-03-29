"use client";

import type { ComponentPropsWithRef } from "react";

import { clsx } from "clsx";

import { bem } from "../../utils/bem";

import type { SurfaceVariantsProps } from "./surface.variants";

/**
 * Surface — visual layer for elevated content.
 *
 * @research Nielsen Norman Group (2019) — Visual layering through elevation
 *   reduces cognitive load by grouping related content.
 * @research Material Design 3 — Elevation system maps shadow + surface tint
 *   to create depth hierarchy. Dark mode uses lighter surfaces for higher elevation.
 */

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
