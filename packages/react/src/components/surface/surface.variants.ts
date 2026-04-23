export interface SurfaceVariantsProps {
  /** Whether the surface has an emphasis border. @default false */
  isBordered?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  /** Elevation depth. @default 'none' */
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background layer tone (layer cake). `default` (neutral-50 — standard card), `subtle` (neutral-100 — nested/inset deeper), `plain` (pure white — elevated/inverted), `overlay` (surface on top of a dim scrim, e.g., popover/modal content). @default 'default' */
  variant?: "default" | "subtle" | "plain" | "overlay";
}
