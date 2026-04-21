"use client";

import type { ComponentPropsWithRef, ReactElement } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { clsx } from "clsx";

import { Avatar, type AvatarProps } from "../avatar";
import { classes } from "../../utils/classes";

import type { AvatarGroupVariantsProps } from "./avatar-group.variants";

export type AvatarGroupProps = Omit<ComponentPropsWithRef<"div">, "className"> &
  AvatarGroupVariantsProps & {
    className?: string;
  };

/**
 * A stack of overlapping avatars representing a group of users or entities.
 * When the number of children exceeds `max`, remaining avatars collapse into a `+N` counter.
 */
const AvatarGroup = (props: Readonly<AvatarGroupProps>) => {
  const { spacing = "md", children, className, isHoverable, max, ref, size, total, ...rest } = props;

  const avatars = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const visible = typeof max === "number" ? avatars.slice(0, max) : avatars;
  const totalCount = typeof total === "number" ? total : avatars.length;
  const hiddenCount = Math.max(0, totalCount - visible.length);
  const counterLabel = `${hiddenCount} more`;
  const counterText = `+${hiddenCount}`;

  const groupClassName = clsx(
    classes({
      block: "avatar-group",
      modifiers: {
        size,
        spacing,
        hoverable: isHoverable,
      },
    }),
    className,
  );

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
          <Avatar.Fallback>{counterText}</Avatar.Fallback>
        </Avatar>
      )}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
