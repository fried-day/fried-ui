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

1. Read `.claude/rules/docs.md` — understand REQUIRED vs CONDITIONAL sections, source of truth rules
2. Read the component source (`{Name}.tsx`) — extract every prop from TypeScript type
3. Read the component styles (`{name}.css`) — extract every BEM class and CSS custom property
4. Read Button MDX and LLM as canonical reference for format and depth
5. Create or update MDX page → `apps/docs/src/content/docs/components/{name}.mdx`
   - Include ALL required sections: Features, Anatomy, prop demos, Accessibility, API Reference
   - Props table from TypeScript source — list every prop
   - CSS Classes table from CSS source — list every BEM class
   - CSS Variables table from CSS source — list every custom property
6. Create or update preview components → `apps/docs/src/components/MdxComponents.tsx`
   - One function per `<Preview>` in MDX
   - Export all functions
7. Register components in `apps/docs/src/app/docs/[[...slug]]/page.tsx` mdxComponents
8. Create or update LLM file → `apps/docs/public/llm/{name}.md`
   - Include ALL required sections
   - More examples than MDX
9. Add or update entry in `apps/docs/public/llms.txt`

## Verify

1. `pnpm --filter=docs run build` — passes
2. `pnpm --filter=docs run lint` — 0 errors
3. MDX sections match canonical order from `.claude/rules/docs.md`
4. LLM sections match canonical order from `.claude/rules/docs.md`
5. Props tables match TypeScript types exactly (read source, do not guess)
6. CSS Classes match actual BEM classes in CSS (read source, do not guess)
7. CSS Variables match actual custom properties in CSS (read source, do not guess)
8. Every `<Preview>` component exists in MdxComponents.tsx and is registered in page.tsx
9. Spacing values use rem (not px)
