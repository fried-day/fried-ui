# Component Template

Display-only component template for fried-ui. Replace `{{name}}` (lowercase) and `{{Name}}` (PascalCase) with the component name.

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
3. `packages/react/tsup.config.ts` — add entry `"components/{name}/index": "src/components/{name}/index.ts"`
4. `packages/react/package.json` — add export `"./{name}": { "import": "./src/components/{name}/index.ts" }`

## Customization

- Default HTML element is `<div>`. Change to `<span>`, `<section>`, etc. as needed.
- Default ref type is `HTMLDivElement`. Match with the HTML element.
- Adjust variants/sizes in `.variants.ts` and `.css` per component needs.
- For interactive components (React Aria), use Button.tsx as reference instead.
