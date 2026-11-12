# Windows Optimise

A simple guide to making Windows 11 feel faster, using only built-in settings.
Every tweak explains why it helps and how to undo it. No scripts, no registry edits, no third-party tools.

## What's in it

- **Home:** tweaks grouped by category, with a laptop / desktop / gaming profile and progress tracking.
- **Leave these alone:** common myths and risky tweaks we don't recommend.
- **Optional tools:** safe settings for two well-known third-party tools, plus official links for getting Windows and Office legitimately.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Editing

All the content (categories, tweaks, warnings, licence options) lives in `lib/content.ts`.

## Notes

- Steps are written for Windows 11 26H2. Where a setting has moved since 24H2, the step mentions the older location too.
- "Open in Settings" buttons use `ms-settings:` links, so they only work when the site is opened on Windows.
- This project is independent and not affiliated with Microsoft.
- Icons come from Microsoft's Fluent UI System Icons (MIT licence).
