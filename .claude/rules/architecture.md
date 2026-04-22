---
description: Component architecture, file structure, data flow, and implementation checklist
paths:
  - packages/react/src/**/*.{ts,tsx}
  - packages/styles/src/**/*.css
---

# Architecture

## Layer

```text
@fried-ui/react    <- React components (behavior + accessibility)
@fried-ui/styles   <- CSS: design tokens + component styles (class)
react-aria-components <- Accessibility primitives
tailwindcss v4     <- Styling engine
```

## Package Boundary

```text
@fried-ui/styles (ไม่ depend on React)
  exports:
    "." -> CSS (tokens + component classes)

@fried-ui/react (depends on react-aria)
  exports:
    "."          -> barrel export
    "./{name}"   -> individual component
    "./utils/cn" -> cn utility
```

## Component Anatomy

### Layer 1: Design Tokens in `packages/styles/src/tokens/`

ทุก token อยู่ใน `@theme` — Tailwind v4 generate CSS variables ให้

### Layer 2: Component Styles in `packages/styles/src/components/{name}.css`

classes + `@apply` + CSS custom properties สำหรับ variant colors

### Layer 3: React Component in `packages/react/src/components/{name}/`

```text
{Name}.tsx           # "use client", wrap React Aria component
{name}.test.tsx      # Vitest + React Testing Library
{name}.stories.tsx   # Storybook 10
index.ts             # re-exports
```

## Data Flow

```text
props -> destructure { variant, size, className, children, ...rest }
rest  -> forward ไป React Aria
className -> classes({ block: "{name}", modifiers: { variant, size }, className })
children  -> composeRenderProps -> wrap กับ internal UI
```

### `classes()` signature

`classes()` ตอนนี้รับ `className` เป็น param ลำดับ 3 (optional) — **ห้าม** wrap ด้วย `clsx()` ภายนอกแล้ว:

```tsx
// BAD: Old pattern (removed) — ห้ามใช้แล้ว
const buttonClassName = clsx(
  classes({ block: "button", modifiers: { variant, size } }),
  className,
);

// OK: New pattern — fold className เข้า classes() เลย
const buttonClassName = classes({
  block: "button",
  modifiers: { variant, size },
  className,
});
```

- Display components + non-render-prop interactive components: ไม่ต้อง `import { clsx }` แล้ว
- Interactive components ที่ใช้ `composeRenderProps` (render-prop `className`) ยังต้อง `clsx` ภายใน function wrapper เพื่อ merge base + consumer string ที่ function return (ดู Button.tsx)
- `clsx` ถูกใช้ภายใน `classes.ts` เสมอ — ไม่ต้อง import ซ้ำ

## Type Pattern

```typescript
// Public type ก่อน
export type ButtonProps = { ... } & Omit<RACButtonProps, "className" | "children">;
// Internal type หลัง
type ButtonVariant = "primary";
```

## JSDoc Pattern (React Aria + Mantine hybrid)

ทุก public component **ต้อง** มี JSDoc — ship ผ่าน .d.ts เพื่อให้ IDE hover และ LLM context สำหรับ end user

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

- OK: One-liner per prop + `@default` (Mantine pattern)
- OK: Component description = intent + slot contract (if any)
- OK: Slot contract mention เฉพาะ component ที่รับ icon (Button/Badge)
- OK: Boolean props **ต้อง** ขึ้นต้นด้วย `"Whether the..."` — ห้ามใช้ action-based (`"Dims the..."`, `"Adds..."`, `"Shows..."`)
- OK: **ห้าม** ใส่ implementation detail ใน JSDoc (เช่น "via golden ratio formula") — เป็น internal, ไม่ใช่ public API
- BAD: ห้าม `@example` ใน source (ใช้ Storybook แทน — ไม่ duplicate)
- BAD: ห้าม multi-paragraph prose JSDoc (ใช้ docs site แทน)
- BAD: ห้ามใช้ transition/causation symbols (`->`, `<-`, `=>`) หรือ emoji ใน JSDoc prose — ใช้คำเต็ม ("leads to", "maps to", "transitions to", "derives from"). See `.claude/rules/writing.md`

