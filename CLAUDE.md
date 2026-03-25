# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
pnpm install              # Install all dependencies
pnpm -w run build         # Build all apps and packages (turbo)
pnpm -w run dev           # Run all apps in dev mode (turbo)
pnpm -w run lint          # Lint all apps and packages (turbo)
pnpm -w run test          # Run all tests (turbo)
pnpm -w run check-types   # Type-check all (turbo)
pnpm -w run format        # Format with Prettier

# Filter to a single app/package
pnpm --filter=web build
pnpm --filter=docs dev
pnpm --filter=@repo/react test
pnpm --filter=storybook dev    # Storybook on port 6006

# Run a single test file
cd packages/react && npx vitest run src/box/box.test.tsx
```

## Architecture

**pnpm + Turborepo monorepo** — Tailwind CSS v4, React Aria Components, React 19, TypeScript 5.9.

### Workspace Layout

- **`apps/web`** (port 3000) — Next.js 16 App Router, playground/demo site
- **`apps/docs`** (port 3001) — Next.js 16 + Fumadocs, MDX documentation site
- **`apps/storybook`** (port 6006) — Storybook 8 with Vite, reads stories from `packages/react`
- **`packages/react`** (`@repo/react`) — Component library (React Aria + Tailwind v4)
- **`packages/quality`** (`@repo/quality`) — ESLint configs (`eslint/base`, `eslint/next-js`, `eslint/react-internal`) + shared tsconfigs (`tsconfig/base`, `tsconfig/nextjs`, `tsconfig/react-library`)

### Component Structure

Each component lives in its own directory under `packages/react/src/`:

```
packages/react/src/
  components/
    box/
    box.tsx              # Component implementation
    box.test.tsx         # Vitest + React Testing Library tests
    box.stories.tsx      # Storybook stories
    index.ts             # Re-exports
  utils/
    cn/
      cn.ts              # Tailwind class merge utility (clsx + tailwind-merge)
      index.ts           # Re-exports
  index.ts               # Barrel export
```

**Exports** are explicit in `packages/react/package.json`:

```ts
import { Box } from "@repo/react/box";
import { cn } from "@repo/react/utils/cn";
```

When adding a new component, add its export entry to `packages/react/package.json`.

### Styling

- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- Apps use `@tailwindcss/postcss`, Storybook uses `@tailwindcss/vite`
- Each app's `globals.css` has `@source "../../packages/react/src/**/*.{ts,tsx}"` to scan component classes
- `@plugin "tailwindcss-react-aria-components"` for React Aria state modifiers
- Use `cn()` from `@repo/react/utils/cn` to merge Tailwind classes in components

### Documentation (Fumadocs)

- Content lives in `apps/docs/content/docs/` as MDX files
- Navigation defined in `apps/docs/content/docs/meta.json`
- Source config: `apps/docs/source.config.ts`
- Loader: `apps/docs/lib/source.ts` uses `docs.toFumadocsSource()`

### Testing

- **Vitest** + **jsdom** + **React Testing Library** in `packages/react`
- Config: `packages/react/vitest.config.ts`
- `@testing-library/jest-dom` matchers available via `vitest.setup.ts`

### Key Patterns

- **Polymorphic components**: Use `as` prop pattern (see Box) for element type flexibility
- **Client components**: Add `"use client"` directive for interactive components
- **TypeScript config chain**: `@repo/quality/tsconfig/base.json` → `react-library.json` (UI lib) or `nextjs.json` (apps)
- **ESLint**: Apps use `@repo/quality/eslint/next-js` config, UI package uses `@repo/quality/eslint/react-internal` config
- **Workspace deps**: `workspace:*` protocol
- **Turbo tasks**: `build`, `lint`, `check-types`, `test` have `dependsOn: ["^<task>"]`. `dev` is persistent/uncached.
