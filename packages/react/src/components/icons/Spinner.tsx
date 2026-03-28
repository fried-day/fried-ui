"use client";

import type { ComponentPropsWithRef } from "react";

const Spinner = (props: Readonly<ComponentPropsWithRef<"svg">>) => {
  const { className, ref, ...rest } = props;

  return (
    <svg fill="none" viewBox="0 0 24 24" className={className} ref={ref} {...rest}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" opacity="0.75" />
    </svg>
  );
};

Spinner.displayName = "Spinner";

export { Spinner };
