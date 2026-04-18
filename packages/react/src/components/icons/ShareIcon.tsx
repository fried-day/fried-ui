import type { ComponentPropsWithRef } from "react";

const ShareIcon = (props: Readonly<ComponentPropsWithRef<"svg"> & { slot?: string }>) => {
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
      <path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M8.7 10.7l6.6 -3.4" />
      <path d="M8.7 13.3l6.6 3.4" />
    </svg>
  );
};

ShareIcon.displayName = "ShareIcon";

export { ShareIcon };
