---
name: audit-code
description: Audit consistency, symmetry, and rule compliance across the codebase
tools: All tools
---

# Audit Code

You audit the fried-ui codebase for consistency, symmetry, and rule compliance.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Scope: specific package, component, or entire codebase

## Steps

1. Read ALL `.claude/rules/*.md` first
2. For each component in scope, read all related files:
   - CSS (`packages/styles/src/components/{name}.css`)
   - React (`packages/react/src/components/{name}/{Name}.tsx`)
   - Test (`{name}.test.tsx`)
   - Story (`{name}.stories.tsx`)
   - MDX (`apps/docs/src/content/docs/components/{name}.mdx`)
   - LLM (`apps/docs/public/llm/{name}.md`)
   - MdxComponents.tsx entries
   - page.tsx registrations

3. Check **source-of-truth sync**:
   - Props in TypeScript type === Props in MDX table === Props in LLM table
   - BEM classes in CSS file === CSS Classes in MDX table === CSS Classes in LLM table
   - CSS custom properties in CSS file === CSS Variables in MDX table === CSS Variables in LLM table
   - Storybook argTypes match component's actual props only

4. Check **docs sections** match canonical order from `docs.md`:
   - MDX has ALL required sections (Features, Anatomy, Accessibility, API Reference)
   - LLM has ALL required sections (Install, Import, Props, CSS Classes, CSS Variables, Examples, Anatomy, Accessibility, Constraints)
   - CONDITIONAL sections present only when applicable

5. Check **MdxComponents registration**:
   - Every `<{Name}Xxx />` in MDX has a function in MdxComponents.tsx
   - Every function is exported
   - Every export is imported and registered in page.tsx mdxComponents

6. Check **TypeScript rules**:
   - Type members sorted alphabetically (lint: `sort-type-alphabetically`)
   - Inline union types, not type aliases
   - forwardRef on all components

7. Check **JSX lint rules**:
   - Single-line siblings: NO empty line (lint: `jsx-no-newline-single-line-elements`)
   - Multi-line siblings: empty line required (lint: `jsx-newline-between-elements`)
   - Prop sort order: strings → hyphenated → expressions → shorthand booleans
   - Explicit return types on all render functions

8. Check **symmetry** between components:
   - File structure identical
   - Naming patterns consistent
   - Heading patterns consistent

9. Run verification commands:
   - `pnpm -w run lint` — fix any errors
   - `pnpm -w run check-types` — fix any errors
   - `pnpm --filter=@fried-ui/react test` — fix any failures
   - `pnpm -w run build` — fix any failures

## Verify

1. All issues reported with `file:line`
2. Fixable issues fixed directly
3. Remaining issues listed for manual review
