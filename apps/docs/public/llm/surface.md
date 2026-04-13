# Surface

Visual layer component for cards, panels, and elevated content areas.

## Install

```bash
pnpm add @fried-ui/react
```

## Import

```tsx
import { Surface } from "@fried-ui/react";
```

## Props

| Prop        | Type                                                    | Default     | Description              |
| ----------- | ------------------------------------------------------- | ----------- | ------------------------ |
| `variant`   | `"default"` \| `"bordered"` \| `"glass"` \| `"primary"` | `"default"` | The visual variant       |
| `radius`    | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"`        | `"md"`      | Border radius            |
| `className` | `string`                                                | -           | Additional CSS classes   |
| `ref`       | `Ref<HTMLDivElement>`                                   | -           | Forwarded ref to the div |
| `children`  | `ReactNode`                                             | -           | Surface content          |

## CSS Classes

| Class                      | Description          |
| -------------------------- | -------------------- |
| `fri-surface`              | Base styles          |
| `fri-surface--default`     | Default variant      |
| `fri-surface--bordered`    | Bordered variant     |
| `fri-surface--glass`       | Glass variant        |
| `fri-surface--primary`     | Primary variant      |
| `fri-surface--radius-none` | No border radius     |
| `fri-surface--radius-sm`   | Small border radius  |
| `fri-surface--radius-md`   | Medium border radius |
| `fri-surface--radius-lg`   | Large border radius  |
| `fri-surface--radius-xl`   | Extra large radius   |

## Examples

### Basic Card

```tsx
<Surface className="p-6">
  <h2>Card Title</h2>
  <p>Content goes here.</p>
</Surface>
```

### Variants

```tsx
<Surface variant="default">Default</Surface>
<Surface variant="bordered">Bordered</Surface>
<Surface variant="glass">Glass</Surface>
<Surface variant="primary">Primary</Surface>
```

### With Shadow

```tsx
<Surface isShadow className="p-6">
  Elevated card
</Surface>
```

### Radius

```tsx
<Surface radius="none">Sharp</Surface>
<Surface radius="lg">Rounded</Surface>
<Surface radius="xl">Max</Surface>
```

### Glass Over Image

```tsx
<div className="relative">
  <img src="background.jpg" alt="" />
  <Surface variant="glass" radius="lg" className="absolute inset-4 p-6">
    Content over image
  </Surface>
</div>
```

## Anatomy

```txt
┌─ Surface (div) ────┐
│  children           │
└─────────────────────┘
```

## Accessibility

- Surface is a non-interactive `<div>` element
- Use semantic elements inside (headings, paragraphs, lists)
- Add `role` and `aria-label` if the surface represents a landmark

## Constraints

- 4 variants: default, bordered, glass, primary
- 5 radius values: none, sm, md, lg, xl
- Non-interactive — no hover, focus, or click states
- Surface provides no padding — use `className="p-6"` etc.
- BEM classes (`fri-surface`, `fri-surface--bordered`, etc.)
