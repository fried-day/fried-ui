import type { ReactNode } from "react";

interface PreviewProps {
  children: ReactNode;
}

function Preview(props: Readonly<PreviewProps>): React.JSX.Element {
  const { children } = props;

  return (
    <div className="not-prose flex min-h-40 items-center justify-center rounded-xl border border-border bg-surface p-6">
      {children}
    </div>
  );
}

export { Preview };
