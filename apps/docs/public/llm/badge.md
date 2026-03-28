# Badge

Display-only label for status indicators, counts, and categories.

## Install

```bash
pnpm add @fried-ui/react
```

## Import

```tsx
import { Badge } from "@fried-ui/react";
```

## Props

| Prop        | Type                                                                                               | Default     | Description                   |
| ----------- | -------------------------------------------------------------------------------------------------- | ----------- | ----------------------------- |
| `variant`   | `"primary" \| "secondary" \| "ghost" \| "outline" \| "success" \| "warning" \| "danger" \| "info"` | `"primary"` | Visual variant                |
| `size`      | `"sm" \| "md" \| "lg"`                                                                             | `"md"`      | Size — controls padding, font |
| `className` | `string`                                                                                           | -           | Additional CSS classes        |
| `ref`       | `Ref<HTMLSpanElement>`                                                                             | -           | Forwarded ref to span element |
| `children`  | `ReactNode`                                                                                        | -           | Badge content                 |

## CSS Classes

| Class                  | Description       |
| ---------------------- | ----------------- |
| `fri-badge`            | Base styles       |
| `fri-badge--primary`   | Primary variant   |
| `fri-badge--secondary` | Secondary variant |
| `fri-badge--ghost`     | Ghost variant     |
| `fri-badge--outline`   | Outline variant   |
| `fri-badge--success`   | Success variant   |
| `fri-badge--warning`   | Warning variant   |
| `fri-badge--danger`    | Danger variant    |
| `fri-badge--info`      | Info variant      |
| `fri-badge--sm`        | Small size        |
| `fri-badge--md`        | Medium size       |
| `fri-badge--lg`        | Large size        |

## CSS Variables

| Variable         | Default        | Description      |
| ---------------- | -------------- | ---------------- |
| `--fri-badge-bg` | `transparent`  | Background color |
| `--fri-badge-fg` | `currentColor` | Text color       |

## Examples

### Variants

Semantic and structural variants for different intents.

```tsx
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

### Basic

Default badge with medium size and pill shape.

```tsx
<Badge>New</Badge>
```

### Sizes

Three sizes for different contexts.

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Custom Class

Use `className` for layout or typography utilities.

```tsx
<Badge className="tracking-wider uppercase">VIP</Badge>
```

### Ref Forwarding

Supports ref forwarding for integration with Tooltip, Popover, etc.

```tsx
const ref = useRef<HTMLSpanElement>(null);
<Badge ref={ref}>Status</Badge>;
```

## Anatomy

```
┌─ Badge (span) ─────┐
│  children           │
└─────────────────────┘
```

## Accessibility

- Badge is a non-interactive `<span>` element
- Use `aria-label` on parent if badge conveys important status
- Color is not the only indicator — always include text content

## Constraints

- 8 variants: primary, secondary, ghost, outline, success, warning, danger, info
- 3 sizes: sm, md, lg (no xl — badges should stay compact)
- Fixed `rounded-full` border radius (pill shape)
- Non-interactive — no hover, focus, or click states
- Uses BEM classes (`fri-badge`, `fri-badge--primary`, etc.)
