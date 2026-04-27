import type { ObjectLiteralExpression, PropertyAssignment, SourceFile } from "ts-morph";
import { Node, Project } from "ts-morph";
import { describe, expect, it } from "vitest";

import { findMetaObject, loadSource } from "../helpers/ast";
import { components } from "../helpers/components";
import {
  getArgTypeNames,
  getArgTypesObject,
  getComponentInterfaceProps,
  passthroughAllowedExtras,
} from "../helpers/stories-ast";

function getEnumDescriptionLiteral(config: ObjectLiteralExpression): { text: string; line: number } | undefined {
  const optionsProp = config.getProperty("options");
  if (!Node.isPropertyAssignment(optionsProp)) return undefined;

  const optionsInit = optionsProp.getInitializer();
  if (!Node.isArrayLiteralExpression(optionsInit)) return undefined;

  if (optionsInit.getElements().length <= 2) return undefined;

  const descriptionProp = config.getProperty("description");

  if (!Node.isPropertyAssignment(descriptionProp)) {
    const text = "";
    const line = 0;

    return { text, line };
  }

  const descInit = descriptionProp.getInitializer();
  if (!Node.isStringLiteral(descInit) && !Node.isNoSubstitutionTemplateLiteral(descInit)) return undefined;

  const text = descInit.getLiteralText();
  const line = descInit.getStartLineNumber();

  return { text, line };
}

function checkEnumDescription(argTypeProp: PropertyAssignment): string | undefined {
  const propName = argTypeProp.getName();
  const config = argTypeProp.getInitializer();
  if (!Node.isObjectLiteralExpression(config)) return undefined;

  const literal = getEnumDescriptionLiteral(config);
  if (!literal) return undefined;
  if (literal.line === 0) return `argTypes.${propName} has options but no description`;

  const wordCount = literal.text.split(/\s+/).filter(Boolean).length;
  const hasBoldGroup = /\*\*[^*]+\*\*/.test(literal.text);

  const reasons: string[] = [];
  if (!hasBoldGroup) reasons.push("missing **bold** option groups");
  if (wordCount < 50) reasons.push(`only ${String(wordCount)} words (min 50)`);
  if (wordCount > 120) reasons.push(`${String(wordCount)} words (max 120)`);

  if (reasons.length === 0) return undefined;

  return `line ${String(literal.line)}: argTypes.${propName}.description: ${reasons.join("; ")}`;
}

function collectExportedSubparts(componentSource: SourceFile): Set<string> {
  const exported = new Set<string>();

  for (const stmt of componentSource.getStatements()) {
    if (!Node.isExportDeclaration(stmt)) continue;

    for (const named of stmt.getNamedExports()) {
      const name = named.getName();
      if (componentSource.getInterface(`${name}Props`)) exported.add(name);
    }
  }

  return exported;
}

function collectSubcomponentEntries(init: ObjectLiteralExpression): string[] {
  const entries: string[] = [];

  for (const subProp of init.getProperties()) {
    if (Node.isShorthandPropertyAssignment(subProp)) {
      entries.push(subProp.getName());
    } else if (Node.isPropertyAssignment(subProp)) {
      const subInit = subProp.getInitializer();
      if (subInit) entries.push(subInit.getText());
    }
  }

  return entries;
}

function collectDocumentedFromMeta(meta: ObjectLiteralExpression): Set<string> {
  const documented = new Set<string>();

  const componentProp = meta.getProperty("component");

  if (Node.isPropertyAssignment(componentProp)) {
    const init = componentProp.getInitializer();
    if (init) documented.add(init.getText());
  }

  const subcomponentsProp = meta.getProperty("subcomponents");

  if (Node.isPropertyAssignment(subcomponentsProp)) {
    const init = subcomponentsProp.getInitializer();

    if (Node.isObjectLiteralExpression(init)) {
      for (const entry of collectSubcomponentEntries(init)) documented.add(entry);
    }
  }

  return documented;
}

describe("Audit — story / interface parity", () => {
  it.each(components)(
    "$kebab: every {Pascal}Props prop has an argType (and vice versa)",
    ({ componentFile, kebab, pascal, storiesFile }) => {
      const interfaceProps = getComponentInterfaceProps({ componentFile, pascal });
      if (interfaceProps.length === 0) return;

      const source = loadSource({ file: storiesFile });
      if (!source) return;

      const argTypeNames = new Set(getArgTypeNames(source));
      const interfacePropNames = new Set(interfaceProps.map((prop) => prop.name));

      const offenders: string[] = [];

      for (const prop of interfaceProps) {
        if (prop.name === "ref") continue;
        if (argTypeNames.has(prop.name)) continue;

        offenders.push(`interface prop "${prop.name}" missing from argTypes`);
      }

      for (const argTypeName of argTypeNames) {
        if (interfacePropNames.has(argTypeName)) continue;
        if (passthroughAllowedExtras.has(argTypeName)) continue;

        offenders.push(`argType "${argTypeName}" not declared in ${pascal}Props (and not in pass-through whitelist)`);
      }

      expect(
        offenders,
        `${kebab}.stories.tsx argTypes and ${pascal}Props out of sync:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(components)(
    "$kebab: enum argType descriptions follow 4-part template (50–120 words, **bold** groups)",
    ({ kebab, storiesFile }) => {
      const source = loadSource({ file: storiesFile });
      if (!source) return;

      const argTypes = getArgTypesObject(source);
      if (!argTypes) return;

      const offenders: string[] = [];

      for (const argTypeProp of argTypes.getProperties()) {
        if (!Node.isPropertyAssignment(argTypeProp)) continue;
        const offender = checkEnumDescription(argTypeProp);
        if (offender) offenders.push(offender);
      }

      expect(
        offenders,
        `${kebab}.stories.tsx enum descriptions violate 4-part template:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(components)(
    "$kebab: every exported subpart with {Sub}Props is listed in meta.component or meta.subcomponents",
    ({ componentFile, kebab, storiesFile }) => {
      const project = new Project({ skipAddingFilesFromTsConfig: true });
      const componentSource = project.addSourceFileAtPath(componentFile);

      const exportedComponents = collectExportedSubparts(componentSource);
      if (exportedComponents.size === 0) return;

      const storiesSource = loadSource({ file: storiesFile });
      if (!storiesSource) return;

      const meta = findMetaObject(storiesSource);
      if (!Node.isObjectLiteralExpression(meta)) return;

      const documented = collectDocumentedFromMeta(meta);

      const offenders: string[] = [];

      for (const subpart of exportedComponents) {
        if (documented.has(subpart)) continue;

        offenders.push(
          `${subpart} has ${subpart}Props with documented modifiers but is not in meta.component or meta.subcomponents (Storybook autodocs needs the subpart listed so react-docgen-typescript renders its tab)`,
        );
      }

      expect(
        offenders,
        `${kebab}.stories.tsx must list every component exported from ${kebab}/${kebab}.tsx that ships modifier props:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );
});
