---
description: Color state mathematics, contrast rules, and semantic token policy
paths:
  - packages/styles/src/tokens/colors.css
  - packages/styles/src/components/**/*.css
---

# Color

## State Mathematics

Hover/Active ใช้ Tailwind palette step ที่มืดลงจาก base:

```text
Hover  = base + 1 step (เช่น 500 → 600)
Active = base + 2 steps (เช่น 500 → 700)
```

ทั้ง light mode และ dark mode ใช้ทิศทางเดียวกัน — มืดลงเสมอ

## Contrast Auto-switch (WCAG 2.1)

```text
L < 0.6  → foreground = white
L ≥ 0.6  → foreground = gray-900/neutral-950
```

## Semantic Tokens Only

Component ห้ามใช้สีตรงๆ (`bg-blue-500`) — ใช้แค่ semantic tokens:

```text
bg-primary, text-primary-foreground, bg-surface, border-border
```

Semantic tokens ใช้ `var()` จาก Tailwind built-in colors + custom palette
