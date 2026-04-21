# Button

Accessible button component. Built on React Aria Button.

## Install

```bash
pnpm add @fried-ui/react
```

## Import

```tsx
import { Button } from "@fried-ui/react";
```

## Props

| Prop               | Type                                                         | Default     | Description                             |
| ------------------ | ------------------------------------------------------------ | ----------- | --------------------------------------- |
| `variant`          | `ButtonVariant` (see Variants)                               | `"primary"` | Visual variant (40 options)             |
| `size`             | `"sm" \| "md" \| "lg" \| "xl"`                               | `"md"`      | Size — controls padding, gap, font-size |
| `radius`           | `"none" \| "sm" \| "md" \| "lg" \| "full"`                   | `"md"`      | Border radius (independent from size)   |
| `isIconOnly`       | `boolean`                                                    | `false`     | Icon-only square button                 |
| `isFullWidth`      | `boolean`                                                    | `false`     | Full width button                       |
| `isDisabled`       | `boolean`                                                    | `false`     | Disabled state                          |
| `isPending`        | `boolean`                                                    | `false`     | Loading spinner, disables interaction   |
| `onPress`          | `(e: PressEvent) => void`                                    | -           | Press handler (preferred over onClick)  |
| `onPressStart`     | `(e: PressEvent) => void`                                    | -           | Press start handler                     |
| `onPressEnd`       | `(e: PressEvent) => void`                                    | -           | Press end handler                       |
| `onPressChange`    | `(isPressed: boolean) => void`                               | -           | Press state change handler              |
| `onHoverStart`     | `(e: HoverEvent) => void`                                    | -           | Hover start handler                     |
| `onHoverEnd`       | `(e: HoverEvent) => void`                                    | -           | Hover end handler                       |
| `onHoverChange`    | `(isHovering: boolean) => void`                              | -           | Hover state change handler              |
| `onFocus`          | `(e: FocusEvent) => void`                                    | -           | Focus handler                           |
| `onBlur`           | `(e: FocusEvent) => void`                                    | -           | Blur handler                            |
| `onFocusChange`    | `(isFocused: boolean) => void`                               | -           | Focus state change handler              |
| `onKeyDown`        | `(e: KeyboardEvent) => void`                                 | -           | Key down handler                        |
| `onKeyUp`          | `(e: KeyboardEvent) => void`                                 | -           | Key up handler                          |
| `type`             | `"button" \| "submit" \| "reset"`                            | `"button"`  | HTML button type                        |
| `form`             | `string`                                                     | -           | Associated form ID                      |
| `formAction`       | `string`                                                     | -           | Form submission URL                     |
| `autoFocus`        | `boolean`                                                    | `false`     | Auto focus on mount                     |
| `aria-label`       | `string`                                                     | -           | Accessible label                        |
| `aria-labelledby`  | `string`                                                     | -           | ID of labelling element                 |
| `aria-describedby` | `string`                                                     | -           | ID of describing element                |
| `className`        | `string`                                                     | -           | Additional CSS classes                  |
| `ref`              | `Ref<HTMLButtonElement>`                                     | -           | Forwarded ref to button element         |
| `children`         | `ReactNode \| (renderProps: ButtonRenderProps) => ReactNode` | -           | Button content                          |

## Inherited from React Aria Button

Additional props forwarded to the underlying React Aria `Button`. Use these when building composite patterns (menu triggers, toggles, form buttons). React DOM events (`onClick`, `onMouseMove`, etc.) are also inherited but omitted here — prefer React Aria handlers like `onPress`.

