"use client";

import type { ComponentPropsWithRef } from "react";

import { classes } from "../../utils/classes";

import type { SurfaceVariantsProps } from "./surface.variants";

export type SurfaceProps = Omit<ComponentPropsWithRef<"div">, "className"> &
  SurfaceVariantsProps & {
    className?: string;
  };

/**
 * A styled container primitive — foundation for cards, alerts, and other
 * composite components. Combine variant, isBordered, radius, and shadow freely.
 */
const Surface = (props: Readonly<SurfaceProps>) => {
  const { children, className, isBordered, radius, ref, shadow, variant, ...rest } = props;

  const surfaceClassName = classes({
    block: "surface",
    modifiers: {
      variant,
      radius,
      shadow,
      bordered: isBordered,
    },
    className,
  });

  return (
    <div data-slot="surface" className={surfaceClassName} ref={ref} {...rest}>
      {children}
    </div>
  );
};

Surface.displayName = "Surface";

export { Surface };
