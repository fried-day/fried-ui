interface TierRule {
  pattern: RegExp;
  tier: number;
}

const TIER_RULES: TierRule[] = [
  { pattern: /^Default$/, tier: 1 },
  {
    pattern:
      /^(Variants?|Sizes?|Radius|Radii|Shadow|Shadows|Elevation|Rings|Weights|Resize|Spacing|Density|Orientation|Tones?|Colors?|Levels?)$/,
    tier: 2,
  },
  { pattern: /Variants?$/, tier: 2 },
  { pattern: /^(Disabled|Pending|Loading|Busy)$/, tier: 3 },
  { pattern: /^(ReadOnly|Required|Optional)$/, tier: 3 },
  { pattern: /^(Invalid|Valid|Error|Success|Warning)$/, tier: 3 },
  {
    pattern: /^(Selected|Unselected|Checked|Unchecked|Active|Pressed|Open|Closed|Expanded|Collapsed)$/,
    tier: 3,
  },
  { pattern: /^(Bordered|Borderless|Outlined|Filled|Ghost|Soft|Solid|Flat)$/, tier: 3 },
  { pattern: /^(FullWidth|FitContent|Stretch|Inline|Block)$/, tier: 3 },
  { pattern: /^(Hoverable|Focusable|Clickable)$/, tier: 3 },
  { pattern: /^(BrokenImage|EmptyState|NoData|NoResults|StressTest)$/, tier: 5 },
  { pattern: /^(Long[A-Z]\w+|Truncated[A-Z]\w*|Constrained[A-Z]\w*|Cramped[A-Z]\w*)$/, tier: 5 },
];

const TIER_LABELS: Record<number, string> = {
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

export { TIER_LABELS, inferTier };
