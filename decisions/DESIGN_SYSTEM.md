# fried-ui Design System

ผลจากการ audit และ discuss แนวทาง design ของ fried-ui component library

## Design Principles

### 1. Semantic Intent Over Visual Style

ใช้ชื่อ variant ตามความหมาย ไม่ใช่ตาม visual (ไม่ใช้ solid, bordered, flat)

ตัวอย่าง: `variant="danger"` ไม่ใช่ `variant="solid" color="red"`

### 2. Single-Axis Variant

fried-ui ใช้ **แกนเดียว** (`variant` prop เดียว) — ไม่แยก color + variant

เหตุผล:

- ง่ายสำหรับ developer — 1 prop, 1 decision
- ง่ายสำหรับ LLM — generate code ถูกต้อง, ไม่มี invalid combo

### 3. Accessibility as Foundation

ทุก component wrap React Aria Components — ARIA, keyboard, focus, screen reader มาให้

### 4. Progressive Disclosure

```tsx
<Button>Save</Button>
<Button variant="danger" size="lg" isPending>Deleting...</Button>
```

### 5. Separation of Styles and Logic

- `@fried-ui/styles` — pure CSS: tokens, `@utility`, component BEM styles
- `@fried-ui/react` — React components, behavior, accessibility

Multi-framework ready: styles ใช้ได้กับ Vue, Svelte, vanilla HTML

### 6. CSS-First, No JavaScript Runtime

- Design tokens ใน `@theme`
- Component styles ใน CSS + BEM (`fri-` prefix) + `@apply`
- ไม่มี tailwind-variants, ไม่มี JS runtime styling
- Dark mode: `prefers-color-scheme` + `@custom-variant dark`
- `prefers-reduced-motion` โดยอัตโนมัติ

### 7. Golden Ratio Spacing

- x = font-size เป็นตัวตั้ง ทุกค่า derive จาก φ
- เมื่อ size เปลี่ยน x ต้องเปลี่ยนด้วย (Proportional Scaling)
- Snap ไป Tailwind class ที่ใกล้สุด

### 8. Color State Mathematics

- Hover/Active คำนวณจาก Oklch L (Lightness) ที่สมมาตร
- Semantic tokens ใช้ `var()` จาก Tailwind built-in + custom palette
- Custom palette อยู่ใน `tokens/palette.css`

## Variant System

### Semantic Variants

| Variant     | Intent                     | ใช้เมื่อ                                   |
| ----------- | -------------------------- | ------------------------------------------ |
| `primary`   | Main forward action        | Action หลักของหน้า/section (1 ต่อ context) |
| `secondary` | Alternative action         | Action รอง, ทางเลือก                       |
| `success`   | Positive / confirmation    | ยืนยัน, สำเร็จ, approve                    |
| `warning`   | Caution / attention        | เตือน, ต้องระวัง                           |
| `danger`    | Destructive / irreversible | ลบ, ยกเลิก, action ที่ย้อนกลับไม่ได้       |
| `info`      | Informational              | แจ้งข้อมูล, neutral context                |
| `ghost`     | Low-emphasis / dismissive  | Cancel, skip, tertiary action              |
| `link`      | Inline text-like           | Navigation, inline action ใน text          |

### Sizes

| Size | ใช้เมื่อ                  |
| ---- | ------------------------- |
| `sm` | Compact, dense UI         |
| `md` | Default, ใช้ทั่วไป        |
| `lg` | Prominent, touch-friendly |

### Default Values

ทุก component: `variant="primary"`, `size="md"` เป็น default

## Component API Conventions

- `variant` + `size` เป็น optional เสมอ (มี default)
- State props ใช้ `is-` prefix — `isDisabled`, `isPending` (React Aria)
- Event handlers ใช้ `on-` prefix — `onPress` (React Aria)
- `className` สำหรับ override styles
