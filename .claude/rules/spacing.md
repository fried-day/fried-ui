---
description: Golden ratio spacing formula, size scale, and container anchor base
paths:
  - packages/styles/src/components/**/*.css
  - packages/react/src/components/**/*.tsx
---

# Spacing (Golden Ratio)

## x = font-size is the base unit

When size changes, x must change too — Proportional Scaling

```text
x = font-size (base unit)
φ = 1.618

Padding Inline = x
Padding Block  = x × 0.485
Gap            = x / φ (use exact value)
Height         = auto — requires leading-none
```

## Radius is NOT part of size

Radius is a separate prop — it controls style/branding, not structure.
Size only controls spacing (padding, gap, font) via φ math.

## Font Scale

Use √φ (1.272) — skip steps that break logarithmic scale

## Size Scale

See actual values in `packages/styles/src/components/` for each component — calculated from the formula above

## Container Anchor Base

Container components use body text font-size as x:

```text
Container padding = x × φ
Internal gap      = x
Section gap       = x / φ
```
