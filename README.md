<div align="center">

# Fried UI

**Same component in React. Same class in HTML. One source of truth.**

Compound primitives, dual selectors, dark mode, and zero runtime.

[![License](https://img.shields.io/github/license/fried-day/fried-ui)](LICENSE)
[![Checks](https://img.shields.io/github/checks-status/fried-day/fried-ui/main?label=checks)](https://github.com/fried-day/fried-ui/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/quality_gate?project=fried-day_fried-ui)](https://sonarcloud.io/summary/new_code?id=fried-day_fried-ui)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fried-day_fried-ui&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fried-day_fried-ui)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fried-day_fried-ui&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fried-day_fried-ui)
[![Chromatic](https://img.shields.io/badge/Chromatic-visual%20regression-ff4785?logo=chromatic&logoColor=white)](https://www.chromatic.com/library?appId=69e6968ee69bc24a839f0d65)

</div>

## Features

- **Zero runtime styling** — Pure CSS with class-naming; the React layer ships only `clsx` for class composition
- **Accessible** — React Aria components, WCAG AAA two-color focus ring
- **Single prop API** — `variant="success-soft"` — one decision, not two
- **JND-aligned scale** — every size enum, font tier, and container dimension steps on `sqrt(phi) ≈ 1.272` so adjacent sizes clear the perceptual just-noticeable-difference threshold
- **Multi-framework CSS** — `@fried-ui/styles` works with React, Vue, Svelte, plain HTML
- **Dark mode** — All tokens switch automatically

## Documentation

- [Documentation](https://fried-ui.vercel.app)
- [Storybook](https://fried-ui-storybook.vercel.app)

## Contributing

This project uses [conventional commits](https://www.conventionalcommits.org/) and [changesets](https://github.com/changesets/changesets) for versioning.

## License

[MIT](LICENSE)
