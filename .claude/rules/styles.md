---
description: CSS conventions, BEM naming, tokens, and utilities
paths:
  - packages/styles/src/**/*.css
---

# Styles

## Token Files

```text
tokens/palette.css    → primitive tokens (--color-fri-neutral-*, --color-fri-purple-*, ...)
tokens/colors.css     → semantic tokens, overlay (@theme light + @layer base .dark)
tokens/layout.css     → radius, z-index, focus offset, cursor, opacity
tokens/motion.css     → duration, easing, keyframes
tokens/typography.css → heading sizes
```

## Token Architecture (2 layers)

```text
Layer 1 — Palette (primitive)    tokens/palette.css     var(--color-fri-neutral-200)
Layer 2 — Semantic (meaningful)  tokens/colors.css      var(--color-avatar)
```

**Component CSS must use Layer 2 only** — never reference Layer 1 palette tokens directly in component CSS. If a semantic token doesn't exist for the use case, add it to `tokens/colors.css` first, then reference.

```css
/* ❌ Component referencing palette */
.fri-avatar {
  @apply bg-(--color-fri-neutral-200);
}

/* ✅ Component referencing semantic */
.fri-avatar {
  @apply bg-(--color-avatar);
}
```

Semantic tokens must reference palette directly — never chain through another semantic token ("color ใคร color มัน").

```css
/* ❌ Chaining semantic → semantic */
--color-surface-border: var(--color-border);

/* ✅ Semantic → palette */
--color-surface-border: var(--color-fri-neutral-200);
```

## Semantic Color Groups (7 tokens each)

```text
{name}                 → solid bg
{name}-hover           → bg hover
{name}-active          → bg pressed
{name}-foreground      → text on solid bg
{name}-soft            → soft bg
{name}-soft-foreground → text on pale bg
{name}-soft-border     → border on pale bg
```

Groups: primary, secondary, success, warning, danger, info

## Component CSS Pattern

Base class includes defaults — `fri-{name}` alone = primary + md + default radius.
Spacing and radius use golden ratio formula — see `formula.md`.

## BEM Class Naming

```text
variant  → value only:   .fri-{name}--primary
size     → key-value:    .fri-{name}--size-md
radius   → key-value:    .fri-{name}--radius-lg
boolean  → key only:     .fri-{name}--disabled
element  → double under: .fri-{name}__spinner
```

## Focus Ring (WCAG AAA two-color)

```text
--color-focus-outer    → outline color (neutral-950 / neutral-50)
--color-focus-inner    → ring color (white / neutral-950)
--outline-offset-focus → 2px (customizable)
```

```css
@utility focus-ring {
  @apply ring-2 ring-focus-inner outline-2 outline-offset-focus outline-focus-outer;
}
```

### Mutually Exclusive Focus States

**`data-focused` ≠ `data-focus-visible`** — ห้ามรวมกัน ต้องแยก 2 state ชัด:

| State | Selector | Style | Trigger |
|-------|----------|-------|---------|
| **Mouse/click focus** | `[data-focused]:not([data-focus-visible])` | Border change | Mouse click on input |
| **Keyboard focus** | `[data-focus-visible]` | `focus-ring` | Tab navigation |

Use `:not()` to **exclude** keyboard from mouse rule:

```css
/* ✅ Input pattern — 2 exclusive states */
.fri-input {
  /* Mouse click only — NOT keyboard */
  &:has(:focus:not(:focus-visible)),
  &:has([data-focused]:not([data-focus-visible])) {
    @apply border-(--fri-input-border-focus);
  }

  /* Keyboard only */
  &:has(:focus-visible),
  &:has([data-focus-visible]) {
    @apply focus-ring;
  }
}
```

**❌ ห้าม** — รวม 2 state ให้ stack กัน:

```css
/* ❌ Keyboard จะได้ทั้ง border + ring = noise */
&:has([data-focused]) { @apply border-(...) }
&:has([data-focus-visible]) { @apply focus-ring; }
```

**Button-like components** (buttons, links) = keyboard-only, ไม่มี persistent focus state:

```css
/* ✅ Button pattern */
.fri-button {
  &:focus-visible,
  &[data-focus-visible] {
    @apply focus-ring;
  }
}
```

**Why?**
- **Input** — holds focus while typing → needs visual feedback, but keyboard should have own clear indicator (ring, not border)
- **Button** — focus momentary → only needs keyboard a11y indicator

**Rules:**
1. `[data-focused]:not([data-focus-visible])` = mouse only → border change
2. `[data-focus-visible]` = keyboard only → focus-ring
3. ห้ามใช้ selector เดียวครอบทั้ง 2 state (เช่น `[data-focused]` ตัวเดียว จะ match ทั้ง mouse + keyboard)

## Icon Slots

