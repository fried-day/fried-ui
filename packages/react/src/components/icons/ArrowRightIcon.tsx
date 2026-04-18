import type { ComponentPropsWithRef } from "react";

const ArrowRightIcon = (props: Readonly<ComponentPropsWithRef<"svg"> & { slot?: string }>) => {
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
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
  );
};

ArrowRightIcon.displayName = "ArrowRightIcon";

export { ArrowRightIcon };
