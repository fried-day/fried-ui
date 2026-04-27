<!--
Before opening this PR:
- Limit to one concern (feature OR fix OR refactor — not mixed)
- Keep the diff small; split when it grows past one logical unit
- New external dependency: flag it in the summary and expect slower review
HTML comments below guide the author and any code-review LLM. They do
not render in the published PR description.
-->

Closes #

<!--
Use "Closes #N" for issues that auto-close on merge, "Fixes #N" for
bug-fix issues, or "Refs #N" for partial progress. Multiple ids are
allowed: "Closes #12 #34". Leave the line as `Closes #` when there
is no linked issue.
-->

## Summary

<!--
One paragraph: what changed and why, written for a reviewer who has
not seen the diff. State the user-visible outcome first, then
implementation notes only when non-obvious. Do not restate the diff.
-->

## Test plan

<!--
Bullet list of verification artefacts. Cite the command, story, or
manual repro for each claim:
- Static audit: `cd packages/react && npx vitest run src/tests/audit`
- Runtime stories: `pnpm dev:storybook` plus the story export name
- Manual repro: numbered steps a reviewer can replay
- Browser matrix: when the change is browser-specific
-->

-

## Visual changes

<!--
Required when the PR touches CSS, layout, motion, tokens, or any
component visual output. Attach side-by-side before / after
screenshots or recordings (drag-drop into the editor). Skip only
when the change has zero visual delta.
-->

## Is this a breaking change?

<!--
Yes / No. A change is breaking when any of these shift in a published surface:
- public prop, type, or export (renamed, removed, narrowed)
- CSS class, data-slot, or token name
- default rendering (size, variant, radius, color)
- ARIA role, attribute, or state pattern

If Yes:
1. Add a major changeset (`pnpm changeset` then choose "major")
2. Document the migration here as old API -> new API
3. Flag downstream consumers before merge
-->

## Checklist

- [ ] Changeset added (`pnpm changeset`)
<!--
Required for changes that affect @fried-ui/react or @fried-ui/styles
runtime output. Skip only for chore / ci / docs / test PRs that ship
zero runtime change.
-->
- [ ] Storybook stories cover the new prop, variant, or state surface
<!--
New props need an argType plus at least one story per enum value.
New states need Disabled / Invalid / Pending stories where applicable.
The audit `tests/audit/stories-parity.test.ts` enforces parity.
-->
- [ ] Storybook a11y panel shows zero violations on new and changed stories
<!--
Open Storybook, navigate to the new or changed stories, and clear any
finding in the Accessibility panel. `addon-a11y` runs axe automatically
on every story.
-->
