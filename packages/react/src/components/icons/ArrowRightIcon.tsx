"use client";

import type { ComponentPropsWithRef } from "react";

const ArrowRightIcon = (props: Readonly<ComponentPropsWithRef<"svg">>) => {
  const { className, ref, ...rest } = props;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      ref={ref}
      {...rest}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
};

ArrowRightIcon.displayName = "ArrowRightIcon";

export { ArrowRightIcon };
