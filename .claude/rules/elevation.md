---
description: Shadow scaling with φ and z-index architecture
paths:
  - packages/styles/src/**/*.css
---

# Elevation

## Shadow Tokens

```text
--shadow-1: 0 1px 2px   (base)
--shadow-2: 0 2px 4px   (base × φ)
--shadow-3: 0 3px 6px   (base × φ²)
--shadow-4: 0 5px 10px  (base × φ³)
```

## Z-Index Tokens

```text
--z-floating:   10  → Dropdown, Tooltip, Popover
--z-navigation: 20  → Sticky Header, FAB
--z-overlay:    30  → Modal Backdrop, Drawer Overlay
--z-dialog:     40  → Modal, Bottom Sheet, Drawer
--z-alert:      50  → Toast, Notification
```

ห้ามใช้ arbitrary z-index (z-[99], z-[9999])
