---
description: Storybook 10 conventions
paths:
  - packages/react/src/**/*.stories.tsx
---

# Storybook

## Source of Truth

Read `{Name}.tsx` first — argTypes must match actual TypeScript props only.

## Meta

```tsx
const meta = {
  title: "Components/{Name}",
  component: {Name},
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "{Name}", variant: "primary", size: "md" },
  argTypes: { /* from component props */ },
} satisfies Meta<typeof {Name}>;
```

No `docs.description` — removed.

## argTypes

- `control: "select"` for union string props
- `control: "boolean"` for boolean props
- `control: "text"` for string props
- `control: false` for event handlers
- Category order: **Children → Style Variants → State → Events → Styling**

## Stories

Every story MUST have `parameters.docs.source.code` with full example (import + arrow function):

```tsx
const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { {Name} } from "@fried-ui/react";

const Basic = () => {
  return <{Name}>Content</{Name}>;
};`,
      },
    },
  },
};
```

Render stories use `(args)` parameter + `{...args}` spread:

```tsx
render: (args): React.JSX.Element => (
  <div className="flex flex-wrap items-end gap-4">
    <{Name} {...args} variant="primary">Primary</{Name}>
  </div>
),
```

## Required Stories

Minimum: Default, Variants, Sizes.

Add per component: WithIcon, IconOnly, FullWidth, Disabled, Pending, RenderProps.

## Icon Examples

Show both options in source.code:

```tsx
// Option 1: slot="icon" (recommended)
<SettingsIcon slot="icon" />

// Option 2: className
<SettingsIcon className="size-match-font" />
```

## Lint

- Render: `(args): React.JSX.Element =>`
- Multi-line siblings: empty line between
- Single-line siblings: NO empty line
- Prop order: strings → hyphenated → expressions → shorthand booleans
- Named exports BEFORE `export default meta`

## Containers

- Side-by-side: `<div className="flex items-end gap-4">`
- Wrap: `<div className="flex flex-wrap items-end gap-4">`
