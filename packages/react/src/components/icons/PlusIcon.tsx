"use client";

import type { SVGProps } from "react";

function PlusIcon(props: Readonly<SVGProps<SVGSVGElement>>): React.JSX.Element {
  const { className, ...rest } = props;

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

export { PlusIcon };
