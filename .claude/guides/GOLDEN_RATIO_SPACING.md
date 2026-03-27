# Golden Ratio Spacing Rules

fried-ui ใช้ golden ratio (φ ≈ 1.618) เป็น **rules คำนวณหาค่า** แล้วเลือก Tailwind class ที่ใกล้ที่สุด

ไม่ได้ใช้ φ ตรงๆ ใน CSS — output เป็น standard Tailwind class ที่ dev + LLM รู้จัก

## Formula

```
x = 1em (base unit, relative to font-size)
y = φ ≈ 1.618
```

| Part    | Formula | ค่าจริง          | Tailwind class |
| ------- | ------- | ---------------- | -------------- |
| Gap     | x / φ   | ≈ 0.618em ≈ 10px | `gap-2.5`      |
| Padding | x       | 1em = 16px       | `px-4`         |
| Radius  | x × √φ  | ≈ 1.272em ≈ 20px | `rounded-xl`   |
| Border  | √φ / φ² | ≈ 0.486px        | `border` (1px) |

## Size Scale

แต่ละ size ปรับ x แล้ว snap ไป Tailwind class ที่ใกล้สุด:

| Size | Height | Gap       | Padding | Radius        | Font        |
| ---- | ------ | --------- | ------- | ------------- | ----------- |
| sm   | `h-8`  | `gap-1.5` | `px-3`  | `rounded-lg`  | `text-xs`   |
| md   | `h-9`  | `gap-2.5` | `px-4`  | `rounded-xl`  | `text-sm`   |
| lg   | `h-10` | `gap-3`   | `px-5`  | `rounded-2xl` | `text-base` |

## How to Apply (for new components)

1. คำนวณค่าจาก φ formula
2. หา Tailwind class ที่ใกล้ที่สุด
3. ใช้ Tailwind class ใน @apply — ไม่ใช้ calc() กับ φ vars
