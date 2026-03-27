---
description: Storybook story conventions and patterns
paths:
  - packages/react/src/**/*.stories.tsx
---

# Storybook

## Meta Structure

- Use `satisfies Meta<typeof Component>`
- Always include `tags: ["autodocs"]`
- Always include `parameters.layout: "centered"`
- Include `docs.description.component` with link to React Aria docs
- Set `args` with all defaults
- Set `argTypes` with controls grouped by category

## argTypes Categories (in order)

- **Children** — content props
- **Style Variants** — visual props (variant, size, radius, etc.)
- **State** — boolean state props (isDisabled, isPending, etc.)
- **Events** — event handlers (onPress, etc.)
- **Styling** — className

## Required Stories

1. `Default` — empty args, uses meta defaults
2. One story per prop group — render function showing all options side by side
3. State stories — one per state prop

## Naming

- `type Story = StoryObj<typeof meta>`
- Story names: PascalCase
- Named exports before `export default meta`

## Render Pattern

- Use `flex items-end gap-4` for side-by-side comparisons
- Read existing stories as reference pattern
