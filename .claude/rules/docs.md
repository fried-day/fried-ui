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

## Source of Truth

**Props table, CSS Classes table, and CSS Variables table must come from reading source files — never guess.**

1. Read `packages/react/src/components/{name}/{Name}.tsx` → extract every prop from TypeScript type
2. Read `packages/styles/src/components/{name}.css` → extract every BEM class and CSS custom property
3. List ALL of them in both MDX and LLM tables — no omissions

---

## MDX Section Order

REQUIRED = every component must have. CONDITIONAL = only if applicable.

```text
frontmatter (title, description)                          REQUIRED
<{Name}BadgeLinks />                                      REQUIRED
## Import                                                 REQUIRED
## Usage                                                  REQUIRED
## Features                                               REQUIRED — bullet list of component highlights
## Anatomy                                                REQUIRED — code block showing composition
## {Prop demos}                                           REQUIRED — one section per visual prop
## Render Props                                           CONDITIONAL — only if component exposes render props
## Design Anatomy                                         CONDITIONAL — only if component uses golden ratio spacing
## Accessibility                                          REQUIRED — table or bullet list
## API Reference                                          REQUIRED
  ### {Name} Props                                        REQUIRED — table from TypeScript type
  ### Render Props                                        CONDITIONAL — only if component exposes render props
  ### CSS Classes                                         REQUIRED — table from CSS file
  ### CSS Variables                                       REQUIRED — table from CSS file
```

## MDX Heading Pattern

- **Prop demo sections** — heading → 1-line desc → `<Preview>` → code block
- **Reference sub-sections** (`### Props`, `### CSS Classes`, `### CSS Variables`) — heading → table only, NO desc
- **Headings** — no suffixes, no parenthetical notes

## MDX Prop Demos — Required per Component

Every prop that changes visual output needs a demo section with `<Preview>` + code block.

Minimum for all components: **Variants, Sizes, Radius, Custom Class**.
Add more as needed per component (e.g. Icon Only, Full Width, Disabled, Pending for Button).

Each `<Preview>` component must:

1. Exist as a function in `MdxComponents.tsx`
2. Be exported from `MdxComponents.tsx`
3. Be imported and registered in `page.tsx` mdxComponents object

## MDX Props Table

List every prop from the component's TypeScript type. Read the source file — do not copy from another component.

For React Aria components, also include inherited props: event handlers, accessibility props, `ref`, `className`, `children`.

For simple span/div components, list only the explicit props + `className`, `ref`, `children`.

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

REQUIRED = every component must have. CONDITIONAL = only if applicable.

```text
# {Name}                                                  REQUIRED
## Install                                                REQUIRED
## Import                                                 REQUIRED
## Props                                                  REQUIRED — flat table, ALL props from TypeScript type
## Data Attributes                                        CONDITIONAL — only for React Aria components
## CSS Classes                                            REQUIRED — ALL BEM classes from CSS file
## CSS Variables                                          REQUIRED — component-level CSS custom properties
## Examples                                               REQUIRED — ### sub-sections, MORE examples than MDX
## Anatomy                                                REQUIRED — ASCII diagram
## Spacing Math                                           CONDITIONAL — only if component uses golden ratio spacing
## Accessibility                                          REQUIRED — bullet list
## Constraints                                            REQUIRED — limitations, variant count
```

### LLM Example Sub-sections

Include sub-sections that match the component's actual props. Minimum for all components:

```text
  ### Variants                                            REQUIRED
  ### Basic                                               REQUIRED
  ### Sizes                                               REQUIRED
  ### Radius                                              REQUIRED
  ### Custom Class                                        REQUIRED
  ### Ref Forwarding                                      REQUIRED
```

Add more as needed per component (e.g. `### Icon Only`, `### Disabled`, `### Pending`, `### Form Submit` for Button).

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

- One function per demo: `{Name}{Demo}` — e.g., `ButtonSizes`, `BadgeVariants`
- Import components and icons from `@fried-ui/react` barrel — NO inline SVGs
- Icons use imported icon components: `<SettingsIcon className="size-match-font" />`
- Register in `apps/docs/src/app/docs/[[...slug]]/page.tsx` mdxComponents object
- JSX prop order: strings → hyphenated → expressions → shorthand booleans

## Badge Links — `apps/docs/src/components/BadgeLinks.tsx`

- Generic `BadgeLinks` component with `links` prop (array of `{ href, icon, label }`)
- Uses `<Button variant="secondary" size="sm">` — NOT raw HTML
- Each component page creates its own data array (e.g., `buttonBadgeLinksData`)
- Links: Storybook (vercel URL), Source (GitHub), Styles source (GitHub)
- Add React Aria link only if the component wraps a React Aria primitive
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
