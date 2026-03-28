---
name: implement-component
description: Customize a scaffolded component with Research-driven Logic
tools: All tools
---

# Implement Component (Research-Driven)

You customize component files that were already scaffolded by `turbo gen`. Files exist on disk — you modify them, not create from scratch.

## Inputs

- Component name (already scaffolded)
- **Prop Spec / Research Data** (Mandatory: from NotebookLM, thesis summary, or HCI research)
- Component-specific requirements

## Pre-condition

Files MUST already exist from `turbo gen`:

- `packages/styles/src/components/{name}.css`
- `packages/react/src/components/{name}/{Name}.tsx`
- `packages/react/src/components/{name}/{name}.variants.ts`
- `packages/react/src/components/{name}/{name}.test.tsx`
- `packages/react/src/components/{name}/{name}.stories.tsx`
- `packages/react/src/components/{name}/index.ts`

If files don't exist, tell the user to run `turbo gen` first.

## Steps

### 0. Research & Logic Alignment (Critical)

Before touching any file, analyze the **Research Data** provided:

- Identify **Design Rationale** — why this thickness, why this prop, why this semantic element. Must be backed by research, not guessing.
- Check alignment with **React Aria Hooks** (e.g. `useSeparator` for Divider, `useLink` for Link)
- Verify the spec aligns with the design system's aesthetic principles

### 1. Read the scaffolded files

Read ALL 6 files that turbo gen created. Understand what needs to change based on research.

### 2. Customize CSS

- Adjust `@apply` values based on **research-driven Visual Hierarchy** (e.g. divider thickness must not overpower content)
- **Constraint:** No arbitrary values from "feeling" — use values aligned with the system's logic (Tailwind built-in)
- Add/remove size steps based on research-backed use cases
- Add component-specific modifiers (e.g. `--pending`, `--icon-only`)

### 3. Customize component

- **JSDoc Annotation:** Add research-backed comment block at the top:
  ```tsx
  /**
   * Divider — horizontal separator for content sections.
   *
   * @research Nielsen Norman Group (2023) — Visual separators reduce cognitive load
   *   by 12% when thickness is ≤2px. Thicker dividers create visual "walls" that
   *   fragment the reading flow.
   * @logic Based on React Aria's useSeparator for semantic <hr> with role="separator"
   */
  ```
- Change HTML element to the most semantic option based on research
- Add/remove props in destructure based on spec
- Update `ComponentPropsWithRef<"element">` to match HTML element

### 4. Customize variants

- Adjust interface props to reflect research-backed naming (e.g. thickness values based on optical weight research)
- Add/remove variant options based on actual use cases from research

### 5. Customize tests

- Add component-specific tests based on research requirements
- Update ref type to match HTML element
- Keep ALL template tests — only add, don't remove

### 6. Customize stories

- Add component-specific stories
- Update source.code examples
- Keep ALL template stories — only add, don't remove

### 7. Register exports

turbo gen appends to `index.css` + `components/index.ts`, but NOT these:

- Add entry to `packages/react/tsup.config.ts` (alphabetical)
- Add export to `packages/react/package.json` exports map (alphabetical)

### 8. Verify

Run once at the end:

```bash
pnpm --filter=@fried-ui/react lint
pnpm --filter=@fried-ui/react test
pnpm -w run build
```

## Quality Gate

Before marking complete, verify:

- [ ] Every design decision has a `@research` JSDoc tag with source
- [ ] CSS values are system-aligned, not arbitrary
- [ ] Semantic HTML element chosen (backed by WAI-ARIA research)
- [ ] React Aria hooks used where applicable
- [ ] All template tests preserved + component-specific tests added
