export interface TextFieldVariantsProps {
  /** Whether the text field is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the text field stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Whether the text field is in error state. @default false */
  isInvalid?: boolean;
  /** Whether the text field is read-only. @default false */
  isReadOnly?: boolean;
  /** Whether the text field is required for form submission. @default false */
  isRequired?: boolean;
  /** Wrapper gap scale between stacked slots. @default 'md' */
  size?: "sm" | "md" | "lg";
}
