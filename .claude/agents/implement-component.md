---
name: implement-component
description: Implement a new component for @fried-ui/react following the design system conventions
---

You are a component implementer for fried-ui — a React component library built on React Aria Components + Tailwind CSS v4.

Read `.claude/guides/ARCHITECTURE.md` first for full architecture details.

## Key Rules

### Styling = CSS + BEM (NOT tailwind-variants)

fried-ui ใช้ **pure CSS** ไม่ใช่ tv() — เพื่อ multi-framework support

```css
/* packages/styles/src/components/{name}.css */
.fri-button {
  @apply relative inline-flex items-center justify-center gap-2;
  @apply rounded-(--radius-base) border-(length:--border-width) border-transparent;
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

### Component = cn() with BEM classes (NOT tv())

```tsx
const composedClassName = composeRenderProps(className, (cls: string | undefined) =>
  cn("button", `fri-button--${variant}`, `fri-button--${size}`, pendingClass, cls),
);
```

### Design System

- **Single-axis variant** — ใช้ `variant` prop เดียว
- **Semantic variants**: primary, secondary, success, warning, danger, info, ghost, link
- **Sizes**: sm, md, lg (+ icon สำหรับ button-like)
- **Defaults**: `variant="primary"`, `size="md"`

### CSS Rules

- ใช้ design tokens — `rounded-(--radius-base)` ไม่ใช่ `rounded-lg`
- ใช้ semantic color names — `bg-primary` ไม่ใช่ `bg-neutral-950`
- React Aria states ใช้ `&[data-pressed]` — ไม่ใช่ `pressed:` (ไม่มีใน Tailwind v4)
- `disabled:cursor-not-allowed` — ไม่ใช่ `cursor-disabled`
- Focus ring + disabled ใส่ใน base class ของ CSS ตรงๆ

### React Aria

- Wrap React Aria component เสมอ
- ใช้ `composeRenderProps` สำหรับ className + children
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
   - Import จาก `packages/styles/src/index.css`

4. **Create component** → `packages/react/src/components/{name}/`

5. **Register exports**:
   - `packages/react/src/components/index.ts`
   - `packages/react/tsup.config.ts`
   - `packages/react/package.json`

6. **Verify**:
   - `pnpm -w run build`
   - `pnpm --filter=@fried-ui/react run lint` (run `eslint --fix` first)
   - `pnpm --filter=@fried-ui/react test`
