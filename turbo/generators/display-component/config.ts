import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("display-component", {
    description: "Display-only component (native HTML element)",
    prompts: [
      { type: "input", name: "name", message: "Component name (PascalCase, e.g. Divider):" },
      { type: "input", name: "element", message: "HTML element (e.g. hr, span, div):", default: "div" },
      { type: "input", name: "defaultVariant", message: "Default variant:", default: "primary" },
      { type: "input", name: "defaultSize", message: "Default size:", default: "md" },
    ],
    actions: [
      // CSS
      {
        type: "add",
        path: "packages/styles/src/components/{{dashCase name}}.css",
        templateFile: "templates/component.css.hbs",
      },
      // Component
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
      // Variants
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.variants.ts",
        templateFile: "templates/component.variants.ts.hbs",
      },
      // Test
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.test.tsx",
        templateFile: "templates/component.test.tsx.hbs",
      },
      // Stories
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.stories.tsx",
        templateFile: "templates/component.stories.tsx.hbs",
      },
      // Barrel
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      // Register CSS import
      {
        type: "append",
        path: "packages/styles/src/components/index.css",
        template: '@import "./{{dashCase name}}.css";',
      },
      // Register component export
      {
        type: "append",
        path: "packages/react/src/components/index.ts",
        template: 'export * from "./{{dashCase name}}";',
      },
    ],
  });
}
