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

1. Read `.claude/rules/*.md` and verify code follows all rules
2. Check symmetry: naming, heading patterns, file structure consistency across all related files
3. Check docs: MDX and LLM files match canonical order from `.claude/rules/docs.md`
4. Check props tables match TypeScript types, CSS Classes match BEM, CSS Variables match custom properties
5. Run `pnpm -w run lint` — fix any errors
6. Run `pnpm -w run check-types` — fix any errors
7. Run `pnpm -w run test` — fix any failures
8. Run `pnpm -w run build` — fix any failures

## Verify

1. All issues reported with `file:line`
2. Fixable issues fixed directly
3. Remaining issues listed for manual review
