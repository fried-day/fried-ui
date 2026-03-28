# Interactive Component Template

React Aria component template for fried-ui. Replace placeholders:

- `{{name}}` → lowercase (e.g. `link`, `switch`, `toggle-button`)
- `{{Name}}` → PascalCase (e.g. `Link`, `Switch`, `ToggleButton`)
- `{{RacName}}` → React Aria component name (e.g. `Link`, `Switch`, `ToggleButton`)

## Files

| Template                         | Output                                                    | Package          |
| -------------------------------- | --------------------------------------------------------- | ---------------- |
| `component.css.template`         | `packages/styles/src/components/{name}.css`               | @fried-ui/styles |
| `Component.tsx.template`         | `packages/react/src/components/{name}/{Name}.tsx`         | @fried-ui/react  |
| `component.variants.ts.template` | `packages/react/src/components/{name}/{name}.variants.ts` | @fried-ui/react  |
| `component.test.tsx.template`    | `packages/react/src/components/{name}/{name}.test.tsx`    | @fried-ui/react  |
| `component.stories.tsx.template` | `packages/react/src/components/{name}/{name}.stories.tsx` | @fried-ui/react  |
| `index.ts.template`              | `packages/react/src/components/{name}/index.ts`           | @fried-ui/react  |

## After generating, also update:

1. `packages/styles/src/components/index.css` — add `@import "./{name}.css";`
2. `packages/react/src/components/index.ts` — add `export * from "./{name}";`
3. `packages/react/tsup.config.ts` — add entry
4. `packages/react/package.json` — add export map

## Customization

- Replace `{{RacName}}` with the actual React Aria component (Button, Link, Switch, etc.)
- Replace `{{Name}}RenderProps` with the actual render props type from React Aria
- Add/remove modifiers in bem() as needed (e.g. pending, icon-only, full-width)
- Add Spinner if component has pending state
- Adjust CSS hover/active/focus states per component needs
