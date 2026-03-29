"use client";

import {
  ArrowRightIcon,
  Badge,
  Button,
  GitHubIcon,
  InformationCircleIcon,
  MoreIcon,
  PlusIcon,
  ReactAriaIcon,
  SettingsIcon,
  ShareIcon,
  StorybookIcon,
  Surface,
} from "@fried-ui/react";

import { BadgeLinks } from "./BadgeLinks";

const badgeBadgeLinksData = [
  {
    href: "https://fried-ui-storybook.vercel.app/?path=/story/components-badge--default",
    icon: <StorybookIcon className="size-match-font text-[#ff4785]" />,
    label: "Storybook",
  },
  {
    href: "https://github.com/fried-day/fried-ui/blob/main/packages/react/src/components/badge/Badge.tsx",
    icon: <GitHubIcon className="size-match-font" />,
    label: "Source",
  },
  {
    href: "https://github.com/fried-day/fried-ui/blob/main/packages/styles/src/components/badge.css",
    icon: <GitHubIcon className="size-match-font" />,
    label: "Styles source",
  },
];

const BadgeBadgeLinks = (): React.JSX.Element => {
  return <BadgeLinks links={badgeBadgeLinksData} />;
};

const BadgeDemo = (): React.JSX.Element => {
  return <Badge>New</Badge>;
};

const BadgeVariants = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
};

const BadgeSoftVariants = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge variant="primary-soft">Primary</Badge>
      <Badge variant="secondary-soft">Secondary</Badge>
      <Badge variant="success-soft">Success</Badge>
      <Badge variant="warning-soft">Warning</Badge>
      <Badge variant="danger-soft">Danger</Badge>
      <Badge variant="info-soft">Info</Badge>
    </div>
  );
};

const BadgeOutlineVariants = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge variant="primary-outline">Primary</Badge>
      <Badge variant="secondary-outline">Secondary</Badge>
      <Badge variant="success-outline">Success</Badge>
      <Badge variant="warning-outline">Warning</Badge>
      <Badge variant="danger-outline">Danger</Badge>
      <Badge variant="info-outline">Info</Badge>
    </div>
  );
};

const BadgeShadow = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge isShadow>Primary</Badge>

      <Badge variant="success" isShadow>
        Success
      </Badge>

      <Badge variant="danger" isShadow>
        Danger
      </Badge>
    </div>
  );
};

const BadgeIconOnly = (): React.JSX.Element => {
  return (
    <div className="flex items-end gap-4">
      <Badge size="sm" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>

      <Badge size="md" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>

      <Badge size="lg" aria-label="Info" isIconOnly>
        <InformationCircleIcon slot="icon" />
      </Badge>
    </div>
  );
};

const BadgeSizes = (): React.JSX.Element => {
  return (
    <div className="flex items-end gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
};

const buttonBadgeLinksData = [
  {
    href: "https://fried-ui-storybook.vercel.app/?path=/story/components-button--default",
    icon: <StorybookIcon className="size-match-font text-[#ff4785]" />,
    label: "Storybook",
  },
  {
    href: "https://react-spectrum.adobe.com/react-aria/Button.html",
    icon: <ReactAriaIcon className="size-match-font text-[#6733FF]" />,
    label: "React Aria",
  },
  {
    href: "https://github.com/fried-day/fried-ui/blob/main/packages/react/src/components/button/Button.tsx",
    icon: <GitHubIcon className="size-match-font" />,
    label: "Source",
  },
  {
    href: "https://github.com/fried-day/fried-ui/blob/main/packages/styles/src/components/button.css",
    icon: <GitHubIcon className="size-match-font" />,
    label: "Styles source",
  },
];

const ButtonBadgeLinks = (): React.JSX.Element => {
  return <BadgeLinks links={buttonBadgeLinksData} />;
};

const ButtonDemo = (): React.JSX.Element => {
  return <Button>Click me</Button>;
};

const ButtonVariants = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
    </div>
  );
};

