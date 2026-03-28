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
- Component type: interactive (wraps React Aria) or display-only (plain element)
- Matching React Aria primitive (if interactive)

## Steps

### Phase 0: Read Rules and References

1. Read `.claude/rules/architecture.md` — component types, BEM naming, TypeScript rules
2. Read `.claude/rules/styles.md` — token system, spacing math, color tokens
3. Read `.claude/rules/docs.md` — REQUIRED vs CONDITIONAL sections, source of truth rules
4. Read `.claude/rules/storybook.md` — meta structure, lint rules, single-line vs multi-line JSX
5. Read Button component files as canonical reference (CSS, React, test, story, MDX, LLM)
6. If interactive: read the matching React Aria component docs

### Phase 1: Styles

7. Create CSS → `packages/styles/src/components/{name}.css`
   - BEM naming: `fri-{name}` prefix
   - Use `@apply` with semantic tokens
   - Interactive: include hover/active/focus/disabled states
   - Display-only: no interaction states
8. Import CSS → `packages/styles/src/components/index.css` (alphabetical order)

### Phase 2: React Component

9. Create component → `packages/react/src/components/{name}/{Name}.tsx`
   - `"use client"` directive
   - `forwardRef` pattern
   - Inline union types, alphabetically sorted type members
   - Interactive: `Omit<RAC{Name}Props, "className" | "children">`, `composeRenderProps`
   - Display-only: explicit props only, forward to plain element
10. Create test → `packages/react/src/components/{name}/{name}.test.tsx`
    - Test: renders, default BEM classes, each variant/size/radius, className merge, ref forwarding
    - Interactive: add render props test, disabled test, event handler test
11. Create story → `packages/react/src/components/{name}/{name}.stories.tsx`
    - Read `storybook.md` first — follow lint rules exactly
    - argTypes from component's actual props — do not copy from Button
    - Single-line siblings: NO empty line. Multi-line siblings: empty line required
12. Create barrel → `packages/react/src/components/{name}/index.ts`
13. Register exports:
    - `packages/react/src/components/index.ts` (alphabetical)
    - `packages/react/tsup.config.ts` (alphabetical)
    - `packages/react/package.json` exports map (alphabetical)

### Phase 3: Documentation

14. Create MDX page → `apps/docs/src/content/docs/components/{name}.mdx`
    - Include ALL required sections from `docs.md`: Features, Anatomy, prop demos, Accessibility, API Reference
    - Props table: read from TypeScript source — list every prop
    - CSS Classes table: read from CSS source — list every BEM class
    - CSS Variables table: read from CSS source — list every custom property
15. Create preview components → `apps/docs/src/components/MdxComponents.tsx`
    - One function per `<Preview>` used in MDX
    - Export all functions
16. Register preview components → `apps/docs/src/app/docs/[[...slug]]/page.tsx`
    - Import and add to mdxComponents object
17. Create LLM file → `apps/docs/public/llm/{name}.md`
    - Include ALL required sections from `docs.md`
    - More examples than MDX
    - Data Attributes section only if component uses React Aria
18. Add entry to `apps/docs/public/llms.txt`
19. Add to sidebar → `apps/docs/src/content/docs/meta.json` (alphabetical under Components)

### Phase 4: Verify

20. Run `pnpm --filter=@fried-ui/react lint` — fix ALL errors before proceeding
21. Run `pnpm -w run lint` — fix any remaining errors
22. Run `pnpm -w run check-types` — fix type errors
23. Run `pnpm --filter=@fried-ui/react test` — fix test failures
24. Run `pnpm -w run build` — fix build failures
25. Verify docs sections match canonical order from `.claude/rules/docs.md`
26. Verify symmetry with existing components (Button as reference)
