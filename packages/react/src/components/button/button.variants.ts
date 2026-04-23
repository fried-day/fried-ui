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
   * Visual style following Mobbin hierarchy (primary/secondary/outline/ghost + destructive + overlay + accent). @default 'primary'
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "overlay" | "accent";
}
