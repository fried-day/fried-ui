---
name: feedback_no_test_every_change
description: อย่ารัน test ทุกครั้งที่แก้ไฟล์ — รันตอนจบ batch เท่านั้น
type: feedback
---

อย่ารัน test/lint/build หลังแก้ทุกไฟล์ — เสียเวลา รันครั้งเดียวตอนจบ batch ทั้งหมด

**Why:** ผู้ใช้รู้สึกว่าเสียเวลารอ test ทุกรอบ ทั้งที่ยังแก้ไม่จบ

**How to apply:** แก้หลายไฟล์ให้เสร็จก่อน แล้วค่อยรัน test/lint/build ครั้งเดียวตอนท้าย
