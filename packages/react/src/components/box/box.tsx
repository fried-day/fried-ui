"use client";

import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "../../utils/cn";

export type BoxProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

function Box<T extends ElementType = "div">(props: Readonly<BoxProps<T>>) {
  const { as, children, className, ...rest } = props;
  const Tag = as || "div";
  const mergedClassName = cn(className);

  return (
    <Tag className={mergedClassName} {...rest}>
      {children}
    </Tag>
  );
}

export { Box };
