import { clsx } from "clsx";

interface BemParams {
  block: string;
  modifiers: BemModifiers;
}

interface BemModifiers {
  [key: string]: boolean | string | undefined;
}

function bem(params: Readonly<BemParams>): string {
  const { block, modifiers } = params;

  const classes = Object.entries(modifiers).map(([key, value]) => {
    if (!value) return undefined;
    if (typeof value === "boolean") return `${block}--${key}`;
    if (key === "variant") return `${block}--${value}`;

    return `${block}--${key}-${value}`;
  });

  return clsx(block, ...classes);
}

export { bem };
