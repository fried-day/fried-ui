export interface BadgeVariantsProps {
  /** Whether the badge is a dot-only indicator (no content, small circle). @default false */
  isDot?: boolean;
  /** Whether the badge renders in-flow without absolute positioning. @default false */
  isStandalone?: boolean;
  /** Placement corner relative to the anchor. @default 'top-right' */
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md";
  /** Visual style. @default 'danger' */
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "overlay";
}
