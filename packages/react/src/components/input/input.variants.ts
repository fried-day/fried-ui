export interface InputVariantsProps {
  /** Whether the input is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the input stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Whether the input is in error state. @default false */
  isInvalid?: boolean;
  /** Whether the input is in a loading state. @default false */
  isPending?: boolean;
  /** Whether the input is read-only. @default false */
  isReadOnly?: boolean;
  /** Whether the input is required for form submission. @default false */
  isRequired?: boolean;
  /** Border radius scale. @default 'md' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style. @default 'primary' */
  variant?: "primary" | "secondary" | "plain";
}
