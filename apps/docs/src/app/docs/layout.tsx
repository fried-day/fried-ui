import type { ReactNode } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/notebook";

import { GitHubIcon } from "@fried-ui/react";

import { source } from "@/lib/source";

interface LayoutProps {
  children: ReactNode;
}

const navConfig = {
  title: "Fried UI",
  url: "/docs",
};

const githubIcon = <GitHubIcon className="size-5" />;

const linksConfig = [
  {
    icon: githubIcon,
    text: "GitHub",
    url: "https://github.com/fried-day/fried-ui",
    external: true,
  },
];

const sidebarConfig = {
  collapsible: false,
  defaultOpenLevel: 0,
};

function Layout(props: Readonly<LayoutProps>): React.JSX.Element {
  const { children } = props;

  return (
    <DocsLayout links={linksConfig} nav={navConfig} sidebar={sidebarConfig} tree={source.pageTree}>
      {children}
    </DocsLayout>
  );
}

export default Layout;
