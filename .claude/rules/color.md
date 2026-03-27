---
description: Color state mathematics, contrast rules, and semantic token policy
paths:
  - packages/styles/src/tokens/colors.css
  - packages/styles/src/components/**/*.css
---

# Color

## State Mathematics (Oklch)

```text
Hover  = หักค่า L ลง 5-8% จาก base
Active = หักค่า L ลง 12-15% จาก base
```

## Contrast Auto-switch (WCAG 2.1)

```text
L < 0.6  → foreground = white
L ≥ 0.6  → foreground = gray-900
```

## Semantic Tokens Only

Component ห้ามใช้สีตรงๆ (`bg-blue-500`) — ใช้แค่ semantic tokens:

```text
bg-primary, text-primary-foreground, bg-surface, border-border
```
