"use client";

import type { SVGProps } from "react";

function Spinner(props: Readonly<SVGProps<SVGSVGElement>>) {
  const { className, ...rest } = props;

  return (
    <svg fill="none" viewBox="0 0 24 24" className={className} {...rest}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
    </svg>
  );
}

export { Spinner };
