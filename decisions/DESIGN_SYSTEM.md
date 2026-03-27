# fried-ui Design System

ผลจากการ audit และ discuss แนวทาง design ของ fried-ui component library

## Design Principles

### 1. Semantic Intent Over Visual Style

ใช้ชื่อ variant ตามความหมาย ไม่ใช่ตาม visual (ไม่ใช้ solid, bordered, flat)

ตัวอย่าง: `variant="danger"` ไม่ใช่ `variant="solid" color="red"`

เหตุผล: dev เห็น `danger` รู้ทันทีว่า action นี้ destructive — ไม่ต้องตีความจาก visual style

### 2. Single-Axis Variant

fried-ui ใช้ **แกนเดียว** (`variant` prop เดียว) — ไม่แยก color + variant แบบ MUI/Chakra

เหตุผลที่เลือก:

- **ง่ายสำหรับ developer** — 1 prop, 1 decision ต่อ component
- **ง่ายสำหรับ LLM** — generate code ถูกต้อง, ไม่มี invalid combo (2 แกน = เยอะ combo, LLM พลาดง่าย)
- **ตรงกับ trend** — shadcn/ui (most loved), HeroUI v3 (ตัด color prop ทิ้งจาก v2)

ทางเลือกที่พิจารณาแล้วไม่เลือก:

| Approach                      | ตัวอย่าง             | เหตุผลที่ไม่เลือก                                      |
| ----------------------------- | -------------------- | ------------------------------------------------------ |
| 2 แกน (color + variant)       | MUI, Chakra, Mantine | ต้อง decide 2 props, combo เยอะ (6x4=24), LLM พลาดง่าย |
| Visual naming (solid/outline) | Chakra v2, DaisyUI   | ไม่บอก intent, dev ต้องคิดเองว่าใช้เมื่อไหร่           |

### 3. Accessibility as Foundation

ทุก component สร้างบน **React Aria Components** — ARIA attributes, keyboard navigation, focus management, screen reader support มาให้โดยไม่ต้อง config

ไม่สร้าง accessibility จาก scratch — wrap React Aria เสมอ

### 4. Progressive Disclosure

Component ใช้งานได้ทันทีแบบเรียบง่าย แล้วค่อย customize เมื่อต้องการ:

```tsx
<Button>Save</Button>
<Button variant="danger" size="lg" isPending>Deleting...</Button>
```

### 5. Separation of Styles and Logic

- `@fried-ui/styles` — design tokens (CSS), variant definitions (tv()), shared class presets
- `@fried-ui/react` — React components, behavior, accessibility

เหตุผล: consumer ใช้ styles แยกจาก React ได้ (Vue, Svelte, vanilla HTML)

### 6. CSS-First, No JavaScript Runtime Styling

- Design tokens เป็น CSS custom properties (`@theme`)
- Animations เป็น CSS `@keyframes` — ไม่ใช้ Framer Motion (ตาม HeroUI v3 ที่ย้ายจาก Framer Motion มา CSS)
- Dark mode ผ่าน CSS (`prefers-color-scheme` + `data-theme`)
- Respects `prefers-reduced-motion` โดยอัตโนมัติ

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

ที่มา:

- `primary` ~ `danger` — semantic intent ตาม HeroUI v3 principles
- `ghost` — แทน "tertiary" ของ HeroUI v3 เพราะชื่อ intuitive กว่า, dev คุ้นเคย
- `link` — common pattern ที่ button ดูเหมือน text link
- `success`, `warning`, `info` — เพิ่มจาก HeroUI v3 เพราะ color tokens รองรับอยู่แล้ว

ไม่ใช่ทุก component จะใช้ทุก variant — เลือกเฉพาะที่เหมาะสม:

- **Button**: ใช้ทั้ง 8
- **Badge**: อาจใช้แค่ primary, success, warning, danger, info
- **Alert**: อาจใช้แค่ success, warning, danger, info

### Sizes

| Size | ใช้เมื่อ                  |
| ---- | ------------------------- |
| `sm` | Compact, dense UI         |
| `md` | Default, ใช้ทั่วไป        |
| `lg` | Prominent, touch-friendly |

บาง component อาจมี size เพิ่ม เช่น Button มี `icon` (square, สำหรับ icon-only)

### Default Values

ทุก component: `variant="primary"`, `size="md"` เป็น default

## Component API Conventions

### Props Pattern

- `variant` + `size` เป็น optional เสมอ (มี default)
- State props ใช้ `is-` prefix — `isDisabled`, `isPending` (จาก React Aria)
- Event handlers ใช้ `on-` prefix — `onPress` (จาก React Aria, ไม่ใช่ `onClick`)
- `className` สำหรับ override styles

## Audit References

- [HeroUI v3 Design Principles](https://heroui.com/docs/react/getting-started/design-principles)
- shadcn/ui — single-axis variant, most loved by developers
- HeroUI v2 → v3 migration — dropped `color` prop, moved to semantic variants
- Industry data: shadcn (most loved) vs MUI (most downloads) — fried-ui เลือกแนว "loved"
