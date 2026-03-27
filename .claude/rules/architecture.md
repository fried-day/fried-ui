---
description: Component architecture, file structure, data flow, and implementation checklist
paths:
  - packages/react/src/**/*.{ts,tsx}
  - packages/styles/src/**/*.css
---

# Architecture

## Layer

```text
@fried-ui/react    ← React components (behavior + accessibility)
@fried-ui/styles   ← Pure CSS: design tokens + component styles (BEM)
react-aria-components ← Accessibility primitives
tailwindcss v4     ← Styling engine
```

## Package Boundary

```text
@fried-ui/styles (no React dependency — multi-framework)
  exports:
    "." → CSS (tokens + component BEM classes)

@fried-ui/react (depends on react-aria)
  exports:
    "."          → barrel export (recommended import path)
    "./{name}"   → individual component (internal, not for docs/examples)
    "./utils/cn" → cn utility
```

## Component Anatomy

1. **Design Tokens** → `packages/styles/src/tokens/` — `@theme` block
2. **Component Styles** → `packages/styles/src/components/{name}.css` — BEM + `@apply` + CSS custom properties
3. **React Component** → `packages/react/src/components/{name}/` — wrap React Aria

## File Structure

```text
{Name}.tsx           # "use client", forwardRef, wrap React Aria
{name}.test.tsx      # Vitest + RTL
{name}.stories.tsx   # Storybook
index.ts             # re-exports
```

## BEM Naming (`fri-` prefix)

```text
.fri-{component}                 → base
.fri-{component}--{modifier}     → modifier (variant, size, state, etc.)
.fri-{component}__{element}      → internal element
```

## Styling Rules

- All visual styles live in CSS (BEM classes), never inline Tailwind in components
- Components only use `cn()` to compose BEM class names
- Prefer `@apply` — use plain CSS only when `@apply` cannot handle it
- Use `-(--var)` syntax for CSS custom properties in `@apply`
- Group `@apply` by concern: layout → typography → interaction → transition
- Always include `motion-reduce:transition-none` on transition `@apply`
- React Aria states in CSS: `&[data-pressed]`, `&[data-hovered]`, `&[data-focused]`

## Data Flow

```text
props → destructure (defaults first, then alphabetical)
rest  → forward to React Aria
ref   → forwardRef to React Aria root element
className → cn() compose BEM class names from props
children  → composeRenderProps → wrap with internal UI (expose ButtonRenderProps)
```

## Checklist: New Component

1. Create CSS → `packages/styles/src/components/{name}.css`
2. Import → `packages/styles/src/components/index.css`
3. Create component → `packages/react/src/components/{name}/`
4. Re-export → `packages/react/src/components/index.ts`
5. Add tsup entry → `packages/react/tsup.config.ts`
6. Add export map → `packages/react/package.json`
7. Build + lint + test must pass
