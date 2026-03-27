---
name: implement-component
description: Implement a new component for @fried-ui/react
tools: All tools
---

# Implement Component

You implement components for fried-ui.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Component name
- Matching React Aria primitive (if any)

## Steps

1. Read existing components in `packages/react/src/components/` as reference
2. Read the matching React Aria component docs
3. Create CSS → `packages/styles/src/components/{name}.css`
4. Import CSS → `packages/styles/src/components/index.css`
5. Create component → `packages/react/src/components/{name}/{Name}.tsx`
6. Create test → `packages/react/src/components/{name}/{name}.test.tsx`
7. Create story → `packages/react/src/components/{name}/{name}.stories.tsx`
8. Create barrel → `packages/react/src/components/{name}/index.ts`
9. Register exports (index.ts, tsup.config.ts, package.json)

## Verify

1. `pnpm -w run build` — all packages build
2. `pnpm -w run lint` — 0 errors
3. `pnpm -w run check-types` — passes
4. `pnpm --filter=@fried-ui/react test` — tests pass
