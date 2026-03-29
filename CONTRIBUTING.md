# Contributing to Fried UI

Thanks for your interest in contributing to Fried UI! This guide will help you get started.

## Table of Contents

- [Tooling](#tooling)
- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Commit Convention](#commit-convention)
- [Steps to PR](#steps-to-pr)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [Visual Changes](#visual-changes)
- [Documentation](#documentation)
- [Adding a New Component](#adding-a-new-component)
- [Breaking Changes](#breaking-changes)
- [Becoming a Maintainer](#becoming-a-maintainer)
- [License](#license)

## Tooling

- [PNPM](https://pnpm.io/) — Package manager (enforced, no npm/yarn)
- [Turborepo](https://turbo.build/) — Monorepo build system
- [Tsup](https://tsup.egoist.dev/) — TypeScript bundler
- [Storybook](https://storybook.js.org/) — Component development and documentation
- [Vitest](https://vitest.dev/) — Unit testing
- [Testing Library](https://testing-library.com/) — Component testing utilities
- [Changesets](https://github.com/changesets/changesets) — Version management

## Prerequisites

- Node.js 22+
- PNPM 9+

## Development Setup

1. Fork and clone the repository

```bash
git clone https://github.com/<your-username>/fried-ui.git
cd fried-ui
pnpm install
```

2. Start development

```bash
pnpm dev              # All apps + packages
pnpm dev:storybook    # Storybook on port 6006
pnpm dev:docs         # Docs on port 3001
```

3. Build and test

```bash
pnpm build            # Build all
pnpm test             # Run tests
pnpm lint             # Lint all
pnpm typecheck        # Type check all
pnpm format           # Format check
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/). Every commit must use this format:

```txt
type(scope): Subject
```

**Types:**

| Type       | When to use                              |
| ---------- | ---------------------------------------- |
| `feat`     | New feature                              |
| `fix`      | Bug fix                                  |
| `refactor` | Code change (no new feature, no bug fix) |
| `docs`     | Documentation                            |
| `style`    | Formatting, lint fixes                   |
| `test`     | Adding or updating tests                 |
| `build`    | Build system or dependencies             |
| `ci`       | CI configuration                         |
| `chore`    | Maintenance                              |
| `perf`     | Performance improvement                  |
| `revert`   | Revert a previous commit                 |
| `setup`    | Project setup or configuration           |

**Scope is required.** Subject must be sentence-case, max 50 characters.

Examples:

```txt
feat(badge): Add soft variants
fix(button): Fix focus ring on Safari
docs(styles): Update color token docs
```

## Steps to PR

1. Create a branch from `main`:

```bash
git checkout -b feat/my-feature
```

2. Make your changes and commit following the convention above

3. Add a changeset if your change affects `@fried-ui/react` or `@fried-ui/styles`:

```bash
pnpm changeset
```

4. Ensure all checks pass:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm format
```

5. Push and open a PR against `main`

## Pull Request Guidelines

- PRs should be focused — one feature or fix per PR
- Include a clear description of what changed and why
- All tests must pass
- All linting must pass
- All types must check
- Add tests for new features or bug fixes

## Code Style

- **No `eslint-disable`** — fix the source code
- **No `@ts-nocheck` / `@ts-ignore` / `@ts-expect-error`** — fix the type error
- **No arbitrary Tailwind values** — use built-in classes only
- **All spacing in rem** — never px (except 1px borders)
- **clsx only** — no tailwind-merge, no tv()
- **BEM naming** — `.fri-{component}--{modifier}`
- Run `pnpm format:fix` before committing

## Testing

Every component must have tests covering:

- Renders with default props (correct HTML element, base class only)
- Every variant value
- Every size value
- Every boolean prop
- className merge
- Ref forwarding
- data-slot attribute
- displayName
- Native HTML attributes passthrough

Interactive components additionally test: onPress, disabled state, render props, className as function.

## Visual Changes

When making visual changes, include a screenshot or screen recording in your PR.

## Documentation

Keep documentation in sync with code changes. Docs live in `apps/docs/src/content/docs/` using MDX format.

## Adding a New Component

New components follow the scaffold-then-customize workflow:

1. Scaffold with turbo gen:

```bash
pnpm turbo gen display-component      # For Badge, Surface, Divider, etc.
pnpm turbo gen interactive-component  # For Button, Link, Switch, etc.
```

2. Customize the 6 generated files:

```txt
packages/styles/src/components/{name}.css
packages/react/src/components/{name}/{Name}.tsx
packages/react/src/components/{name}/{name}.variants.ts
packages/react/src/components/{name}/{name}.test.tsx
packages/react/src/components/{name}/{name}.stories.tsx
packages/react/src/components/{name}/index.ts
```

3. Register exports (alphabetical order):
   - `packages/react/tsup.config.ts` — add entry
   - `packages/react/package.json` — add to exports map

## Breaking Changes

Deprecate before removing. Add a deprecation notice in the docs and changelog at least one minor version before removal.

## Becoming a Maintainer

Start by helping with issues, reviewing PRs, and contributing code. Active contributors will be invited to the team.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
