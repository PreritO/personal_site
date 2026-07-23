# CLAUDE.md

Guidance for Claude Code agents working in this repo.

## Project

Personal site for Prerit Oberai (co-founder and CTO of Prototyping.io, YC P26).

- **Stack:** Next.js 14 App Router, Tailwind, TypeScript
- **Content:** Notion-backed (`src/lib/notion.ts`); requires `NOTION_API_KEY`, `NOTION_BLOG_DATABASE_ID`, `NOTION_BOOKS_DATABASE_ID`, `NOTION_THOUGHTS_PAGE_ID` to build locally
- **Deploy:** Vercel (auto-deploys on merge to `main`); the `.github/workflows/deploy.yml.disabled` GitHub Pages workflow is intentionally disabled. Vercel's build is the only CI gate.
- **Pages:** `/` (home / bio), `/writing` (+ `/writing/[slug]`; old `/posts` URLs 308-redirect), `/projects`, `/books`, `/thoughts`; `/feed.xml`, `/sitemap.xml`
- **Images:** Notion-hosted images expire after ~1h, so pages never embed signed URLs — everything goes through `/api/notion-image/{pageId}[/{blockId}]` (streaming proxy, published-posts only). External-URL images bypass the proxy.
- **Canonical origin:** `SITE_URL` in `src/lib/site.ts` — the single place the domain lives.

## Design System

**Always read `DESIGN.md` before making any visual or UI decisions.** All font choices, colors, spacing, layout rules, and aesthetic direction are defined there. Do not deviate without explicit user approval.

The short version, for context:
- One font: Inter. Two registers: quiet 15px/24px chrome (nav, lists, meta) and 17px/28px essay prose (~640px measure). Never drop essay prose below 17px desktop / 16px mobile.
- One accent color: burnt orange `#b8470c`. Used surgically (inline links, star ratings, hover states, the active-nav dot). Never as a fill.
- Fixed left rail nav (column-relative, wraps to a row ≤1024px) beside a centered column: 560px for home/lists, 720px for essay pages.
- Text-only hairline-rule list rows — no cards, no thumbnails, no arrows. Sharp edges (radius 0 or 4px).
- Light only, enforced (`color-scheme: light`, no dark scope). Warm bone `#faf8f2` background, near-black `#1a1a1a` text.
- Motion: once-per-session fadeInUp entrance (session-gated via `motion-done` class), 150ms hover transitions, nothing else.

When reviewing or writing code, flag anything that conflicts with `DESIGN.md`.

## Conventions

- Don't add `<meta>` viewport or font setup — it's already in `src/app/layout.tsx`.
- Inline body links (Prototyping.io link, Calendly link, etc.) use the `.site-description a` styling defined in `globals.css` — color `--accent` with a 1px bottom-border underline. Don't use `text-decoration: underline`.
- Tailwind's `font-sans` resolves to Inter via the `--font-inter` variable set in `tailwind.config.ts`. Use `font-sans` or `var(--font-inter)` rather than redefining the stack.
- Notion API calls live in `src/lib/notion.ts`. Components consume the typed return values; don't hit the Notion SDK directly from components.
- `getAllPosts`/`getPostBySlug` throw on API failure by design — a throw during ISR regeneration retains the last good page. Don't wrap pages in try/catch "for safety"; that replaces good cached pages with degraded ones. `null` from `getPostBySlug` means "no published post", nothing else.
- remark-html's sanitizer is the XSS boundary in front of `dangerouslySetInnerHTML`. Never pass `sanitize: false`.
- Client-side tag filtering in `WritingList` is deliberate: reading `searchParams` in the server page would opt the route out of ISR.
- The env-computed `revalidate` exports work in Next 14.1 — verified against next internals; don't "fix" them to literals.
- `TODOS.md` holds deferred review items; `scripts/smoke.sh <url>` is the post-deploy regression net.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
