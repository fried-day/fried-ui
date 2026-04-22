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
pnpm --filter=storybook dev    # Storybook on port 6006

# Run a single test file
cd packages/react && npx vitest run src/components/button/button.test.tsx
```

## Authoritative Sources

Convention, rules, and workflows are locked in `.claude/`:

- **`.claude/rules/*.md`** (10 files) — architecture, styles, formula, spacing, color, motion, elevation, constraints, storybook, testing. Every convention referenced here is binding.
- **`.claude/agents/*.md`** (3 agents) — `component-builder` (scaffolds new components following all rules), `component-auditor` (read-only audit), `token-designer` (design token authoring).
- **`decisions/*.md`** — ADRs documenting historical rationale.

When implementing new components, invoke the `component-builder` agent. When reviewing quality, invoke `component-auditor`. Read the relevant rule files before writing code that overlaps their scope.

## Architecture

**pnpm + Turborepo monorepo** — Tailwind CSS v4, React Aria Components, React 19, TypeScript 5.9.

### Workspace Layout

- **`apps/docs`** (port 3001) — Next.js 16 + Fumadocs, MDX documentation site
- **`apps/storybook`** (port 6006) — Storybook 10 with Vite, reads stories from `packages/react`
- **`packages/react`** (`@fried-ui/react`) — Component library (React Aria + Tailwind v4), built with tsup
- **`packages/styles`** (`@fried-ui/styles`) — Pure CSS: design tokens, `@utility`, component classes (no prefix, single-dash naming like daisyUI). Palette tokens keep `fri-` prefix (avoid Tailwind v4 built-in collision)
- **`packages/quality`** (`@repo/quality`) — ESLint configs (`eslint/base`, `eslint/next-js`, `eslint/react-internal`) + shared tsconfigs (`tsconfig/base`, `tsconfig/nextjs`, `tsconfig/react-library`)
- **`packages/vitest`** (`@fried-ui/vitest`) — Shared Vitest configs and setup (base + react presets)

### Component Structure

Each component lives in its own directory under `packages/react/src/components/`. Component files are **PascalCase**, test/story files are **lowercase**:

```text
packages/react/src/
  components/
    button/
      Button.tsx            # Component implementation
      button.test.tsx       # Vitest + React Testing Library tests
      button.stories.tsx    # Storybook stories
      button.variants.ts    # Prop types + JSDoc (shipped via .d.ts)
      index.ts              # Re-exports
    text-field/
      text-field-context.ts # React Context for field state propagation
      use-field-state.ts    # Hook consuming TextFieldContext with prop-override
  utils/
    classes/
      classes.ts            # Class generator: classes({ block, modifiers, className })
      index.ts              # Re-exports
  tests/
    audit/                  # Cross-cutting invariants (ts-morph AST-based)
      component.test.ts     # JSDoc, destructure, displayName
      coverage.test.ts      # 5-file presence + parity inclusion
      css.test.ts           # outline/soft/ghost border tokens
      parity.test.tsx       # React defaults -> plain HTML class parity
      stories.test.ts       # meta, source.code, no domain words, flex-col
      variants.test.ts      # JSDoc @default, "Whether the", no @example
    helpers/                # Shared test infrastructure (ast, components, css)
  index.ts                  # Barrel export
```

Scaffold new components via: `pnpm turbo gen interactive-component` or `pnpm turbo gen display-component`.

Test files use `component.test.tsx` naming. Story files use `component.stories.tsx` naming.

**Exports** are explicit in `packages/react/package.json` with types + import subpaths:

```ts
import { Button } from "@fried-ui/react/button";
import { classes } from "@fried-ui/react/utils/classes";
```

When adding a new component, add its export entry to `packages/react/package.json` AND its tsup entry in `tsup.config.ts`.

### Styling

- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- Apps use `@tailwindcss/postcss`, Storybook uses `@tailwindcss/vite`
- Each app's `globals.css` has `@source "../../packages/react/src/**/*.{ts,tsx}"` to scan component classes
- `@fried-ui/styles` is **pure CSS** — no JS build, no tailwind-variants. Apps import via `@import "@fried-ui/styles"`
- Component styles use **CSS + class naming (no prefix, single-dash) + @apply** — for multi-framework support (React, Vue, plain HTML, WP/PHP)
- Shared patterns use **`@utility`** (focus-ring, status-disabled, etc.)
- Use `classes({ block, modifiers, className })` from `@fried-ui/react/utils/classes` to compose component classes

