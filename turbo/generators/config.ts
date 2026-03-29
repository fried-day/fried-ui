import type { PlopTypes } from "@turbo/gen";

function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("display-component", {
    description: "Display-only component (native HTML element)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g. Surface):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/styles/src/components/{{dashCase name}}.css",
        templateFile: "display-component/component.css.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{pascalCase name}}.tsx",
        templateFile: "display-component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.variants.ts",
        templateFile: "display-component/component.variants.ts.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.test.tsx",
        templateFile: "display-component/component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.stories.tsx",
        templateFile: "display-component/component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/index.ts",
        templateFile: "display-component/index.ts.hbs",
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

  plop.setGenerator("interactive-component", {
    description: "Interactive component (wraps React Aria)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g. Link):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/styles/src/components/{{dashCase name}}.css",
        templateFile: "interactive-component/component.css.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{pascalCase name}}.tsx",
        templateFile: "interactive-component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.variants.ts",
        templateFile: "interactive-component/component.variants.ts.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.test.tsx",
        templateFile: "interactive-component/component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.stories.tsx",
        templateFile: "interactive-component/component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "packages/react/src/components/{{dashCase name}}/index.ts",
        templateFile: "interactive-component/index.ts.hbs",
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

export default generator;
