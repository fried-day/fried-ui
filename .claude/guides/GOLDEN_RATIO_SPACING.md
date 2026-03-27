# Golden Ratio Spacing Rules

fried-ui ใช้ golden ratio (φ ≈ 1.618) คำนวณ spacing ทุก component

## หลักการ: x = font-size คือตัวตั้ง

x คือ font-size ของ component — เป็นแกนกลาง ทุกค่า derive จาก x ผ่าน φ

เมื่อ size เปลี่ยน **x ต้องเปลี่ยนด้วย** — ไม่ใช่แค่ขยาย padding/height แต่ font เท่าเดิม

## ทำไมไม่ทำแบบ Lib ทั่วไป

Lib ทั่วไป (MUI, Ant Design) = scale แค่เปลือก:

- MD: Font 16px + Padding 8px 16px
- LG: Font **16px** + Padding 12px 24px ← font เท่าเดิม!
- ผลลัพธ์: ตัวหนังสือ "จม" อยู่ในปุ่มใหญ่ ดู Clunky & Empty

fried-ui = scale ทั้งก้อน (Proportional Scaling):

- MD: Font 16px → ทุกค่า derive จาก 16px
- LG: Font **20px** → ทุกค่า derive จาก 20px
- ผลลัพธ์: ทุก size สัดส่วนเท่ากัน ดู Premium & Bold

## Formula

```text
x = font-size (ตัวตั้ง)
φ = 1.618

Padding Inline (px) = x
Padding Block (py)  = x × (√φ / φ²) ≈ x × 0.485
Gap                 = x / φ
Radius              = scale ตาม size (rounded-md → rounded-lg → rounded-xl)
Height              = auto (font-size + padding-block) — บังคับใช้ leading-none เสมอ
```

## Constraint: leading-none

ทุก component ที่ใช้ golden ratio ต้องใช้ `leading-none` (line-height: 1)

เหตุผล: ถ้าใช้ default line-height (1.5) จะมี whitespace แฝงใน font ทำให้ height บวมเกินกว่าที่ φ กำหนด — padding-block ต้องเป็นตัวควบคุม vertical spacing ทั้งหมด

## Size Scale

| Size | x (font) | Padding Inline (x) | Padding Block (x×0.485) | Gap (x/φ) |
| ---- | -------- | ------------------ | ----------------------- | --------- |
| sm   | 14px     | 14px               | 6.79px                  | 8.65px    |
| md   | 16px     | 16px               | 7.76px                  | 9.89px    |
| lg   | 20px     | 20px               | 9.70px                  | 12.36px   |

Tailwind snap (error margin < 1px ทุกค่า):

| Size | Font        | Padding Inline | Padding Block | Gap       | Radius       |
| ---- | ----------- | -------------- | ------------- | --------- | ------------ |
| sm   | `text-sm`   | `px-3.5`       | `py-1.5`      | `gap-2`   | `rounded-md` |
| md   | `text-base` | `px-4`         | `py-2`        | `gap-2.5` | `rounded-lg` |
| lg   | `text-xl`   | `px-5`         | `py-2.5`      | `gap-3`   | `rounded-xl` |

## ประโยชน์

- **Accessibility**: ปุ่ม LG มี font ใหญ่ขึ้นจริง ไม่ใช่แค่ปุ่มใหญ่แต่ตัวหนังสือเท่าเดิม
- **Visual Weight**: user รู้ทันทีว่าปุ่มไหนคือ main action
- **Proportional**: ทุก size สัดส่วนเท่ากัน ไม่มี size ไหนดู "กลวง"

## How to Apply

1. กำหนด x (font-size) ของแต่ละ size
2. คำนวณ padding-inline (x), padding-block (x×0.485), gap (x/φ)
3. Snap ไป Tailwind class ที่ใกล้สุด (error < 1px)
4. ห้าม hardcode height — ใช้ leading-none + padding-block
5. Radius ใช้ Tailwind step: sm→rounded-md, md→rounded-lg, lg→rounded-xl
