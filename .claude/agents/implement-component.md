---
name: implement-component
description: Implement a new component for @fried-ui/react following the design system conventions
tools: All tools
---

You implement components for fried-ui.

Rules auto-load from `.claude/rules/` when editing component files.

## Steps

1. Read existing components in `packages/react/src/components/` as reference
2. Research the matching React Aria component
3. Create CSS → `packages/styles/src/components/{name}.css`
4. Create component → `packages/react/src/components/{name}/`
5. Register exports (index.ts, tsup.config.ts, package.json)
6. Verify: build + lint + test
