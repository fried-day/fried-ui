"use client";

import type { ComponentPropsWithRef } from "react";

import * as RadixAvatar from "@radix-ui/react-avatar";

import { clsx } from "clsx";

import { bem } from "../../utils/bem";

import type { AvatarVariantsProps } from "./avatar.variants";

export type AvatarProps = Omit<ComponentPropsWithRef<typeof RadixAvatar.Root>, "className"> &
  AvatarVariantsProps & {
    className?: string;
  };

export type AvatarImageProps = Omit<ComponentPropsWithRef<typeof RadixAvatar.Image>, "className"> & {
  className?: string;
};

export type AvatarFallbackProps = Omit<ComponentPropsWithRef<typeof RadixAvatar.Fallback>, "className"> & {
  className?: string;
};

/**
 * Image element rendered inside an Avatar. Hidden until the image loads
 * successfully, falling back to Avatar.Fallback on error.
 */
const AvatarImage = (props: Readonly<AvatarImageProps>) => {
  const { className, ref, ...rest } = props;
  const imageClassName = clsx("fri-avatar__image", className);

  return <RadixAvatar.Image data-slot="avatar-image" className={imageClassName} ref={ref} {...rest} />;
};

AvatarImage.displayName = "Avatar.Image";

/**
 * Content rendered when Avatar.Image fails to load or is not provided.
 * Typically initials or a placeholder icon.
 */
const AvatarFallback = (props: Readonly<AvatarFallbackProps>) => {
  const { children, className, ref, ...rest } = props;
  const fallbackClassName = clsx("fri-avatar__fallback", className);

  return (
    <RadixAvatar.Fallback data-slot="avatar-fallback" className={fallbackClassName} ref={ref} {...rest}>
      {children}
    </RadixAvatar.Fallback>
  );
};

AvatarFallback.displayName = "Avatar.Fallback";

/**
 * An avatar represents a user or entity with an image, initials, or icon.
 * Compose with `Avatar.Image` and `Avatar.Fallback` for image + fallback handling.
 */
const Avatar = (props: Readonly<AvatarProps>) => {
  const { children, className, isDisabled, radius, ref, ring, size, ...rest } = props;

  const avatarClassName = clsx(
    bem({
      block: "fri-avatar",
      modifiers: {
        size,
        radius,
        ring,
        disabled: isDisabled,
      },
    }),
    className,
  );

  return (
    <RadixAvatar.Root data-slot="avatar" className={avatarClassName} ref={ref} {...rest}>
      {children}
    </RadixAvatar.Root>
  );
};

Avatar.displayName = "Avatar";
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { Avatar };
