export interface LabelVariantsProps {
  /** Whether the label is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Whether the label is in error state (text in danger color). @default false */
  isInvalid?: boolean;
  /** Whether the field is required (shows red asterisk). @default false */
  isRequired?: boolean;
  /** Text shown in muted gray when field is NOT required (e.g. '(Optional)'). Ignored when isRequired is true. @default undefined */
  optionalMessage?: string;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Font weight. @default 'medium' */
  weight?: "normal" | "medium" | "semibold";
}
