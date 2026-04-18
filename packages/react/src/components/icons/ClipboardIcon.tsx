import type { ComponentPropsWithRef } from "react";

const ClipboardIcon = (props: Readonly<ComponentPropsWithRef<"svg">>) => {
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
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
    </svg>
  );
};

ClipboardIcon.displayName = "ClipboardIcon";

export { ClipboardIcon };
