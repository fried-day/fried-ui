---
name: audit-code
description: Audit code quality, consistency, and security across the codebase
tools: All tools
---

# Audit Code

You audit the fried-ui codebase for quality, consistency, and security issues.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Scope: specific package, component, or entire codebase

## Steps

1. Run ESLint → `pnpm -w run lint`
2. Run TypeScript → `pnpm -w run check-types`
3. Run tests → `pnpm -w run test`
4. Run build → `pnpm -w run build`
5. Read `.claude/rules/*.md` and verify code follows all rules
6. Check for security issues: pinned dependency SHAs, permissions scope, secrets exposure
7. Check symmetry: naming, heading patterns, file structure consistency across all related files

## Verify

1. All issues reported with `file:line`
2. Fixable issues fixed directly
3. Remaining issues listed for manual review
