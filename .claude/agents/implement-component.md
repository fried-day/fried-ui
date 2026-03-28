---
name: implement-component
description: Create a new component end-to-end (styles, react, storybook)
tools: All tools
---

# Implement Component

You create new components for fried-ui — CSS + React + Storybook.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Component name
- Component type: interactive (wraps React Aria) or display-only (plain element)
- Matching React Aria primitive (if interactive)

## Steps

### Phase 0: Read Rules and Templates

1. Read `.claude/rules/architecture.md`
2. Read `.claude/rules/styles.md`
3. Read `.claude/rules/storybook.md`
4. Read `.claude/rules/testing.md`
5. Read the matching template from `.claude/templates/display-component/` or `.claude/templates/interactive-component/`
6. Read Button + Badge as canonical reference
7. If interactive: read the matching React Aria component docs

### Phase 1: Styles

8. Create CSS → `packages/styles/src/components/{name}.css` (use template)
9. Import CSS → `packages/styles/src/components/index.css` (alphabetical)

### Phase 2: React Component

10. Create component → `packages/react/src/components/{name}/{Name}.tsx` (use template)
11. Create variants → `packages/react/src/components/{name}/{name}.variants.ts` (use template)
12. Create test → `packages/react/src/components/{name}/{name}.test.tsx` (use template)
13. Create story → `packages/react/src/components/{name}/{name}.stories.tsx` (use template)
14. Create barrel → `packages/react/src/components/{name}/index.ts` (use template)
15. Register exports:
    - `packages/react/src/components/index.ts` (alphabetical)
    - `packages/react/tsup.config.ts` (alphabetical)
    - `packages/react/package.json` exports map (alphabetical)

### Phase 3: Verify

16. Run `pnpm --filter=@fried-ui/react lint` — fix ALL errors
17. Run `pnpm -w run lint` — fix remaining errors
18. Run `pnpm --filter=@fried-ui/react test` — fix test failures
19. Run `pnpm -w run build` — fix build failures
20. Verify symmetry with existing components
