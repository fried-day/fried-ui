export interface BadgeVariantsProps {
  /** Whether the badge renders as a square icon-only badge. @default false */
  isIconOnly?: boolean;
  /** Border radius scale. @default 'full' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /**
   * Visual style. Base colors paired with style modifiers (-soft, -flat, -outline). @default 'primary'
   */
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
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
