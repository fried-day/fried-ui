"use client";

import { Button } from "@fried-ui/react/button";

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
        <svg className="size-match-font" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Next
      </Button>

      <Button size="md">
        <svg className="size-match-font" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Next
      </Button>

      <Button size="lg">
        <svg className="size-match-font" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
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
  ButtonCustomClass,
  ButtonDemo,
  ButtonDisabled,
  ButtonPending,
  ButtonRadii,
  ButtonSizes,
  ButtonVariants,
  ButtonWithIcons,
};