```text
slot="icon-start"  → icon left, reduces pl to py value
slot="icon-end"    → icon right, reduces pr to py value
slot="icon"        → icon-only (center, no text)
```

```css
.fri-{name} [slot="icon"],
.fri-{name} [slot="icon-start"],
.fri-{name} [slot="icon-end"] {
  @apply size-match-font;
}
```

## Rules

- Use `@apply` + Tailwind v4 utilities — no plain CSS when utility exists
- Use `[calc(...)]` bracket syntax with formula — see `formula.md`
- Use semantic tokens via `var()` — never raw Tailwind colors
- Component CSS references semantic tokens only (Layer 2) — never `--color-fri-*` palette (Layer 1)
- Semantic tokens reference palette directly — never chain semantic → semantic
- All spacing in rem — never px (except border 1px)
- Interactive: wrap hover in `@media (hover: hover)`
- Interactive: include `motion-reduce:transition-none`
- Defaults in base class — modifiers are optional overrides

## Transition Property

เลือก transition ตามประเภทของสิ่งที่เปลี่ยน:

| Utility | Covers | Use when |
|---------|--------|----------|
| `transition-colors` | color, bg-color, border-color, fill, stroke | Component เปลี่ยนแค่สี (Badge, Surface variant) |
| **`transition`** | ...colors + **box-shadow (ring)** + transform + opacity + filter | Component มี ring/shadow state (Button, Input focus-ring, AvatarGroup hover scale) |

**ห้าม** ใช้ `transition-colors` ถ้า component มี `ring-*` / `shadow-*` ใน state — ring จะไม่ animate smooth

```css
/* ❌ Ring/shadow ไม่ fade smooth */
.fri-input {
  @apply transition-colors duration-(--duration-hover);
  &:has([data-focused]) {
    @apply ring-1 ring-focus;  /* pops in ทันที */
  }
}

/* ✅ ทุกอย่าง smooth */
.fri-input {
  @apply transition duration-(--duration-hover);
}
```

**Rule:** ถ้า interactive component ใช้ `ring-*`, `shadow-*`, `scale-*`, `-translate-*` ใน state change → ใช้ `transition` ไม่ใช่ `transition-colors`

## State Priority (cascade order)

เมื่อหลาย state match พร้อมกัน ต้องมี priority ชัด — ไม่ให้ hover override focus/pressed

**Priority (สูง → ต่ำ):** `disabled` > `readonly` > `pressed` > `focus` > `hover` > `idle`

### Rules

1. **`:hover` / `[data-hovered]` must exclude `[data-focused]` + `[data-pressed]`** — focus/pressed ชัดเจนกว่า hover
2. **`:active` / `[data-pressed]` must come AFTER `:hover` / `[data-hovered]`** ใน CSS (cascade order) เพื่อ pressed override hover
3. **`disabled` / `readonly` excludes hover entirely** — non-interactive

### Pattern ✅

```css
/* Exclude focused/pressed from hover */
&:has([data-hovered])
  :not(:has([data-focused]))
  :not(:has([data-pressed]))
  :not(:has([data-disabled]))
  :not(:has([data-readonly])) {
  @apply bg-(--fri-X-bg-hover);
}

/* Focus (mouse) */
&:has([data-focused]):not(:has([data-focus-visible])) {
  @apply border-(--fri-X-border-focus);
}

/* Focus (keyboard) */
&:has([data-focus-visible]) {
  @apply focus-ring;
}

/* Pressed — last to win cascade */
&[data-pressed] {
  @apply bg-(--fri-X-bg-pressed);
}
```

### Pattern ❌ — specificity trap

```css
/* Hover rule has HIGHER specificity (2 :not) → wins over focus */
&:has([data-hovered]):not(:has([data-readonly])):not(:has([data-disabled])) {
  @apply border-hover;   /* ← wins */
}
&:has([data-focused]) {
  @apply border-focus;   /* ← LOSES due to lower specificity */
}
```

**แก้:** add exclusions to hover rule → same or higher specificity needed on winning rule.

## React Aria First — Prefer `data-*` attrs over BEM modifiers for state

สำหรับ state ที่ React Aria จัดการ (hovered, focused, focus-visible, pressed, disabled, readonly, invalid, required, selected, ฯลฯ) — **ใช้ `[data-X]` attribute selector ไม่ใช่ BEM modifier class**

```css
/* ✅ Preferred — React Aria data attrs */
.fri-input:has([data-hovered]) { @apply bg-(--fri-input-bg-hover); }
.fri-input:has([data-disabled]) { @apply status-disabled; }
.fri-input:has([data-invalid]) { --fri-input-border: var(--color-danger); }
.fri-input:has([data-focused]):not(:has([data-focus-visible])) { ... }
.fri-input:has([data-focus-visible]) { @apply focus-ring; }

/* ❌ Avoid — manual BEM modifier for React Aria state */
.fri-input--disabled { @apply status-disabled; }  /* redundant */
```

