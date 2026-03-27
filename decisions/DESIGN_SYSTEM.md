# fried-ui Design System

Design decisions and audit results for the fried-ui component library.

## Design Principles

### 1. Semantic Intent Over Visual Style

Variant names describe intent, not visuals (no solid, bordered, flat).
Example: `variant="danger"` not `variant="solid" color="red"`

### 2. Single-Axis Variant

One `variant` prop only — no separate color + variant axes.
Simpler for developers (1 prop, 1 decision) and LLMs (no invalid combos).

### 3. Accessibility as Foundation

Every component wraps React Aria Components — ARIA, keyboard, focus, screen reader built-in.

### 4. Progressive Disclosure

```tsx
<Button>Save</Button>
<Button variant="danger" size="lg" isPending>Deleting...</Button>
```

### 5. Separation of Styles and Logic

- `@fried-ui/styles` — pure CSS: tokens, `@utility`, component BEM styles
- `@fried-ui/react` — React components, behavior, accessibility

Multi-framework ready: styles work with Vue, Svelte, vanilla HTML.

### 6. CSS-First, No JavaScript Runtime

- Design tokens in `@theme`
- Component styles in CSS + BEM (`fri-` prefix) + `@apply`
- No tailwind-variants, no JS runtime styling
- Dark mode: `prefers-color-scheme` + `@custom-variant dark`
- `prefers-reduced-motion` automatic

### 7. Golden Ratio Spacing

- x = font-size as base unit, all values derive from φ
- When size changes, x must change too (Proportional Scaling)

### 8. Color State Mathematics

- Hover/Active calculated via palette steps (always darken)
- Semantic tokens use `var()` from Tailwind built-in + custom palette

## Variant System

### Semantic Variants

| Variant     | Intent                     | Use when                                  |
| ----------- | -------------------------- | ----------------------------------------- |
| `primary`   | Main forward action        | Primary action per context (1 per screen) |
| `secondary` | Alternative action         | Secondary/alternative actions             |
| `success`   | Positive / confirmation    | Confirm, approve, success                 |
| `warning`   | Caution / attention        | Warning, requires caution                 |
| `danger`    | Destructive / irreversible | Delete, cancel, irreversible actions      |
| `info`      | Informational              | Neutral informational context             |
| `ghost`     | Low-emphasis / dismissive  | Cancel, skip, tertiary action             |
| `link`      | Inline text-like           | Navigation, inline text action            |

### Sizes

| Size | Use when                  |
| ---- | ------------------------- |
| `sm` | Compact, dense UI         |
| `md` | Default, general purpose  |
| `lg` | Prominent, touch-friendly |
| `xl` | Hero, display-level       |

### Default Values

All components: `variant="primary"`, `size="md"` as defaults.

## Component API Conventions

- `variant` + `size` always optional (have defaults)
- State props use `is-` prefix — `isDisabled`, `isPending` (React Aria)
- Event handlers use `on-` prefix — `onPress` (React Aria)
- `className` for style overrides
