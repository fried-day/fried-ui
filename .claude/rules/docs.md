---
description: Documentation conventions — MDX page, LLM file, MdxComponents, BadgeLinks, and sync rules
paths:
  - apps/docs/src/content/docs/components/*.mdx
  - apps/docs/public/llm/*.md
  - apps/docs/src/components/MdxComponents.tsx
  - apps/docs/src/components/BadgeLinks.tsx
---

# Docs

Every component has two documentation files that must stay in sync:

1. **MDX page** → `apps/docs/src/content/docs/components/{name}.mdx`
2. **LLM file** → `apps/docs/public/llm/{name}.md`

---

## MDX Section Order

```text
frontmatter (title, description)
<ButtonBadgeLinks />              ← uses BadgeLinks component, NOT raw HTML
## Import
## Usage
## Features
## Anatomy
## {Prop demos}                   ← visual props → composition → navigation → states → utility
## Render Props                   ← children function pattern with available render props
## Design Anatomy                 ← golden ratio math table in rem (if applicable)
## Accessibility
## API Reference
  ### {Name} Props
  ### Render Props
  ### CSS Classes
  ### CSS Variables
```

## MDX Heading Pattern

- **Prop demo sections** — heading → 1-line desc → `<Preview>` → code block
- **Reference sub-sections** (`### Props`, `### Render Props`, `### CSS Classes`, `### CSS Variables`) — heading → table only, NO desc
- **Headings** — no suffixes, no parenthetical notes

## MDX Props Table — Must Include

Every MDX props table MUST list these for Button (adjust per component):

```text
variant   → inline union type, default "primary"
size      → inline union type, default "md"
radius    → inline union type, default "md"
isIconOnly → boolean, default false
isDisabled → boolean
isPending  → boolean
onPress, onPressStart, onPressEnd, onPressChange → PressEvent handlers
onHoverStart, onHoverEnd, onHoverChange → HoverEvent handlers
onFocus, onBlur, onFocusChange → FocusEvent handlers
onKeyDown, onKeyUp → KeyboardEvent handlers
type, form, formAction → HTML button attributes
autoFocus → boolean
aria-label, aria-labelledby, aria-describedby → accessibility
className → string
ref → Ref<HTMLButtonElement> — forwarded ref
children → ReactNode | (renderProps: ButtonRenderProps) => ReactNode
```

## MDX CSS Classes Table — Must Include ALL

Every BEM class in the component CSS file MUST appear in the table.
Order: base → variants (same order as TypeScript type) → sizes → radius → states → elements.

## MDX Import Example

Always use barrel import:

```tsx
import { Button } from "@fried-ui/react"; // ✓
import { Button } from "@fried-ui/react/button"; // ✗ never in docs
```

---

## LLM Section Order

```text
# {Name}
## Install
## Import
## Props                          ← flat table, ALL props including ref
## Data Attributes                ← 6 data attributes for CSS styling
## CSS Classes                    ← ALL BEM classes
## CSS Variables                  ← component-level CSS custom properties
## Examples                       ← ### sub-sections, MORE examples than MDX
  ### Variants
  ### Basic
  ### Sizes
  ### Radius
  ### Icon Only
  ### With Icon
  ### Full Width
  ### Disabled
  ### Pending
  ### As a Link
  ### Custom Class
  ### Form Submit
  ### Press Handler
  ### Render Props
  ### Ref Forwarding
## Anatomy                        ← ASCII diagram
## Spacing Math                   ← golden ratio table in rem (if applicable)
## Accessibility                  ← bullet list
## Constraints                    ← limitations, variant count
```

## LLM Heading Pattern

- **Reference sections** (`## Props`, `## Data Attributes`, `## CSS Classes`, `## CSS Variables`) — table only, NO desc
- **Example sub-sections** — EVERY example has 1-line desc → code block
- **Bottom sections** (`## Anatomy`, `## Spacing Math`, `## Accessibility`, `## Constraints`) — content only, NO desc
- **Headings** — no suffixes, no parenthetical notes

## LLM Rules

- Pure markdown only — no JSX, no HTML, no SVGs
- Examples must be self-contained and copy-pasteable
- More examples than MDX page (cover edge cases, events, form usage)
- Constraints section states exact variant count

---

## Preview Components — `apps/docs/src/components/MdxComponents.tsx`

- One function per demo: `{Name}{Demo}` — e.g., `ButtonSizes`, `ButtonIconOnly`
- Import components and icons from `@fried-ui/react` barrel — NO inline SVGs
- Icons use imported icon components: `<SettingsIcon className="size-match-font" />`
- Register in `apps/docs/src/app/docs/[[...slug]]/page.tsx` mdxComponents object
- JSX prop order: strings → hyphenated → expressions → shorthand booleans

## Badge Links — `apps/docs/src/components/BadgeLinks.tsx`

- Generic `BadgeLinks` component with `links` prop (array of `{ href, icon, label }`)
- Uses `<Button variant="secondary" size="sm">` — NOT raw HTML
- Each component page creates its own data array (e.g., `buttonBadgeLinksData`)
- Links: Storybook (vercel URL), React Aria, Source (GitHub), Styles source (GitHub)
- Storybook URL: `https://fried-ui-storybook.vercel.app/?path=/story/components-{name}--default`

## CopyMarkdown — `apps/docs/src/components/CopyMarkdown.tsx`

- Uses `<Button variant="secondary" size="sm">` with `<ClipboardIcon>`
- Fetches from `/api/mdx?slug={slugPath}` and copies to clipboard
- Import from `@fried-ui/react` barrel

## API Route — `apps/docs/src/app/api/mdx/route.ts`

- Reads static file from `public/llm/{name}.md`
- Returns `text/markdown` content type

---

## Sync Checklist

When changing a prop, feature, variant, or CSS variable:

1. Update component CSS (`packages/styles/src/components/{name}.css`)
2. Update React component (`packages/react/src/components/{name}/{Name}.tsx`)
3. Update test (`{name}.test.tsx`)
4. Update story (`{name}.stories.tsx`)
5. Update MdxComponents demo functions
6. Update MDX page — props table, CSS classes, code examples, section content
7. Update LLM file — same changes, symmetrical with MDX
8. Update `llms.txt` if new component
9. Audit: variant order, prop order, CSS class order — all must match TypeScript type