## Import Pattern

```typescript
import type { ReactNode } from "react";
import { Button as RACButton, type ButtonProps as RACButtonProps, composeRenderProps } from "react-aria-components";
import { classes } from "../../utils/classes";
// `clsx` only needed when component uses composeRenderProps (interactive render-prop className)
```

## Over-declare — VariantsProps vs Pass-through

`{name}.variants.ts` (`{Name}VariantsProps`) **ต้องมีเฉพาะ fried-ui-specific props** — style/layout modifiers ที่ map ตรงกับ CSS class (`variant`, `size`, `radius`, `isFullWidth`, `isPending`, `isIconOnly`). **ห้าม** redeclare props ที่ underlying primitive (React Aria / native HTML) ให้อยู่แล้ว

```ts
/* BAD: Over-declare — ซ้ำกับ AriaTextField */
export interface TextFieldVariantsProps {
  isDisabled?: boolean;   // AriaTextField ให้แล้ว
  isInvalid?: boolean;    // AriaTextField ให้แล้ว
  isReadOnly?: boolean;   // AriaTextField ให้แล้ว
  isRequired?: boolean;   // AriaTextField ให้แล้ว
  isFullWidth?: boolean;  // fried-ui ของเราเอง (OK)
  size?: "sm" | "md" | "lg"; // fried-ui ของเราเอง (OK)
}

/* BAD: Over-declare — ซ้ำกับ native HTML input */
export interface InputVariantsProps {
  isDisabled?: boolean;   // native `disabled` ให้แล้ว
  isReadOnly?: boolean;   // native `readOnly` ให้แล้ว
  isRequired?: boolean;   // native `required` ให้แล้ว
  isInvalid?: boolean;    // native `aria-invalid` ให้แล้ว
}

/* OK: เฉพาะของ fried-ui */
export interface InputVariantsProps {
  isFullWidth?: boolean;
  isPending?: boolean;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "plain";
}
```

**Prop surface propagates via intersection type:**

```ts
export type InputProps = InputVariantsProps & {
  // ...fried-ui-only extras (className, startIcon, endIcon, prefix, suffix)
} & Omit<ComponentPropsWithRef<typeof AriaInput>, "className" | "children" | "size">;
```

Consumer receives **both** fried-ui modifiers AND native/Aria attrs in one surface. Destructure only what you transform (style/layout/composition props); spread `...rest` to the primitive.

### Why over-declare is bad

1. **Duplicate source of truth** — if we declare `isDisabled` ourselves and user passes `disabled`, the winner is unclear. Either we hand-merge (fragile) or drift silently.
2. **Type narrowing** — our `isDisabled?: boolean` hides React Aria's richer types (controlled vs uncontrolled signatures).
3. **JSDoc drift** — two copies (ours + React Aria) describe the same prop with different wording — consumers get conflicting hints.
4. **Maintenance** — primitive adds a new prop, we must mirror it or lose the feature.

### Story argTypes — the EXCEPTION

**Pass-through props MUST still appear in Storybook `argTypes`** even when not in VariantsProps:

1. **Controls panel** — devs toggle `disabled`/`readOnly` to verify CSS effects (`:disabled` / `[data-disabled]` rules render correctly).
2. **LLM documentation** — `npm publish` ships Storybook `autodocs`. LLM consumers read them as the canonical spec. If we silently drop `disabled` from argTypes, LLMs hallucinate which props fried-ui accepts.
3. **Consumer discovery** — Storybook Docs tab is the first stop for external devs exploring the API.

```tsx
// VariantsProps contains only fried-ui props.
// argTypes covers BOTH fried-ui and pass-through props.
argTypes: {
  size:          { ... },   // fried-ui (in VariantsProps)
  variant:       { ... },   // fried-ui (in VariantsProps)
  isFullWidth:   { ... },   // fried-ui (in VariantsProps)
  disabled:      { ... },   // pass-through (native HTML attr)
  readOnly:      { ... },   // pass-through (native HTML attr)
  required:      { ... },   // pass-through (native HTML attr)
  "aria-invalid":{ ... },   // pass-through (ARIA attr)
}
```

