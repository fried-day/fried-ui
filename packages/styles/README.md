# @fried-ui/styles

Base styles and variant utilities for the fried-ui component library. Built on [Tailwind CSS v4](https://tailwindcss.com/) and [tailwind-variants](https://www.tailwind-variants.org/).

## Installation

```bash
pnpm add @fried-ui/styles
```

Peer dependency: `tailwindcss >=4.0.0`

## Usage

Import base styles in your CSS entry file:

```css
@import "tailwindcss";
@import "@fried-ui/styles";
```

## Exports

| Path                          | Description                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| `@fried-ui/styles`            | Base CSS (Tailwind + animations)                                                      |
| `@fried-ui/styles/variants`   | `tv`, `cn`, `VariantProps` from tailwind-variants                                     |
| `@fried-ui/styles/utils`      | Shared utility classes (`focusRingClasses`, `disabledClasses`, `ariaDisabledClasses`) |
| `@fried-ui/styles/components` | Component variant definitions                                                         |

## Development

```bash
pnpm dev     # Watch mode (tsup)
pnpm build   # Build (tsup, ESM-only)
```
