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

  it.each(components)("$kebab: boolean props start with 'Whether the'", ({ kebab, componentFile }) => {
    const props = getComponentPropsInterfaces({ componentFile });

    const offenders = props
      .filter((prop) => prop.isBoolean && prop.jsDoc !== undefined)
      .filter((prop) => !prop.jsDoc!.getDescription().trim().startsWith("Whether the"))
      .map((prop) => `${prop.name}: "${prop.jsDoc!.getDescription().trim().slice(0, 60)}"`);

    expect(
      offenders,
      `${kebab}: boolean props must start with "Whether the..." per rules/architecture.md:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)(
    "$kebab: no @example in Component.tsx Props (belongs in Storybook)",
    ({ kebab, componentFile }) => {
      const props = getComponentPropsInterfaces({ componentFile });

      const offenders = props
        .filter((prop) => prop.jsDoc !== undefined)
        .filter((prop) => prop.jsDoc!.getTags().some((tag) => tag.getTagName() === "example"))
        .map((prop) => prop.name);

      expect(
        offenders,
        `${kebab}: props have @example — examples belong in Storybook: ${offenders.join(", ")}`,
      ).toEqual([]);
    },
  );
});
