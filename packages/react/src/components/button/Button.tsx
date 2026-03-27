"use client";

import type { ReactNode } from "react";

import { Button as RACButton, type ButtonProps as RACButtonProps, composeRenderProps } from "react-aria-components";

import { Spinner } from "src/components/icons";
import { cn } from "src/utils/cn";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode | ((renderProps: { isPending: boolean }) => ReactNode);
} & Omit<RACButtonProps, "className" | "children">;

type ButtonVariant = "primary";
type ButtonSize = "sm" | "md" | "lg" | "xl";

function Button(props: Readonly<ButtonProps>) {
  const { size = "md", variant = "primary", children, className, ...rest } = props;

  const pendingClass = rest.isPending ? "fri-button--pending" : undefined;
  const buttonClassName = cn("fri-button", `fri-button--${variant}`, `fri-button--${size}`, pendingClass, className);

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
