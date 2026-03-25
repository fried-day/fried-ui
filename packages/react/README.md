# @fried-ui/react

Beautiful, accessible React components for building modern web apps at scale.

## Installation

```bash
pnpm add @fried-ui/react @fried-ui/styles
```

Peer dependencies: `react >=19.0.0`, `react-dom >=19.0.0`, `tailwindcss >=4.0.0`

## Setup

```css
@import "tailwindcss";
@import "@fried-ui/styles";
```

## Usage

```tsx
import { Box } from "@fried-ui/react/box";

<Box as="section" className="rounded-lg bg-blue-100 p-4">
  Hello
</Box>;
```

## Exports

| Path                       | Description                      |
| -------------------------- | -------------------------------- |
| `@fried-ui/react`          | All components + utilities       |
| `@fried-ui/react/box`      | Box polymorphic layout primitive |
| `@fried-ui/react/aria`     | React Aria Components re-exports |
| `@fried-ui/react/utils/cn` | Tailwind class merge utility     |

## Documentation

[fried-ui.vercel.app](https://fried-ui.vercel.app)

## License

[MIT](../../LICENSE)
