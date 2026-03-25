# Changesets

This project uses [changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Adding a changeset

```bash
pnpm changeset
```

Select the packages that changed, choose the bump type (patch/minor/major), and write a summary.

## Releasing

Releases are automated via GitHub Actions. When changesets are merged to `main`, a "Version Packages" PR is created. Merging that PR publishes to npm.
