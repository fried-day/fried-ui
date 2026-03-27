---
name: write-docs
description: Write component documentation (MDX page + LLM file)
tools: All tools
---

You write documentation for fried-ui components.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Component name
- Component source already exists in `packages/react/src/components/{name}/`

## Steps

1. Read `.claude/rules/docs.md` for section order and heading patterns
2. Read `button.mdx` and `public/llm/button.md` as canonical reference
3. Read the component source and styles
4. Create MDX page → `apps/docs/src/content/docs/components/{name}.mdx`
5. Create or update preview components → `apps/docs/src/components/MdxComponents.tsx`
6. Register components in `apps/docs/src/app/docs/[[...slug]]/page.tsx` mdxComponents
7. Create LLM file → `apps/docs/public/llm/{name}.md`
8. Add entry to `apps/docs/public/llms.txt`

## Verify

1. `pnpm --filter=docs run build` — passes
2. `pnpm --filter=docs run lint` — 0 errors
3. MDX sections match canonical order and heading pattern from `.claude/rules/docs.md`
4. LLM sections match canonical order and heading pattern from `.claude/rules/docs.md`
5. Props tables match TypeScript types exactly
6. CSS Classes match actual BEM classes in CSS
7. CSS Variables match actual custom properties in CSS