### Documentation (Fumadocs)

- Content lives in `apps/docs/src/content/docs/` as MDX files
- Navigation defined in `apps/docs/src/content/docs/meta.json`
- Source config: `apps/docs/source.config.ts`
- Loader: `apps/docs/src/lib/source.ts` uses `docs.toFumadocsSource()`
- `.source/` is auto-generated by fumadocs-mdx — excluded from lint

### Testing

- **Vitest** + **jsdom** + **React Testing Library** in `packages/react`
- Shared config: `@fried-ui/vitest` package provides base and react presets
- `@testing-library/jest-dom` matchers available via setup
- Coverage: Istanbul reporter outputs to `coverage.json`

### Key Patterns

- **Client components**: Add `"use client"` directive for interactive components
- **TypeScript config chain**: `@repo/quality/tsconfig/base.json` extends to `react-library.json` (UI lib) or `nextjs.json` (apps)
- **ESLint**: Apps use `@repo/quality/eslint/next-js` config, UI package uses `@repo/quality/eslint/react-internal` config. Configs use factory functions (`createConfig`, `createReactConfig`, `createNextJsConfig`)
- **No `eslint-disable`**: Never use `eslint-disable` comments or turn off rules to suppress warnings. Always fix the source code to satisfy the rule
- **No `@ts-nocheck`**: Never use `// @ts-nocheck`, `// @ts-ignore`, or `// @ts-expect-error`. Always fix the actual type error
- **`classes()` class generator**: Import from `@fried-ui/react/utils/classes`. Signature is `classes({ block, modifiers, className })` — `className` folds in as the 3rd param. **Never** wrap with outer `clsx(classes(...), className)` — that was the old pattern. `clsx` is only needed inside `composeRenderProps` for interactive components with render-prop `className` (e.g. `Button`).
- **`useFieldState(props)` hook**: Field subcomponents (`Label`, `Description`, `FieldError`, and future TextField children) must use `useFieldState(props)` from `../text-field/use-field-state` to read `TextFieldContext` + prop-override. Never call `useContext(TextFieldContext)` directly in the subcomponent.
- **`@apply status-disabled` for disabled styling**: The canonical disabled utility (defined in `packages/styles/src/utilities/status.css`). Expands to `pointer-events-none cursor-(--cursor-disabled) opacity-(--disabled-opacity)`. Never write raw `@apply pointer-events-none opacity-50` — missing `cursor-not-allowed` causes visual drift.
- **Words over symbols in prose**: Never use `->`, `<-`, `=>` or emoji in documentation prose, JSDoc, or comments — they are Overloaded Tokens that cause LLM hallucination. Use explicit words ("leads to", "maps to", "transitions to", "derives from"). Math formulas and code fences are exempt. See `.claude/rules/writing.md`.
- **Workspace deps**: `workspace:*` protocol
- **Turbo tasks**: `build`, `lint`, `check-types`, `test` have `dependsOn: ["^<task>"]`. `dev` is persistent/uncached.
- **Build**: `@fried-ui/react` uses tsup (ESM-only, .mjs output, external react/react-dom/tailwindcss)

### Git Conventions

- **Conventional commits** enforced by commitlint: `type(scope): Subject` (sentence-case, max 50 chars)
- Valid types: `build|chore|ci|docs|feat|fix|perf|refactor|revert|setup|style|test`
- Scope is required
- **Husky hooks**: pre-commit runs lint-staged (prettier + eslint --fix), commit-msg validates format, pre-push runs lint + typecheck

### Changesets

- Run `pnpm changeset` to create a changeset before submitting PRs that affect published packages
- `@fried-ui/react` and `@fried-ui/styles` are **fixed versioning** — they release together
- `docs` and `storybook` apps are ignored by changesets
