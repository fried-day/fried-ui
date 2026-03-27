# fried-ui Architecture & Implementation Guide

## Layer Architecture

```text
Consumer App
    ↓ import
@fried-ui/react          ← React components (behavior + accessibility)
    ↓ import
@fried-ui/styles         ← CSS: design tokens + component styles (BEM)
    ↓ built on
react-aria-components    ← Accessibility primitives
tailwindcss v4           ← Styling engine
```

## Package Boundary

```text
@fried-ui/styles (ไม่ depend on React — ใช้ได้กับทุก framework)
  exports:
    "."            → CSS (tokens + base styles + component BEM classes)
    "./variants"   → tv, cn, VariantProps (legacy — ใช้สำหรับ consumer ที่ต้องการ tv)
    "./utils"      → FOCUS_RING_CLASSES, DISABLED_CLASSES (shared TS presets)

@fried-ui/react (depends on react-aria)
  exports:
    "."            → barrel export (ทุก component)
    "./{name}"     → individual component
    "./utils/cn"   → cn utility
```

## Component Anatomy (3 Layers)

### Layer 1: Design Tokens (CSS)

`packages/styles/src/tokens/` — ค่าดิบที่ทุก component ใช้ร่วมกัน

```css
@theme {
  --color-primary: var(--color-neutral-950);
  --radius-base: 0.5rem;
  --duration-fast: 150ms;
}
```

### Layer 2: Component Styles (CSS + BEM)

`packages/styles/src/components/{name}.css` — BEM classes ที่ใช้ @apply กับ Tailwind utilities

```css
.fri-button {
  @apply relative inline-flex items-center justify-center gap-2;
  @apply rounded-(--radius-base) border-(length:--border-width) border-transparent;
  @apply transition-colors duration-(--duration-fast) ease-(--ease-default);
}

.fri-fri-button--primary {
  @apply bg-primary text-primary-foreground hover:bg-primary-hover;

  &[data-pressed] {
    @apply bg-primary-active;
  }
}

.fri-fri-button--md {
  @apply h-9 px-4 text-sm;
}
```

Import จาก `packages/styles/src/index.css`:

```css
@import "./components/button.css";
```

**ทำไมใช้ CSS ไม่ใช่ tv() (tailwind-variants)**:

- Zero JS runtime — ไม่มี bundle cost
- Framework agnostic — ใช้ได้กับ Vue, Svelte, vanilla HTML
- ตาม HeroUI v3 ที่ migrate จาก tv() → CSS

### Layer 3: React Component (TypeScript + JSX)

`packages/react/src/components/{name}/`

```text
{Name}.tsx           # "use client", component implementation
{name}.test.tsx      # Vitest + React Testing Library
{name}.stories.tsx   # Storybook 10
index.ts             # re-exports
```

## Data Flow

```text
Consumer passes props
    ↓
destructure: { variant, size, className, children, ...rest }
    ↓
rest → forward ตรงๆ ไป React Aria (isDisabled, onPress, aria-*, etc.)
    ↓
className → composeRenderProps → cn("button", "fri-button--{variant}", "fri-button--{size}", cls)
    ↓
children → composeRenderProps → wrap children กับ internal UI (spinner, etc.)
    ↓
React Aria handles: focus, keyboard, ARIA, events
```

## Type Pattern

```typescript
// 1. Public type ประกาศก่อน (ESLint enforce-type-declaration-order)
export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode | ((renderProps: { isPending: boolean }) => ReactNode);
} & Omit<RACButtonProps, "className" | "children">;

// 2. Internal types ประกาศหลัง
type ButtonVariant = "primary";
type ButtonSize = "md";
```

## Import Pattern

```typescript
// 1. React types
import type { ReactNode } from "react";

// 2. React Aria (RAC prefix for aliases)
import { Button as RACButton, type ButtonProps as RACButtonProps, composeRenderProps } from "react-aria-components";

// 3. Internal utility
import { cn } from "src/utils/cn";
```

## BEM Naming Convention

```text
.{component}                → base class
.{component}--{variant}     → variant modifier
.{component}--{size}        → size modifier
.{component}--{state}       → state modifier (pending, etc.)
```

React Aria states ใช้ data attributes ใน CSS:

```css
&[data-pressed] { ... }
&[data-hovered] { ... }
&[data-focused] { ... }
```

## Styling Rules

- ใช้ design tokens เสมอ — `rounded-(--radius-base)` ไม่ใช่ `rounded-lg`
- ใช้ semantic color names — `bg-primary` ไม่ใช่ `bg-neutral-950`
- React Aria states ใช้ `&[data-pressed]` ใน CSS — ไม่ใช่ `pressed:` (ไม่ใช่ built-in Tailwind variant)
- `disabled:cursor-not-allowed` — ไม่ใช่ `cursor-disabled` (ไม่มีใน Tailwind v4)

## Checklist: เพิ่ม Component ใหม่

1. สร้าง CSS (BEM) → `packages/styles/src/components/{name}.css`
2. Import จาก → `packages/styles/src/index.css`
3. สร้าง component files → `packages/react/src/components/{name}/`
4. Re-export → `packages/react/src/components/index.ts`
5. เพิ่ม tsup entry → `packages/react/tsup.config.ts`
6. เพิ่ม export map → `packages/react/package.json`
7. Build + lint + test ผ่าน
