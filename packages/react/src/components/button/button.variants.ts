export interface ButtonVariantsProps {
  /** Whether the button stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Whether the button renders as a square icon-only button. @default false */
  isIconOnly?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Visual style. Base colors paired with style modifiers (-soft, -flat,
   * -outline, -ghost) plus glass/frost/overlay for media contexts. @default 'primary'
   */
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
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
    | "info-outline"
    | "primary-ghost"
    | "secondary-ghost"
    | "accent-ghost"
    | "success-ghost"
    | "warning-ghost"
    | "danger-ghost"
    | "info-ghost";
}
