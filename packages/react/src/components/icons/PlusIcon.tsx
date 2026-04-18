import type { ComponentPropsWithRef } from "react";

const PlusIcon = (props: Readonly<ComponentPropsWithRef<"svg"> & { slot?: string }>) => {
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
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  );
};

PlusIcon.displayName = "PlusIcon";

export { PlusIcon };
