export interface BadgeVariantsProps {
  /** Whether the badge renders as a square icon-only badge. @default false */
  isIconOnly?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /**
   * Visual style. Base colors paired with style modifiers (-soft, -flat,
   * -outline) plus glass/frost/overlay for media contexts. @default 'primary'
   */
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "glass"
    | "frost"
    | "overlay"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "primary-soft"
    | "secondary-soft"
    | "accent-soft"
    | "success-soft"
    | "warning-soft"
    | "danger-soft"
    | "info-soft"
    | "primary-flat"
    | "secondary-flat"
    | "accent-flat"
    | "success-flat"
    | "warning-flat"
    | "danger-flat"
    | "info-flat"
    | "primary-outline"
    | "secondary-outline"
    | "accent-outline"
    | "success-outline"
    | "warning-outline"
    | "danger-outline"
    | "info-outline";
}
