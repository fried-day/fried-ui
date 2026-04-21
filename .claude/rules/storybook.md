---
description: Storybook 10 conventions
paths:
  - packages/react/src/**/*.stories.tsx
---

# Storybook

## Source of Truth

Read `{Name}.tsx` first — argTypes must match actual TypeScript props only.

## Meta

```tsx
const meta = {
  title: "Components/{Name}",
  component: {Name},
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "{Name}", variant: "primary", size: "md" },
  argTypes: { /* from component props */ },
} satisfies Meta<typeof {Name}>;
```

No `docs.description` — removed.

## argTypes

- `control: "select"` for union string props
- `control: "boolean"` for boolean props
- `control: "text"` for string props
- `control: false` for event handlers
- Category order: **Children → Style Variants → State → Events → Styling**

## argType Description Pattern (enum props)

For any prop with enum options (`variant`, `ring`, `color`, `shadow`, etc.), description MUST follow this 4-part template:

```
1. One-line intent:        "Visual style." / "Colored ring around the avatar."
2. Option groups (bold):   "**Base:** primary (main), secondary (neutral). **Status:** success (ok), danger (error)."
3. Modifiers (if any):     "**Modifiers:** -soft (pale + border), -flat (pale no border)."
4. Usage guidance:         "Use primary for main CTA, danger for destructive, -soft for tags."
```

Full reference examples (copy the **structure**, fill with component-specific content):

- **Badge variant:** `Visual style. **Base colors:** primary (default), secondary (neutral), accent (brand), success/warning/danger/info (status). **Style modifiers:** -soft (pale bg + border), -flat (pale bg no border), -outline (transparent + colored border). **Special:** glass (frosted + border), frost (frosted no border), overlay (dark scrim). Use primary for main labels, success/danger for status, -soft for subtle tags.`

- **Surface variant:** `Visual style. **Base:** default/plain (neutral cards). **Status:** success/warning/danger/info (pale bg — alert/callout boxes). **Special:** glass/frost/overlay (media overlays). Add -bordered suffix for emphasis border. Use default on white pages, plain on gray pages, status for alerts.`

- **Avatar ring:** `Colored ring around the avatar (status indicator). **Brand:** primary (main focus), secondary (neutral gray), accent (brand highlight). **Status:** success (online), warning (away), danger (busy / do-not-disturb), info (notification). Use success for online, danger for busy, warning for away, primary for selected, accent for featured/pro user.`

### Post-scaffold audit (mandatory)

After customizing an enum argType, **compare the description with 2 existing components**:

1. Open Badge (display reference) or Button (interactive reference)
2. Open Surface (container reference)
3. Verify: length within 50–120 words, bold group headings, "Use X for Y" closing

If description is shorter than other components, rewrite until it matches the depth.

## Stories

Every story MUST have `parameters.docs.source.code` with full example (import + arrow function):

```tsx
const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { {Name} } from "@fried-ui/react";

const Basic = () => {
  return <{Name}>Content</{Name}>;
};`,
      },
    },
  },
};
```

Render stories use `(args)` parameter + `{...args}` spread:

```tsx
render: (args): React.JSX.Element => (
  <div className="flex flex-wrap items-end gap-4">
    <{Name} {...args} variant="primary">Primary</{Name}>
  </div>
),
```

## Required Stories

Minimum: Default, Variants, Sizes.

Add per component: WithIcon, IconOnly, FullWidth, Disabled, Pending, RenderProps.

## Interactive State Demos

สำหรับ interactive components (Button, Input, ฯลฯ) ควรมี story แยกสำหรับ test state priority ด้วย:

- **Default** — idle state
- **Variants** — visual variants
- **Sizes** — size scale
- **WithIcon** — icon slots
- **Disabled** — non-interactive
- **ReadOnly** (inputs) — read-only editable state
- **Invalid** (inputs) — error state
- **Required** (inputs) — required form field

**Hover/focus/pressed** states — user interact ด้วยเอง ใน Default story (ไม่ต้องแยก story)

**Storybook test quick check:**
- Click input → border เข้มขึ้น (ไม่มี ring)
- Tab into input → ring ปรากฏ (border เดิม)
- Click button → bg-pressed (override bg-hover)
- Hover focused input → focus wins (no hover border change)

ถ้า storybook demo ไม่ตรงกับที่คาด → มี bug ใน CSS cascade/specificity — ดู `.claude/rules/styles.md` "State Priority" + "Mutually Exclusive Focus States"

## Icon Examples

Use slot attributes for icon positioning:

```tsx
// Icon left
<SettingsIcon slot="icon-start" />

// Icon right
<ArrowRightIcon slot="icon-end" />

// Icon-only (no text)
<SettingsIcon slot="icon" />
```

## Lint

- Render: `(args): React.JSX.Element =>`
- Multi-line siblings: empty line between
- Single-line siblings: NO empty line
- Prop order: strings → hyphenated → expressions → shorthand booleans
- Named exports BEFORE `export default meta`

## Containers

**Default = horizontal row with flex-wrap.** Variant comparison stories ต้องแสดง side-by-side (horizontal eye scan) แต่ต้องรองรับ responsive — ตกบรรทัดเมื่อย่อจอ

```tsx
/* ✅ Horizontal + responsive wrap (preferred) */
<div className="flex flex-wrap items-center gap-4">
  <X variant="primary" />
  <X variant="secondary" />
</div>

/* ✅ Horizontal (items อยู่แถวเดียวพอดี — ไม่ต้อง wrap) */
<div className="flex items-center gap-4">

/* ❌ Vertical column — ห้ามใช้ใน variant comparison */
<div className="flex flex-col gap-4">

/* ❌ Horizontal without wrap when variants ≥ 5 — overflow viewport on mobile */
<div className="flex items-center gap-4"> {/* 10 variants */}
```

**เหตุผลห้าม `flex-col`**:
- Visual comparison ของ variants ต้องเห็นพร้อมกัน (horizontal = eye scan)
- Stack vertical ทำให้ต้อง scroll + สูญเสียบริบท
- Bad UX เมื่อมี 5+ ตัว (หน้ายาวเกิน)

**เหตุผลต้อง `flex-wrap`**:
- Desktop → 1 แถว horizontal (optimal eye scan)
- Mobile/narrow → ตกบรรทัดอัตโนมัติ (no horizontal scroll, no overflow)
- แก้ปัญหา viewport ไม่พอเก็บ variants ครบ

**ยกเว้น** — `flex-col` OK เฉพาะกรณี:
- **FullWidth story** — demo จงใจ stack vertical เพื่อแสดง full-width behavior
- **Responsive conditional** `md:flex-col` (breakpoint-prefixed) — allowed
- **Container nested content** (เช่น Card.Header + Body + Footer) — ไม่ใช่ variant comparison

**Enforced by test:** `packages/react/src/tests/llm-audit.test.ts` — grep fails build ถ้าเจอ `flex-col` นอก FullWidth story

**alignment:**
- `items-center` — avatars, badges (center-aligned icon+text)
- `items-end` — buttons (align bottom for Extra Large size showcase)
- `items-start` — Surface/Card (align top for different content heights)
