---
name: release-farn
description: Guided release workflow for farn-theme — pre-release alignment checks, version bumps across all 6 files, build verification, and PR creation
disable-model-invocation: true
---

# Farn Release

Walk through the full release process for farn-theme.

## Args
Version number (e.g. `0.3.0`)

## Steps

### 1. Pre-release alignment check

Verify before touching any version numbers:

- [ ] Every `data-surface` value in `tokens/dark-light.css` is documented in `llms.txt` (Core rules section) and in `site/src/pages/foundations/surfaces.astro`
- [ ] Every export in `package.json` has docs on its corresponding group page in `site/src/pages/components/`
- [ ] All URLs in the `llms.txt` Reference section resolve (no 404s from page renames)
- [ ] `llms.txt` component lists reflect current `done` / `coming soon` state
- [ ] `CHANGELOG.md` `## [Unreleased]` captures all changes since the last tag

Fix any gaps before proceeding.

### 2. Version bumps

Update these files to the new version (`X.Y.Z`) and today's date (`YYYY-MM-DD`):

| File | What to change |
|------|---------------|
| `package.json` | `"version"` field |
| `CHANGELOG.md` | Rename `## [Unreleased]` → `## [X.Y.Z] — YYYY-MM-DD`; add empty `## [Unreleased]` above it |
| `README.md` | CDN URL `@X.Y.Z` (version badge on line 7 is dynamic — skip) |
| `llms.txt` | CDN URL `@X.Y.Z` |
| `site/src/components/Footer.astro` | Version badge `vX.Y.Z` |
| `site/src/pages/getting-started.astro` | All CDN URL occurrences (use replace_all) |

### 3. Build

```bash
npm run build
```

### 4. Verify dist

```bash
ls -la dist/
```

Confirm all 5 artifacts are present and timestamped after the build: `farn.css`, `farn-tokens.css`, `farn-components.css`, `farn-typography.css`, `tabs.js`.

### 5. Commit, push, open PR

Use the commit-push-pr skill. PR title: `release: vX.Y.Z`.

### 6. After merge

Remind the user to create a GitHub Release:
- URL: https://github.com/jabopiti/farn-theme/releases/new
- Tag: `vX.Y.Z`, target: `main`
- GitHub creates the tag automatically and activates the jsDelivr CDN URL
