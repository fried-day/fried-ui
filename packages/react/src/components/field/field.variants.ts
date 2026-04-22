export interface FieldVariantsProps {
  /** Whether the field stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Layout orientation of children. 'responsive' renders vertical on mobile, horizontal on md+. @default 'vertical' */
  orientation?: "vertical" | "horizontal" | "responsive";
  /** Wrapper gap scale between stacked slots. @default 'md' */
  size?: "sm" | "md" | "lg";
}

export interface FieldLabelVariantsProps {
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

export interface FieldDescriptionVariantsProps {
  /** Whether the description is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

export interface FieldErrorVariantsProps {
  /** Whether the field error is disabled. @default false */
  isDisabled?: boolean;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

export interface FieldSetVariantsProps {
  /** Visual style. @default 'default' */
  variant?: "default" | "bordered" | "card";
}

export interface FieldLegendVariantsProps {
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

export interface FieldGroupVariantsProps {
  /** Layout orientation. 'responsive' renders vertical on mobile, horizontal on md+. @default 'vertical' */
  orientation?: "vertical" | "horizontal" | "responsive";
  /** Size scale (gap). @default 'md' */
  size?: "sm" | "md" | "lg";
}

export interface FieldTitleVariantsProps {
  /** HTML heading level. @default 'h3' */
  as?: "h2" | "h3" | "h4";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

export interface FieldSeparatorVariantsProps {
  /** Line style. @default 'solid' */
  variant?: "solid" | "dashed" | "dotted";
}
