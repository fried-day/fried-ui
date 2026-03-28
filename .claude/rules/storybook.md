---
description: Storybook 10 story conventions, meta structure, argTypes, and required stories
paths:
  - packages/react/src/**/*.stories.tsx
---

# Storybook

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
        component: "Accessible {name} built on [React Aria {Name}](https://react-spectrum.adobe.com/react-aria/{Name}.html).",
      },
    },
  },
  args: {
    children: "{Name}",
    variant: "primary",
    size: "md",
    radius: "md",
  },
  argTypes: { /* see below */ },
} satisfies Meta<typeof {Name}>;
```

## argTypes Categories (in order)

```tsx
argTypes: {
  children: {
    control: "text",
    table: { type: { summary: "ReactNode" }, category: "Children" },
  },
  variant: {
    control: "select",
    options: ["primary", "secondary", "ghost", "outline", "success", "warning", "danger", "info"],
    table: {
      type: { summary: '"primary" | "secondary" | ...' },
      defaultValue: { summary: "primary" },
      category: "Style Variants",
    },
  },
  size: {
    control: "select",
    options: ["sm", "md", "lg", "xl"],
    table: { type: { summary: '"sm" | "md" | "lg" | "xl"' }, defaultValue: { summary: "md" }, category: "Style Variants" },
  },
  radius: {
    control: "select",
    options: ["none", "sm", "md", "lg", "xl", "full"],
    table: { type: { summary: '...' }, defaultValue: { summary: "md" }, category: "Style Variants" },
  },
  isIconOnly: {
    control: "boolean",
    table: { type: { summary: "boolean" }, defaultValue: { summary: "false" }, category: "Style Variants" },
  },
  isDisabled: {
    control: "boolean",
    table: { type: { summary: "boolean" }, defaultValue: { summary: "false" }, category: "State" },
  },
  isPending: {
    control: "boolean",
    table: { type: { summary: "boolean" }, defaultValue: { summary: "false" }, category: "State" },
  },
  onPress: {
    control: false,
    table: { type: { summary: "(e: PressEvent) => void" }, category: "Events" },
  },
  className: {
    control: "text",
    table: { type: { summary: "string" }, category: "Styling" },
  },
}
```

Category order: **Children → Style Variants → State → Events → Styling**

## Required Stories (Button example)

```tsx
type Story = StoryObj<typeof meta>;

const Default: Story = {};                    // empty args, uses meta defaults

const Variants: Story = {                     // all variants side by side
  render: (): React.JSX.Element => ( ... ),
};

const Sizes: Story = { ... };                 // all sizes side by side
const Radii: Story = { ... };                 // all radii side by side
const IconOnly: Story = { ... };              // icon-only buttons, different variants

const Disabled: Story = {                     // state: disabled
  args: { children: "Disabled", isDisabled: true },
};

const Pending: Story = {                      // state: pending
  args: { children: "Saving...", isPending: true },
};

const RenderProps: Story = {                  // children function pattern
  render: (): React.JSX.Element => (
    <Button>{({ isHovered }): string => (isHovered ? "Hovering!" : "Hover me")}</Button>
  ),
};

export { Default, Variants, Sizes, Radii, IconOnly, Disabled, Pending, RenderProps };
export default meta;
```

## Lint Rules (must follow)

- ALL render functions need explicit return type: `(): React.JSX.Element =>`
- ALL arrow functions inside JSX need return type: `({ isHovered }): string =>`
- JSX prop sort order: strings → hyphenated → expressions → **shorthand booleans last**
  - ✓ `<Button variant="primary" aria-label="Save" isIconOnly>`
  - ✗ `<Button isIconOnly variant="primary" aria-label="Save">`
- Empty line between sibling JSX elements
- Named exports BEFORE `export default meta`

## Render Pattern

- Side-by-side: `<div className="flex items-end gap-4">`
- Wrap variant: `<div className="flex flex-wrap items-end gap-4">` (for many items)
- Icons use imported icon components from `@fried-ui/react` — NO inline SVGs
- Variant order in render MUST match TypeScript type order

## Storybook URL

Production: `https://fried-ui-storybook.vercel.app/?path=/story/components-{name}--default`
