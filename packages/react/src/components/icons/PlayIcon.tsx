import type { ComponentPropsWithRef } from "react";

const PlayIcon = (props: Readonly<ComponentPropsWithRef<"svg"> & { slot?: string }>) => {
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
      <path d="M7 4v16l13 -8z" />
    </svg>
  );
};

PlayIcon.displayName = "PlayIcon";

export { PlayIcon };
