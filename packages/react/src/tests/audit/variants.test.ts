import { describe, expect, it } from "vitest";

import { getComponentPropsInterfaces } from "../helpers/ast";
import { components } from "../helpers/components";

const genericPropNames = new Set(["children", "className", "ref", "as"]);

describe("Audit — Props JSDoc conventions (inline in Component.tsx)", () => {
  it.each(components)("$kebab: every modifier prop has a JSDoc comment", ({ kebab, componentFile }) => {
    const props = getComponentPropsInterfaces({ componentFile });

    const missing = props
      .filter((prop) => !genericPropNames.has(prop.name))
      .filter((prop) => prop.jsDoc === undefined)
      .map((prop) => prop.name);

    expect(missing, `${kebab}: props missing JSDoc: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(components)("$kebab: every documented modifier prop has @default annotation", ({ kebab, componentFile }) => {
    const props = getComponentPropsInterfaces({ componentFile });

    const missing = props
      .filter((prop) => !genericPropNames.has(prop.name))
      .filter((prop) => !prop.name.startsWith("on"))
      .filter((prop) => prop.jsDoc !== undefined)
      .filter((prop) => !prop.jsDoc!.getTags().some((tag) => tag.getTagName() === "default"))
      .map((prop) => prop.name);

    expect(missing, `${kebab}: props missing @default: ${missing.join(", ")}`).toEqual([]);
  });
});
