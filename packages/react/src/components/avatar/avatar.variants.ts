export interface AvatarVariantsProps {
  /** Whether the avatar is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Border radius scale. @default 'full' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Colored ring around the avatar. @default undefined */
  ring?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info";
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}
