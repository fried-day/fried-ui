export interface AvatarGroupVariantsProps {
  /** Whether the avatars lift on hover. @default false */
  isHoverable?: boolean;
  /** Maximum number of avatars to show before collapsing to a +N counter. @default undefined */
  max?: number;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Overlap amount between adjacent avatars. @default 'md' */
  spacing?: "sm" | "md" | "lg";
  /** Total count shown inside the +N counter (overrides the derived children count). @default undefined */
  total?: number;
}
