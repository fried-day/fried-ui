import { describe, expect, it } from "vitest";

import { getVariantsInterfaceProps } from "../helpers/ast";
import { components } from "../helpers/components";

describe("Audit — variants.ts JSDoc conventions", () => {
  it.each(components)("$kebab: every prop has a JSDoc comment", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });
    const missing = props.filter((prop) => prop.jsDoc === undefined).map((prop) => prop.name);

    expect(missing, `${kebab}.variants.ts: props missing JSDoc: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(components)("$kebab: every prop has @default annotation", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });

    const missing = props
      .filter((prop) => prop.jsDoc !== undefined)
      .filter((prop) => !prop.jsDoc!.getTags().some((tag) => tag.getTagName() === "default"))
      .map((prop) => prop.name);

    expect(missing, `${kebab}.variants.ts: props missing @default: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(components)("$kebab: boolean props start with 'Whether the'", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });

    const offenders = props
      .filter((prop) => prop.isBoolean && prop.jsDoc !== undefined)
      .filter((prop) => !prop.jsDoc!.getDescription().trim().startsWith("Whether the"))
      .map((prop) => `${prop.name}: "${prop.jsDoc!.getDescription().trim().slice(0, 60)}"`);

    expect(
      offenders,
      `${kebab}.variants.ts: boolean props must start with "Whether the..." per architecture.md:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it.each(components)("$kebab: no @example in variants.ts (belongs in Storybook)", ({ kebab, variantsFile }) => {
    const props = getVariantsInterfaceProps({ variantsFile });

    const offenders = props
      .filter((prop) => prop.jsDoc !== undefined)
      .filter((prop) => prop.jsDoc!.getTags().some((tag) => tag.getTagName() === "example"))
      .map((prop) => prop.name);

    expect(
      offenders,
      `${kebab}.variants.ts: props have @example — examples belong in Storybook: ${offenders.join(", ")}`,
    ).toEqual([]);
  });
});
