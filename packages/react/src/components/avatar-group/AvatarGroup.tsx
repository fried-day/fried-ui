"use client";

import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { Avatar, AvatarFallback, type AvatarProps } from "../avatar";
import { classes } from "../../utils/classes";

export interface AvatarGroupProps extends Omit<ComponentPropsWithRef<"div">, "children" | "className"> {
  /** A collection of `<Avatar />` elements to render in the stack. */
  children: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the group hides the 2px outline around each avatar — produces a solid stack with no background-colored separator. The default keeps the outline for visual clarity on overlapping avatars. @default false */
  isBorderless?: boolean;
  /** Whether the avatars lift on hover. @default false */
  isHoverable?: boolean;
  /** Maximum number of avatars to show before collapsing to a +N counter. @default undefined */
  max?: number;
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Overlap amount between adjacent avatars (mirrors Tailwind `tracking-*` semantics — letter-spacing analogue for horizontal avatar stacking). `tighter` squeezes the stack tightest (35% overlap), `tight` packs them closer (30%), `default` is the balanced baseline (20%), `wide` spreads them for face recognition (10%), `wider` is airy for hero layouts (5%). @default 'default' */
  spacing?: "tighter" | "tight" | "default" | "wide" | "wider";
  /** Total count shown inside the +N counter (overrides the derived children count). @default undefined */
  total?: number;
}

/**
 * A stack of overlapping avatars representing a group of users or entities.
 * When the number of children exceeds `max`, remaining avatars collapse into a `+N` counter.
 */
const AvatarGroup = (props: Readonly<AvatarGroupProps>) => {
  const { children, className, isBorderless, isHoverable, max, ref, size, spacing, total, ...rest } = props;

  const avatars = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const visible = typeof max === "number" ? avatars.slice(0, max) : avatars;
  const totalCount = typeof total === "number" ? total : avatars.length;
  const hiddenCount = Math.max(0, totalCount - visible.length);
  const counterLabel = `${hiddenCount} more`;

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

  return (
    <div role="group" data-slot="avatar-group" className={groupClassName} ref={ref} {...rest}>
      {visible.map((child, index) =>
        cloneElement(child, {
          key: child.key ?? index,
          size: child.props.size ?? size,
        }),
      )}

      {hiddenCount > 0 && (
        <Avatar className="avatar-group-counter" aria-label={counterLabel} size={size}>
          <AvatarFallback>{`+${hiddenCount}`}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
