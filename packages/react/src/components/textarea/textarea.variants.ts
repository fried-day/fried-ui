export interface TextareaVariantsProps {
  /** Whether the textarea stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Resize behavior. @default 'vertical' */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "plain";
}
