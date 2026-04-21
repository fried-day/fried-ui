---
description: CSS conventions, class naming, tokens, and utilities
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
.avatar {
  @apply bg-(--color-fri-neutral-200);
}

/* ✅ Component referencing semantic */
.avatar {
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

Base class includes defaults — `{name}` alone = primary + md + default radius.
Spacing and radius use golden ratio formula — see `formula.md`.

## Base = Default Modifier (1:1 parity)

`<Component>` (React, no props) **must render identically to** `<tag class="{name}">` (plain HTML, minimal class). ทั้งคู่ต้อง pick up default variant/size/radius จาก base class

**Rule:** Base class's default value **ต้องตรงกับ** explicit default modifier rule (same CSS output)

```css
/* ❌ Drift — base ≠ modifier */
.button {
  @apply rounded-md;                          /* Tailwind 0.375rem */
}
.button-radius-md {
  @apply rounded-[calc(1em*1.272*2/4)];       /* formula 0.636em */
}
/* <Button> renders 0.375rem, <Button radius="md"> renders 0.636em → different */

/* ✅ Aligned */
.button {
  @apply rounded-[calc(1em*1.272*2/4)];       /* same formula */
}
.button-radius-md {
  @apply rounded-[calc(1em*1.272*2/4)];       /* same formula */
}
/* <Button> and <Button radius="md"> render identically */
```

### Required parity for every component

| Axis | Base class must set | Default modifier must match |
|------|---------------------|-----------------------------|
| Variant | default variant tokens | `.X--{default-variant}` same tokens |
| Size | default size spacing + font | `.X--size-{default-size}` same |
| Radius | default radius formula | `.X--radius-{default-radius}` same |

### JSDoc `@default` must reflect reality

`@default 'md'` in `.variants.ts` คือ **promise** to user ว่า `<Component>` (no props) ใช้ radius=md. ถ้า base class render `rounded-full` → JSDoc ต้องเป็น `@default 'full'`

```tsx
/* ❌ JSDoc ลอก promise */
/** @default 'md' */ radius?: ...;
// but base class uses rounded-full → actual default is 'full'

/* ✅ JSDoc สะท้อนความจริง */
/** @default 'full' */ radius?: ...;  // matches base
```

### Why this matters

- **Plain HTML consumer** (WP/PHP): user writes `<button class="button">` — base class is only source of defaults
- **React consumer**: `<Button>` with no props → classes() skips modifier (no class added) → base class wins
- ถ้า drift → React default behavior ≠ plain HTML default behavior → **violates 1:1 parity promise**

### Grep audit
```bash
# หา base class ที่ใช้ Tailwind rounded-{size} (ไม่ใช่ formula) — ต้อง align กับ formula ใน modifier
grep -nE '^\s*\.\w+\s*\{|@apply.*rounded-(sm\|md\|lg)\b' packages/styles/src/components/*.css
```

## class-naming Class Naming

```text
variant  → value only:   .{name}--primary
size     → key-value:    .{name}--size-md
radius   → key-value:    .{name}--radius-lg
boolean  → key only:     .{name}--disabled
element  → double under: .{name}__spinner
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
.input {
  /* Mouse click only — NOT keyboard */
  &:has(:focus:not(:focus-visible)),
  &:has([data-focused]:not([data-focus-visible])) {
    @apply border-(--input-border-focus);
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
.button {
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
.{name} [slot="icon"],
.{name} [slot="icon-start"],
.{name} [slot="icon-end"] {
  @apply size-match-font;
}
```

## Rules

- Use `@apply` + Tailwind v4 utilities — no plain CSS when utility exists
- Use `[calc(...)]` bracket syntax with formula — see `formula.md`
- Use semantic tokens via `var()` — never raw Tailwind colors
- Component CSS references semantic tokens only (Layer 2) — never `--color-*` palette (Layer 1)
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
.input {
  @apply transition-colors duration-(--duration-hover);
  &:has([data-focused]) {
    @apply ring-1 ring-focus;  /* pops in ทันที */
  }
}

/* ✅ ทุกอย่าง smooth */
.input {
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

### Pattern ✅ (dual selector)

```css
/* Exclude focused/pressed from hover */
&:has(:hover):not(:has(:focus)):not(:has(:active)):not(:has(:disabled)):not(:has(:read-only)),
&:has([data-hovered])
  :not(:has([data-focused]))
  :not(:has([data-pressed]))
  :not(:has([data-disabled]))
  :not(:has([data-readonly])) {
  @apply bg-(--X-bg-hover);
}

/* Focus (mouse) */
&:has(:focus:not(:focus-visible)),
&:has([data-focused]:not([data-focus-visible])) {
  @apply border-(--X-border-focus);
}

/* Focus (keyboard) */
&:has(:focus-visible),
&:has([data-focus-visible]) {
  @apply focus-ring;
}

/* Pressed — last to win cascade */
&:active:not(:disabled),
&[data-pressed] {
  @apply bg-(--X-bg-pressed);
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

## Dual Selector — Native pseudo-class + React Aria data-attr

**`@fried-ui/styles` เป็น pure CSS** — ต้องใช้ได้กับ **2 consumer**:
1. `@fried-ui/react` (React Aria สร้าง `data-hovered`, `data-focused`, `data-disabled`, ...)
2. **Plain HTML / WordPress / PHP / static site** (ใช้ native `<button disabled>`, `<input required>`, native `:hover`/`:focus`/`:active`)

ถ้า CSS ใช้แต่ `[data-X]` — plain HTML consumer จะไม่มี state เลย

**Rule:** ทุก state rule **ต้องเขียน 2 selector** — native pseudo-class + React Aria `data-*` attr (comma selector list)

### Mapping table

| React Aria | Native | Applies to |
|------------|--------|------------|
| `[data-hovered]` | `:hover` | ทุก element |
| `[data-focused]` | `:focus` | form controls, links, buttons |
| `[data-focus-visible]` | `:focus-visible` | form controls, links, buttons |
| `[data-pressed]` | `:active` | interactive elements |
| `[data-disabled]` | `:disabled` (form controls) / `[aria-disabled="true"]` (non-form) | depends |
| `[data-readonly]` | `:read-only` | form controls |
| `[data-required]` | `:required` | form controls |
| `[data-invalid]` | `:invalid` / `[aria-invalid="true"]` | form controls |

### Pattern — Form control (Button)

```css
&:disabled,
&[data-disabled] {
  @apply status-disabled;
}

&:focus-visible,
&[data-focus-visible] {
  @apply focus-ring;
}

&:hover:not(:disabled):not(:active),
&[data-hovered] {
  @apply bg-(--button-bg-hover);
}

&:active:not(:disabled),
&[data-pressed] {
  @apply bg-(--button-bg-pressed);
}
```

### Pattern — Form input (Wrapper + Self dual-mode)

**Goal:** `@fried-ui/styles` ต้องใช้ได้ทั้ง 2 mode:

```html
<!-- Mode 1: Self (daisyUI-style single class) -->
<input class="input" placeholder="..." />

<!-- Mode 2: Wrapper (for icons/prefix/suffix) -->
<div class="input">
  <svg class="input-icon-start">...</svg>
  <input class="input-field" />
</div>
```

**CSS uses 3-way selector** — self + wrapper + React Aria data-attr:

```css
.input {
  /* Base: outline-none + placeholder color baked in base (for self-mode) */
  @apply outline-none placeholder:text-(--input-placeholder);

  /* Hover — :hover propagates to ancestors, so same rule covers both modes */
  &:hover:not(:focus-within):not(:read-only):not(:disabled):not(:has(:read-only)):not(:has(:disabled)),
  &:has([data-hovered]):not(:has([data-focused])):not(:has([data-readonly])):not(:has([data-disabled])) {
    @apply bg-hover;
  }

  /* Focus (mouse) — :focus-within covers both self AND wrapper */
  &:focus-within:not(:focus-visible):not(:has(:focus-visible)),
  &:has([data-focused]:not([data-focus-visible])) { ... }

  /* Focus (keyboard) */
  &:focus-visible,
  &:has(:focus-visible),
  &:has([data-focus-visible]) { @apply focus-ring; }

  /* Required/Invalid/Disabled — self + wrapper */
  &:required,
  &:has(:required),
  &:has([data-required]) { ... }

  &:invalid,
  &[aria-invalid="true"],
  &:has(:invalid),
  &:has([aria-invalid="true"]),
  &:has([data-invalid]) { ... }

  &:disabled,
  &:has(:disabled),
  &:has([data-disabled]) { @apply status-disabled; }
}
```

**Key insight — which pseudo-classes propagate:**

| Pseudo | Self-only | Propagates to ancestors |
|--------|-----------|-------------------------|
| `:hover` | - | ✅ ใช้คลุมทั้ง wrapper + self ได้ |
| `:focus-within` | - | ✅ matches both self + wrapper-with-focused-descendant |
| `:focus`, `:focus-visible` | ✅ | - ต้อง `:has()` สำหรับ wrapper |
| `:disabled`, `:read-only`, `:required`, `:invalid` | ✅ | - ต้อง `:has()` สำหรับ wrapper |
| `[aria-invalid="true"]` | ✅ (attr) | - ต้อง `:has()` สำหรับ wrapper |

**ใช้ `:focus-within` แทน `:has(:focus)` + `:focus`** — consolidate 1 selector ครอบ 2 mode

### Pattern — Non-form-control (Label/Description)

`<label>` / `<span>` / `<div>` ไม่มี native `:disabled` pseudo — ใช้ `[aria-disabled="true"]` (HTML standard). ต้องใช้ `status-disabled` utility — ไม่เขียน raw:

```css
&--disabled,
&[aria-disabled="true"],
&[data-disabled] {
  @apply status-disabled;
}
```

### Native vs React Aria ชนกันไหม?

ไม่ชน — style เหมือนกันใน 2 selector. React Aria ตั้ง `data-hovered` เพิ่ม cross-device logic (touch/keyboard) ขณะที่ native `:hover` ก็ fire จาก browser พร้อมกัน. ใน React app ทั้ง 2 match พร้อมกัน → apply same style. ใน plain HTML มีแค่ native pseudo-class fire

### Rules

1. ทุก state rule = 2+ selectors (comma list) — native + data-attr
2. Form controls: `:disabled` + `[data-disabled]`
3. Non-form (Label, Description, Surface wrapper): `[aria-disabled="true"]` + `[data-disabled]`
4. Invalid form: ใส่ 3 — `:invalid` + `[aria-invalid="true"]` + `[data-invalid]`
5. **ห้าม** ใช้ `[data-X]` เดี่ยวๆ ใน component CSS (breaks plain HTML)

### Grep audit

```bash
# หา data-attr ทุกตัวใน component CSS — ทุก match ต้องมี native pseudo-class คู่ในบล็อก
grep -nE '\[data-(hovered|focused|focus-visible|pressed|disabled|readonly|required|invalid)\]' packages/styles/src/components/
```

### modifier classes ยังใช้ได้สำหรับ:
- Component's own variants (`--size-md`, `--variant-outline`, `--radius-lg`)
- Custom flags ที่ไม่มีใน native หรือ React Aria (`--full-width`, `--icon-only`)

### Rule for Component.tsx
```tsx
classes({
  block: "input",
  modifiers: {
    variant,    // ✅ own variant
    size,       // ✅ own size
    radius,     // ✅ own radius
    // ❌ ไม่ใส่ state (React Aria handles via data-attr, CSS already handles native pseudo-class)
  },
})
```

## Utility-style over var-syntax (for theme tokens)

Tailwind v4 `@theme static` generate utility class ให้ทุก semantic token — ใช้ utility-style ดีกว่า `var()` shorthand

| Pattern | Use | Example |
|---------|-----|---------|
| **Utility-style** (preferred) | theme tokens (Layer 2 semantic) | `text-foreground`, `bg-primary`, `border-danger`, `ring-focus-inner` |
| **Var-syntax `bg-(--X)`** | Component-local CSS vars (Layer 3) | `bg-(--input-bg)`, `border-(--button-bg-hover)` |

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
.input {
  --input-bg: var(--color-field);
  @apply bg-(--input-bg);            /* ✅ local var indirection */
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
.X {
  --X-base: 0.8rem;      /* magic */
  --X-spacing: 0.625;    /* magic scalar */
  margin-left: -14px;        /* magic px */
}

/* ✅ Tailwind @apply utility */
.X { @apply -ms-3.5; }

/* ✅ Formula with known constants */
.X { @apply py-[calc(1rem/2.058)]; }  /* golden ratio from formula.md */

/* ✅ Tailwind spacing token in calc */
.X { --X-base: calc(var(--spacing) * 8); }  /* = size-8 */

/* ✅ Explicit fraction (intent clear) */
.X { --X-ratio: calc(3 / 8); }  /* 37.5% — documented intent */
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
status-disabled → opacity + cursor + pointer-events (canonical disabled visual)
status-pending  → pointer-events-none
no-highlight    → -webkit-tap-highlight-color
size-match-font → 1em × 1em (icon sizing)
```

### `status-disabled` is canonical — ห้ามเขียน raw

ทุก disabled rule (native `:disabled`, `[aria-disabled="true"]`, `[data-disabled]`, `--disabled` modifier) **ต้อง** ใช้ `@apply status-disabled` — ห้ามเขียน `@apply pointer-events-none opacity-50` ตรงๆ:

```css
/* ❌ Raw disabled — ขาด cursor-not-allowed, drift กับ component อื่น */
&[data-disabled] {
  @apply pointer-events-none opacity-50;
}

/* ✅ Canonical — ใช้ utility เดียวทั่วทั้ง library */
&[data-disabled] {
  @apply status-disabled;
}
```

`status-disabled` (defined in `packages/styles/src/utilities/status.css`) expands to `pointer-events-none cursor-(--cursor-disabled) opacity-(--disabled-opacity)` — รวม 3 properties ที่ disabled state ต้องมีครบ (cursor feedback ด้วย) เพื่อ consistent visual ทุก component

**Rule:** grep audit — ถ้าเจอ `pointer-events-none opacity-50` ใน component CSS = violation

```bash
grep -rn 'pointer-events-none.*opacity-50\|opacity-50.*pointer-events-none' packages/styles/src/components/
```
