# CLAUDE.md

Guidance for Claude Code agents working in this repo.

## Project

Personal site for Prerit Oberai (founder of Prototyping.io, YC P26).

- **Stack:** Next.js 14 App Router, Tailwind, TypeScript
- **Content:** Notion-backed (`src/lib/notion.ts`); requires `NOTION_TOKEN` and a database ID env var to build locally
- **Deploy:** Vercel (auto-deploys on merge to `main`); the `.github/workflows/deploy.yml.disabled` GitHub Pages workflow is intentionally disabled
- **Pages:** `/` (home / bio), `/posts`, `/projects`, `/books`, `/thoughts`

## Design System

**Always read `DESIGN.md` before making any visual or UI decisions.** All font choices, colors, spacing, layout rules, and aesthetic direction are defined there. Do not deviate without explicit user approval.

The short version, for context:
- One font: Inter, three weights (400/500/600). No serif, no display, no mono.
- One accent color: burnt orange `#b8470c`. Used surgically (inline links, star ratings, hover states, active nav). Never as a fill.
- Single centered column at 720px max. No cards, no sidebars, no asymmetric grids, no numbered indices, no mono uppercase labels.
- Hairline rules between list rows. Sharp edges (border-radius 0 or 4px).
- Light theme only. Soft warm bone background `#faf8f2`, warm near-black text `#1a1a1a`.

When reviewing or writing code, flag anything that conflicts with `DESIGN.md`.

## Conventions

- Don't add `<meta>` viewport or font setup — it's already in `src/app/layout.tsx`.
- Inline body links (Prototyping.io link, Calendly link, etc.) use the `.site-description a` styling defined in `globals.css` — color `--accent` with a 1px bottom-border underline. Don't use `text-decoration: underline`.
- Tailwind's `font-sans` resolves to Inter via the `--font-inter` variable set in `tailwind.config.ts`. Use `font-sans` or `var(--font-inter)` rather than redefining the stack.
- Notion API calls live in `src/lib/notion.ts`. Components consume the typed return values; don't hit the Notion SDK directly from components.
