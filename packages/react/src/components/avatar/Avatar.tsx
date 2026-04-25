"use client";

import type { ComponentPropsWithRef } from "react";

import * as RadixAvatar from "@radix-ui/react-avatar";

import { classes } from "../../utils/classes";

export interface AvatarProps extends ComponentPropsWithRef<typeof RadixAvatar.Root> {
  /** Whether the avatar shows a 2px ring matching the background — separates the avatar visually when placed over a photo or colored background. @default false */
  isBordered?: boolean;
  /** Whether the avatar is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Border radius scale. @default 'full' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Colored ring around the avatar. @default undefined */
  ring?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info";
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * An avatar represents a user or entity with an image, initials, or icon.
 * Compose with standalone `AvatarImage` and `AvatarFallback` for image + fallback handling.
 */
const Avatar = (props: Readonly<AvatarProps>) => {
  const { children, className, isBordered, isDisabled, radius, ref, ring, size, ...rest } = props;

  const avatarClassName = classes({
    block: "avatar",
    modifiers: {
      size,
      radius,
      ring,
      bordered: isBordered,
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

export type AvatarImageProps = ComponentPropsWithRef<typeof RadixAvatar.Image>;

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

export interface AvatarFallbackProps extends ComponentPropsWithRef<typeof RadixAvatar.Fallback> {
  /** Background color for the fallback initials or icon — useful for differentiating users in chat or member lists. @default 'primary' */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info";
}

/**
 * Content rendered when AvatarImage fails to load or is not provided.
 * Typically initials or a placeholder icon.
 */
const AvatarFallback = (props: Readonly<AvatarFallbackProps>) => {
  const { children, className, ref, variant, ...rest } = props;

  const fallbackClassName = classes({
    block: "avatar-fallback",
    modifiers: { variant },
    className,
  });

  return (
    <RadixAvatar.Fallback data-slot="avatar-fallback" className={fallbackClassName} ref={ref} {...rest}>
      {children}
    </RadixAvatar.Fallback>
  );
};

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
