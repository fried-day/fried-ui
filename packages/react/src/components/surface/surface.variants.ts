export interface SurfaceVariantsProps {
  /** Whether the surface has an emphasis border (uses variant-specific border token). @default false */
  isBordered?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  /** Elevation depth (orthogonal to variant — combine freely). @default 'none' */
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Visual style. Base colors (default/plain) plus status (success/warning/danger/info)
   * and special modifiers (glass/frost/overlay) for media contexts. @default 'default'
   */
  variant?: "default" | "plain" | "success" | "warning" | "danger" | "info" | "glass" | "frost" | "overlay";
}
