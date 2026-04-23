import type { ComponentPropsWithRef } from "react";

const XIcon = (props: Readonly<ComponentPropsWithRef<"svg"> & { slot?: string }>) => {
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
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

XIcon.displayName = "XIcon";

export { XIcon };
