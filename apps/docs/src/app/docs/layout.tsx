import type { ReactNode } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/notebook";

import { source } from "@/lib/source";

interface LayoutProps {
  children: ReactNode;
}

const navConfig = {
  title: "fried-ui",
  url: "/docs",
};

const linksConfig = [
  {
    text: "Storybook",
    url: "https://fried-ui-storybook.vercel.app",
    external: true,
  },
  {
    text: "GitHub",
    url: "https://github.com/fried-day/fried-ui",
    external: true,
  },
];

const sidebarConfig = {
  collapsible: false,
  defaultOpenLevel: 0,
};

const containerConfig = { className: "max-w-none" };

function Layout(props: Readonly<LayoutProps>): React.JSX.Element {
  const { children } = props;

  return (
    <DocsLayout
      tree={source.pageTree}
      nav={navConfig}
      links={linksConfig}
      sidebar={sidebarConfig}
      containerProps={containerConfig}
    >
      {children}
    </DocsLayout>
  );
}

export default Layout;
