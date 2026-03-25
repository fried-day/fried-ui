# Contributing to fried-ui

Thanks for your interest in contributing!

## Getting Started

```bash
git clone https://github.com/fried-day/fried-ui.git
cd fried-ui
pnpm install
pnpm dev
```

## Development

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `pnpm dev`           | Start all apps + packages in dev mode |
| `pnpm build`         | Build all packages                    |
| `pnpm test`          | Run tests                             |
| `pnpm lint`          | Lint                                  |
| `pnpm typecheck`     | Type check                            |
| `pnpm format`        | Format check                          |
| `pnpm dev:storybook` | Storybook on port 6006                |
| `pnpm dev:docs`      | Docs on port 3001                     |

## Pull Requests

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Add a changeset: `pnpm changeset`
4. Ensure all checks pass: `pnpm lint && pnpm typecheck && pnpm test && pnpm format`
5. Submit your PR

## Commit Convention

We use [conventional commits](https://www.conventionalcommits.org/). Format: `type(scope): Subject`

| Type       | When to use                              |
| ---------- | ---------------------------------------- |
| `feat`     | New feature                              |
| `fix`      | Bug fix                                  |
| `refactor` | Code change (no new feature, no bug fix) |
| `docs`     | Documentation                            |
| `style`    | Formatting, lint fixes                   |
| `test`     | Adding or updating tests                 |
| `chore`    | Maintenance                              |
| `setup`    | Project setup or configuration           |

## Code Quality

- No `eslint-disable` comments. Fix the code.
- No `@ts-nocheck` / `@ts-ignore`. Fix the types.
- All components need tests and Storybook stories.
- Run `pnpm format:fix` before committing.

## Adding a Component

1. Create directory: `packages/react/src/components/<name>/`
2. Add files: `<Name>.tsx`, `<Name>Test.tsx`, `<Name>Stories.tsx`, `index.ts`
3. Add export in `packages/react/package.json`
4. Add tsup entry in `packages/react/tsup.config.ts`
5. Add documentation in `apps/docs/content/docs/components/<name>.mdx`
