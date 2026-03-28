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
    src/components/{name}/{Name}.tsx    → "use client", forwardRef, wrap React Aria or plain element
    src/components/{name}/{name}.test.tsx → Vitest + RTL
    src/components/{name}/{name}.stories.tsx → Storybook 10
    src/components/{name}/index.ts      → re-exports
    src/components/icons/{Name}Icon.tsx  → SVG icon components
```

## Component Types

### Interactive (wraps React Aria)

Example: Button, Input, Select, Dialog

```text
1. CSS: .fri-{name} base + variants + hover/active/focus/disabled states
2. React: forwardRef, Omit<RAC{Name}Props, "className" | "children">, composeRenderProps
3. Props: component-specific + inherited from React Aria (onPress, isDisabled, etc.)
4. Data attributes: [data-hovered], [data-pressed], [data-focused], etc.
```

### Display-only (plain HTML element)

Example: Badge, Divider, Skeleton

```text
1. CSS: .fri-{name} base + variants (no hover/active/focus states)
2. React: forwardRef to span/div, explicit props only (no React Aria)
3. Props: variant, size, radius, className, children, ref
4. No data attributes, no event handlers
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

## Data Flow — Interactive Components

```text
props     → destructure (defaults first, then alphabetical)
rest      → forward to React Aria via {...rest}
ref       → forwardRef to React Aria root element
className → cn() compose BEM: base + variant + size + radius + state modifiers + custom
children  → composeRenderProps → expose render props (isHovered, isPressed, etc.)
```

## Data Flow — Display-only Components

```text
props     → destructure (defaults first, then alphabetical)
ref       → forwardRef to plain HTML element (span, div)
className → cn() compose BEM: base + variant + size + radius + custom
children  → pass through directly
```

## Conditional Class Pattern

```tsx
const iconOnlyModifier = isIconOnly ? "fri-button--icon-only" : undefined;
const pendingModifier = rest.isPending ? "fri-button--pending" : undefined;
// ✓ extract to const — lint rule: no-logic-in-params
```

## TypeScript Rules

- **Type members must be sorted alphabetically** (lint: `sort-type-alphabetically`)
- **Inline union types** for IDE autocomplete — not type aliases
- `forwardRef` for all components (interactive and display-only)

```tsx
// ✓ alphabetical order
export type BadgeProps = {
  children?: ReactNode;
  className?: string;
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "outline" | "success" | "warning" | "danger" | "info";
};
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
3. Create component → `packages/react/src/components/{name}/{Name}.tsx` (forwardRef, alphabetical type members)
4. Create test → include ref forwarding test; add render props test only if applicable
5. Create story → read `storybook.md` rules, match component props only
6. Create barrel → `packages/react/src/components/{name}/index.ts`
7. Re-export → `packages/react/src/components/index.ts`
8. Add tsup entry → `packages/react/tsup.config.ts`
9. Add export map → `packages/react/package.json`
10. Create docs → read `docs.md` rules, include ALL required sections, register MdxComponents
11. Build + lint + typecheck + test must pass
12. Audit symmetry with existing components
