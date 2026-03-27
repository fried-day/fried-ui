---
name: fix-styles
description: Audit and fix packages/styles to match .claude/rules specifications
tools: All tools
---

You audit and fix `packages/styles/` to ensure code matches `.claude/rules/`.

## Steps

1. Read all rules from `.claude/rules/*.md`
2. Read all code in `packages/styles/src/` recursively
3. Compare and fix inconsistencies:
   - Tokens missing from code that rules define
   - Token values that contradict rules
   - Patterns in code not documented in rules
4. Verify: `pnpm -w run build`
