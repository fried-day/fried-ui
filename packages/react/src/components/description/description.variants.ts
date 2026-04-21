export interface DescriptionVariantsProps {
  /** Whether the description is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Whether the description is in error state (text in danger color). @default false */
  isInvalid?: boolean;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}
