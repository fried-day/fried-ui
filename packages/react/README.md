# @fried-ui/react

React component library built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/) and [Tailwind CSS v4](https://tailwindcss.com/).

## Installation

```bash
pnpm add @fried-ui/react
```

Peer dependencies: `react >=19.0.0`, `react-dom >=19.0.0`, `tailwindcss >=4.0.0`

## Usage

```tsx
import { Box } from "@fried-ui/react/box";

<Box as="section" className="rounded-lg bg-blue-100 p-4">
  Hello
</Box>;
```

## Exports

| Path                       | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| `@fried-ui/react`          | Barrel export (all components + utilities)               |
| `@fried-ui/react/box`      | Box polymorphic layout primitive                         |
| `@fried-ui/react/aria`     | React Aria Components re-exports                         |
| `@fried-ui/react/utils/cn` | Tailwind class merge utility (`clsx` + `tailwind-merge`) |

## Development

```bash
pnpm dev           # Watch mode (tsup)
pnpm build         # Build (tsup, ESM-only)
pnpm test          # Run tests (vitest)
pnpm test:watch    # Watch mode tests
pnpm lint          # Lint (eslint)
pnpm check-types   # Type check (tsc)
```
