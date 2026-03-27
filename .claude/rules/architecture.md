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
    "."          → barrel export
    "./{name}"   → individual component
    "./utils/cn" → cn utility
```

## Component Anatomy

1. **Design Tokens** → `packages/styles/src/tokens/` — `@theme` block
2. **Component Styles** → `packages/styles/src/components/{name}.css` — BEM + `@apply` + CSS custom properties
3. **React Component** → `packages/react/src/components/{name}/` — wrap React Aria

## File Structure

```text
{Name}.tsx           # "use client", wrap React Aria
{name}.test.tsx      # Vitest + RTL
{name}.stories.tsx   # Storybook
index.ts             # re-exports
```

## BEM Naming (`fri-` prefix)

```text
.fri-{component}              → base
.fri-{component}--{variant}   → variant modifier
.fri-{component}--{size}      → size modifier
.fri-{component}--{state}     → state modifier
.fri-{component}__{element}   → internal element
```

## Styling Rules

- All visual styles live in CSS (BEM classes), never inline Tailwind in components
- Components only use `cn()` to compose BEM class names
- CSS uses `@apply` for Tailwind utilities + `var()` for dynamic values
- React Aria states in CSS: `&[data-pressed]`, `&[data-hovered]`, `&[data-focused]`

## Data Flow

```text
props → destructure { variant, size, className, children, ...rest }
rest  → forward to React Aria
className → cn("fri-{name}", "fri-{name}--{variant}", "fri-{name}--{size}", cls)
children  → composeRenderProps → wrap with internal UI
```

## Checklist: New Component

1. Create CSS → `packages/styles/src/components/{name}.css`
2. Import → `packages/styles/src/components/index.css`
3. Create component → `packages/react/src/components/{name}/`
4. Re-export → `packages/react/src/components/index.ts`
5. Add tsup entry → `packages/react/tsup.config.ts`
6. Add export map → `packages/react/package.json`
7. Build + lint + test must pass
