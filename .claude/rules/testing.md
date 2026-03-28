---
description: Test conventions — required test dimensions, patterns, and coverage rules
paths:
  - packages/react/src/**/*.test.tsx
---

# Testing

Every component MUST have tests covering ALL dimensions listed below. No shortcuts. No "test a few and assume the rest work."

Read the component's TypeScript type and CSS file first — test every prop, every value, every class.

---

## Required Test Dimensions — ALL Components

### 1. Rendering

```text
- renders with default props                     ← mounts without error
- renders only base class without explicit props  ← class="fri-{name}" only, NO modifiers
- renders correct HTML element                    ← verify tagName (SPAN, BUTTON, DIV, INPUT, etc.)
```

### 2. Every Variant Value

Read variant union from `{name}.variants.ts`. Test ALL values with `forEach`:

```tsx
it("applies all variant classes", () => {
  const variants = [
    /* ALL values from VariantsProps */
  ] as const;

  variants.forEach((variant) => {
    const { unmount } = render(<Component variant={variant}>{variant}</Component>);
    expect(el.className).toContain(`fri-{name}--${variant}`);
    unmount();
  });
});
```

### 3. Every Size Value

Read size union from `{name}.variants.ts`. Test ALL values — verify key-value format:

```tsx
it("applies size class with key-value format", () => {
  const sizes = [
    /* ALL values from VariantsProps */
  ] as const;

  sizes.forEach((size) => {
    const { unmount } = render(<Component size={size}>{size}</Component>);
    expect(el.className).toContain(`fri-{name}--size-${size}`);
    unmount();
  });
});
```

### 4. Every Radius Value — if component has radius prop

Same pattern as size — verify `--radius-{value}` format.

### 5. Every Boolean Modifier

Read boolean props from component type. Test EACH one:

```text
isIconOnly  → fri-{name}--icon-only
isFullWidth → fri-{name}--full-width
isDisabled  → fri-{name}--disabled
isPending   → fri-{name}--pending
```

For future components, read the props — don't assume. If it has `isCompact`, test `--compact`. If it has `isFluid`, test `--fluid`.

### 6. className Merge

```text
- className="custom" → base class + "custom" both present
- Interactive: className as function → (renderProps) => string works
```

### 7. Ref Forwarding

```text
- ref.current is correct element type (HTMLButtonElement, HTMLSpanElement, HTMLDivElement, etc.)
```

### 8. data-slot

```text
- data-slot attribute matches component name (e.g. "button", "badge", "input")
```

### 9. displayName

```text
- Component.displayName equals component name string
```

### 10. Native HTML Attributes Pass-through

```text
- id="test" → element has id
- data-testid="x" → findable by testId
- aria-label="x" → element has aria-label (if applicable)
```

---

## Additional Dimensions — Interactive Components (React Aria)

### 11. Event Handlers

```text
- onPress fires when clicked
- onPress does NOT fire when disabled
```

### 12. Disabled State

```text
- isDisabled → element has disabled attribute or aria-disabled
- isDisabled → BEM class fri-{name}--disabled present
```

### 13. Render Props Children

```text
- children as function receives render props
- render props reflect correct state (isHovered, isPressed, etc.)
```

### 14. className as Function

```text
- className as (renderProps) => string merges with base class
```

---

## Additional Dimensions — Compound Components

### 15. Sub-component Rendering

```text
- each sub-component renders correct element
- each sub-component has data-slot
- each sub-component has displayName
- each sub-component forwards ref
```

### 16. Context

```text
- parent passes context to children
- children read context values correctly
```

---

## Additional Dimensions — Form Components

### 17. Value & Change

```text
- controlled value renders correctly
- onChange fires with new value
- uncontrolled with defaultValue works
```

### 18. Validation

```text
- isInvalid → BEM class present
- errorMessage renders when invalid
- aria-invalid attribute set
```

### 19. Label & Description

```text
- label associates with input (aria-labelledby or htmlFor)
- description associates (aria-describedby)
```

---

## BEM Class Format Rules

Every test MUST verify classes match the `bem()` utility output:

```text
variant  → value only:    fri-{name}--{value}          ← e.g. fri-button--primary
size     → key-value:     fri-{name}--size-{value}     ← e.g. fri-button--size-md
radius   → key-value:     fri-{name}--radius-{value}   ← e.g. fri-button--radius-lg
shadow   → key-value:     fri-{name}--shadow-{value}   ← e.g. fri-card--shadow-md
boolean  → key only:      fri-{name}--{key}            ← e.g. fri-button--disabled
```

Rule: `variant` uses value directly. Booleans use key. Everything else uses `key-value`.

---

## Test Count Guide

| Component Type       | Minimum Tests | Dimensions |
| -------------------- | ------------- | ---------- |
| Display-only (Badge) | ~11           | 1-10       |
| Interactive (Button) | ~20           | 1-14       |
| Compound (Accordion) | ~25           | 1-16       |
| Form (Input)         | ~30           | 1-19       |

These are MINIMUMS. If a component has more props, add more tests.

---

## Do NOT

- Skip any variant value — test ALL with forEach
- Skip key-value format verification — always check `--size-` and `--radius-` prefix
- Assume defaults produce modifier classes — verify they DON'T
- Copy test values from another component — read THIS component's types
- Hardcode class strings — use template literals matching `bem()` output
- Skip displayName, data-slot, or ref tests — they are REQUIRED
- Write tests without reading the component source first
