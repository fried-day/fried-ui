import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("interactive-component", {
    description: "Interactive component (wraps React Aria)",
    prompts: [
      { type: "input", name: "name", message: "Component name (PascalCase, e.g. Link):" },
      { type: "input", name: "racName", message: "React Aria component name (e.g. Link, Switch):" },
      { type: "input", name: "defaultVariant", message: "Default variant:", default: "primary" },
      { type: "input", name: "defaultSize", message: "Default size:", default: "md" },
    ],
    actions: [
      {
        type: "add",
        path: "packages/styles/src/components/{{dashCase name}}.css",
        templateFile: "templates/component.css.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.variants.ts",
        templateFile: "templates/component.variants.ts.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.test.tsx",
        templateFile: "templates/component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.stories.tsx",
        templateFile: "templates/component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      {
        type: "append",
        path: "packages/styles/src/components/index.css",
        template: '@import "./{{dashCase name}}.css";',
      },
      {
        type: "append",
        path: "packages/react/src/components/index.ts",
        template: 'export * from "./{{dashCase name}}";',
      },
    ],
  });
}
