---
description: Complete design token system — color, elevation, spacing, motion, and constraints
paths:
  - packages/styles/src/**/*.css
  - packages/react/src/components/**/*.tsx
---

# Styles

## Design Reference

Dark mode inspired by **Framer** (framer.com). Use **Tailwind v4 built-in colors** for semantic tokens. Custom brand palette is `fried-lime` only.

## Token Architecture

```text
palette.css  → fried-lime custom brand palette (@theme)
colors.css   → @theme (light defaults) + @layer base .dark (dark override)
layout.css   → radius, shadow, z-index
motion.css   → duration, easing, keyframes
typography.css → heading sizes
```

---

## Color

### Semantic Color Groups (6 tokens each)

```text
{name}                 → solid bg (button, badge)
{name}-hover           → bg hover
{name}-active          → bg pressed
{name}-foreground      → text on solid bg
{name}-pale            → soft bg (alert, badge bg, soft button)
{name}-pale-foreground → text on pale bg
```

Groups: `primary`, `secondary`, `success`, `warning`, `danger`, `info`

### Palette Sources

```text
primary   → fried-lime (custom)
secondary → neutral (Tailwind)
success   → green (Tailwind)     — light: 600, dark: 500
warning   → amber (Tailwind)     — light: 500, dark: 500
danger    → rose (Tailwind)      — light: 600, dark: 500
info      → blue (Tailwind)      — light: 600, dark: 500
```

### State Step Direction

```text
Light: hover = base + 1 step DARKER  (600 → 700 → 800)
Dark:  hover = base + 1 step DARKER  (500 → 600 → 700)
Exception: secondary dark = LIGHTER  (800 → 700 → 600)
```

### Contrast (WCAG 2.1)

```text
Oklch L < 0.6  → foreground = white
Oklch L ≥ 0.6  → foreground = dark (neutral-950)
```

### Layout Elevation (dark = lighter is higher)

```text
Layer 1: background           → black / white
Layer 2: background-secondary → neutral-950 / neutral-50    (sidebar, header)
Layer 3: surface              → neutral-900 / neutral-100   (card, modal)
Layer 4: popover              → neutral-800 / white         (tooltip, dropdown)
```

### Typography Hierarchy

```text
heading              → neutral-950 / neutral-50     (h1-h6)
foreground           → neutral-950 / neutral-50     (body text)
foreground-secondary → neutral-600 / neutral-400    (subtitle, description)
foreground-muted     → neutral-400 / neutral-500    (caption, hint, timestamp)
```

### Token Reference — Every Token and Its Purpose

**Semantic colors (6 per group × 6 groups = 36 tokens):**

| Token                            | Purpose                                       |
| -------------------------------- | --------------------------------------------- |
| `--color-{name}`                 | solid bg — button, badge, alert border        |
| `--color-{name}-hover`           | bg on hover                                   |
| `--color-{name}-active`          | bg on pressed/active                          |
| `--color-{name}-foreground`      | text on solid bg (white or dark per contrast) |
| `--color-{name}-pale`            | soft bg — soft button, alert bg, badge bg     |
| `--color-{name}-pale-foreground` | text on pale bg (dark shade of same hue)      |

**Layout (13 tokens):**

| Token                          | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| `--color-background`           | page background (layer 1)                            |
| `--color-background-secondary` | sidebar, header, footer background (layer 2)         |
| `--color-foreground`           | primary body text                                    |
| `--color-surface`              | card, modal background (layer 3)                     |
| `--color-surface-hover`        | card bg on hover                                     |
| `--color-surface-active`       | card bg on pressed                                   |
| `--color-surface-foreground`   | text on card                                         |
| `--color-popover`              | tooltip, dropdown menu background (layer 4, highest) |
| `--color-popover-foreground`   | text on popover                                      |
| `--color-muted`                | ghost button, tag, chip background                   |
| `--color-muted-hover`          | muted bg on hover                                    |
| `--color-muted-active`         | muted bg on pressed                                  |
| `--color-muted-foreground`     | secondary text, caption on muted bg                  |

**Typography (4 tokens):**

| Token                          | Purpose                               |
| ------------------------------ | ------------------------------------- |
| `--color-heading`              | h1-h6 headings (strongest contrast)   |
| `--color-foreground-secondary` | subtitle, description, secondary text |
| `--color-foreground-muted`     | caption, hint, timestamp, helper text |
| `--color-code`                 | inline `code` text color              |

**Code & Mark (3 tokens):**

| Token                     | Purpose                       |
| ------------------------- | ----------------------------- |
| `--color-code-background` | inline `code` background      |
| `--color-mark`            | `<mark>` highlight background |
| `--color-mark-foreground` | `<mark>` highlight text       |

**UI Elements (4 tokens):**

| Token                         | Purpose                                 |
| ----------------------------- | --------------------------------------- |
| `--color-separator`           | `<hr>`, divider lines                   |
| `--color-skeleton`            | loading skeleton placeholder background |
| `--color-disabled`            | disabled element background             |
| `--color-disabled-foreground` | disabled element text                   |

**Border (2 tokens):**

| Token                  | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `--color-border`       | default border — input, card, outline button |
| `--color-border-hover` | border on hover                              |

**Form Field (6 tokens):**

