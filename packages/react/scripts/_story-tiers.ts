/**
 * Story tier rules — `name → tier` is a pattern, not a curated list.
 *
 * Five tiers control story declaration order across every `*.stories.tsx`.
 * Naming a story canonically auto-assigns its tier; the audit only enforces
 * that tier numbers never decrease across the export sequence.
 *
 * Tier 1 — Default (always first)
 * Tier 2 — Visual Variants & Scales (modifier-driven nouns: Sizes, Variants, Radius, …)
 * Tier 3 — Interactive States (state adjectives: Disabled, Loading, Selected, Invalid, …)
 * Tier 4 — Composition & Slots (catch-all for use-case demos)
 * Tier 5 — Edge Cases (failure / boundary nouns: BrokenImage, LongText, EmptyState)
 */

interface TierRule {
  pattern: RegExp;
  tier: number;
}

const TIER_RULES: TierRule[] = [
  // Tier 1
  { pattern: /^Default$/, tier: 1 },

  // Tier 2 — Visual Variants & Scales
  {
    pattern:
      /^(Variants?|Sizes?|Radius|Radii|Shadow|Shadows|Elevation|Rings|Weights|Resize|Spacing|Density|Orientation|Tones?|Colors?|Levels?)$/,
    tier: 2,
  },
  { pattern: /Variants?$/, tier: 2 },

  // Tier 3 — Interactive States
  { pattern: /^(Disabled|Pending|Loading|Busy)$/, tier: 3 },
  { pattern: /^(ReadOnly|Required|Optional)$/, tier: 3 },
  { pattern: /^(Invalid|Valid|Error|Success|Warning)$/, tier: 3 },
  {
    pattern: /^(Selected|Unselected|Checked|Unchecked|Active|Pressed|Open|Closed|Expanded|Collapsed)$/,
    tier: 3,
  },
  { pattern: /^(Bordered|Outlined|Filled|Ghost|Soft|Solid|Flat)$/, tier: 3 },
  { pattern: /^(FullWidth|FitContent|Stretch|Inline|Block)$/, tier: 3 },
  { pattern: /^(Hoverable|Focusable|Clickable)$/, tier: 3 },

  // Tier 5 — Edge Cases
  { pattern: /^(BrokenImage|EmptyState|NoData|NoResults|StressTest)$/, tier: 5 },
  { pattern: /^(Long[A-Z]\w+|Truncated[A-Z]\w*|Constrained[A-Z]\w*|Cramped[A-Z]\w*)$/, tier: 5 },
];

const tierLabels: Record<number, string> = {
  1: "Default",
  2: "Visual Variants & Scales",
  3: "Interactive States",
  4: "Composition & Slots",
  5: "Edge Cases",
};

function inferTier(name: string): number {
  for (const rule of TIER_RULES) {
    if (rule.pattern.test(name)) return rule.tier;
  }

  return 4;
}

export { inferTier, tierLabels };
