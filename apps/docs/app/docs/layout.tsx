import type { ReactNode } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { source } from "@/lib/source";

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: Readonly<LayoutProps>): React.JSX.Element {
  const { children } = props;

  return <DocsLayout tree={source.pageTree}>{children}</DocsLayout>;
}

export default Layout;
