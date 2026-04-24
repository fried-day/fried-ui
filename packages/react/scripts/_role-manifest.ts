/**
 * Role manifest — component → role + audit expectations.
 *
 * Drives Wave 2 audits:
 *   - required stories per role
 *   - pass-through props per role
 *   - container alignment per role
 *   - whether `children` argType must be marked required
 */

export type ComponentRoleKind = "interactive" | "form-field" | "display" | "composition";

export interface ComponentRole {
  /** Top-level showcase container alignment for variant-comparison stories. */
  alignment?: "items-start" | "items-center" | "items-end";
  /** ArgType keys that must exist (non-modifier pass-through props per role). */
  passthroughProps?: string[];
  /** Story names that must be exported. */
  requiredStories: string[];
  /** Whether the children argType must declare `type.required: true`. */
  requiresChildren?: boolean;
  /** Role kind. */
  role: ComponentRoleKind;
}

export const componentRoles: Record<string, ComponentRole> = {
  avatar: {
    alignment: "items-center",
    requiredStories: ["Default", "Sizes"],
    requiresChildren: false,
    role: "display",
  },
  "avatar-group": {
    alignment: "items-center",
    requiredStories: ["Default"],
    requiresChildren: true,
    role: "composition",
  },
  badge: {
    alignment: "items-center",
    requiredStories: ["Default", "Variants", "Sizes"],
    requiresChildren: true,
    role: "display",
  },
  button: {
    alignment: "items-end",
    passthroughProps: ["isDisabled", "isPending"],
    requiredStories: ["Default", "Variants", "Sizes", "Disabled"],
    requiresChildren: true,
    role: "interactive",
  },
  chip: {
    alignment: "items-center",
    requiredStories: ["Default", "Variants", "Sizes"],
    requiresChildren: true,
    role: "display",
  },
  description: {
    requiredStories: ["Default"],
    requiresChildren: true,
    role: "display",
  },
  field: {
    passthroughProps: ["isDisabled", "isReadOnly", "isRequired", "isInvalid"],
    requiredStories: ["Default", "Sizes", "Disabled"],
    requiresChildren: false,
    role: "form-field",
  },
  "field-error": {
    requiredStories: ["Default"],
    requiresChildren: true,
    role: "display",
  },
  input: {
    passthroughProps: ["disabled", "readOnly", "required", "aria-invalid"],
    requiredStories: ["Default", "Sizes", "Disabled"],
    requiresChildren: false,
    role: "form-field",
  },
  "input-group": {
    requiredStories: ["Default"],
    requiresChildren: true,
    role: "composition",
  },
  label: {
    requiredStories: ["Default"],
    requiresChildren: true,
    role: "display",
  },
  surface: {
    alignment: "items-start",
    requiredStories: ["Default", "Variants"],
    requiresChildren: true,
    role: "display",
  },
  textarea: {
    passthroughProps: ["disabled", "readOnly", "required", "aria-invalid"],
    requiredStories: ["Default", "Sizes", "Disabled"],
    requiresChildren: false,
    role: "form-field",
  },
};
