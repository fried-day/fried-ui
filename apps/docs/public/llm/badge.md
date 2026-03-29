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

| Prop         | Type                                                                                                                                                                                                                                                                                                                                                                           | Default     | Description                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------- |
| `variant`    | `"primary"` \| `"secondary"` \| `"ghost"` \| `"outline"` \| `"success"` \| `"warning"` \| `"danger"` \| `"info"` \| `"primary-soft"` \| `"secondary-soft"` \| `"success-soft"` \| `"warning-soft"` \| `"danger-soft"` \| `"info-soft"` \| `"primary-outline"` \| `"secondary-outline"` \| `"success-outline"` \| `"warning-outline"` \| `"danger-outline"` \| `"info-outline"` | `"primary"` | Visual variant                        |
| `size`       | `"sm"` \| `"md"` \| `"lg"`                                                                                                                                                                                                                                                                                                                                                     | `"md"`      | Size — controls padding, font         |
| `isIconOnly` | `boolean`                                                                                                                                                                                                                                                                                                                                                                      | `false`     | Square badge for icon-only indicators |
| `isShadow`   | `boolean`                                                                                                                                                                                                                                                                                                                                                                      | `false`     | Show colored drop shadow (em-based)   |
| `className`  | `string`                                                                                                                                                                                                                                                                                                                                                                       | -           | Additional CSS classes                |
| `ref`        | `Ref<HTMLSpanElement>`                                                                                                                                                                                                                                                                                                                                                         | -           | Forwarded ref to span element         |
| `children`   | `ReactNode`                                                                                                                                                                                                                                                                                                                                                                    | -           | Badge content                         |

## CSS Classes

| Class                          | Description               |
| ------------------------------ | ------------------------- |
| `fri-badge`                    | Base styles               |
| `fri-badge--primary`           | Primary variant           |
| `fri-badge--secondary`         | Secondary variant         |
| `fri-badge--ghost`             | Ghost variant             |
| `fri-badge--outline`           | Outline variant           |
| `fri-badge--success`           | Success variant           |
| `fri-badge--warning`           | Warning variant           |
| `fri-badge--danger`            | Danger variant            |
| `fri-badge--info`              | Info variant              |
| `fri-badge--primary-soft`      | Primary soft variant      |
| `fri-badge--secondary-soft`    | Secondary soft variant    |
| `fri-badge--success-soft`      | Success soft variant      |
| `fri-badge--warning-soft`      | Warning soft variant      |
| `fri-badge--danger-soft`       | Danger soft variant       |
| `fri-badge--info-soft`         | Info soft variant         |
| `fri-badge--primary-outline`   | Primary outline variant   |
| `fri-badge--secondary-outline` | Secondary outline variant |
| `fri-badge--success-outline`   | Success outline variant   |
| `fri-badge--warning-outline`   | Warning outline variant   |
| `fri-badge--danger-outline`    | Danger outline variant    |
| `fri-badge--info-outline`      | Info outline variant      |
| `fri-badge--size-sm`           | Small size                |
| `fri-badge--size-md`           | Medium size               |
| `fri-badge--size-lg`           | Large size                |
| `fri-badge--icon-only`         | Icon-only square          |
| `fri-badge--shadow`            | Colored drop shadow       |

## CSS Variables

| Variable         | Default        | Description      |
| ---------------- | -------------- | ---------------- |
| `--fri-badge-bg` | `transparent`  | Background color |
| `--fri-badge-fg` | `currentColor` | Text color       |

## Examples

### Solid Variants

```tsx
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

### Soft Variants

Pale background with colored text and border.

```tsx
<Badge variant="primary-soft">Primary</Badge>
<Badge variant="success-soft">Success</Badge>
<Badge variant="danger-soft">Danger</Badge>
```

### Colored Outline Variants

Transparent background with colored border and text.

```tsx
<Badge variant="primary-outline">Primary</Badge>
<Badge variant="success-outline">Success</Badge>
<Badge variant="danger-outline">Danger</Badge>
```

### Shadow

Colored drop shadow that scales with font-size (em-based).

```tsx
<Badge isShadow>Primary</Badge>
<Badge variant="success" isShadow>Success</Badge>
```

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

- 20 variants: 8 solid + 6 soft + 6 colored outline
- 3 sizes: sm, md, lg
- Fixed `rounded-full` border radius (pill shape)
- Non-interactive — no hover, focus, or click states
- BEM classes (`fri-badge`, `fri-badge--primary-soft`, etc.)
- Shadow uses em units — scales with component font-size
