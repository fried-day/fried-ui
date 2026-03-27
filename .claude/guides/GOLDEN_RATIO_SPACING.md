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

```
x = font-size (ตัวตั้ง)
φ = 1.618

Padding  = x
Gap      = x / φ
Radius   = Tailwind step ที่ scale ตาม size (rounded-md → rounded-lg → rounded-xl)
Border   = 1px
Height   = auto (มาจาก font + line-height + padding-block ไม่ hardcode)
```

## Size Scale

| Size | x (font) | Padding (x) | Gap (x/φ) |
| ---- | -------- | ----------- | --------- |
| sm   | 14px     | 14px        | 8.7px     |
| md   | 16px     | 16px        | 9.9px     |
| lg   | 20px     | 20px        | 12.4px    |

Tailwind snap:

| Size | Font        | Padding  | Gap       | Radius       | Padding Block |
| ---- | ----------- | -------- | --------- | ------------ | ------------- |
| sm   | `text-sm`   | `px-3.5` | `gap-2`   | `rounded-md` | `py-1.5`      |
| md   | `text-base` | `px-4`   | `gap-2.5` | `rounded-lg` | `py-2`        |
| lg   | `text-xl`   | `px-5`   | `gap-3`   | `rounded-xl` | `py-2.5`      |

## ประโยชน์

- **Accessibility**: ปุ่ม LG มี font ใหญ่ขึ้นจริง ไม่ใช่แค่ปุ่มใหญ่แต่ตัวหนังสือเท่าเดิม
- **Visual Weight**: user รู้ทันทีว่าปุ่มไหนคือ main action
- **Proportional**: ทุก size สัดส่วนเท่ากัน ไม่มี size ไหนดู "กลวง"

## How to Apply

1. กำหนด x (font-size) ของแต่ละ size
2. คำนวณ padding, gap, radius จาก φ
3. Snap ไป Tailwind class ที่ใกล้สุด
4. ห้าม hardcode height — ใช้ padding-block ให้ height มาจาก content + padding