**Naming convention:**
- React Aria-wrapped (TextField, Button, Select): camelCase — `isDisabled`, `isInvalid`, `isReadOnly`, `isRequired`
- Native HTML wrapped (Input): native names — `disabled`, `readOnly`, `required`, `aria-invalid`

### Rule summary

| Layer                                    | Over-declare? |
|------------------------------------------|---------------|
| `{name}.variants.ts` (`VariantsProps`)   | BAD — fried-ui-specific only |
| `{Name}Props` type alias                 | auto — intersection type brings primitive props |
| `{name}.stories.tsx` argTypes            | MUST — pass-through for DX + LLM discovery |
| `{name}.test.tsx`                        | test via primitive's native / Aria attr name |

## Component Composition — Named Imports with Prefix (shadcn pattern)

**Rule:** ทุก subpart/slot **export เป็น named import with prefix** — **ห้าม** dot notation (`Parent.Sub`). aligned กับ shadcn pattern, best for LLM fluency + multi-framework port + tree-shake

```tsx
// OK: Named imports with prefix (shadcn pattern — canonical)
import {
  Field, FieldLabel, FieldDescription, FieldError,
  FieldSet, FieldLegend, FieldGroup, FieldSeparator,
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea,
  Avatar, AvatarImage, AvatarFallback,
} from "@fried-ui/react";

// BAD: Dot notation — ห้าม
import { Field } from "@fried-ui/react";
<Field.Label />  // ❌
```

### Rationale

1. **LLM fluency** — shadcn trained on LLMs heavily → named imports = LLM generate fried-ui easily
2. **Multi-framework** — Vue/Solid ports copy named exports 1:1 (ไม่ต้อง Object.assign)
3. **Tree-shake** — flat exports = bundler optimize ดีกว่า
4. **Flexibility** — subpart ใช้นอก parent ได้ (เช่น `<FieldLabel>` ใช้กับ `<Checkbox>` นอก `<Field>` wrapper)
5. **Plain HTML parity** — each named component = distinct CSS class (`.field-label`, `.input-group-addon`)

### When to create new component vs reuse existing

- **Create new** เมื่อ existing primitive configure ไม่ได้ (เช่น Input inside InputGroup ต้อง strip border → `InputGroupInput` ใหม่ class `.input-group-input`)
- **Reuse existing** เมื่อ variant/size ครอบคลุมได้ (เช่น Button ภายใน InputGroupAddon ใช้ `<Button size="sm" variant="ghost">` — ไม่สร้าง `InputGroupButton`)

### Breaking change — component rename (shadcn alignment)

- `TextField` → `Field`
- `Label` → `FieldLabel`
- `Description` → `FieldDescription`
- `FieldError` keep (already shadcn-aligned)
- Existing `Avatar.Image` / `Avatar.Fallback` → `AvatarImage` / `AvatarFallback` (drop dot)

## Field Subcomponents — `useFieldState(props)`

`Label`, `Description`, `FieldError` ต้อง consume `TextFieldContext` + รองรับ prop-override — ใช้ hook `useFieldState(props)` เป็น canonical:

```tsx
// BAD: Old pattern — manual context read ใน component (drift risk — FieldError เคยลืมทำ)
const ctx = useContext(TextFieldContext);
const isDisabled = isDisabledProp ?? ctx?.isDisabled;
const isInvalid = isInvalidProp ?? ctx?.isInvalid;

// OK: New pattern — one call, consistent across all field subcomponents
import { useFieldState } from "../text-field/use-field-state";

const Label = (props) => {
  const { ... } = props;
  const { isDisabled, isInvalid, isRequired } = useFieldState(props);
  // ...
};
```

**Rule:** ทุก subcomponent ที่อยู่ใน `TextField` scope (Label, Description, FieldError, future: HelperText) **ต้อง** ใช้ `useFieldState(props)` — ห้าม manual `useContext(TextFieldContext)` ใน component ตัวเอง

**Why:** consolidate context-read + prop-override fallback ที่จุดเดียว — ถ้า context shape เปลี่ยน แก้ที่ hook ครั้งเดียว ไม่ drift

