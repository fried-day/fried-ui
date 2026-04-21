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

## JSDoc Pattern (React Aria + Mantine hybrid)

ทุก public component **ต้อง** มี JSDoc — ship ผ่าน .d.ts → IDE hover + LLM context สำหรับ end user

### Component-level (1-2 บรรทัด)

```typescript
/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 * Children with `slot="icon-start" | "icon-end" | "icon"` render as icons.
 */
const Button = (props) => { ... };
```

### Props (one-liner + @default)

```typescript
export interface ButtonVariantsProps {
  /** Whether the button stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg" | "xl";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | ...;
}
```

### Consistency Rules (lock in)

**Sentence opening pattern** — ทุก prop ต้องขึ้นต้นตาม template:

| Prop type | Pattern | Example |
|-----------|---------|---------|
| Boolean | `"Whether the {subject} ..."` | `"Whether the button is disabled (dims and removes pointer events)."` |
| Enum size | `"Size scale."` | `"Size scale. @default 'md'"` |
| Enum radius | `"Border radius scale."` | `"Border radius scale. @default 'md'"` |
| Enum shadow | `"Elevation depth (...)."` | `"Elevation depth (orthogonal to variant — combine freely)."` |
| Enum variant | `"Visual style. ..."` | `"Visual style. Base colors ... @default 'primary'"` |
| Optional string | `"Text ... @default undefined"` | `"Text shown when ... @default undefined"` |

**`@default` formatting:**
- String: quoted — `@default 'md'`
- Boolean: unquoted — `@default false`
- Undefined/optional: `@default undefined`

### Rules

- ✅ One-liner per prop + `@default` (Mantine pattern)
- ✅ Component description = intent + slot contract (if any)
- ✅ Slot contract mention เฉพาะ component ที่รับ icon (Button/Badge)
- ✅ Boolean props **ต้อง** ขึ้นต้นด้วย `"Whether the..."` — ห้ามใช้ action-based (`"Dims the..."`, `"Adds..."`, `"Shows..."`)
- ✅ **ห้าม** ใส่ implementation detail ใน JSDoc (เช่น "via golden ratio formula") — เป็น internal, ไม่ใช่ public API
- ❌ ห้าม `@example` ใน source (ใช้ Storybook แทน — ไม่ duplicate)
- ❌ ห้าม multi-paragraph prose JSDoc (ใช้ docs site แทน)

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

## BEM Class on EVERY Internal Element

ทุก `<span>`, `<div>`, `<svg>` ภายใน component **ต้องมี BEM class** `.fri-{component}__{part}` — ไม่ใช่แค่ `data-slot` attribute

**เหตุผล:**
- User override ผ่าน `@apply` (2026 pattern — แทน slotProps):
  ```css
  /* User's app CSS */
  .fri-input__icon-start { @apply size-5 text-primary; }
  .fri-input__prefix { @apply font-mono text-accent; }
  ```
- Class selector สั้นกว่า attr selector (`.fri-input__icon-start` vs `[data-slot="input-icon-start"]`)
- Performance ดีกว่า (class match faster than attr match)
- Idiomatic BEM — docs อ่านง่าย

**Pattern:**
```tsx
<span
  className="fri-input__icon-start"   // ← styling hook
  data-slot="input-icon-start"         // ← semantic marker (for React Aria context + tests)
>
  {startIcon}
</span>
```

**Both present** — BEM class for styling, data-slot for semantic.

**Example components that follow:**
- `Avatar` — `fri-avatar__image`, `fri-avatar__fallback`
- `Button` — `fri-button__spinner`
- `Input` — `fri-input__field`, `fri-input__icon-start`, `fri-input__prefix`, `fri-input__suffix`, `fri-input__icon-end`, `fri-input__spinner`

## ❌ No Magic Values in CSS

ทุก component CSS **ห้าม** มี magic values — ดู `.claude/rules/styles.md` "No Magic Values" section

```css
/* ❌ Raw rem */
--fri-X-base: 0.8rem;

/* ❌ Magic decimal scalar */
--fri-X-ratio: 0.625;

/* ✅ Tailwind @apply */
@apply -ms-3;

/* ✅ Formula (golden ratio) */
@apply py-[calc(1rem/2.058)];

/* ✅ Token-based calc */
--fri-X-base: calc(var(--spacing) * 10);

/* ✅ Explicit fraction */
--fri-X-ratio: calc(5 / 8);  /* 62.5% */
```

**Decision tree**: Tailwind utility → formula → `var(--spacing) * N` → explicit fraction → flag if none fit

## Checklist: Component ใหม่

1. สร้าง CSS → `packages/styles/src/components/{name}.css`
2. Import → `packages/styles/src/components/index.css`
3. สร้าง component → `packages/react/src/components/{name}/`
4. Re-export → `packages/react/src/components/index.ts`
5. เพิ่ม tsup entry → `packages/react/tsup.config.ts`
6. เพิ่ม export map → `packages/react/package.json`
7. Build + lint + test ผ่าน
