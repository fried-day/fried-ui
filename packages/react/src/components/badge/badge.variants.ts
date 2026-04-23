export interface BadgeVariantsProps {
  /** Whether the badge renders as a square icon-only badge. @default false */
  isIconOnly?: boolean;
  /** Border radius scale. @default 'full' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /**
   * Visual style — status tag colors. @default 'primary'
   */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info";
}
