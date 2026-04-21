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
