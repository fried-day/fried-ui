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
Gap            = x / φ
Radius         = Tailwind step (rounded-md → rounded-lg → rounded-xl)
Height         = auto — บังคับ leading-none
```

## Size Scale

| Size | Font        | Padding Inline | Padding Block | Gap       | Radius       |
| ---- | ----------- | -------------- | ------------- | --------- | ------------ |
| sm   | `text-sm`   | `px-3.5`       | `py-1.5`      | `gap-2`   | `rounded-md` |
| md   | `text-base` | `px-4`         | `py-2`        | `gap-2.5` | `rounded-lg` |
| lg   | `text-xl`   | `px-5`         | `py-2.5`      | `gap-3`   | `rounded-xl` |

## Container Anchor Base

Container components (Card, Modal, Alert) ใช้ body text เป็น x:

```text
Container padding = x × φ
Internal gap      = x
Section gap       = x / φ
```
