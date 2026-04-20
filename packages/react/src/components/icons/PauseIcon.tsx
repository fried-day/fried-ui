import type { ComponentPropsWithRef } from "react";

const PauseIcon = (props: Readonly<ComponentPropsWithRef<"svg"> & { slot?: string }>) => {
  const { className, ref, ...rest } = props;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      ref={ref}
      {...rest}
    >
      <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
      <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
    </svg>
  );
};

PauseIcon.displayName = "PauseIcon";

export { PauseIcon };
