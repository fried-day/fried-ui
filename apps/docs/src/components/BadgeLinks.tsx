"use client";

import type { ReactNode } from "react";

import { Button } from "@fried-ui/react";

interface BadgeLinksProps {
  links: BadgeLinkProps[];
}

export interface BadgeLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const BadgeLinks = (props: Readonly<BadgeLinksProps>): React.JSX.Element => {
  const { links } = props;

  return (
    <div className="not-prose mb-6 flex flex-wrap gap-2">
      {links.map((link) => (
        <a target="_blank" rel="noopener noreferrer" href={link.href} key={link.label}>
          <Button variant="secondary" size="sm">
            {link.icon}
            {link.label}
          </Button>
        </a>
      ))}
    </div>
  );
};

export { BadgeLinks };
