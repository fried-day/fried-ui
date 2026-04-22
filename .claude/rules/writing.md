---
description: Documentation writing style — words over symbols in prose, math notation in formulas only
paths:
  - .claude/rules/**/*.md
  - .claude/agents/**/*.md
  - decisions/**/*.md
  - CLAUDE.md
  - CONTRIBUTING.md
  - README.md
  - packages/**/*.{ts,tsx,css}
---

# Writing Style

Documentation is read by humans AND LLMs (Claude Code, Cursor, review agents). Ambiguous symbols cause hallucination and cognitive load. Use words that convey explicit meaning. Keep symbols only in math notation and structural code.

## Core Rule

**In prose, sentences, bullet points, table-cell descriptions, JSDoc, and comments: use words, not symbols.**

**In math formulas, equations, code fences, and structural diagrams: keep symbols as-is.**

## Banned in prose

These symbols are "Overloaded Tokens" in LLM training data (each has dozens of meanings across C++, JS arrow functions, state transitions, pointers, Markdown syntax). Replace with explicit words:

| Banned | Replace with (English) | Replace with (Thai formal) |
|--------|------------------------|----------------------------|
| `->` causation | "leads to" / "results in" / "causes" | "ส่งผลให้" / "ทำให้เกิด" |
| `->` state transition | "transitions to" / "becomes" | "เปลี่ยนเป็น" / "กลายเป็น" |
| `->` mapping | "maps to" / "represents" | "แทน" / "หมายถึง" |
| `->` flow/sequence | "then" / "followed by" | "แล้วจึง" / "ก่อน จากนั้น" |
| `<-` derivation | "derives from" / "sourced from" | "มาจาก" / "อ้างอิงจาก" |
| `=>` prose (not code) | "becomes" / "produces" | "กลายเป็น" / "ได้ผลเป็น" |
| Emoji priority markers | "P0" / "P1" / "P2" (text) | same |
| Checkmark / cross emoji | "OK" / "BAD" / "Correct" / "Avoid" | "ถูก" / "ผิด" |
| Decoration emojis in headings | remove | remove |

## Allowed (keep)

### Math and formulas

Keep standard mathematical notation anywhere (prose or code):

- Variables and constants: `x`, `phi`, `y`
- Operators: `x`, `/`, `+`, `-`, `^`, `=`
- Functions: `sqrt()`, `sqrt(phi)`
- Exponents: `phi^2`, `x^1.5`
- Comparisons in math: `>=`, `<=`
- Dimensions: `44x44px`
- Constants: `phi = 1.618`, `phi^1.5 = 2.058`

Example (keep): `Padding Block = x x 0.485`, `radius = x x sqrt(phi)`

### Code fences

Anything inside triple-backtick fences (```text```, ```tsx```, ```css```, ```bash```, ```html```) is untouched. Arrows inside fenced code blocks represent real syntax or structural diagrams (file trees, architecture maps) and must stay.

### Compact markdown table-cell labels

Short 2-3 word cells may use `->` as a structural label (like "Atoms -> Molecules -> Organisms"). Long prose inside a cell must use words.

### Structural characters

Em-dash (`—`), en-dash (`-`), ellipsis (`...`), box-drawing (`+-- ... `) in ASCII tree diagrams: keep.

## Why this matters

1. **Overloaded Token problem.** `->` has many meanings in LLM training data. Self-attention must disambiguate from context, which increases hallucination risk.
2. **Narrow vector embeddings.** Words like "derives from" / "transitions to" map to precise regions of embedding space. LLMs process them deterministically.
3. **Separation of concerns.** Prose carries intent and context (human language). Code fences carry structural logic (syntax). Mixing them blurs both layers.
4. **Agent audits.** Claude Code / Cursor agents that scan the repo to understand architecture need explicit prose. Ambiguous arrows force them to guess intent (dependency, data flow, user journey).

## Examples

### BAD prose with symbols

```
Hover state -> adds ring
Click input -> border changes
state A -> state B on Tab press
ถ้า demo ไม่ตรง -> มี bug
Category order: Children -> Style Variants -> State
```

### OK prose with words

```
Hover state adds the ring
Clicking the input changes the border
state A transitions to state B on Tab press
ถ้า demo ไม่ตรง แสดงว่า มี bug
Category order: Children, then Style Variants, then State
```

### OK math in prose (keep symbols)

```
Padding Block is computed as x x 0.485.
The golden ratio phi equals 1.618, and phi^1.5 equals 2.058.
Minimum touch target is 44x44px per WCAG 2.5.5.
```

### OK code fence (keep arrows)

````
```text
props destructure { variant, size, className, ...rest }
rest forwards to React Aria
```
````

## Enforced by

- `.claude/agents/component-builder.md` lists this as a common mistake to avoid.
- `.claude/agents/component-auditor.md` includes a grep check for arrows in prose.
- `packages/react/src/tests/audit/stories.test.ts` AST scans Storybook argType description string literals for banned symbols.

## Scope

This rule applies to:

- All `.md` files in `.claude/`, `decisions/`, and repo root
- All JSDoc comments in `packages/**/*.{ts,tsx}`
- All CSS comments in `packages/**/*.css`
- Handlebars template comments and prose in `turbo/generators/**/*.hbs`

Does not apply to:

- Runtime code (TypeScript syntax, JSX, arrow functions, CSS selectors)
- `apps/docs/**` and `apps/storybook/**` (user owns, deferred)
- Test names and `describe`/`it` strings in `*.test.*` files (internal labels)
