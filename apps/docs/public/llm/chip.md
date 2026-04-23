# Chip

Display-only label for status indicators, counts, and categories.

## Install

```bash
pnpm add @fried-ui/react
```

## Import

```tsx
import { Chip } from "@fried-ui/react";
```

## Props

| Prop         | Type                                               | Default     | Description                          |
| ------------ | -------------------------------------------------- | ----------- | ------------------------------------ |
| `variant`    | `ChipVariant` (see Variants)                       | `"primary"` | Visual variant (32 options)          |
| `size`       | `"sm"` \| `"md"` \| `"lg"`                         | `"md"`      | Size — controls padding, font        |
| `radius`     | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"full"` | `"full"`    | Border radius (pill by default)      |
| `isIconOnly` | `boolean`                                          | `false`     | Square chip for icon-only indicators |
| `aria-label` | `string`                                           | -           | Required for icon-only chips         |
| `className`  | `string`                                           | -           | Additional CSS classes               |
| `ref`        | `Ref<HTMLSpanElement>`                             | -           | Forwarded ref to span element        |
| `children`   | `ReactNode`                                        | -           | Chip content                         |

## CSS Classes

| Class                      | Description                               |
| -------------------------- | ----------------------------------------- |
| `fri-chip`                 | Base styles                               |
| `fri-chip--{variant}`      | Variant class (see 32 variants)           |
| `fri-chip--size-{size}`    | Size (`sm` \| `md` \| `lg`)               |
| `fri-chip--radius-{value}` | Radius (`none \| sm \| md \| lg \| full`) |
| `fri-chip--icon-only`      | Icon-only square                          |

## CSS Variables

| Variable        | Default        | Description      |
| --------------- | -------------- | ---------------- |
| `--fri-chip-bg` | `transparent`  | Background color |
| `--fri-chip-fg` | `currentColor` | Text color       |

## Examples

### Variants

**32 variants** — 11 base + 21 color-prefixed (3 modifiers × 7 colors).

**Base variants:**

```tsx
<Chip variant="primary">Primary</Chip>         {/* dark neutral, main label */}
<Chip variant="secondary">Secondary</Chip>     {/* light neutral, less emphasis */}
<Chip variant="accent">Accent</Chip>           {/* purple, brand highlight */}
<Chip variant="outline">Outlined</Chip>        {/* neutral bordered */}
<Chip variant="glass">Glass</Chip>             {/* frosted + border (on image) */}
<Chip variant="frost">Frost</Chip>             {/* frosted no border (on image) */}
<Chip variant="overlay">Overlay</Chip>         {/* dark scrim (on media) */}
<Chip variant="success">Success</Chip>         {/* green status */}
<Chip variant="warning">Warning</Chip>         {/* yellow status */}
<Chip variant="danger">Danger</Chip>           {/* red status */}
<Chip variant="info">Info</Chip>               {/* blue status */}
```

**Color-prefixed variants** — combine `{color}` with `-soft`, `-flat`, or `-outline`:

```tsx
{/* -soft: pale bg + visible border (status tags) */}
<Chip variant="success-soft">Draft</Chip>
<Chip variant="danger-soft">Rejected</Chip>

{/* -flat: pale bg no border (minimal subtle) */}
<Chip variant="accent-flat">Featured</Chip>

{/* -outline: transparent + colored border (emphasized label) */}
<Chip variant="accent-outline">Pro</Chip>
<Chip variant="danger-outline">Expired</Chip>
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
- `glass/frost/overlay` — chips on images or media

### Icon Only

Square chip for icon-only indicators. Always provide `aria-label`.

```tsx
<Chip isIconOnly aria-label="Info">
  <InformationCircleIcon slot="icon" />
</Chip>
```

### Sizes

```tsx
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
```

## Anatomy

```txt
┌─ Chip (span) ─────┐
│  [icon]  children   │
└─────────────────────┘
```

## Accessibility

- Chip is a non-interactive `<span>` element
- Use `aria-label` on parent if chip conveys important status
- Color is not the only indicator — always include text content

## Constraints

- 32 variants: 11 base (primary, secondary, accent, outline, glass, frost, overlay, success, warning, danger, info) + 21 color-prefixed (7 colors × 3 modifiers: -soft, -flat, -outline; no -ghost — display-only)
- 3 sizes: sm, md, lg
- 5 radius options: `none`, `sm`, `md`, `lg`, `full` (default `full` — pill shape)
- Non-interactive — no hover, focus, or click states
- BEM classes (`fri-chip`, `fri-chip--primary-soft`, etc.)
- Shadow uses em units — scales with component font-size
