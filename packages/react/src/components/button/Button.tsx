"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button as RacButton, composeRenderProps } from "react-aria-components";
import type { ButtonRenderProps } from "react-aria-components";

import { clsx } from "clsx";

import { Spinner } from "../icons";
import { bem } from "../../utils/bem";

import type { ButtonVariantsProps } from "./button.variants";

export type ButtonProps = ButtonVariantsProps & {
  children?: ReactNode | ((renderProps: ButtonRenderProps) => ReactNode);
  className?: string | ((renderProps: ButtonRenderProps) => string);
} & Omit<ComponentPropsWithRef<typeof RacButton>, "className" | "children">;

const Button = (props: Readonly<ButtonProps>) => {
  const { children, className, isFullWidth, isIconOnly, radius, ref, size, variant, ...rest } = props;

  const baseClassName = bem({
    block: "fri-button",
    modifiers: {
      variant,
      size,
      radius,
      "full-width": isFullWidth,
      "icon-only": isIconOnly,
      disabled: rest.isDisabled,
      pending: rest.isPending,
    },
  });

  const buttonClassName = composeRenderProps(className, (consumerClassName) => clsx(baseClassName, consumerClassName));

  return (
    <RacButton {...rest} data-slot="button" className={buttonClassName} ref={ref}>
      {composeRenderProps(children, (child, { isPending }) => (
        <>
          {child}
          {isPending && <Spinner className="fri-button__spinner" aria-hidden="true" />}
        </>
      ))}
    </RacButton>
  );
};

Button.displayName = "Button";

export { Button };
