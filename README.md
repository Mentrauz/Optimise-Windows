# Windows Optimise

A calm, Windows 11–styled guide to making a PC feel faster using only built-in settings.
No scripts, no registry edits, no third-party tools — every tweak explains why it helps and how to undo it.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 20.9 or newer.

## How it's put together

| Path | What it is |
| --- | --- |
| `lib/content.ts` | **All content.** Categories, tweaks (path, steps, why, undo, impact, `ms-settings:` deep link), the "Leave these alone" list and ground rules. Edit this file to add or change tweaks. |
| `app/globals.css` | Design tokens modelled on WinUI 3 / Fluent 2: Mica-style background, light/dark palettes, accent, 4px/8px radii, type ramp, motion curves, and all component styles. |
| `app/layout.tsx` | Root layout, metadata, no-flash theme script. |
| `app/page.tsx` | Home (hero, "Tune for" profile picker, recommendations, progress, categories). |
| `app/[category]/page.tsx` | One statically generated page per category. |
| `app/avoid/page.tsx` | "Leave these alone" — myths and risky tweaks we don't recommend. |
| `components/AppShell.tsx` | Settings-app shell: title bar, search, NavigationView-style pane with progress ring, mobile overlay pane. |
| `components/TweakCard.tsx` | Settings-card expander with Done toggle, Settings path, numbered steps, why/undo, caution InfoBar, "Open in Settings" deep link and copy buttons. |
| `components/SearchBox.tsx` | AutoSuggestBox-style search (Ctrl+K or /), keyboard navigable. |
| `components/Controls.tsx` | ToggleSwitch, Segmented control, ImpactMeter, ProgressRing. |
| `components/AppState.tsx` | Progress, profile and theme, saved to localStorage (fails safely if storage is blocked). |
| `components/HeroArt.tsx` | Original abstract petal artwork for the hero. |

Icons come from Microsoft's open-source Fluent UI System Icons (`@fluentui/react-icons`, MIT).
Fonts use Segoe UI Variable on Windows and fall back to the system font elsewhere.

## Notes

- "Open in Settings" buttons use `ms-settings:` links, so they only work when the site is opened on a Windows PC.
- Steps are written for Windows 11 24H2.
- The site is independent and not affiliated with Microsoft; it deliberately avoids the Windows logo and Microsoft wallpapers.

## Changelog

### 0.1.0 — 2026-11-11
- Created the Next.js 16 (App Router, TypeScript) project from scratch.
- Added Fluent 2 / Windows 11 design tokens and components (light, dark and follow-system themes).
- Added 46 tweaks across 10 categories, plus a "Leave these alone" page with 8 myths.
- Added per-tweak progress tracking, laptop/desktop/gaming profiles, global search and a responsive mobile layout.
