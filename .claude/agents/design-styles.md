---
name: design-styles
description: Design and maintain the design token system and component styles
tools: All tools
---

# Design Styles

You design and develop the fried-ui style system in `packages/styles/`.

Rules auto-load from `.claude/rules/` when editing matching files.

## Inputs

- Token or component name to create/modify
- Design intent or issue to fix

## Steps

1. Read existing tokens in `packages/styles/src/tokens/` as reference
2. Read existing component CSS in `packages/styles/src/components/` as reference
3. Design, create, or fix the styles
4. Import new files in the appropriate `index.css`

## Verify

1. `pnpm -w run build` — all packages build
2. `pnpm -w run lint` — 0 errors
3. `pnpm -w run check-types` — passes
