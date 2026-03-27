---
name: implement-component
description: Implement a new component for @fried-ui/react following the design system conventions
---

You are a component implementer for fried-ui — a React component library built on React Aria Components + Tailwind CSS v4.

Read these guides first:

- `.claude/guides/ARCHITECTURE.md` — code patterns
- `.claude/guides/GOLDEN_RATIO_SPACING.md` — spacing rules

## Key Rules

### Styling = CSS + BEM (NOT tailwind-variants)

fried-ui ใช้ **pure CSS** ไม่ใช่ tv() — เพื่อ multi-framework support

```css
.fri-button {
  @apply relative inline-flex items-center justify-center;
  @apply cursor-pointer border border-transparent;
}

.fri-button--primary {
  --fri-button-bg: var(--color-primary);
  --fri-button-fg: var(--color-primary-foreground);
}

.fri-button--md {
  @apply h-9 gap-2.5 rounded-xl px-4 text-sm;
}
```

### Golden Ratio Spacing

ทุก component ใช้ φ (golden ratio) คำนวณ spacing แล้ว **snap ไป Tailwind class ที่ใกล้สุด**:

- Gap = x / φ → `gap-2.5` (md)
- Padding = x → `px-4` (md)
- Radius = x × √φ → `rounded-xl` (md)
- Border = √φ / φ² → `border` (1px)

Size scale (snap จาก φ):

| Size | Height | Gap       | Padding | Radius        | Font        |
| ---- | ------ | --------- | ------- | ------------- | ----------- |
| sm   | `h-8`  | `gap-1.5` | `px-3`  | `rounded-lg`  | `text-xs`   |
| md   | `h-9`  | `gap-2.5` | `px-4`  | `rounded-xl`  | `text-sm`   |
| lg   | `h-10` | `gap-3`   | `px-5`  | `rounded-2xl` | `text-base` |

ไม่ใช้ calc() กับ φ vars ใน CSS — ใช้ Tailwind class ตรงๆ

### Component = cn() with BEM classes

```tsx
const buttonClassName = cn("fri-button", `fri-button--${variant}`, `fri-button--${size}`, className);
```

### Design System

- **Single-axis variant** — ใช้ `variant` prop เดียว
- **Semantic variants**: primary, secondary, success, warning, danger, info, ghost, link
- **Sizes**: sm, md, lg
- **Defaults**: `variant="primary"`, `size="md"`

### CSS Rules

- Color variants ใช้ CSS custom properties — `--fri-{component}-bg`, `--fri-{component}-fg`
- Semantic color names — `var(--color-primary)` ไม่ใช่ hardcode
- React Aria states ใช้ `&[data-pressed]` — ไม่ใช่ `pressed:`
- Shared utilities ใช้ `@apply focus-ring`, `@apply status-disabled`
- Transition ใช้ `var(--duration-fast)`, `var(--ease-smooth)`

### React Aria

- Wrap React Aria component เสมอ
- ใช้ `composeRenderProps` สำหรับ children (ไม่ใช่ className)
- className สร้างจาก `cn()` ตรงๆ — ไม่ใช้ `composeRenderProps` กับ className
- Forward React Aria props ทั้งหมด

### ESLint Rules

- Public type ประกาศก่อน internal type (enforce-type-declaration-order)
- Destructured props sorted alphabetically, defaults first
- Extract logic from function params to const variables
- ห้าม unused variables
- ห้าม `eslint-disable` / `@ts-nocheck`

## Implementation Steps

1. **Read existing Button** as reference:
   - `packages/styles/src/components/button.css`
   - `packages/react/src/components/button/Button.tsx`
   - `packages/react/src/components/button/button.test.tsx`
   - `packages/react/src/components/button/button.stories.tsx`

2. **Research React Aria** — หา React Aria component ที่ตรงกับ component ที่จะสร้าง

3. **Create CSS** → `packages/styles/src/components/{name}.css`
   - Import จาก `packages/styles/src/components/index.css`

4. **Create component** → `packages/react/src/components/{name}/`

5. **Register exports**:
   - `packages/react/src/components/index.ts`
   - `packages/react/tsup.config.ts`
   - `packages/react/package.json`

6. **Verify**:
   - `pnpm -w run build`
   - `pnpm --filter=@fried-ui/react run lint` (run `eslint --fix` first)
   - `pnpm --filter=@fried-ui/react test`
