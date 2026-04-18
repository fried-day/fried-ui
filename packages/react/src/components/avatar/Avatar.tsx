"use client";

import type { ComponentPropsWithRef } from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { clsx } from "clsx";

import { bem } from "../../utils/bem";

import type { AvatarVariantsProps } from "./avatar.variants";

export type AvatarProps = Omit<ComponentPropsWithRef<typeof AvatarPrimitive.Root>, "className"> &
  AvatarVariantsProps & {
    className?: string;
  };

export type AvatarImageProps = Omit<ComponentPropsWithRef<typeof AvatarPrimitive.Image>, "className"> & {
  className?: string;
};

export type AvatarFallbackProps = Omit<ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>, "className"> & {
  className?: string;
};

const AvatarImage = (props: Readonly<AvatarImageProps>) => {
  const { className, ref, ...rest } = props;
  const imageClassName = clsx("fri-avatar__image", className);

  return <AvatarPrimitive.Image data-slot="avatar-image" className={imageClassName} ref={ref} {...rest} />;
};

AvatarImage.displayName = "Avatar.Image";

const AvatarFallback = (props: Readonly<AvatarFallbackProps>) => {
  const { children, className, ref, ...rest } = props;
  const fallbackClassName = clsx("fri-avatar__fallback", className);

  return (
    <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={fallbackClassName} ref={ref} {...rest}>
      {children}
    </AvatarPrimitive.Fallback>
  );
};

AvatarFallback.displayName = "Avatar.Fallback";

const Avatar = (props: Readonly<AvatarProps>) => {
  const { children, className, isDisabled, radius, ref, size, ...rest } = props;

  const avatarClassName = clsx(
    bem({
      block: "fri-avatar",
      modifiers: {
        size,
        radius,
        disabled: isDisabled,
      },
    }),
    className,
  );

  return (
    <AvatarPrimitive.Root data-slot="avatar" className={avatarClassName} ref={ref} {...rest}>
      {children}
    </AvatarPrimitive.Root>
  );
};

Avatar.displayName = "Avatar";
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { Avatar };
