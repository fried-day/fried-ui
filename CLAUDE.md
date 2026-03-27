# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Prerequisites

- **Node 22** (see `.nvmrc`) — pnpm only (enforced via `preinstall` script)

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
pnpm --filter=docs dev
pnpm --filter=@fried-ui/react test
pnpm --filter=storybook dev

# Run a single test file
cd packages/react && npx vitest run src/components/{name}/{name}.test.tsx
```

## Architecture

**pnpm + Turborepo monorepo** — Tailwind CSS v4, React Aria Components, React 19, TypeScript 5.9.

### Workspace Layout

- **`apps/docs`** — Next.js 16 + Fumadocs documentation site
- **`apps/storybook`** — Storybook 10 with Vite
- **`packages/react`** (`@fried-ui/react`) — Component library, built with tsup
- **`packages/styles`** (`@fried-ui/styles`) — Pure CSS: design tokens + component BEM styles
- **`packages/quality`** (`@repo/quality`) — ESLint configs + shared tsconfigs
- **`packages/vitest`** (`@fried-ui/vitest`) — Shared Vitest configs

### Key Rules

- Design rules auto-load from `.claude/rules/` when editing matching files
- **No `eslint-disable`** — always fix the source code
- **No `@ts-nocheck`** / `@ts-ignore` / `@ts-expect-error` — always fix the type error

### Git Conventions

- **Conventional commits** enforced by commitlint: `type(scope): Subject` (sentence-case, max 50 chars)
- Valid types: `build|chore|ci|docs|feat|fix|perf|refactor|revert|setup|style|test`
- Scope is required
- **Husky hooks**: pre-commit runs lint-staged, commit-msg validates format, pre-push runs lint + typecheck

### Changesets

- `@fried-ui/react` and `@fried-ui/styles` are **fixed versioning** — they release together
- `docs` and `storybook` apps are ignored by changesets
