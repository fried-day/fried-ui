import { clsx } from "clsx";

interface ClassesParams {
  /** Component base class name (e.g. `"button"`, `"input"`). */
  block: string;
  /** Map of modifier keys to values. Emission rules: boolean becomes `{block}-{key}`, `variant` key becomes `{block}-{value}`, others become `{block}-{key}-{value}`. Falsy values skip emission. */
  modifiers: Modifiers;
  /** User-supplied class string appended last — wins on cascade. @default undefined */
  className?: string;
}

interface Modifiers {
  [key: string]: boolean | string | undefined;
}

/**
 * Compose a component's class list from `block`, typed `modifiers`, and optional `className`.
 * Emits single-dash class names (e.g. `button button-primary button-size-md`) and folds the user-supplied `className` at the end so it wins on cascade.
 *
 * @example
 * classes({ block: "button", modifiers: { variant: "primary", size: "md", disabled: true }, className: "mt-4" })
 * // returns "button button-primary button-size-md button-disabled mt-4"
 */
function classes(params: Readonly<ClassesParams>): string {
  const { block, className, modifiers } = params;

  const list = Object.entries(modifiers).map(([key, value]) => {
    if (!value) return;
    if (typeof value === "boolean") return `${block}-${key}`;
    if (key === "variant") return `${block}-${value}`;

    return `${block}-${key}-${value}`;
  });

  return clsx(block, ...list, className);
}

export { classes };