| Token                        | Purpose                          |
| ---------------------------- | -------------------------------- |
| `--color-field`              | input/textarea/select background |
| `--color-field-hover`        | input bg on hover                |
| `--color-field-foreground`   | typed input text                 |
| `--color-field-border`       | input border                     |
| `--color-field-border-hover` | input border on hover            |
| `--color-field-placeholder`  | placeholder text                 |

**Selection (2 tokens):**

| Token                          | Purpose                            |
| ------------------------------ | ---------------------------------- |
| `--color-selection`            | `::selection` highlight background |
| `--color-selection-foreground` | `::selection` text color           |

**Chart (5 tokens):**

| Token             | Purpose                            |
| ----------------- | ---------------------------------- |
| `--color-chart-1` | data visualization color 1 (brand) |
| `--color-chart-2` | data visualization color 2         |
| `--color-chart-3` | data visualization color 3         |
| `--color-chart-4` | data visualization color 4         |
| `--color-chart-5` | data visualization color 5         |

**Misc (4 tokens):**

| Token                | Purpose                                 |
| -------------------- | --------------------------------------- |
| `--color-link`       | `<a>` text color                        |
| `--color-link-hover` | `<a>` hover color                       |
| `--color-ring`       | focus ring color (keyboard navigation)  |
| `--color-overlay`    | modal/dialog backdrop (black + opacity) |

### Color Rules

- Components MUST use semantic tokens via `var()` — never raw Tailwind colors
- All tokens MUST exist in both `@theme` (light) and `.dark` (dark)
- Never defer tokens — add all upfront, consumers will break if added later
- Pale: light uses step 50, dark uses step 950
- `muted` and `surface` MUST have different values

---

## Elevation

### Shadow (Framer-inspired)

```text
shadow-1      → 0 1px 2px black/5%                                          (subtle)
shadow-2      → 0 2px 8px black/8%, 0 1px 2px black/6%                      (card)
shadow-3      → 0 8px 24px black/12%, 0 2px 8px black/8%                    (dropdown)
shadow-4      → 0 25px 50px black/25%, 0 5px 25px black/15%                 (modal)
shadow-border → inset 0 0.5px 0 white/25%, 0 0 0 1px white/10%             (dark mode edge)
```

### Z-Index

```text
z-floating   → 10  (dropdown, tooltip)
z-navigation → 20  (sticky header, sidebar)
z-overlay    → 30  (backdrop)
z-dialog     → 40  (modal, drawer)
z-alert      → 50  (toast, notification)
```

Never use arbitrary z-index (z-[99], z-[9999])

---

## Spacing

### x = font-size is the base unit

All spacing values MUST be in **rem** (never px).

```text
x = font-size
φ = 1.618

Padding Inline = x
Padding Block  = x × 0.485
Gap            = x / φ (exact rem)
Height         = auto (requires leading-none)
```

### Size Steps

```text
sm → 0.875rem (text-sm)   md → 1rem (text-base)
lg → 1.25rem (text-xl)    xl → 1.5rem (text-2xl)
```

### Computed Values

| Property       | sm       | md       | lg       | xl       |
| -------------- | -------- | -------- | -------- | -------- |
| Padding Inline | 0.875rem | 1rem     | 1.25rem  | 1.5rem   |
| Padding Block  | 0.375rem | 0.5rem   | 0.625rem | 0.75rem  |
| Gap            | 0.541rem | 0.618rem | 0.773rem | 0.927rem |

### Font Scale

Use √φ (1.272) — skip text-lg (18px), it breaks logarithmic scale

### Container Anchor Base

```text
Container padding = x × φ
Internal gap      = x
Section gap       = x / φ
```

### Icon Scale

Icons lock to font-size via `size-match-font` (1em × 1em)

---

## Motion

### Duration (all < 400ms Doherty Threshold)

```text
instant → 100ms  (toggle, checkbox)
fast    → 150ms  (button hover, color change)
normal  → 200ms  (dropdown open, fade)
slow    → 300ms  (modal enter, slide)
```

### Easing

```text
ease-smooth → cubic-bezier(0.4, 0, 0.2, 1)  — default
ease-in     → cubic-bezier(0.4, 0, 1, 1)    — exiting
ease-out    → cubic-bezier(0, 0, 0.2, 1)    — entering
ease-in-out → cubic-bezier(0.4, 0, 0.2, 1)  — moving
```

Never use `linear`. Always include `motion-reduce:transition-none`.

### Keyframes

```text
fade-in / fade-out / slide-in-up / slide-in-down / scale-in
```

All use 200ms ease-out. `prefers-reduced-motion: reduce` sets all to none.

---

## Constraints

### Units

- rem for all spacing — never px for component dimensions
- Exception: border 1px (hardware), focus ring 2px

### Typography

- √φ scale — skip text-lg (18px)
- Single-line components → `leading-none`
- Body text → `line-height = x × φ`

### Borders

1px always — never scale with φ. Focus ring = 2px.

### Touch Target (WCAG 2.5.5)

Mobile (< 768px) clickable ≥ 44×44px

### Token Completeness

Never defer tokens. Every semantic group = 6 tokens. This is a public lib.

### Inline Types

```tsx
variant?: "primary" | "secondary" | ...  // ✓ IDE shows options
variant?: ButtonVariant                   // ✗ IDE shows type name
```

### Import Path

Docs/examples use `@fried-ui/react` barrel — not `@fried-ui/react/button`

### Responsive

Container padding on mobile ÷ φ one step. Grid uses `1fr : 1.618fr`.
