---
description: Design token system and component CSS conventions
paths:
  - packages/styles/src/**/*.css
---

# Styles

## Token Files

```text
palette.css    → fried-lime brand palette (@theme)
colors.css     → semantic tokens (@theme light + @layer base .dark)
layout.css     → radius, shadow, z-index, focus offset
motion.css     → duration, easing, keyframes
typography.css → heading sizes
```

## Semantic Color Groups (7 tokens each)

```text
{name}                 → solid bg
{name}-hover           → bg hover
{name}-active          → bg pressed
{name}-foreground      → text on solid bg
{name}-pale            → soft bg
{name}-pale-foreground → text on pale bg
{name}-pale-border     → border on pale bg
```

Groups: primary, secondary, success, warning, danger, info

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

## Component CSS Pattern

Base class includes defaults — `fri-{name}` alone = primary + md + default radius:

```css
.fri-{name} {
  /* layout */
  @apply inline-flex items-center justify-center;
  /* typography */
  @apply leading-none font-medium whitespace-nowrap;
  /* border */
  @apply border border-transparent select-none;

  /* default variant = primary */
  --fri-{name}-bg: var(--color-primary);
  --fri-{name}-fg: var(--color-primary-foreground);
  @apply bg-(--fri-{name}-bg) text-(--fri-{name}-fg);

  /* default size = md */
  @apply gap-2.5 px-4 py-2 text-base;

  /* default radius (if applicable) */
  @apply rounded-md;
}
```

## BEM Class Naming

```text
variant  → value only:   .fri-{name}--primary
size     → key-value:    .fri-{name}--size-md
radius   → key-value:    .fri-{name}--radius-lg
boolean  → key only:     .fri-{name}--disabled
element  → double under: .fri-{name}__spinner
```

## Icon Slot

Every component with icons:

```css
.fri-{name} [slot="icon"] {
  @apply size-match-font;
}
```

## Rules

- Use `@apply` + Tailwind v4 utilities — no plain CSS when utility exists
- **NO arbitrary values** — never use bracket syntax like `w-[...]` or `gap-[...]`. Always use Tailwind built-in classes
- Use semantic tokens via `var()` — never raw Tailwind colors
- All spacing in rem — never px (except border 1px)
- Interactive: wrap hover in `@media (hover: hover)`
- Interactive: include `motion-reduce:transition-none`
- Defaults in base class — modifiers are optional overrides

## Utilities

```text
focus-ring      → two-color focus (WCAG AAA)
status-disabled → opacity + cursor + pointer-events
status-pending  → pointer-events-none
no-highlight    → -webkit-tap-highlight-color
size-match-font → 1em × 1em (icon sizing)
```
