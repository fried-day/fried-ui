# Button

Accessible button component. Built on React Aria Button.

## Install

```bash
pnpm add @fried-ui/react
```

## Import

```tsx
import { Button } from "@fried-ui/react/button";
```

## Props

| Prop               | Type                                               | Default     | Description                             |
| ------------------ | -------------------------------------------------- | ----------- | --------------------------------------- |
| `variant`          | `"primary"`                                        | `"primary"` | Visual variant                          |
| `size`             | `"sm" \| "md" \| "lg" \| "xl"`                     | `"md"`      | Size — controls padding, gap, font-size |
| `radius`           | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"`      | Border radius (independent from size)   |
| `isDisabled`       | `boolean`                                          | `false`     | Disabled state                          |
| `isPending`        | `boolean`                                          | `false`     | Loading spinner, disables interaction   |
| `onPress`          | `(e: PressEvent) => void`                          | -           | Press handler (preferred over onClick)  |
| `onPressStart`     | `(e: PressEvent) => void`                          | -           | Press start handler                     |
| `onPressEnd`       | `(e: PressEvent) => void`                          | -           | Press end handler                       |
| `onPressChange`    | `(isPressed: boolean) => void`                     | -           | Press state change handler              |
| `onHoverStart`     | `(e: HoverEvent) => void`                          | -           | Hover start handler                     |
| `onHoverEnd`       | `(e: HoverEvent) => void`                          | -           | Hover end handler                       |
| `onHoverChange`    | `(isHovering: boolean) => void`                    | -           | Hover state change handler              |
| `onFocus`          | `(e: FocusEvent) => void`                          | -           | Focus handler                           |
| `onBlur`           | `(e: FocusEvent) => void`                          | -           | Blur handler                            |
| `onFocusChange`    | `(isFocused: boolean) => void`                     | -           | Focus state change handler              |
| `onKeyDown`        | `(e: KeyboardEvent) => void`                       | -           | Key down handler                        |
| `onKeyUp`          | `(e: KeyboardEvent) => void`                       | -           | Key up handler                          |
| `type`             | `"button" \| "submit" \| "reset"`                  | `"button"`  | HTML button type                        |
| `form`             | `string`                                           | -           | Associated form ID                      |
| `formAction`       | `string`                                           | -           | Form submission URL                     |
| `autoFocus`        | `boolean`                                          | `false`     | Auto focus on mount                     |
| `aria-label`       | `string`                                           | -           | Accessible label                        |
| `aria-labelledby`  | `string`                                           | -           | ID of labelling element                 |
| `aria-describedby` | `string`                                           | -           | ID of describing element                |
| `className`        | `string`                                           | -           | Additional CSS classes                  |
| `children`         | `ReactNode \| (renderProps) => ReactNode`          | -           | Button content                          |

## Data Attributes

| Attribute              | Description          |
| ---------------------- | -------------------- |
| `[data-hovered]`       | Mouse hover          |
| `[data-pressed]`       | Active/pressed       |
| `[data-focused]`       | Focused (any method) |
| `[data-focus-visible]` | Keyboard focus only  |
| `[data-disabled]`      | Disabled             |
| `[data-pending]`       | Loading/pending      |

## CSS Classes

| Class                     | Description               |
| ------------------------- | ------------------------- |
| `fri-button`              | Base styles               |
| `fri-button--primary`     | Primary variant           |
| `fri-button--sm`          | Small size                |
| `fri-button--md`          | Medium size               |
| `fri-button--lg`          | Large size                |
| `fri-button--xl`          | Extra large size          |
| `fri-button--radius-none` | No border radius          |
| `fri-button--radius-sm`   | Small border radius       |
| `fri-button--radius-md`   | Medium border radius      |
| `fri-button--radius-lg`   | Large border radius       |
| `fri-button--radius-xl`   | Extra large border radius |
| `fri-button--radius-full` | Full (pill) border radius |
| `fri-button--pending`     | Pending/loading state     |
| `fri-button__spinner`     | Internal spinner element  |

## CSS Variables

| Variable                  | Default                      | Description        |
| ------------------------- | ---------------------------- | ------------------ |
| `--fri-button-bg`         | `transparent`                | Background         |
| `--fri-button-bg-hover`   | `var(--fri-button-bg)`       | Hover background   |
| `--fri-button-bg-pressed` | `var(--fri-button-bg-hover)` | Pressed background |
| `--fri-button-fg`         | `currentColor`               | Text/icon color    |

## Examples

### Basic

Default button with medium size and medium radius.

```tsx
<Button>Click me</Button>
```

### Sizes

Golden ratio proportional scaling across all sizes.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Radius

Border radius independent from size.

```tsx
<Button radius="none">Sharp</Button>
<Button radius="full">Pill</Button>
```

### With Icon

Icons use `size-match-font` to match the font size. Gap scales via golden ratio.

```tsx
<Button>
  <ChevronRightIcon className="size-match-font" />
  Next
</Button>
```

### Disabled

Prevents interaction and applies disabled styling.

```tsx
<Button isDisabled>Cannot click</Button>
```

### Pending

Text becomes transparent, spinner appears centered. All interaction is blocked.

```tsx
<Button isPending>Saving...</Button>
```

### As a Link

Wrap with anchor or framework Link component.

```tsx
<a href="/pricing">
  <Button>Go to Pricing</Button>
</a>
```

### Custom Class

Use `className` for layout or typography utilities.

```tsx
<Button className="tracking-wider uppercase">Styled</Button>
```

### Form Submit

Associate with a form element via `type` and `form` props.

```tsx
<Button type="submit" form="my-form">
  Submit
</Button>
```

### Press Handler

Use `onPress` instead of `onClick` — handles keyboard, touch, and mouse uniformly.

```tsx
<Button onPress={() => console.log("pressed")}>Press me</Button>
```

## Anatomy

```
┌─ Button ──────────────────────────┐
│  [Icon]  Label  [Spinner overlay] │
└───────────────────────────────────┘
```

- `children`: Icon + label as direct children
- Spinner: Rendered internally when `isPending={true}`, absolutely positioned over content
- Icon sizing: Use `className="size-match-font"` on SVG icons

## Spacing Math

|                | sm (14px) | md (16px) | lg (20px) | xl (24px) |
| -------------- | --------- | --------- | --------- | --------- |
| Font           | 14px      | 16px      | 20px      | 24px      |
| Padding Inline | 14px      | 16px      | 20px      | 24px      |
| Padding Block  | 6px       | 8px       | 10px      | 12px      |
| Gap            | 8.65px    | 9.89px    | 12.36px   | 14.83px   |

Formulas: `padding-inline = x`, `padding-block = x × 0.485`, `gap = x / φ`.

## Accessibility

- Keyboard: `Enter` and `Space` trigger press
- Focus ring on keyboard navigation (not mouse)
- Screen reader: announces role, label, disabled, pending states
- Touch: optimized press with cancel on drag
- Respects `prefers-reduced-motion`

## Constraints

- Only `"primary"` variant currently available
- `radius` is independent from `size` — they do not affect each other
- `isPending` makes text transparent and shows spinner; content stays in DOM for layout
- Uses BEM classes (`fri-button`, `fri-button--primary`, etc.) — no inline Tailwind in component
