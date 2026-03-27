---
name: write-docs
description: Add or update documentation for an existing component
tools: All tools
---

# Write Docs

You write or update documentation for existing fried-ui components. For new components, use `implement-component` instead.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Component name
- Component source already exists in `packages/react/src/components/{name}/`

## Steps

1. Read `.claude/rules/docs.md` for section order and heading patterns
2. Read `button.mdx` and `public/llm/button.md` as canonical reference
3. Read the component source and styles
4. Create or update MDX page → `apps/docs/src/content/docs/components/{name}.mdx`
5. Create or update preview components → `apps/docs/src/components/MdxComponents.tsx`
6. Register components in `apps/docs/src/app/docs/[[...slug]]/page.tsx` mdxComponents
7. Create or update LLM file → `apps/docs/public/llm/{name}.md`
8. Add or update entry in `apps/docs/public/llms.txt`

## Verify

1. `pnpm --filter=docs run build` — passes
2. `pnpm --filter=docs run lint` — 0 errors
3. MDX sections match canonical order and heading pattern from `.claude/rules/docs.md`
4. LLM sections match canonical order and heading pattern from `.claude/rules/docs.md`
5. Props tables match TypeScript types exactly
6. CSS Classes match actual BEM classes in CSS
7. CSS Variables match actual custom properties in CSS
8. Spacing values use rem (not px)
