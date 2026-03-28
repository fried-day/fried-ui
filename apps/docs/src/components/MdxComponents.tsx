"use client";

import {
  ArrowRightIcon,
  Button,
  GitHubIcon,
  MoreIcon,
  PlusIcon,
  ReactAriaIcon,
  SettingsIcon,
  ShareIcon,
  StorybookIcon,
} from "@fried-ui/react";

function ButtonBadgeLinks(): React.JSX.Element {
  return (
    <div className="not-prose mb-6 flex flex-wrap gap-2">
      <a
        href="https://storybook.fried-ui.com/?path=/docs/components-button--docs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm">
          <StorybookIcon className="size-match-font text-[#ff4785]" />
          Storybook
        </Button>
      </a>

      <a href="https://react-spectrum.adobe.com/react-aria/Button.html" target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm">
          <ReactAriaIcon className="size-match-font text-[#6733FF]" />
          React Aria
        </Button>
      </a>

      <a
        href="https://github.com/fried-day/fried-ui/blob/main/packages/react/src/components/button/Button.tsx"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm">
          <GitHubIcon className="size-match-font" />
          Source
        </Button>
      </a>

      <a
        href="https://github.com/fried-day/fried-ui/blob/main/packages/styles/src/components/button.css"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm">
          <GitHubIcon className="size-match-font" />
          Styles source
        </Button>
      </a>
    </div>
  );
}

function ButtonDemo(): React.JSX.Element {
  return <Button>Click me</Button>;
}

function ButtonVariants(): React.JSX.Element {
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
}

function ButtonSizes(): React.JSX.Element {
  return (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
}

function ButtonRadii(): React.JSX.Element {
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
}

function ButtonIconOnly(): React.JSX.Element {
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
}

function ButtonDisabled(): React.JSX.Element {
  return <Button isDisabled>Disabled</Button>;
}

function ButtonPending(): React.JSX.Element {
  return <Button isPending>Saving...</Button>;
}

function ButtonCustomClass(): React.JSX.Element {
  return <Button className="tracking-wider uppercase">Uppercase</Button>;
}

function ButtonWithIcons(): React.JSX.Element {
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
}

function ButtonAsLink(): React.JSX.Element {
  return (
    <a href="https://github.com/fried-day/fried-ui" target="_blank" rel="noopener noreferrer">
      <Button>GitHub</Button>
    </a>
  );
}

export {
  ButtonAsLink,
  ButtonBadgeLinks,
  ButtonCustomClass,
  ButtonDemo,
  ButtonDisabled,
  ButtonIconOnly,
  ButtonPending,
  ButtonRadii,
  ButtonSizes,
  ButtonVariants,
  ButtonWithIcons,
};