const ButtonSizes = (): React.JSX.Element => {
  return (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
};

const ButtonRadii = (): React.JSX.Element => {
  return (
    <div className="flex items-end gap-4">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="xl">XL</Button>
      <Button radius="full">Full</Button>
    </div>
  );
};

const ButtonIconOnly = (): React.JSX.Element => {
  return (
    <div className="flex items-end gap-4">
      <Button aria-label="Settings" isIconOnly>
        <SettingsIcon className="size-match-font" />
      </Button>

      <Button variant="secondary" aria-label="More" isIconOnly>
        <MoreIcon className="size-match-font" />
      </Button>

      <Button variant="outline" aria-label="Add" isIconOnly>
        <PlusIcon className="size-match-font" />
      </Button>

      <Button variant="ghost" aria-label="Share" isIconOnly>
        <ShareIcon className="size-match-font" />
      </Button>
    </div>
  );
};

const ButtonFullWidth = (): React.JSX.Element => {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Button isFullWidth>Full Width</Button>

      <Button variant="secondary" isFullWidth>
        Full Width Secondary
      </Button>

      <Button variant="outline" isFullWidth>
        Full Width Outline
      </Button>
    </div>
  );
};

const ButtonDisabled = (): React.JSX.Element => {
  return <Button isDisabled>Disabled</Button>;
};

const ButtonPending = (): React.JSX.Element => {
  return <Button isPending>Saving...</Button>;
};

const ButtonCustomClass = (): React.JSX.Element => {
  return <Button className="tracking-wider uppercase">Uppercase</Button>;
};

const ButtonWithIcons = (): React.JSX.Element => {
  return (
    <div className="flex items-end gap-4">
      <Button size="sm">
        <ArrowRightIcon className="size-match-font" />
        Next
      </Button>

      <Button size="md">
        <ArrowRightIcon className="size-match-font" />
        Next
      </Button>

      <Button size="lg">
        <ArrowRightIcon className="size-match-font" />
        Next
      </Button>
    </div>
  );
};

const ButtonAsLink = (): React.JSX.Element => {
  return (
    <a href="https://github.com/fried-day/fried-ui" target="_blank" rel="noopener noreferrer">
      <Button>GitHub</Button>
    </a>
  );
};

const surfaceBadgeLinksData = [
  {
    href: "https://fried-ui-storybook.vercel.app/?path=/story/components-surface--default",
    icon: <StorybookIcon className="size-match-font text-[#ff4785]" />,
    label: "Storybook",
  },
  {
    href: "https://github.com/fried-day/fried-ui/blob/main/packages/react/src/components/surface/Surface.tsx",
    icon: <GitHubIcon className="size-match-font" />,
    label: "Source",
  },
  {
    href: "https://github.com/fried-day/fried-ui/blob/main/packages/styles/src/components/surface.css",
    icon: <GitHubIcon className="size-match-font" />,
    label: "Styles source",
  },
];

const SurfaceBadgeLinks = (): React.JSX.Element => {
  return <BadgeLinks links={surfaceBadgeLinksData} />;
};

const SurfaceDemo = (): React.JSX.Element => {
  return (
    <Surface className="p-6">
      <p className="font-bold">Card Title</p>
      <p className="mt-2 text-sm">Content goes here.</p>
    </Surface>
  );
};

const SurfaceVariants = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <Surface variant="default" className="p-4">
        Default
      </Surface>

      <Surface variant="bordered" className="p-4">
        Bordered
      </Surface>

      <Surface variant="glass" className="p-4">
        Glass
      </Surface>

      <Surface variant="primary" className="p-4">
        Primary
      </Surface>
    </div>
  );
};

const SurfaceRadii = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <Surface radius="none" className="p-4">
        none
      </Surface>

      <Surface radius="sm" className="p-4">
        sm
      </Surface>

      <Surface radius="md" className="p-4">
        md
      </Surface>

      <Surface radius="lg" className="p-4">
        lg
      </Surface>

      <Surface radius="xl" className="p-4">
        xl
      </Surface>

      <Surface radius="full" className="px-6 py-4">
        full
      </Surface>
    </div>
  );
};

const SurfaceShadow = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <Surface className="p-4">No shadow</Surface>

      <Surface className="p-4" isShadow>
        With shadow
      </Surface>
    </div>
  );
};

export {
  BadgeBadgeLinks,
  BadgeDemo,
  BadgeIconOnly,
  BadgeOutlineVariants,
  BadgeShadow,
  BadgeSizes,
  BadgeSoftVariants,
  BadgeVariants,
  ButtonAsLink,
  ButtonBadgeLinks,
  ButtonCustomClass,
  ButtonDemo,
  ButtonDisabled,
  ButtonFullWidth,
  ButtonIconOnly,
  ButtonPending,
  ButtonRadii,
  ButtonSizes,
  ButtonVariants,
  ButtonWithIcons,
  SurfaceBadgeLinks,
  SurfaceDemo,
  SurfaceRadii,
  SurfaceShadow,
  SurfaceVariants,
};
