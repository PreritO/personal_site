# Design System — Prerit Oberai's personal site

**The rule above all rules:** Content first. If a decoration, layout flourish, card, or border can be removed without losing meaning, remove it. Inspired by [thesephist.com](https://thesephist.com/) (layout discipline) and [natural.co/blog/agentic-payments-memo](https://www.natural.co/blog/agentic-payments-memo) (typography).

---

## Product Context

- **What this is:** Personal site / blog for Prerit Oberai, founder of Prototyping.io (YC P26).
- **Who it's for:** Fellow founders, investors, candidates, customers, and his network.
- **Project type:** Personal site with editorial sections (home, posts, projects, bookshelf, random thoughts).
- **Stack:** Next.js 14 (App Router) + Tailwind, Notion-backed content, deployed on Vercel.
- **Audience expectation:** Substance over polish. Reads quickly, leaves the visitor with a clear sense of who Prerit is and what he's building.

---

## Aesthetic Direction

- **Direction:** Minimal, content-led. A document, not an interface.
- **Decoration level:** Minimal. Typography, whitespace, and one accent color do all the work. No cards (except where data structure genuinely needs containment), no inset color blocks, no numbered indices, no mono uppercase labels, no gradients, no shadows.
- **Mood:** A founder's working notebook. Calm, considered, easy to read. The visitor should feel like they walked into a quiet study, not a product page.
- **Reference sites:**
  - [thesephist.com](https://thesephist.com/) — single column, list-driven, content density, hairline rules.
  - [natural.co/blog/agentic-payments-memo](https://www.natural.co/blog/agentic-payments-memo) — warm paper background, regular-weight headings, generous line-height.

---

## Typography

One font everywhere — Inter — at three weights. No serif, no mono, no display face.

- **Family:** **Inter** loaded via `next/font/google` with `display: "swap"` and the `--font-inter` CSS variable.
- **Stack:** `var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Weights loaded:** 400 (body), 500 (headings + active states), 600 (reserved — use sparingly for emphasis only)

### Scale

| Role | Size | Line-height | Weight | Letter-spacing | Notes |
|------|------|-------------|--------|----------------|-------|
| Page heading (h1) | 30px / 1.875rem | 1.15 | 500 | -0.015em | Used for `Hey, I'm Prerit.`, `Posts`, `Projects`, `Bookshelf`, `Random Thoughts`, individual post titles |
| Section heading (h2) | 24px / 1.5rem | 1.25 | 500 | -0.005em | Inside long-form posts |
| Sub-heading (h3) | 20px / 1.25rem | 1.3 | 500 | 0 | Inside long-form posts |
| Body | 17px / 1.0625rem | 1.65 | 400 | 0 | All paragraphs and list rows. On mobile, drop to 16px. |
| Body — small | 15px / 0.9375rem | 1.55 | 400 | 0 | Project descriptions, captions, secondary copy |
| Meta | 14px / 0.875rem | 1.4 | 400 | 0 | Dates, post counts, author lines, book metadata |
| Nav link | 16px | 1 | 400 (500 active) | 0 | All five nav items render uniform; active item is weight 500 with `color: var(--text)` |

**Tabular numerals:** Apply `font-variant-numeric: tabular-nums` on dates and any column of numbers (book ratings dates, post date column) so the digits line up vertically.

**Mobile breakpoint:** At `max-width: 640px`, drop body to 16px, page heading to 26px, and reduce horizontal padding (see Layout).

---

## Color

Restrained palette. One accent. Warm neutrals.

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#faf8f2` | Page background. Warm bone — between pure white and cream. |
| `--text` | `#1a1a1a` | Primary text. Warm near-black, never `#000`. |
| `--muted` | `#6b6b66` | Dates, post counts, author names, secondary copy, project descriptions. |
| `--accent` | `#b8470c` | **Surgical use only**: inline link color + 1px underline (Prototyping.io, Calendly), star ratings on books, hover state on post/project titles, active nav indicator. Never used as a fill, never used on large surfaces. |
| `--rule` | `#e8e4d6` | Hairline 1px rules between list rows. Slightly warm. |

**Dark mode:** Not in scope. The site is light-only by design. The `.dark` CSS variable scope is preserved in `globals.css` so a future toggle is possible without re-architecting.

**Link styling rules:**
- **Inline body links** (`<a>` inside `.site-description`, `.post-content`, `.projects-intro`): `color: var(--accent)`; `border-bottom: 1px solid var(--accent)`; `padding-bottom: 1px`. On hover: `opacity: 0.7`. Never use `text-decoration: underline` for these — use the bottom-border pattern so the underline sits below descenders.
- **Navigation links**: `color: var(--muted)` by default, `color: var(--text)` on hover and when active. Active link is weight 500.
- **List-row title links** (post/project titles inside lists): `color: var(--text)` by default, `color: var(--accent)` on parent-row hover.

---

## Layout

Single centered column. No sidebars, no rails, no asymmetric grids, no cards (except where data structure genuinely needs containment).

- **Max content width:** 720px on desktop, full bleed minus padding on mobile.
- **Wrapper:** `<div class="max-w-[720px] mx-auto px-6 sm:px-8">`. (The current 650px wrapper is fine to keep if it reads better — 650-720px is the acceptable range.)
- **Vertical rhythm:** 12px on the smallest viewports, 32px on small, 48px on desktop between the navbar and the page heading.
- **List patterns** (the dominant component on this site): all list pages (posts, projects, books, thoughts) use the same hairline-rule list pattern.

### List patterns

**Posts list:** Each row is `[date · 92px column] [title]`. Date is `--muted` at 14px with `tabular-nums`. Title is 17px weight 500. No blurb under the title. No tags visible in the list view (tags appear inside the post itself). One hairline rule between rows; one rule above the first row and one below the last.

**Projects list:** Each row is `[title]  [link]` on the first line, `[description]` on the second. Title is 17px weight 500. Link is 14px in `--accent` with 1px underline. Description is 16px in `--muted`, max-width 62ch. One hairline rule between rows.

**Books list:** Each row is `[title]  [author]  [stars · month-year]` on a single line, right-aligned meta. Stars in `--accent`, month/year in `--muted` with `tabular-nums`. One hairline rule between rows.

**Thoughts list:** Each row is `[thought text]` on top, `[date]` below in `--muted` 13px `tabular-nums`. One hairline rule between rows.

---

## Spacing

8px base unit. Comfortable density (not airy, not cramped).

| Token | Value | Use |
|-------|-------|-----|
| `2xs` | 2px | Hairlines, icon offsets |
| `xs` | 4px | Tight padding inside small elements |
| `sm` | 8px | Inline gaps between adjacent meta items |
| `md` | 16px | Paragraph spacing, list-row internal padding |
| `lg` | 24px | Gap between major sections, list-row gap (date column ↔ title) |
| `xl` | 32px | Body-paragraph spacing in long-form posts |
| `2xl` | 48px | Section spacing on the home page (between nav, masthead, body, socials) |
| `3xl` | 64px | Spacing above each page's `<h1>` heading from the navbar |

Section spacing scales with viewport: smaller margins on mobile, generous on desktop.

---

## Border radius

Almost none.

| Token | Value | Use |
|-------|-------|-----|
| `none` | 0 | Hairline rules, list rows, page sections — the default |
| `sm` | 4px | Buttons, inputs, the rare card (e.g., `book-card` if we ever bring cards back) |
| `full` | 9999px | Avatar (if added in the future) |

Never apply uniform bubbly border-radius to everything. Sharp edges separated by hairlines is the system; rounded corners are an exception.

---

## Motion

Minimal-functional only.

- **Easing:** `ease` (default browser easing) for all hover transitions. No custom cubic-beziers.
- **Duration:** 150ms for color, opacity, and border-color transitions on hover. Nothing else animates.
- **Forbidden:** scroll-driven animations, entrance animations on page load, hero parallax, marquee, ticker, count-up animations, hover scale, hover lift / translateY, gradient sweeps.
- **Reduced motion:** All hover transitions respect `@media (prefers-reduced-motion: reduce)` by setting `transition: none`.

---

## Iconography

Use **lucide-react** (already installed). Icons are stroke-based at `stroke-width: 1.7`, sized 18-22px depending on context.

- **Social row icons:** 22px, color `var(--muted)`, hover `var(--accent)`. Optional thin border `1px solid var(--rule)` with 4px radius if a more "buttoned" treatment is wanted; otherwise inline.
- **No filled icons, no colored backgrounds, no badge containers.**

---

## What we explicitly DO NOT do (anti-patterns to flag in review)

- ❌ Cards with shadows or rounded corners on every list row
- ❌ Numbered indices (`01`, `02`, `03`) before list items
- ❌ Mono uppercase labels (`POSTS · 04`, `MAY 2026`) on the page itself — `tabular-nums` is enough
- ❌ Inset color panels behind sections
- ❌ Gradient backgrounds, gradient buttons, gradient text
- ❌ Hover scale or hover lift on rows or cards
- ❌ Centered hero CTAs on the home page (this is a personal site, not a SaaS landing)
- ❌ Sidebar navigation, hamburger menus (until the page count exceeds ~7), or asymmetric two-column layouts
- ❌ Profile photos / avatars (not currently used and not needed)
- ❌ A second font family. One font, three weights. If a serif is ever added, this DESIGN.md must be updated explicitly.
- ❌ More than one accent color. `--accent` is the only chromatic color in the system.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-01 | Created DESIGN.md | Locked in via /design-consultation. Reference: thesephist.com (layout) + natural.co memo (typography). Replaces the in-flight muted-blue + decorated approach in PR #4. |
| 2026-05-01 | Inter for everything; no serif body | User explicitly liked the natural.co sans typography. Inter is the closest free equivalent to STK Miso and is already loaded. Subagent's serif proposal (Newsreader/Fraunces) was rejected as "too much design." |
| 2026-05-01 | Burnt orange `#b8470c` accent (replaced `#4f5fb9` muted blue) | Ties identity to hardware / forged metal / YC, distinguishes from default blue/violet personal sites. Used surgically only. |
| 2026-05-01 | No cards on list pages | Hairline rules + content density beats cards for the kind of dense, scannable lists this site needs. Pattern follows thesephist.com. |
