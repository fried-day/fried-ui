export interface BadgeVariantsProps {
  isIconOnly?: boolean;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "primary-soft"
    | "secondary-soft"
    | "success-soft"
    | "warning-soft"
    | "danger-soft"
    | "info-soft"
    | "primary-outline"
    | "secondary-outline"
    | "success-outline"
    | "warning-outline"
    | "danger-outline"
    | "info-outline";
}
