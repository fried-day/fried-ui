"use client";

import type { SVGProps } from "react";

function ArrowRightIcon(props: Readonly<SVGProps<SVGSVGElement>>): React.JSX.Element {
  const { className, ...rest } = props;

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...rest}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export { ArrowRightIcon };
