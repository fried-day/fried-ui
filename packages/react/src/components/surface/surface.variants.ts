export interface SurfaceVariantsProps {
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  variant?:
    | "default"
    | "default-bordered"
    | "plain"
    | "plain-bordered"
    | "success"
    | "success-bordered"
    | "warning"
    | "warning-bordered"
    | "danger"
    | "danger-bordered"
    | "info"
    | "info-bordered"
    | "glass"
    | "frost"
    | "overlay";
}
