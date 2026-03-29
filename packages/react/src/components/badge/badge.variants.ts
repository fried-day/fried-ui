export interface BadgeVariantsProps {
  isIconOnly?: boolean;
  isShadow?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
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
