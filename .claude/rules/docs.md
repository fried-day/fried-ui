---
description: Documentation section order and sync rules for MDX pages and LLM files
paths:
  - apps/docs/src/content/docs/components/*.mdx
  - apps/docs/public/llm/*.md
  - apps/docs/src/components/MdxComponents.tsx
---

# Docs

Every component has two documentation files that must stay in sync:

1. **MDX page** → `apps/docs/src/content/docs/components/{name}.mdx`
2. **LLM file** → `apps/docs/public/llm/{name}.md`

## MDX Section Order

```text
frontmatter (title, description)
Badge links (Storybook, React Aria, Source, Styles source)
## Import
## Usage
## Features
## Anatomy
## {Prop demos}        ← visual props → composition → navigation → states → utility
## Design Anatomy      ← golden ratio math table in rem (if applicable)
## Accessibility
## API Reference
  ### {Name} Props
  ### Render Props
  ### CSS Classes
  ### CSS Variables
```

## MDX Heading Pattern

- **Prop demo sections** — always: heading → 1-line desc → `<Preview>` → code block
- **Reference sub-sections** (`### Props`, `### Render Props`, `### CSS Classes`, `### CSS Variables`) — always: heading → table only, no desc
- **Headings** — no suffixes, no parenthetical notes (e.g., `### Render Props` not `### Render Props (CSS Selectors)`)

## LLM Section Order

```text
# {Name}
## Install
## Import
## Props
## Data Attributes
## CSS Classes
## CSS Variables
## Examples
## Anatomy
## Spacing Math        ← golden ratio table in rem (if applicable)
## Accessibility
## Constraints
```

## LLM Heading Pattern

- **Reference sections** (`## Props`, `## Data Attributes`, `## CSS Classes`, `## CSS Variables`) — heading → table only, no desc
- **Example sub-sections** — always: heading → 1-line desc → code block (every example gets a desc)
- **Bottom sections** (`## Anatomy`, `## Spacing Math`, `## Accessibility`, `## Constraints`) — heading → content only, no desc
- **Headings** — no suffixes, no parenthetical notes (e.g., `## Data Attributes` not `## Data Attributes (for CSS styling)`)

## Preview Components

- One function per demo in `apps/docs/src/components/MdxComponents.tsx`
- Naming: `{Name}{Demo}` — e.g., `ButtonSizes`, `ButtonRadii`
- Register in `page.tsx` mdxComponents object

## Sync

When changing a prop, feature, or CSS variable — update both MDX and LLM file.
New components must also add an entry to `apps/docs/public/llms.txt`.
