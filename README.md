# fried-ui

Beautiful, accessible React components for building modern web apps at scale.

## Packages

| Package                               | Description                                        |
| ------------------------------------- | -------------------------------------------------- |
| [`@fried-ui/react`](packages/react)   | React component library                            |
| [`@fried-ui/styles`](packages/styles) | Theme engine, design tokens, and component presets |

## Quick Start

```bash
pnpm add @fried-ui/react @fried-ui/styles
```

```css
@import "tailwindcss";
@import "@fried-ui/styles";
```

```tsx
import { Button } from "@fried-ui/react";

<Button variant="primary" onPress={() => alert("Hello!")}>
  Click me
</Button>;
```

## Development

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev mode (all apps + packages)
pnpm build            # Build all
pnpm test             # Run tests
pnpm lint             # Lint
pnpm typecheck        # Type check
pnpm format           # Format check
pnpm dev:storybook    # Storybook on port 6006
pnpm dev:docs         # Docs on port 3001
```

## Contributing

This project uses [conventional commits](https://www.conventionalcommits.org/) and [changesets](https://github.com/changesets/changesets) for versioning.

```bash
pnpm changeset        # Add a changeset before submitting a PR
```

## License

[MIT](LICENSE)
