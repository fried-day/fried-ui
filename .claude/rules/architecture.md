---
description: Component architecture, file structure, data flow, and implementation checklist
paths:
  - packages/react/src/**/*.{ts,tsx}
  - packages/styles/src/**/*.css
---

# Architecture

## Layer

```text
@fried-ui/react    ← React 19 components (behavior + accessibility)
@fried-ui/styles   ← Pure CSS: design tokens + component BEM styles
react-aria-components ← Adobe accessibility primitives
tailwindcss v4     ← Styling engine (oklch, @theme, @layer base)
```

## Package Boundary

```text
@fried-ui/styles (no React dependency — multi-framework)
  exports:
    "." → CSS (tokens + component BEM classes)
  files:
    src/tokens/palette.css    → fried-lime brand palette (@theme)
    src/tokens/colors.css     → semantic color tokens (@theme light + @layer base dark)
    src/tokens/layout.css     → radius, shadow, z-index (@theme)
    src/tokens/motion.css     → duration, easing, keyframes (@theme)
    src/tokens/typography.css → heading sizes (@theme)
    src/components/{name}.css → BEM component styles
    src/utilities/            → @utility definitions (focus-ring, status-disabled, etc.)

@fried-ui/react (depends on react-aria)
  exports:
    "." → barrel export (recommended import path for docs/examples)
    "./{name}" → individual component (internal only, not for docs)
    "./utils/cn" → cn utility
  files:
    src/components/{name}/{Name}.tsx    → "use client", forwardRef, wrap React Aria
    src/components/{name}/{name}.test.tsx → Vitest + RTL
    src/components/{name}/{name}.stories.tsx → Storybook 10
    src/components/{name}/index.ts      → re-exports
    src/components/icons/{Name}Icon.tsx  → SVG icon components
```

## Component Anatomy — Button Example

```text
1. packages/styles/src/components/button.css
   → .fri-button (base)
   → .fri-button--primary (variant, uses --fri-button-bg/hover/pressed/fg)
   → .fri-button--sm/md/lg/xl (size, golden ratio spacing)
   → .fri-button--radius-none/sm/md/lg/xl/full
   → .fri-button--icon-only (square, aspect-ratio: 1)
   → .fri-button--pending (text-transparent)
   → .fri-button__spinner (absolute center, animate-spin)

2. packages/react/src/components/button/Button.tsx
   → forwardRef(ButtonInner)
   → props: variant, size, radius, isIconOnly, className, children (ButtonRenderProps)
   → cn() compose BEM class names from props
   → composeRenderProps for isPending spinner
   → Omit<RACButtonProps, "className" | "children">

3. Inline union types for IDE autocomplete:
   variant?: "primary" | "secondary" | "ghost" | "outline" | "success" | "warning" | "danger" | "info"
   size?: "sm" | "md" | "lg" | "xl"
   radius?: "none" | "sm" | "md" | "lg" | "xl" | "full"
```

## BEM Naming (`fri-` prefix)

```text
.fri-{component}                 → base (layout, typography, transition)
.fri-{component}--{modifier}     → modifier (variant, size, state)
.fri-{component}__{element}      → internal element (spinner, icon)
```

## CSS Custom Properties per Component

Each component defines its own CSS variables for variant customization:

```css
.fri-button {
  --fri-button-bg: transparent; /* overridden by variant */
  --fri-button-bg-hover: var(--fri-button-bg);
  --fri-button-bg-pressed: var(--fri-button-bg-hover);
  --fri-button-fg: currentColor;
}
.fri-button--primary {
  --fri-button-bg: var(--color-primary);
  --fri-button-bg-hover: var(--color-primary-hover);
  --fri-button-bg-pressed: var(--color-primary-active);
  --fri-button-fg: var(--color-primary-foreground);
}
```

## Styling Rules

- All visual styles live in CSS (BEM classes) — never inline Tailwind in React components
- Components only use `cn()` to compose BEM class names
- Prefer `@apply` — use plain CSS only when `@apply` cannot handle it (e.g. `border-color: var()`)
- Use `-(--var)` syntax for CSS custom properties in `@apply`: `@apply bg-(--fri-button-bg)`
- Group `@apply` by concern: layout → typography → interaction → transition
- Always include `motion-reduce:transition-none` on transition `@apply`
- React Aria states in CSS: `&[data-pressed]`, `&[data-hovered]`, `&[data-focused]`, `&[data-focus-visible]`, `&[data-disabled]`, `&[data-pending]`
- Hover wrapped in `@media (hover: hover)` for touch devices

## Data Flow

```text
props     → destructure (defaults first, then alphabetical)
rest      → forward to React Aria via {...rest}
ref       → forwardRef to React Aria root element
className → cn() compose BEM: base + variant + size + radius + state modifiers + custom
children  → composeRenderProps → expose ButtonRenderProps (isHovered, isPressed, etc.)
```

## Conditional Class Pattern

```tsx
const iconOnlyModifier = isIconOnly ? "fri-button--icon-only" : undefined;
const pendingModifier = rest.isPending ? "fri-button--pending" : undefined;
// ✓ extract to const — lint rule: no-logic-in-params
```

## JSX Prop Sort Order (lint enforced)

```text
strings → hyphenated strings → numbers/booleans/null → expressions → shorthand booleans
```

Example: `<Button variant="primary" aria-label="Save" isIconOnly>`

## Icons

- All icons in `packages/react/src/components/icons/`
- Pattern: `function {Name}Icon(props: SVGProps)` with `className` destructured
- Exported from barrel: `import { SettingsIcon } from "@fried-ui/react"`
- SVG attributes: `viewBox`, `fill`, `stroke`, `strokeWidth` on `<svg>`
- `opacity` as HTML attribute (not Tailwind class) on SVG paths

## Checklist: New Component

1. Create CSS → `packages/styles/src/components/{name}.css`
2. Import → `packages/styles/src/components/index.css`
3. Create component → `packages/react/src/components/{name}/{Name}.tsx` (forwardRef, inline union types)
4. Create test → include ref forwarding + render props tests
5. Create story → include all prop demos, explicit return types
6. Create barrel → `packages/react/src/components/{name}/index.ts`
7. Re-export → `packages/react/src/components/index.ts`
8. Add tsup entry → `packages/react/tsup.config.ts`
9. Add export map → `packages/react/package.json`
10. Create docs → MDX + LLM + MdxComponents + BadgeLinks + page.tsx registration
11. Build + lint + typecheck + test must pass
12. Audit symmetry with existing components
