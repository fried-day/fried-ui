"use client";

import type { ComponentPropsWithRef, ReactElement } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { Avatar, AvatarFallback, type AvatarProps } from "../avatar";
import { classes } from "../../utils/classes";

export interface AvatarGroupProps extends ComponentPropsWithRef<"div"> {
  /** Counter display style when more avatars are hidden than shown. `avatar` renders an Avatar-sized +N circle (default). `text` renders plain inline text beside the stack with compact number notation (e.g. `+10K`). @default 'avatar' */
  counterVariant?: "avatar" | "text";
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

const compactFormatter = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

/**
 * A stack of overlapping avatars representing a group of users or entities.
 * When the number of children exceeds `max`, remaining avatars collapse into a `+N` counter.
 * Use `counterVariant="text"` to render the counter as inline text with compact notation (e.g. `+10K`) beside the stack.
 */
const AvatarGroup = (props: Readonly<AvatarGroupProps>) => {
  const { children, className, counterVariant, isHoverable, max, ref, size, spacing, total, ...rest } = props;

  const avatars = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const visible = typeof max === "number" ? avatars.slice(0, max) : avatars;
  const totalCount = typeof total === "number" ? total : avatars.length;
  const hiddenCount = Math.max(0, totalCount - visible.length);
  const counterLabel = `${hiddenCount} more`;
  const isTextCounter = counterVariant === "text";
  const counterText = isTextCounter ? `+${compactFormatter.format(hiddenCount)}` : `+${hiddenCount}`;

  const groupClassName = classes({
    block: "avatar-group",
    modifiers: {
      size,
      spacing,
      hoverable: isHoverable,
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

      {hiddenCount > 0 &&
        (isTextCounter ? (
          <span className="avatar-group-counter-text" data-slot="avatar-group-counter-text" aria-label={counterLabel}>
            {counterText}
          </span>
        ) : (
          <Avatar className="avatar-group-counter" aria-label={counterLabel} size={size}>
            <AvatarFallback>{counterText}</AvatarFallback>
          </Avatar>
        ))}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
