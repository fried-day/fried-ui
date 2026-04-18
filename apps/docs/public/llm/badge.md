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

| Prop         | Type                                               | Default     | Description                           |
| ------------ | -------------------------------------------------- | ----------- | ------------------------------------- |
| `variant`    | `BadgeVariant` (see Variants)                      | `"primary"` | Visual variant (32 options)           |
| `size`       | `"sm"` \| `"md"` \| `"lg"`                         | `"md"`      | Size — controls padding, font         |
| `radius`     | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"full"` | `"full"`    | Border radius (pill by default)       |
| `isIconOnly` | `boolean`                                          | `false`     | Square badge for icon-only indicators |
| `aria-label` | `string`                                           | -           | Required for icon-only badges         |
| `className`  | `string`                                           | -           | Additional CSS classes                |
| `ref`        | `Ref<HTMLSpanElement>`                             | -           | Forwarded ref to span element         |
| `children`   | `ReactNode`                                        | -           | Badge content                         |

## CSS Classes

| Class                       | Description                               |
| --------------------------- | ----------------------------------------- |
| `fri-badge`                 | Base styles                               |
| `fri-badge--{variant}`      | Variant class (see 32 variants)           |
| `fri-badge--size-{size}`    | Size (`sm` \| `md` \| `lg`)               |
| `fri-badge--radius-{value}` | Radius (`none \| sm \| md \| lg \| full`) |
| `fri-badge--icon-only`      | Icon-only square                          |

## CSS Variables

| Variable         | Default        | Description      |
| ---------------- | -------------- | ---------------- |
| `--fri-badge-bg` | `transparent`  | Background color |
| `--fri-badge-fg` | `currentColor` | Text color       |

## Examples

### Variants

**32 variants** — 11 base + 21 color-prefixed (3 modifiers × 7 colors).

**Base variants:**

```tsx
<Badge variant="primary">Primary</Badge>         {/* dark neutral, main label */}
<Badge variant="secondary">Secondary</Badge>     {/* light neutral, less emphasis */}
<Badge variant="accent">Accent</Badge>           {/* purple, brand highlight */}
<Badge variant="outline">Outlined</Badge>        {/* neutral bordered */}
<Badge variant="glass">Glass</Badge>             {/* frosted + border (on image) */}
<Badge variant="frost">Frost</Badge>             {/* frosted no border (on image) */}
<Badge variant="overlay">Overlay</Badge>         {/* dark scrim (on media) */}
<Badge variant="success">Success</Badge>         {/* green status */}
<Badge variant="warning">Warning</Badge>         {/* yellow status */}
<Badge variant="danger">Danger</Badge>           {/* red status */}
<Badge variant="info">Info</Badge>               {/* blue status */}
```

**Color-prefixed variants** — combine `{color}` with `-soft`, `-flat`, or `-outline`:

```tsx
{/* -soft: pale bg + visible border (status tags) */}
<Badge variant="success-soft">Draft</Badge>
<Badge variant="danger-soft">Rejected</Badge>

{/* -flat: pale bg no border (minimal subtle) */}
<Badge variant="accent-flat">Featured</Badge>

{/* -outline: transparent + colored border (emphasized label) */}
<Badge variant="accent-outline">Pro</Badge>
<Badge variant="danger-outline">Expired</Badge>
```

**Colors:** `primary` `secondary` `accent` `success` `warning` `danger` `info`
**Modifiers:** `-soft` `-flat` `-outline`

**When to use:**

- `primary` — main label (counts, category)
- `accent` — brand feature (new, pro, featured)
- `outline` — subtle label next to primary content
- `success/warning/danger/info` — status indicators
- `{color}-soft` — status tags with border emphasis
- `{color}-flat` — minimal status tags
- `{color}-outline` — emphasized status labels
- `glass/frost/overlay` — badges on images or media

### Icon Only

Square badge for icon-only indicators. Always provide `aria-label`.

```tsx
<Badge isIconOnly aria-label="Info">
  <InformationCircleIcon slot="icon" />
</Badge>
```

### Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

## Anatomy

```txt
┌─ Badge (span) ─────┐
│  [icon]  children   │
└─────────────────────┘
```

## Accessibility

- Badge is a non-interactive `<span>` element
- Use `aria-label` on parent if badge conveys important status
- Color is not the only indicator — always include text content

## Constraints

- 32 variants: 11 base (primary, secondary, accent, outline, glass, frost, overlay, success, warning, danger, info) + 21 color-prefixed (7 colors × 3 modifiers: -soft, -flat, -outline; no -ghost — display-only)
- 3 sizes: sm, md, lg
- 5 radius options: `none`, `sm`, `md`, `lg`, `full` (default `full` — pill shape)
- Non-interactive — no hover, focus, or click states
- BEM classes (`fri-badge`, `fri-badge--primary-soft`, etc.)
- Shadow uses em units — scales with component font-size
