"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { classes } from "../../utils/classes";

export interface SurfaceProps extends Omit<ComponentPropsWithRef<"div">, "children" | "className"> {
  /** Surface content — anything rendered inside the styled container. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the surface has an emphasis border. @default false */
  isBordered?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  /** Elevation depth. @default 'none' */
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background layer tone (layer cake). `default` (neutral-50 — standard card), `subtle` (neutral-100 — nested/inset deeper), `plain` (pure white — elevated/inverted), `overlay` (surface on top of a dim scrim, e.g., popover/modal content). @default 'default' */
  variant?: "default" | "subtle" | "plain" | "overlay";
}

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