| Prop                  | Type                                                             | Default | Description                                                                     |
| --------------------- | ---------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| `id`                  | `string`                                                         | -       | Unique identifier                                                               |
| `name`                | `string`                                                         | -       | Form submission key (paired with `value`)                                       |
| `value`               | `string`                                                         | -       | Form submission value for this button                                           |
| `slot`                | `string \| null`                                                 | -       | React Aria slot name (receive props from parent component)                      |
| `excludeFromTabOrder` | `boolean`                                                        | `false` | Remove from sequential tab order (use only with alternative keyboard access)    |
| `preventFocusOnPress` | `boolean`                                                        | `false` | Don't move focus on press (ComboBox triggers, NumberField steppers)             |
| `onPressUp`           | `(e: PressEvent) => void`                                        | -       | Called on press release regardless of start target (unlike `onPress`)           |
| `formEncType`         | `string`                                                         | -       | Encoding for form data                                                          |
| `formMethod`          | `string`                                                         | -       | HTTP method for form submission                                                 |
| `formNoValidate`      | `boolean`                                                        | -       | Skip form validation on submit                                                  |
| `formTarget`          | `string`                                                         | -       | Override form target attribute                                                  |
| `aria-expanded`       | `boolean \| "true" \| "false"`                                   | -       | Expanded state (menu triggers, accordions)                                      |
| `aria-haspopup`       | `boolean \| "menu" \| "listbox" \| "tree" \| "grid" \| "dialog"` | -       | Type of popup the button controls                                               |
| `aria-controls`       | `string`                                                         | -       | ID of the element this button controls                                          |
| `aria-pressed`        | `boolean \| "true" \| "false" \| "mixed"`                        | -       | Pressed state for toggle buttons                                                |
| `aria-current`        | `boolean \| "page" \| "step" \| "location" \| "date" \| "time"`  | -       | Represents the current item in a set                                            |
| `aria-details`        | `string`                                                         | -       | ID of element providing detailed description                                    |
| `render`              | `DOMRenderFunction<"button", ButtonRenderProps>`                 | -       | Override default DOM element (must render `<button>`, pass through props + ref) |
| `style`               | `CSSProperties \| ((renderProps) => CSSProperties)`              | -       | Inline style (function form receives render props)                              |

