---
name: implement-component
description: Customize a scaffolded component
tools: All tools
---

# Implement Component

You customize component files that were already scaffolded by `turbo gen`. Files exist on disk — you modify them, not create from scratch.

## Inputs

- Component name (already scaffolded)
- **Prop Spec** (variant/size/boolean props to implement)
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

### 0. Read the scaffolded files

Read ALL 6 files that turbo gen created. Understand what needs to change based on research.

### 2. Customize CSS

- Adjust `@apply` values — use Tailwind built-in classes only (no arbitrary values)
- Add/remove size steps based on use cases
- Add component-specific modifiers (e.g. `--pending`, `--icon-only`)

### 3. Customize component

- Change HTML element to the most semantic option
- Add/remove props in destructure based on spec
- Update `ComponentPropsWithRef<"element">` to match HTML element

### 4. Customize variants

- Adjust interface props to match spec
- Add/remove variant options based on use cases

### 5. Customize tests

- Add component-specific tests
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

- [ ] CSS values are system-aligned, not arbitrary
- [ ] Semantic HTML element chosen
- [ ] React Aria hooks used where applicable
- [ ] All template tests preserved + component-specific tests added
