export interface ChipVariantsProps {
  /** Whether the chip renders as a square icon-only chip. @default false */
  isIconOnly?: boolean;
  /** Whether the chip is in selected state (filter/input chip toggle). @default false */
  isSelected?: boolean;
  /** Border radius scale. @default 'full' */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Visual style — category colors. @default 'primary' */
  variant?: "primary" | "secondary" | "ghost" | "accent" | "success" | "warning" | "danger" | "info";
}
