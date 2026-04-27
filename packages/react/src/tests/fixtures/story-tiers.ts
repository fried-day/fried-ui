const tier2ExactNames = new Set([
  "Variant",
  "Variants",
  "Size",
  "Sizes",
  "Radius",
  "Radii",
  "Shadow",
  "Shadows",
  "Elevation",
  "Rings",
  "Weights",
  "Resize",
  "Spacing",
  "Density",
  "Orientation",
  "Tone",
  "Tones",
  "Color",
  "Colors",
  "Level",
  "Levels",
]);

const tier3ExactNames = new Set([
  "Disabled",
  "Pending",
  "Loading",
  "Busy",
  "ReadOnly",
  "Required",
  "Optional",
  "Invalid",
  "Valid",
  "Error",
  "Success",
  "Warning",
  "Selected",
  "Unselected",
  "Checked",
  "Unchecked",
  "Active",
  "Pressed",
  "Open",
  "Closed",
  "Expanded",
  "Collapsed",
  "Bordered",
  "Borderless",
  "Outlined",
  "Filled",
  "Ghost",
  "Soft",
  "Solid",
  "Flat",
  "FullWidth",
  "FitContent",
  "Stretch",
  "Inline",
  "Block",
  "Hoverable",
  "Focusable",
  "Clickable",
]);

const tier5ExactNames = new Set(["BrokenImage", "EmptyState", "NoData", "NoResults", "StressTest"]);

const TIER_5_PREFIX_PATTERN = /^(?:Long|Truncated|Constrained|Cramped)[A-Z]\w*$/;

const TIER_2_VARIANT_SUFFIX_PATTERN = /Variants?$/;

const TIER_LABELS: Record<number, string> = {
  1: "Default",
  2: "Visual Variants & Scales",
  3: "Interactive States",
  4: "Composition & Slots",
  5: "Edge Cases",
};

function inferTier(name: string): number {
  if (name === "Default") return 1;
  if (tier2ExactNames.has(name)) return 2;
  if (TIER_2_VARIANT_SUFFIX_PATTERN.test(name)) return 2;
  if (tier3ExactNames.has(name)) return 3;
  if (tier5ExactNames.has(name)) return 5;
  if (TIER_5_PREFIX_PATTERN.test(name)) return 5;

  return 4;
}

export { TIER_LABELS, inferTier };
