---
description: Golden ratio spacing formula, size scale, and container anchor base
paths:
  - packages/styles/src/components/**/*.css
  - packages/react/src/components/**/*.tsx
---

# Spacing (Golden Ratio)

## x = font-size คือตัวตั้ง

เมื่อ size เปลี่ยน x ต้องเปลี่ยนด้วย — Proportional Scaling

```text
x = font-size (ตัวตั้ง)
φ = 1.618

Padding Inline = x
Padding Block  = x × 0.485
Gap            = x / φ (exact value, ใช้ arbitrary เช่น gap-[9.89px])
Radius         = --radius × multiplier (× 0.5, × 1, × 1.5, × 2)
Height         = auto — บังคับ leading-none
```

## Size Scale

Font scale ใช้ √φ (1.272): 14 → 16 → 20 → 24 — ข้าม 18px (text-lg) เพราะไม่ตรง logarithmic scale

| Size | x    | Font        | Padding Inline | Padding Block | Gap             | Radius           |
| ---- | ---- | ----------- | -------------- | ------------- | --------------- | ---------------- |
| sm   | 14px | `text-sm`   | `px-3.5`       | `py-1.5`      | `gap-[8.65px]`  | `--radius × 0.5` |
| md   | 16px | `text-base` | `px-4`         | `py-2`        | `gap-[9.89px]`  | `--radius × 1`   |
| lg   | 20px | `text-xl`   | `px-5`         | `py-2.5`      | `gap-[12.36px]` | `--radius × 1.5` |
| xl   | 24px | `text-2xl`  | `px-6`         | `py-3`        | `gap-[14.83px]` | `--radius × 2`   |

## Container Anchor Base

Container components (Card, Modal, Alert) ใช้ body text เป็น x:

```text
Container padding = x × φ
Internal gap      = x
Section gap       = x / φ
```
