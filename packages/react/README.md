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
import { Button } from "@fried-ui/react";

<Button variant="primary" size="md">
  Button
</Button>;
```

## Exports

| Path                      | Description                 |
| ------------------------- | --------------------------- |
| `@fried-ui/react`         | All components + icons      |
| `@fried-ui/react/badge`   | Badge component             |
| `@fried-ui/react/button`  | Button component            |
| `@fried-ui/react/icons`   | SVG icon components         |
| `@fried-ui/react/surface` | Surface container component |

## Documentation

[fried-ui.vercel.app](https://fried-ui.vercel.app)

## License

[MIT](../../LICENSE)
