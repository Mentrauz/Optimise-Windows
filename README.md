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
| `app/tools/page.tsx` | "Optional tools" — safe parts of O&O ShutUp10++ and Chris Titus Tech's WinUtil, plus official Windows/Office download and licensing links. Content lives in `tools` and `officialSources` in `lib/content.ts`. |
| `components/LicenceSection.tsx` | "Legitimate ways to get a licence" on the tools page: audience filter and expandable cards (what you get, who qualifies, step-by-step sign-up, limits, official links). Content is `licencePrograms`, `audiences` and `notALicence` in `lib/content.ts`. |
| `components/ToolCard.tsx` | Card for one third-party tool: official source, launch command, before-you-start steps, "Safe to use" vs "Skip these", undo and caution. |
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
- Steps are written for Windows 11 26H2. Where a setting was renamed or moved since 24H2, the step names the older location too.
- The site is independent and not affiliated with Microsoft; it deliberately avoids the Windows logo and Microsoft wallpapers.

## Changelog

### 0.3.0 — 2026-11-11
- Added a **Legitimate ways to get a licence** section (`#licences`) to the Optional tools page, with 9 programmes grouped by audience:
  - Everyone: existing digital licence, Windows 10 → 11 upgrade, free Microsoft 365 on the web.
  - Students & teachers: Azure for Students (Education Hub software), Office 365 Education (notes the A1 retirement Microsoft announced in November 2026).
  - Developers & IT pros: Microsoft 365 Developer Program E5 sandbox (current eligibility rules and dev-only terms), Visual Studio subscriptions, Windows 11 Enterprise 90-day evaluation (and that the developer VMs have been unavailable since October 2024).
  - Nonprofits: Microsoft for Nonprofits (donated grants ended July 1, 2025; discounts remain).
- Added a "These don't give you a licence" list (Insider Program, personal use of the dev sandbox, grey-market keys).
- Folded the developer-programmes line added to the activation-scripts note into a link to the new section.
- Changed the "Activation, legitimately" card to "Licences, legitimately", linking to the new section.

### 0.2.0 — 2026-11-11
- Added an **Optional tools** page (`/tools`) covering O&O ShutUp10++ (recommended settings only) and Chris Titus Tech's Windows Utility (Install tab, a handful of Essential tweaks, repair tools), with explicit "Skip these" lists and undo steps.
- Added a "Get Windows and Office the official way" section linking to Microsoft's own download, install and activation pages.
- Added "Unofficial activation scripts and cracked keys" to the Leave these alone list. Activation scripts (e.g. MAS) are intentionally not covered.
- Added Optional tools to the navigation pane and the home page category grid; new `tools` and `download` icons.
- Renamed the "Built-in settings only" ground rule to "Built-in settings first" to reflect the optional tools.

### 0.1.0 — 2026-11-11
- Created the Next.js 16 (App Router, TypeScript) project from scratch.
- Added Fluent 2 / Windows 11 design tokens and components (light, dark and follow-system themes).
- Added 46 tweaks across 10 categories, plus a "Leave these alone" page with 8 myths.
- Added per-tweak progress tracking, laptop/desktop/gaming profiles, global search and a responsive mobile layout.
