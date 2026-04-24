import type { PlopTypes } from "@turbo/gen";

const TEMPLATE_FILES = [
  { ext: "css", path: "packages/styles/src/components/{{dashCase name}}.css", file: "component.css.hbs" },
  {
    ext: "tsx",
    path: "packages/react/src/components/{{dashCase name}}/{{pascalCase name}}.tsx",
    file: "Component.tsx.hbs",
  },
  {
    ext: "test",
    path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.test.tsx",
    file: "component.test.tsx.hbs",
  },
  {
    ext: "stories",
    path: "packages/react/src/components/{{dashCase name}}/{{dashCase name}}.stories.tsx",
    file: "component.stories.tsx.hbs",
  },
  { ext: "index", path: "packages/react/src/components/{{dashCase name}}/index.ts", file: "index.ts.hbs" },
];

function createActions(templateDir: string): PlopTypes.ActionType[] {
  const addActions: PlopTypes.ActionType[] = TEMPLATE_FILES.map(({ path, file }) => ({
    type: "add" as const,
    path,
    templateFile: `${templateDir}/${file}`,
  }));

  return [
    ...addActions,
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
  ];
}

function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("display-component", {
    description: "Display-only component with inline `export interface {Name}Props` (single component)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g. Surface):",
      },
    ],
    actions: createActions("display-component"),
  });

  plop.setGenerator("interactive-component", {
    description: "Interactive component wrapping React Aria with inline `export interface {Name}Props`",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g. Link):",
      },
    ],
    actions: createActions("interactive-component"),
  });

  plop.setGenerator("display-compound-component", {
    description: "Display compound with wrapper + named subpart (Badge + BadgeIndicator, Field + FieldLabel patterns)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Parent component name (PascalCase, e.g. Badge — subpart emits as {Name}Item):",
      },
    ],
    actions: createActions("display-compound-component"),
  });

  plop.setGenerator("interactive-compound-component", {
    description: "Interactive compound with wrapper + named subpart wrapping React Aria",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Parent component name (PascalCase, e.g. Menu — subpart emits as {Name}Item):",
      },
    ],
    actions: createActions("interactive-compound-component"),
  });
}

export default generator;
