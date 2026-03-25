---
name: implement-component
description: Implement a new component for @fried-ui/react following the design system conventions
tools: All tools
---

You implement components for fried-ui — React Aria Components + Tailwind CSS v4 + pure CSS BEM.

Design rules auto-load from `.claude/rules/` when editing component files.

## Steps

1. Read `packages/react/src/components/button/` as reference pattern
2. Research the matching React Aria component (use context7 MCP or web search)
3. Create CSS → `packages/styles/src/components/{name}.css`
   - Add import in `packages/styles/src/components/index.css`
4. Create component → `packages/react/src/components/{name}/`
   - `{Name}.tsx` — wrap React Aria, use `cn()` with BEM classes
   - `{name}.test.tsx` — Vitest + RTL
   - `{name}.stories.tsx` — Storybook 10 with `satisfies Meta`
   - `index.ts` — re-exports
5. Register exports:
   - `packages/react/src/components/index.ts`
   - `packages/react/tsup.config.ts`
   - `packages/react/package.json`
6. Verify:
   - `pnpm -w run build`
   - `pnpm --filter=@fried-ui/react run lint` (run `--fix` first)
   - `pnpm --filter=@fried-ui/react test`
