export interface AvatarGroupVariantsProps {
  /** Counter display style when more avatars are hidden than shown. `avatar` renders an Avatar-sized +N circle (default). `text` renders plain inline text beside the stack with compact number notation (e.g. `+10K`). @default 'avatar' */
  counterVariant?: "avatar" | "text";
  /** Whether the avatars lift on hover. @default false */
  isHoverable?: boolean;
  /** Maximum number of avatars to show before collapsing to a +N counter. @default undefined */
  max?: number;
  /** Size scale. @default 'md' */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Overlap amount between adjacent avatars (mirrors Tailwind `tracking-*` semantics — letter-spacing analogue for horizontal avatar stacking). `tighter` squeezes the stack tightest (35% overlap), `tight` packs them closer (30%), `default` is the balanced baseline (20%), `wide` spreads them for face recognition (10%), `wider` is airy for hero layouts (5%). @default 'default' */
  spacing?: "tighter" | "tight" | "default" | "wide" | "wider";
  /** Total count shown inside the +N counter (overrides the derived children count). @default undefined */
  total?: number;
}
