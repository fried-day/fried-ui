"use client";

import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "src/utils/cn";

export type BoxProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

function Box<T extends ElementType = "div">(props: Readonly<BoxProps<T>>) {
  const { as, children, className, ...rest } = props;
  const Component = (as || "div") as ElementType;
  const mergedClassName = cn(className);

  return (
    <Component className={mergedClassName} {...rest}>
      {children}
    </Component>
  );
}

export { Box };
