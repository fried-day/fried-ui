---
name: implement-component
description: Create a new component end-to-end (styles, react, docs)
tools: All tools
---

# Implement Component

You create new components for fried-ui — the full pipeline from CSS to docs.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Component name
- Matching React Aria primitive (if any)

## Steps

1. Read existing components as reference (styles, react, docs)
2. Read the matching React Aria component docs
3. Create CSS → `packages/styles/src/components/{name}.css`
4. Import CSS → `packages/styles/src/components/index.css`
5. Create component → `packages/react/src/components/{name}/{Name}.tsx`
6. Create test → `packages/react/src/components/{name}/{name}.test.tsx`
7. Create story → `packages/react/src/components/{name}/{name}.stories.tsx`
8. Create barrel → `packages/react/src/components/{name}/index.ts`
9. Register exports (index.ts, tsup.config.ts, package.json)
10. Create MDX page → `apps/docs/src/content/docs/components/{name}.mdx`
11. Create preview components → `apps/docs/src/components/MdxComponents.tsx`
12. Register in `apps/docs/src/app/docs/[[...slug]]/page.tsx` mdxComponents
13. Create LLM file → `apps/docs/public/llm/{name}.md`
14. Add entry to `apps/docs/public/llms.txt`

## Verify

1. `pnpm -w run build` — all packages build
2. `pnpm -w run lint` — 0 errors
3. `pnpm -w run check-types` — passes
4. `pnpm --filter=@fried-ui/react test` — tests pass
5. Docs sections match canonical order from `.claude/rules/docs.md`
6. Symmetry with existing components verified
