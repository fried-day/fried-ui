"use client";

import type { ReactNode } from "react";

import { Button as RACButton, type ButtonProps as RACButtonProps, composeRenderProps } from "react-aria-components";

import { cn } from "src/utils/cn";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode | ((renderProps: { isPending: boolean }) => ReactNode);
} & Omit<RACButtonProps, "className" | "children">;

type ButtonVariant = "primary";
type ButtonSize = "sm" | "md" | "lg";

function Button(props: Readonly<ButtonProps>) {
  const { size = "md", variant = "primary", children, className, ...rest } = props;

  const pendingClass = rest.isPending ? "fri-button--pending" : undefined;
  const buttonClassName = cn("fri-button", `fri-button--${variant}`, `fri-button--${size}`, pendingClass, className);

  return (
    <RACButton {...rest} className={buttonClassName}>
      {composeRenderProps(children, (child, { isPending }) => (
        <>
          {child}

          {isPending && (
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
              </svg>
            </span>
          )}
        </>
      ))}
    </RACButton>
  );
}

export { Button };
