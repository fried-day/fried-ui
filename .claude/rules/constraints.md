---
description: System limits, hardware constraints, and safety nets
paths:
  - packages/styles/src/**/*.css
  - packages/react/src/components/**/*.tsx
---

# Constraints

## Typography Scale

Use √φ (1.272) instead of φ (1.618) — prevents font scale jumping too aggressively

## Line-height

- Single-line components → `leading-none`
- Paragraph/body text → `line-height = x × φ`

## Borders

Lock at 1px always — never scale with φ (hardware constraint)
Exception: focus ring = 2px

## Touch Target (WCAG 2.5.5)

Mobile (< 768px) all clickable elements must have hit area ≥ 44×44px

## Responsive Collapse

Container padding on mobile divides by φ one step down

## Icon Scale

Icons paired with text lock to font-size (1em) — see `@utility` definitions

## Grid Layout

Use CSS Grid `1fr : 1.618fr` instead of 12-column when appropriate
