"use client";

import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

import type { AvatarProps } from "../avatar";
import { classes } from "../../utils/classes";

export interface AvatarGroupProps extends Omit<ComponentPropsWithRef<"div">, "children" | "className"> {
  /** Stack content — a sequence of `<Avatar />` siblings, optionally followed by an `<AvatarGroupCounter />` for the overflow indicator. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the group hides the 2px outline around each avatar — produces a solid stack with no background-colored separator. @default false */
  isBorderless?: boolean;
  /** Whether the avatars lift on hover. @default false */
  isHoverable?: boolean;
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Overlap amount between adjacent avatars. `tighter` squeezes the stack tightest (35% overlap), `tight` packs them closer (30%), `default` is the balanced baseline (20%), `wide` spreads them for face recognition (10%), `wider` is airy for hero layouts (5%). @default 'default' */
  spacing?: "tighter" | "tight" | "default" | "wide" | "wider";
}

/**
 * A stack of overlapping avatars representing a group of users or entities.
 * Compose an `<AvatarGroupCounter />` as the last child to render an overflow indicator.
 */
const AvatarGroup = (props: Readonly<AvatarGroupProps>) => {
  const { children, className, isBorderless, isHoverable, ref, size, spacing, ...rest } = props;

  const groupClassName = classes({
    block: "avatar-group",
    modifiers: {
      size,
      spacing,
      hoverable: isHoverable,
      borderless: isBorderless,
    },
    className,
  });

  const childArray = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement<AvatarProps>[];

  const renderChild = (child: ReactElement<AvatarProps>): ReactElement => {
    const childSize = (child.props as AvatarProps | undefined)?.size;

    if (childSize !== undefined) return child;

    return cloneElement(child, { size });
  };

  return (
    <div data-slot="avatar-group" className={groupClassName} ref={ref} {...rest}>
      {childArray.map((child) => renderChild(child))}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

export interface AvatarGroupCounterProps extends Omit<ComponentPropsWithRef<"span">, "children" | "className"> {
  /** Counter content — typically a formatted overflow string such as `"+99"`, `"+99+"`, or `"+10.2K"`. Provide compact notation manually (e.g. via `Intl.NumberFormat`). */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Visual style. `fallback` renders the counter as a circular avatar-shaped indicator inside the stack; `text` renders flat text beside the stack for hero or social-proof layouts. @default 'fallback' */
  variant?: "fallback" | "text";
}

/**
 * Overflow indicator for `<AvatarGroup />`. Compose as the last child of the group.
 * Provide the formatted count as `children` — the component does not compute or format it.
 */
const AvatarGroupCounter = (props: Readonly<AvatarGroupCounterProps>) => {
  const { children, className, ref, variant, ...rest } = props;

  const counterClassName = classes({
    block: "avatar-group-counter",
    modifiers: { variant },
    className,
  });

  return (
    <span data-slot="avatar-group-counter" className={counterClassName} ref={ref} {...rest}>
      {children}
    </span>
  );
};

AvatarGroupCounter.displayName = "AvatarGroupCounter";

export { AvatarGroup, AvatarGroupCounter };
