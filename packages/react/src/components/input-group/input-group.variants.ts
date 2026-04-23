export interface InputGroupVariantsProps {
  /** Whether the group stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "overlay";
}

export interface InputGroupAddonVariantsProps {
  /** Position of the addon relative to the input. @default 'inline-start' */
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
}
