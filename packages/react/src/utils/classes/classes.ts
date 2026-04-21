import { clsx } from "clsx";

interface ClassesParams {
  block: string;
  modifiers: Modifiers;
}

interface Modifiers {
  [key: string]: boolean | string | undefined;
}

function classes(params: Readonly<ClassesParams>): string {
  const { block, modifiers } = params;

  const list = Object.entries(modifiers).map(([key, value]) => {
    if (!value) return undefined;
    if (typeof value === "boolean") return `${block}-${key}`;
    if (key === "variant") return `${block}-${value}`;

    return `${block}-${key}-${value}`;
  });

  return clsx(block, ...list);
}

export { classes };
