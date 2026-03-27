"use client";

import { type ForwardedRef, forwardRef, type ReactNode } from "react";

import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  type ButtonRenderProps,
  composeRenderProps,
} from "react-aria-components";

import { Spinner } from "../icons";
import { cn } from "../../utils/cn";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  isIconOnly?: boolean;
  className?: string;
  children?: ReactNode | ((renderProps: ButtonRenderProps) => ReactNode);
} & Omit<RACButtonProps, "className" | "children">;

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "success" | "warning" | "danger" | "info";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

function ButtonInner(props: Readonly<ButtonProps>, ref: ForwardedRef<HTMLButtonElement>) {
  const { isIconOnly, radius = "md", size = "md", variant = "primary", children, className, ...rest } = props;

  const buttonClassName = cn(
    "fri-button",
    `fri-button--${variant}`,
    `fri-button--${size}`,
    `fri-button--radius-${radius}`,
    isIconOnly && "fri-button--icon-only",
    rest.isPending && "fri-button--pending",
    className,
  );

  return (
    <RACButton {...rest} ref={ref} className={buttonClassName}>
      {composeRenderProps(children, (child, { isPending }) => (
        <>
          {child}

          {isPending && <Spinner className="fri-button__spinner" aria-hidden="true" />}
        </>
      ))}
    </RACButton>
  );
}

const Button = forwardRef(ButtonInner);

export { Button };
