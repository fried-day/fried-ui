"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Getting Started", href: "/docs/overview/introduction" },
  { label: "Styles", href: "/docs/styles/colors" },
  { label: "Components", href: "/docs/components/button" },
];

interface NavItemProps {
  href: string;
  label: string;
  pathname: string;
}

function NavItem(props: Readonly<NavItemProps>): React.JSX.Element {
  const { href, label, pathname } = props;
  const isActive = pathname.startsWith(href.split("/").slice(0, 4).join("/"));
  const className = `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground"}`;

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

function Navbar(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-6 px-6">
        <Link className="text-lg font-bold text-foreground" href="/docs">
          fried-ui
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavItem href={item.href} label={item.label} pathname={pathname} key={item.label} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            href="https://github.com/fried-day/fried-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            href="https://fried-ui-storybook.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storybook
          </a>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