**เหตุผล:**
- ✅ Single source of truth — React Aria ตั้ง data attr อัตโนมัติ ไม่ต้อง sync 2 ทาง
- ✅ Works across all input methods (mouse/keyboard/touch/programmatic) — React Aria handles edge cases
- ✅ Component.tsx ไม่ต้อง pass state ลง BEM → bem() call สั้นลง (แค่ variant/size/radius)
- ✅ Test ตรงประเด็น — เช็ค native attr (`toBeDisabled()`, `toHaveAttribute`) ไม่ใช่ class

**BEM modifier classes ยังใช้ได้สำหรับ:**
- Component's own variants (`--size-md`, `--variant-outline`, `--radius-lg`) — ไม่ใช่ state
- Custom flags ที่ React Aria ไม่มี (เช่น `--full-width`, `--icon-only`)

**Rule for Component.tsx:**
```tsx
bem({
  block: "fri-input",
  modifiers: {
    variant,    // ✅ own variant
    size,       // ✅ own size
    radius,     // ✅ own radius
    // ❌ ไม่ใส่: disabled, readonly, invalid, required, focused, hovered (React Aria handles)
  },
})
```

## Utility-style over var-syntax (for theme tokens)

Tailwind v4 `@theme static` generate utility class ให้ทุก semantic token — ใช้ utility-style ดีกว่า `var()` shorthand

| Pattern | Use | Example |
|---------|-----|---------|
| **Utility-style** (preferred) | theme tokens (Layer 2 semantic) | `text-foreground`, `bg-primary`, `border-danger`, `ring-focus-inner` |
| **Var-syntax `bg-(--X)`** | Component-local CSS vars (Layer 3) | `bg-(--fri-input-bg)`, `border-(--fri-button-bg-hover)` |

**❌ ห้าม — ซ้ำซ้อนกับ utility ที่มีอยู่แล้ว:**
```css
@apply text-(--color-foreground);     /* ❌ var-syntax for theme token */
@apply bg-(--color-primary);           /* ❌ */
@apply border-(--color-danger);        /* ❌ */
```

**✅ ใช้ utility-style:**
```css
@apply text-foreground;
@apply bg-primary;
@apply border-danger;
```

**✅ Var-syntax ใช้ได้กับ component-local var เท่านั้น:**
```css
.fri-input {
  --fri-input-bg: var(--color-field);
  @apply bg-(--fri-input-bg);            /* ✅ local var indirection */
}
```

**เหตุผล:**
- สั้นกว่า (`text-foreground` vs `text-(--color-foreground)`)
- Industry standard (shadcn/HeroUI/Mantine)
- Tailwind-idiomatic
- IDE autocomplete support

**Grep check สำหรับ audit:**
```bash
grep -nE '(bg|text|border|ring|ring-offset)-\(--color-' packages/styles/src/components/
```
ถ้าเจอ = violation (should be utility-style)

## ❌ No Magic Values

**ห้ามเด็ดขาด** — ค่า rem/decimal ที่ไม่มีที่มา ใน component CSS:

```css
/* ❌ Raw rem — no source of truth */
.fri-X {
  --fri-X-base: 0.8rem;      /* magic */
  --fri-X-spacing: 0.625;    /* magic scalar */
  margin-left: -14px;        /* magic px */
}

/* ✅ Tailwind @apply utility */
.fri-X { @apply -ms-3.5; }

/* ✅ Formula with known constants */
.fri-X { @apply py-[calc(1rem/2.058)]; }  /* golden ratio from formula.md */

/* ✅ Tailwind spacing token in calc */
.fri-X { --fri-X-base: calc(var(--spacing) * 8); }  /* = size-8 */

/* ✅ Explicit fraction (intent clear) */
.fri-X { --fri-X-ratio: calc(3 / 8); }  /* 37.5% — documented intent */
```

**Decision tree:**
1. Is there a Tailwind utility for this? → use `@apply -ms-N`, `@apply py-4`, etc.
2. Is it golden ratio spacing? → use formula from `formula.md`
3. Need CSS var for dynamic calc? → use `var(--spacing) * N` where N matches Tailwind scale
4. Need a ratio? → use explicit fraction `calc(A / B)` with comment showing percentage

**Why dangerous:**
- Magic values drift — no way to audit consistency
- AI-generated code often picks arbitrary decimals (`0.625`, `0.375`, `0.9`)
- Design review can't verify intent from naked numbers
- Dark mode / theming breaks when value not from token

## Utilities

```text
focus-ring      → two-color focus (WCAG AAA)
status-disabled → opacity + cursor + pointer-events
status-pending  → pointer-events-none
no-highlight    → -webkit-tap-highlight-color
size-match-font → 1em × 1em (icon sizing)
```
