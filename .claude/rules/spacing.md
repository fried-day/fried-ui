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
Radius         = Tailwind step (rounded-sm → rounded-md → rounded-lg → rounded-xl → rounded-2xl)
Height         = auto — บังคับ leading-none
```

## Size Scale

Font scale ใช้ √φ (1.272): 14 → 16 → 20 → 24 — ข้าม 18px (text-lg) เพราะไม่ตรง logarithmic scale

| Size | x    | Font        | Padding Inline | Padding Block | Gap       | Radius        |
| ---- | ---- | ----------- | -------------- | ------------- | --------- | ------------- |
| sm   | 14px | `text-sm`   | `px-3.5`       | `py-1.5`      | `gap-2`   | `rounded-md`  |
| md   | 16px | `text-base` | `px-4`         | `py-2`        | `gap-2.5` | `rounded-lg`  |
| lg   | 20px | `text-xl`   | `px-5`         | `py-2.5`      | `gap-3`   | `rounded-xl`  |
| xl   | 24px | `text-2xl`  | `px-6`         | `py-3`        | `gap-4`   | `rounded-2xl` |

## Size Philosophy: Relative Scale (per Component)

`size="md"` ของ component ต่างกัน **ไม่จำเป็นต้องมีขนาดเท่ากัน** — sm/md/lg เป็น **relative scale ภายใน range ของ component นั้นๆ** (ไม่ใช่หน่วยกลาง)

ตัวอย่างที่ถูกต้อง:

| Component | sm | md | lg | xl |
| --------- | -- | -- | -- | -- |
| Badge   | 12px | 14px | 16px | — |
| Button  | 14px | 16px | 20px | 24px |

**เหตุผล:** Badge = label/tag (display, not pressed) → naturally smaller กว่า Button = interactive CTA → visual hierarchy ถูกต้อง

**Industry standard:** MUI / shadcn / HeroUI / Mantine ทุก lib ใช้ pattern เดียวกัน — `Chip md` ≠ `Button md`

**ห้าม unify** — ถ้า unify แล้ว Badge `lg` จะเท่า Button `md` → tag ใหญ่เกินสัดส่วน → break visual hierarchy

**Component start size:**
- Display (Badge, Tag, Chip) → start `sm = 12px (text-xs)`
- Interactive (Button, Input) → start `sm = 14px (text-sm)`
- Container (Card, Modal) → ใช้ body text base = 16px

## Container Anchor Base

Container components (Card, Modal, Alert) ใช้ body text เป็น x:

```text
Container padding = x × φ
Internal gap      = x
Section gap       = x / φ
```
