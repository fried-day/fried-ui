"use client";

import type { SVGProps } from "react";

function CopyIcon(props: Readonly<SVGProps<SVGSVGElement>>): React.JSX.Element {
  const { className, ...rest } = props;

  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...rest}>
      <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

export { CopyIcon };
