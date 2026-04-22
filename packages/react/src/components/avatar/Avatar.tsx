"use client";

import type { ComponentPropsWithRef } from "react";

import * as RadixAvatar from "@radix-ui/react-avatar";

import { classes } from "../../utils/classes";

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
 * An avatar represents a user or entity with an image, initials, or icon.
 * Compose with standalone `AvatarImage` and `AvatarFallback` for image + fallback handling.
 */
const Avatar = (props: Readonly<AvatarProps>) => {
  const { children, className, isDisabled, radius, ref, ring, size, ...rest } = props;

  const avatarClassName = classes({
    block: "avatar",
    modifiers: {
      size,
      radius,
      ring,
      disabled: isDisabled,
    },
    className,
  });

  return (
    <RadixAvatar.Root data-slot="avatar" className={avatarClassName} ref={ref} {...rest}>
      {children}
    </RadixAvatar.Root>
  );
};

Avatar.displayName = "Avatar";

/**
 * Image element rendered inside an Avatar. Hidden until the image loads
 * successfully, falling back to AvatarFallback on error.
 */
const AvatarImage = (props: Readonly<AvatarImageProps>) => {
  const { className, ref, ...rest } = props;
  const imageClassName = classes({ block: "avatar-image", modifiers: {}, className });

  return <RadixAvatar.Image data-slot="avatar-image" className={imageClassName} ref={ref} {...rest} />;
};

AvatarImage.displayName = "AvatarImage";

/**
 * Content rendered when AvatarImage fails to load or is not provided.
 * Typically initials or a placeholder icon.
 */
const AvatarFallback = (props: Readonly<AvatarFallbackProps>) => {
  const { children, className, ref, ...rest } = props;
  const fallbackClassName = classes({ block: "avatar-fallback", modifiers: {}, className });

  return (
    <RadixAvatar.Fallback data-slot="avatar-fallback" className={fallbackClassName} ref={ref} {...rest}>
      {children}
    </RadixAvatar.Fallback>
  );
};

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