See [React Aria Button API](https://react-spectrum.adobe.com/react-aria/Button.html) for the complete list.

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
| `fri-button--secondary`   | Secondary variant         |
| `fri-button--ghost`       | Ghost variant             |
| `fri-button--outline`     | Outline variant           |
| `fri-button--success`     | Success variant           |
| `fri-button--warning`     | Warning variant           |
| `fri-button--danger`      | Danger variant            |
| `fri-button--info`        | Info variant              |
| `fri-button--sm`          | Small size                |
| `fri-button--md`          | Medium size               |
| `fri-button--lg`          | Large size                |
| `fri-button--xl`          | Extra large size          |
| `fri-button--radius-none` | No border radius          |
| `fri-button--radius-sm`   | Small border radius       |
| `fri-button--radius-md`   | Medium border radius      |
| `fri-button--radius-lg`   | Large border radius       |
| `fri-button--radius-full` | Full (pill) border radius |
| `fri-button--disabled`    | Disabled state            |
| `fri-button--full-width`  | Full width button         |
| `fri-button--icon-only`   | Icon-only square button   |
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

### Variants

**40 variants** — 12 base + 28 color-prefixed (4 modifiers × 7 colors).

**Base variants (solid + style):**

```tsx
<Button variant="primary">Primary CTA</Button>       {/* dark neutral, main action */}
<Button variant="secondary">Secondary</Button>       {/* light neutral, less emphasis */}
<Button variant="accent">Brand</Button>              {/* purple, brand highlight */}
<Button variant="ghost">Cancel</Button>              {/* transparent, dismissive */}
<Button variant="outline">Outlined</Button>          {/* neutral bordered */}
<Button variant="glass">Glass</Button>               {/* frosted + border (on image) */}
<Button variant="frost">Frost</Button>               {/* frosted no border */}
<Button variant="overlay">Overlay</Button>           {/* dark scrim (on media) */}
<Button variant="success">Confirmed</Button>         {/* green status */}
<Button variant="warning">Caution</Button>           {/* yellow status */}
<Button variant="danger">Delete</Button>             {/* red destructive */}
<Button variant="info">Info</Button>                 {/* blue info */}
```

**Color-prefixed variants** — combine `{color}` with `-soft`, `-flat`, `-outline`, or `-ghost`:

```tsx
{/* -soft: pale bg + visible border (status tags) */}
<Button variant="success-soft">Draft</Button>
<Button variant="danger-soft">Rejected</Button>

{/* -flat: pale bg no border (minimal subtle) */}
<Button variant="accent-flat">Featured</Button>

{/* -outline: transparent + colored border (secondary CTA) */}
<Button variant="accent-outline">Learn more</Button>
<Button variant="danger-outline">Cancel subscription</Button>

{/* -ghost: transparent, reveal on hover (toolbar) */}
<Button variant="primary-ghost">Copy</Button>
<Button variant="accent-ghost">Reply</Button>
```

**Colors:** `primary` `secondary` `accent` `success` `warning` `danger` `info`
**Modifiers:** `-soft` `-flat` `-outline` `-ghost`

**When to use:**

- `primary` — main CTA (save, submit, confirm)
- `accent` — brand feature (upgrade, get started, marketing)
- `ghost` — dismissive (cancel, close, skip)
- `outline` — secondary action next to primary
- `danger` — destructive (delete, remove)
- `{color}-soft/flat` — status labels in content
- `{color}-outline` — secondary variants of colored actions
- `{color}-ghost` — toolbar/icon actions

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

### Icon Only

Square button for icon-only actions. Always provide `aria-label`.

```tsx
<Button isIconOnly aria-label="Next">
  <ArrowRightIcon className="size-match-font" />
</Button>
```

### With Icon

Icons use `size-match-font` to match the font size. Gap scales via golden ratio.

```tsx
<Button>
  <ChevronRightIcon className="size-match-font" />
  Next
</Button>
```

### Full Width

Stretches the button to fill its container width.

```tsx
<Button isFullWidth>Full Width</Button>
```

### Disabled

Prevents interaction and applies disabled styling.

```tsx
<Button isDisabled>Cannot click</Button>
```

### Pending

Text becomes transparent, spinner appears centered. All interaction is blocked.

```tsx
<Button isPending>Saving</Button>
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

### Render Props

Access internal state to dynamically change content using the children function.

```tsx
<Button>
  {({ isHovered }) => (
    <>
      <ArrowRightIcon className="size-match-font" />
      {isHovered ? "Let's go!" : "Hover me"}
    </>
  )}
</Button>
```

Available render props: `isHovered`, `isPressed`, `isFocused`, `isFocusVisible`, `isDisabled`, `isPending`.

### Ref Forwarding

Supports ref forwarding for integration with Tooltip, Popover, Floating UI, etc.

```tsx
const ref = useRef<HTMLButtonElement>(null);
<Button ref={ref}>Trigger</Button>;
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
- Ref forwarding: Supports `ref` prop to the underlying `<button>` element

## Spacing Math

|                | sm       | md       | lg       | xl       |
| -------------- | -------- | -------- | -------- | -------- |
| Font           | 0.875rem | 1rem     | 1.25rem  | 1.5rem   |
| Padding Inline | 0.875rem | 1rem     | 1.25rem  | 1.5rem   |
| Padding Block  | 0.375rem | 0.5rem   | 0.625rem | 0.75rem  |
| Gap            | 0.541rem | 0.618rem | 0.773rem | 0.927rem |

Formulas: `padding-inline = x`, `padding-block = x × 0.485`, `gap = x / φ`.

## Accessibility

- Keyboard: `Enter` and `Space` trigger press
- Focus ring on keyboard navigation (not mouse)
- Screen reader: announces role, label, disabled, pending states
- Touch: optimized press with cancel on drag
- Respects `prefers-reduced-motion`

## Constraints

- 40 variants: 12 base (primary, secondary, accent, ghost, outline, glass, frost, overlay, success, warning, danger, info) + 28 color-prefixed (7 colors × 4 modifiers: -soft, -flat, -outline, -ghost)
- `radius` is independent from `size` — they do not affect each other
- `isPending` makes text transparent and shows spinner; content stays in DOM for layout
- Uses BEM classes (`fri-button`, `fri-button--primary`, etc.) — no inline Tailwind in component
