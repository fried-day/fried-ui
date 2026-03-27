"use client";

import type { ReactNode } from "react";

import { Button as RACButton, type ButtonProps as RACButtonProps, composeRenderProps } from "react-aria-components";

import { Spinner } from "../icons";
import { cn } from "../../utils/cn";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  className?: string;
  children?: ReactNode | ((renderProps: { isPending: boolean }) => ReactNode);
} & Omit<RACButtonProps, "className" | "children">;

type ButtonVariant = "primary";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

function Button(props: Readonly<ButtonProps>) {
  const { radius = "md", size = "md", variant = "primary", children, className, ...rest } = props;

  const pendingClass = rest.isPending ? "fri-button--pending" : undefined;

  const buttonClassName = cn(
    "fri-button",
    `fri-button--${variant}`,
    `fri-button--${size}`,
    `fri-button--radius-${radius}`,
    pendingClass,
    className,
  );

  return (
    <RACButton {...rest} className={buttonClassName}>
      {composeRenderProps(children, (child, { isPending }) => (
        <>
          {child}

          {isPending && <Spinner className="fri-button__spinner" aria-hidden="true" />}
        </>
      ))}
    </RACButton>
  );
}

export { Button };
