---
description: Animation duration and easing curve rules
paths:
  - packages/styles/src/tokens/motion.css
  - packages/styles/src/components/**/*.css
---

# Motion

## Duration

```text
Instant = 100ms  (hover, toggle)
Fast    = 150ms  (active, focus)
Normal  = 200ms  (expand, slide)
Slow    = 300ms  (modal, page)
```

ทุกค่าต่ำกว่า Doherty Threshold (400ms)

## Easing

```text
ease-smooth = cubic-bezier(0.4, 0, 0.2, 1)  ← default
ease-in     = cubic-bezier(0.4, 0, 1, 1)     ← exit
ease-out    = cubic-bezier(0, 0, 0.2, 1)     ← entrance
```

ห้ามใช้ linear
