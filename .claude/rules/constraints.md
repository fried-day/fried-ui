---
description: System limits, hardware constraints, and safety nets
paths:
  - packages/styles/src/**/*.css
  - packages/react/src/components/**/*.tsx
---

# Constraints

## Typography Scale: √φ (1.272) ไม่ใช่ φ

```text
n=0: 16px (base)
n=1: 20px (lg)
n=2: 26px (heading)
n=3: 33px (display)
```

## Body Text Line-height: x × φ

Single-line (Button) → `leading-none`
Paragraph → `line-height = x × φ` → 16px font = `leading-7` (28px)

## Borders: ล็อก 1px

ห้าม scale border/stroke/divider ตาม φ — ล็อก 1px เสมอ
ยกเว้น focus ring = 2px

## Grid Layout

```css
grid-template-columns: 1fr 1.618fr;
```

## Touch Target (WCAG 2.5.5)

Mobile (< 768px) ทุก clickable ต้องมี hit area ≥ 44×44px
ใช้ `::after` pseudo-element ขยายแบบโปร่งใส

## Responsive Collapse

```text
Desktop: container padding = x × φ → p-6
Mobile:  container padding = x     → p-4
```

## Icon Scale

ไอคอนคู่กับ text ใช้ `w-[1em] h-[1em]` — lock กับ font-size