## class-naming Naming

```text
.{component}              -> base
.{component}--{variant}   -> variant
.{component}--{size}      -> size
.{component}--{state}     -> state
```

React Aria states ใน CSS: `&[data-pressed]`, `&[data-hovered]`, `&[data-focused]`

## class-naming Class on EVERY Internal Element

ทุก `<span>`, `<div>`, `<svg>` ภายใน component **ต้องมี class-naming class** `.{component}__{part}` — ไม่ใช่แค่ `data-slot` attribute

**เหตุผล:**
- User override ผ่าน `@apply` (2026 pattern — แทน slotProps):
  ```css
  /* User's app CSS */
  .input-icon-start { @apply size-5 text-primary; }
  .input-prefix { @apply font-mono text-accent; }
  ```
- Class selector สั้นกว่า attr selector (`.input-icon-start` vs `[data-slot="input-icon-start"]`)
- Performance ดีกว่า (class match faster than attr match)
- Idiomatic class-naming — docs อ่านง่าย

**Pattern:**
```tsx
<span
  className="input-icon-start"   // <- styling hook
  data-slot="input-icon-start"         // <- semantic marker (for React Aria context + tests)
>
  {startIcon}
</span>
```

**Both present** — class-naming class for styling, data-slot for semantic.

**Example components that follow:**
- `Avatar` — `avatar-image`, `avatar-fallback`
- `Button` — `button-spinner`
- `Input` — `input-field`, `input-icon-start`, `input-prefix`, `input-suffix`, `input-icon-end`, `input-spinner`

## No Magic Values in CSS

ทุก component CSS **ห้าม** มี magic values — ดู `.claude/rules/styles.md` "No Magic Values" section

```css
/* BAD: Raw rem */
--X-base: 0.8rem;

/* BAD: Magic decimal scalar */
--X-ratio: 0.625;

/* OK: Tailwind @apply */
@apply -ms-3;

/* OK: Formula (golden ratio) */
@apply py-[calc(1rem/2.058)];

/* OK: Token-based calc */
--X-base: calc(var(--spacing) * 10);

/* OK: Explicit fraction */
--X-ratio: calc(5 / 8);  /* 62.5% */
```

**Decision tree**: Tailwind utility first, then formula, then `var(--spacing) * N`, then explicit fraction, then flag if none fit

## Checklist: Component ใหม่

1. สร้าง CSS ที่ `packages/styles/src/components/{name}.css`
2. Import ที่ `packages/styles/src/components/index.css`
3. สร้าง component ที่ `packages/react/src/components/{name}/`
4. Re-export ที่ `packages/react/src/components/index.ts`
5. เพิ่ม tsup entry ที่ `packages/react/tsup.config.ts`
6. เพิ่ม export map ที่ `packages/react/package.json`
7. **Verify 1:1 parity** — base class default value == explicit default modifier value (variant/size/radius). JSDoc `@default` สะท้อน base class จริง. See `.claude/rules/styles.md` "Base = Default Modifier". **P0 — production risk**
8. Build + lint + test ผ่าน

## 1:1 Parity Check (React == Plain HTML)

ทุก component ต้อง pass parity test นี้ — `<Component>` (no props) และ `<tag class="{name}">` (minimal) ต้อง render ตรงกัน:

```text
Base class defines:
  - default variant tokens (e.g., primary)
  - default size spacing + font-size
  - default radius (formula matches --radius-{default})

Default modifier rule produces same CSS as base:
  .X--{default-variant} { ... } === base class variant tokens
  .X--size-{default}    { ... } === base class size
  .X--radius-{default}  { ... } === base class radius

JSDoc @default reflects base reality:
  If base has rounded-full -> @default 'full' (not 'md')
  If base has primary tokens -> @default 'primary'
```

**Why critical:** `@fried-ui/styles` ships as pure CSS for WP/PHP/HTML consumers. Any drift breaks their rendering. React consumers ก็โดนเพราะ `<Component>` no-props ทำให้ classes() skips modifier, base class wins (might diverge from JSDoc promise).
