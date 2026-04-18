export interface BadgeVariantsProps {
  isIconOnly?: boolean;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
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
