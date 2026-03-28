---
description: Storybook 10 story conventions, meta structure, argTypes, and required stories
paths:
  - packages/react/src/**/*.stories.tsx
---

# Storybook

## Source of Truth

**argTypes and stories must match the component's actual TypeScript props — read the source file first.**

Do not copy argTypes from another component. Read `{Name}.tsx`, extract every prop, then create argTypes for each.

## Meta Structure

```tsx
const meta = {
  title: "Components/{Name}",
  component: {Name},
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "One-line description of the component.",
      },
    },
  },
  args: {
    children: "{Name}",
    // set defaults that match TypeScript defaults
  },
  argTypes: { /* derived from component props — see below */ },
} satisfies Meta<typeof {Name}>;
```

## argTypes — Derived from Props

Read the component's TypeScript type and create argTypes for each prop:

- `control: "select"` for union string props (variant, size, radius)
- `control: "boolean"` for boolean props (isDisabled, isPending, isIconOnly, etc.)
- `control: "text"` for string props (className, children as text)
- `control: false` for event handlers (onPress, etc.)

### Category Order

**Children → Style Variants → State → Events → Styling**

### Table Format

```tsx
{propName}: {
  control: "select" | "boolean" | "text" | false,
  description: "What this prop does",
  table: {
    type: { summary: "type string" },
    defaultValue: { summary: "default value" },  // omit if no default
    category: "Children" | "Style Variants" | "State" | "Events" | "Styling",
  },
},
```

## Required Stories

Minimum for all components:

```tsx
const Default: Story = {};           // empty args, uses meta defaults
const Variants: Story = { ... };     // all variants side by side
const Sizes: Story = { ... };        // all sizes side by side
const Radii: Story = { ... };        // all radii side by side
```

Add more stories as needed per component's props:

- `IconOnly` — if component has `isIconOnly` prop
- `FullWidth` — if component has `isFullWidth` prop
- `Disabled` — if component has `isDisabled` prop
- `Pending` — if component has `isPending` prop
- `RenderProps` — if component exposes render props via children function

## Lint Rules (must follow)

- ALL render functions need explicit return type: `(): React.JSX.Element =>`
- ALL arrow functions inside JSX need return type: `({ isHovered }): string =>`
- JSX prop sort order: strings → hyphenated → expressions → **shorthand booleans last**
  - ✓ `<Button variant="primary" aria-label="Save" isIconOnly>`
  - ✗ `<Button isIconOnly variant="primary" aria-label="Save">`
- **Multi-line** sibling JSX elements → empty line between them (lint: `jsx-newline-between-elements`)
- **Single-line** sibling JSX elements → NO empty line between them (lint: `jsx-no-newline-single-line-elements`)
- Named exports BEFORE `export default meta`

## Render Pattern

- Side-by-side: `<div className="flex items-end gap-4">`
- Wrap variant: `<div className="flex flex-wrap items-end gap-4">` (for many items)
- Icons use imported icon components from `@fried-ui/react` — NO inline SVGs
- Variant order in render MUST match TypeScript type order

## Storybook URL

Production: `https://fried-ui-storybook.vercel.app/?path=/story/components-{name}--default`
