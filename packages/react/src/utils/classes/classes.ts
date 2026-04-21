import { clsx } from "clsx";

interface ClassesParams {
  block: string;
  modifiers: Modifiers;
  className?: string;
}

interface Modifiers {
  [key: string]: boolean | string | undefined;
}

function classes(params: Readonly<ClassesParams>): string {
  const { block, className, modifiers } = params;

  const list = Object.entries(modifiers).map(([key, value]) => {
    if (!value) return undefined;
    if (typeof value === "boolean") return `${block}-${key}`;
    if (key === "variant") return `${block}-${value}`;

    return `${block}-${key}-${value}`;
  });

  return clsx(block, ...list, className);
}

export { classes };
