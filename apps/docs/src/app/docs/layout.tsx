import type { ReactNode } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { source } from "@/lib/source";

interface LayoutProps {
  children: ReactNode;
}

const navConfig = { enabled: false };

function Layout(props: Readonly<LayoutProps>): React.JSX.Element {
  const { children } = props;

  return (
    <DocsLayout tree={source.pageTree} nav={navConfig}>
      {children}
    </DocsLayout>
  );
}

export default Layout;
