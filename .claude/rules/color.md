---
description: Color state mathematics, contrast rules, and semantic token policy
paths:
  - packages/styles/src/tokens/colors.css
  - packages/styles/src/components/**/*.css
---

# Color

## State Steps

Hover/Active use Tailwind palette steps darker from base:

```text
Hover  = base + 1 step
Active = base + 2 steps
```

Both light and dark mode use the same direction — always darken

## Contrast (WCAG 2.1)

Use Oklch L (Lightness) to determine foreground:

```text
L < 0.6  → foreground = white
L ≥ 0.6  → foreground = dark (neutral-950)
```

## Semantic Tokens

Components must not use raw colors — always use semantic tokens via `var()`
Semantic tokens reference Tailwind built-in colors + custom palette
