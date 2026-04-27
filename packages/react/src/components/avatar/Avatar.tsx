"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import * as RadixAvatar from "@radix-ui/react-avatar";

import { classes } from "../../utils/classes";

export interface AvatarProps extends Omit<ComponentPropsWithRef<typeof RadixAvatar.Root>, "children" | "className"> {
  /** Avatar content — compose with `<AvatarImage />` and `<AvatarFallback />`. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
  /** Whether the avatar shows a 2px ring matching the background. @default false */
  isBordered?: boolean;
  /** Whether the avatar is disabled. @default false */
  isDisabled?: boolean;
  /** Border radius scale. @default 'full' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Colored ring around the avatar. @default undefined */
  ring?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info";
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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

export interface AvatarImageProps extends Omit<ComponentPropsWithRef<typeof RadixAvatar.Image>, "className"> {
  /** Additional CSS classes appended after the base class. */
  className?: string;
}

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

export interface AvatarFallbackProps extends Omit<
  ComponentPropsWithRef<typeof RadixAvatar.Fallback>,
  "children" | "className"
> {
  /** Fallback content — initials, icon, or any ReactNode shown when the image fails or is absent. */
  children?: ReactNode;
  /** Additional CSS classes appended after the base class. */
  className?: string;
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
