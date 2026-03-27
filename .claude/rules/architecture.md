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
@fried-ui/styles   ← CSS: design tokens + component styles (BEM)
react-aria-components ← Accessibility primitives
tailwindcss v4     ← Styling engine
```

## Package Boundary

```text
@fried-ui/styles (ไม่ depend on React)
  exports:
    "." → CSS (tokens + component BEM classes)

@fried-ui/react (depends on react-aria)
  exports:
    "."          → barrel export
    "./{name}"   → individual component
    "./utils/cn" → cn utility
```

## Component Anatomy

### Layer 1: Design Tokens → `packages/styles/src/tokens/`

ทุก token อยู่ใน `@theme` — Tailwind v4 generate CSS variables ให้

### Layer 2: Component Styles → `packages/styles/src/components/{name}.css`

BEM classes + `@apply` + CSS custom properties สำหรับ variant colors

### Layer 3: React Component → `packages/react/src/components/{name}/`

```text
{Name}.tsx           # "use client", wrap React Aria component
{name}.test.tsx      # Vitest + React Testing Library
{name}.stories.tsx   # Storybook 10
index.ts             # re-exports
```

## Data Flow

```text
props → destructure { variant, size, className, children, ...rest }
rest  → forward ไป React Aria
className → cn("fri-{name}", "fri-{name}--{variant}", "fri-{name}--{size}", cls)
children  → composeRenderProps → wrap กับ internal UI
```

## Type Pattern

```typescript
// Public type ก่อน
export type ButtonProps = { ... } & Omit<RACButtonProps, "className" | "children">;
// Internal type หลัง
type ButtonVariant = "primary";
```

## Import Pattern

```typescript
import type { ReactNode } from "react";
import { Button as RACButton, type ButtonProps as RACButtonProps, composeRenderProps } from "react-aria-components";
import { cn } from "src/utils/cn";
```

## BEM Naming

```text
.fri-{component}              → base
.fri-{component}--{variant}   → variant
.fri-{component}--{size}      → size
.fri-{component}--{state}     → state
```

React Aria states ใน CSS: `&[data-pressed]`, `&[data-hovered]`, `&[data-focused]`

## Checklist: Component ใหม่

1. สร้าง CSS → `packages/styles/src/components/{name}.css`
2. Import → `packages/styles/src/components/index.css`
3. สร้าง component → `packages/react/src/components/{name}/`
4. Re-export → `packages/react/src/components/index.ts`
5. เพิ่ม tsup entry → `packages/react/tsup.config.ts`
6. เพิ่ม export map → `packages/react/package.json`
7. Build + lint + test ผ่าน
