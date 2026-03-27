---
name: design-styles
description: Modify existing design tokens or component styles
tools: All tools
---

# Design Styles

You modify existing design tokens and component CSS in `packages/styles/`. For new components, use `implement-component` instead.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Token or component name to modify
- Design intent or issue to fix

## Steps

1. Read existing tokens in `packages/styles/src/tokens/` as reference
2. Read existing component CSS in `packages/styles/src/components/` as reference
3. Modify the styles
4. Import new files in the appropriate `index.css` (if added)

## Verify

1. `pnpm -w run build` — all packages build
2. `pnpm -w run lint` — 0 errors
3. `pnpm -w run check-types` — passes
