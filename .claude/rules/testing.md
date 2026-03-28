---
description: Test conventions and required dimensions
paths:
  - packages/react/src/**/*.test.tsx
---

# Testing

Test every prop, every value, every class. No shortcuts.

## ALL Components (dimensions 1-10)

1. **Renders** — mounts, base class only (no modifiers without props), correct HTML element
2. **Every variant** — forEach ALL values, verify `fri-{name}--{value}`
3. **Every size** — forEach ALL values, verify `fri-{name}--size-{value}`
4. **Every radius** — if applicable, verify `fri-{name}--radius-{value}`
5. **Every boolean** — each boolean prop generates `fri-{name}--{key}`
6. **className merge** — custom class present alongside base
7. **Ref forwarding** — correct element type
8. **data-slot** — correct value
9. **displayName** — correct string
10. **Native HTML attrs** — id, data-testid pass through

## Interactive Components (dimensions 11-14)

11. **onPress** — fires on click, does NOT fire when disabled
12. **Disabled** — aria-disabled + BEM class
13. **Render props children** — function receives state
14. **className as function** — merges with base class

## BEM Format

```text
variant  → fri-{name}--{value}        (value only)
size     → fri-{name}--size-{value}   (key-value)
radius   → fri-{name}--radius-{value} (key-value)
boolean  → fri-{name}--{key}          (key only)
```

## Minimums

| Type         | Tests |
| ------------ | ----- |
| Display-only | ~11   |
| Interactive  | ~20   |

## Do NOT

- Skip any variant value
- Assume defaults produce modifier classes
- Copy values from another component — read THIS component's types
