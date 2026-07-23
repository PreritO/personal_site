# Design System — Prerit Oberai's personal site

**The rule above all rules:** Content first. If a decoration, layout flourish, card, or border can be removed without losing meaning, remove it. Structure inspired by bykahlil.com (quiet chrome, essay anatomy), diverged deliberately on its signature elements — see the Decisions Log.

---

## Product Context

- **What this is:** Personal site / blog for Prerit Oberai, co-founder and CTO of Prototyping.io (YC P26). Writing-first: the site exists to publish essays and say who Prerit is.
- **Who it's for:** Fellow founders, investors, candidates, customers, and his network.
- **Project type:** Personal site with editorial sections (home, writing, bookshelf). Projects and Thoughts were removed 2026-07 — fewer, stronger sections.
- **Stack:** Next.js 14 (App Router) + Tailwind, Notion-backed content, deployed on Vercel.
- **Audience expectation:** Substance over polish. Reads quickly, leaves the visitor with a clear sense of who Prerit is and what he's building.

---

## Aesthetic Direction

- **Direction:** Minimal, content-led. A document, not an interface. Two registers: **chrome** (nav, lists, meta — small and quiet at 15px) and **prose** (essays — comfortable at 17px). The contrast between them *is* the hierarchy.
- **Decoration level:** Minimal. Typography, whitespace, and one accent color do all the work. No cards, no inset color blocks, no numbered indices, no mono uppercase labels, no gradients, no shadows.
- **Mood:** A founder's working notebook. Calm, considered, easy to read.
- **Reference:** bykahlil.com for the structural feeling (fixed rail, quiet scale, essay pages) — **principles borrowed, signature elements deliberately not copied** (no thumbnail-arrow rows, no flat handle-row header, no per-navigation stagger; see Decisions Log 2026-07-23).

---

## Typography

One font everywhere — Inter — at three weights. No serif, no mono, no display face.

- **Family:** **Inter** via `next/font/google`, `display: "swap"`, `--font-inter` variable.
- **Weights loaded:** 400 (nearly everything), 500 (home name, list titles, emphasis), 600 (reserved).

### Scale — two registers

**Chrome register (nav, lists, meta, home bio):**

| Role | Size | Line-height | Weight | Notes |
|------|------|-------------|--------|-------|
| Chrome body | 15px | 24px | 400 | Nav labels, list rows, bio paragraphs, page intros. 16px floor at ≤640px. |
| Home name | 20px | 1.3 | 500 | The one elevated element on the home page. |
| Page heading | 20px | 1.3 | 400 | `Writing`, `Projects`, `Bookshelf`, `Thoughts` — quiet, not shouty. |
| Meta | 14px | 1.4 | 400 | Dates, book metadata. `tabular-nums` on all date/number columns. |

**Prose register (essay pages only):**

| Role | Size | Line-height | Weight | Notes |
|------|------|-------------|--------|-------|
| Post title (h1) | 32px | 1.3 | 400 | letter-spacing -0.01em; 24px at ≤640px |
| Post h2 | 24px | 1.35 | 400 | |
| Post h3 | 20px | 1.4 | 400 | |
| Essay body | 17px | 28px | 400 | 16px/26px at ≤640px. Text measure ~640px (68–72 chars); the 720px column is for media only. |

**Why two sizes:** 15px chrome keeps the shell quiet; essays are the product and read at 17px. Locked at the 2026-07-23 review gate (UC3) — do not "unify" them.

---

## Color

Restrained palette. One accent. Warm neutrals. **Light only** — `color-scheme: light` is pinned; there is no dark scope.

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#faf8f2` | Page background. Warm bone. |
| `--text` | `#1a1a1a` | Primary text. Warm near-black, never `#000`. |
| `--muted` | `#6b6b66` | Dates, secondary copy, inactive nav labels. (4.9:1 on bone — AA.) |
| `--accent` | `#b8470c` | **Surgical use only**: inline links + 1px underline, star ratings, hover on list titles, the active-nav dot. Never a fill. (4.6:1 on bone — AA.) |
| `--accent-visited` | `#8a3a10` | Visited inline links inside essay prose only. |
| `--rule` | `#e8e4d6` | Hairline 1px rules between list rows. |

**Link styling rules:**
- **Inline body links** (`.site-description a`, `.post-content a`, intros, byline): `color: var(--accent)`; `border-bottom: 1px solid var(--accent)`; hover `opacity: 0.7`. Never `text-decoration: underline`.
- **Prose visited links:** `--accent-visited` (essays are revisited; the distinction helps return readers). Chrome links don't distinguish visited.
- **Navigation links:** inactive `--muted`, active + hover `--text`, weight 400 always — the dot carries the active state, plus `aria-current="page"`.
- **List-row title links:** `--text`, `--accent` on row hover; keyboard focus gets the same treatment.

---

## Layout

A fixed left rail beside a single centered column. The rail is positioned relative to the **column**, not the viewport.

- **Columns:** 560px max-width (home, lists), 720px (essay pages — media width; prose inside sits at ~640px).
- **Rail (≥1025px):** fixed, `left: max(24px, calc(50vw - 360px - 160px))` — anchored to the **wide (720px) column's** left edge with a 160px gutter (anchoring to the 560px column overlapped essay pages), clamps on narrow desktops, identical position on every page. `top: 80px`. Vertical stack, 12px gap.
- **Active indicator:** 6px square in `--accent`, slot always reserved (labels never shift), visible on the active item only. No hover dot.
- **≤1024px:** the rail becomes a horizontal row above content, same width as the column, **wrapping to two lines if needed** — never horizontal scroll.
- **A11y:** every nav link ≥44px interactive area (via padding), visible-on-focus skip-to-content link, `:focus-visible` on all links.
- **List patterns:** text-only hairline-rule rows everywhere. **Writing list:** `[title 15px/500] [date 14px muted]` — no thumbnails, no arrows, no blurbs. **Books** keeps its row anatomy (title · author · stars/date), rebased to the chrome register.

### Essay page anatomy

Hero image (only if the post has a Notion cover: 1.91:1, explicit dimensions, `object-fit: cover`, max-height 360px, 4px radius, hides on load error) → title → muted date + plain-text tag links → prose → **byline footer** ("Prerit Oberai is the co-founder and CTO of Prototyping.io (YC P26)" with accent links, muted scale). The byline is load-bearing: most essay readers arrive from a shared link and never see the nav.

---

## Spacing

8px base unit. | `sm` 8px inline gaps · `md` 16px row padding · `lg` 24px section gaps · `xl` 32px prose paragraph rhythm · `2xl` 48px home sections · `3xl` 64px above page headings. Smaller on mobile.

---

## Border radius

Almost none. 0 default; 4px for images and the rare contained element; never uniform bubbly radius.

---

## Motion

One sanctioned entrance, tamed; everything else is 150ms hover transitions.

- **Entrance:** `fadeInUp` (opacity 0→1, translateY 8px→0, 0.2s ease-out, 50ms stagger, first ~12 children) — **once per session only**, gated via `sessionStorage` + a `motion-done` class on `<html>`. Never on the nav. Never replays on client navigation, filtering, or back-button.
- **Hover:** color/opacity/border-color at 150ms `ease`. Nothing else animates.
- **Forbidden:** per-navigation entrance replays, scroll-driven animations, parallax, marquee, count-up, hover scale/lift.
- **Reduced motion:** `prefers-reduced-motion: reduce` kills all animation and transitions.

---

## Iconography

Almost none. **Social links are plain text** (Email, GitHub, LinkedIn, Calendar) — muted, darkening on hover. lucide-react remains only for the book-rating `Star`. No filled icons, no colored backgrounds, no badge containers.

---

## What we explicitly DO NOT do (anti-patterns to flag in review)

- ❌ Cards, shadows, rounded-corner containers on list rows
- ❌ Thumbnails or arrow glyphs in the writing list (that's the reference site's signature; ours is text)
- ❌ Numbered indices, mono uppercase labels, inset color panels, gradients
- ❌ Hover scale / hover lift
- ❌ Entrance animation replaying on navigation (once per session, or not at all)
- ❌ Centered hero CTAs
- ❌ Hamburger menus; horizontal-scrolling nav
- ❌ A second font family or a second accent color
- ❌ Body text under 16px on mobile, or essay prose under 17px on desktop
- ❌ Dark mode (deleted, not dormant — `color-scheme: light` is pinned)

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-01 | Created DESIGN.md | Locked via /design-consultation. References: thesephist.com + natural.co memo. |
| 2026-05-01 | Inter for everything; no serif | Closest free equivalent to the natural.co typography; serif proposal rejected as "too much design." |
| 2026-05-01 | Burnt orange `#b8470c` accent | Hardware/forged-metal identity; distinguishes from default blue/violet personal sites. |
| 2026-05-01 | No cards on list pages | Hairline rules + density beat cards for scannable lists. |
| 2026-07-23 | **Sidebar rail (reverses 2026-05-01 "no sidebars")** | The May rule assumed nav-as-chrome atop a document. Making writing the center changed the job: a fixed quiet rail keeps wayfinding present during long essays without occupying the column. The May rule was right for a bio site; wrong for a writing site. Rail is column-relative (not viewport-glued) and collapses to a wrapping row ≤1024px. |
| 2026-07-23 | **Two-register type scale: 15px chrome / 17px prose (revises the single 17px scale)** | One size flattened hierarchy — nav, dates, and essays all shouted equally. Small chrome + full-size prose makes essays the loudest thing on the site. Essay size deliberately NOT dropped to the reference's 15px: 95-char lines in a 720px column fail readability; unanimous 4-voice review verdict + user gate decision (UC3). |
| 2026-07-23 | **Once-per-session fadeInUp (narrow exception to "no entrance animations")** | The May ban targeted portfolio-slop animation. A single quiet entrance per session preserves the reference's felt softness without the replay flicker (the actual slop signal). Per-navigation replay stays forbidden. If in doubt, less motion. |
| 2026-07-23 | **Text socials replace lucide icons** | Text links match the document register; icon rows read as UI chrome. lucide survives only for book stars. |
| 2026-07-23 | **Signature divergence from bykahlil.com (gate UC1, "middle path")** | Keep: rail+dot structure, quiet chrome, 560/720 columns, essay anatomy. Reject: thumbnail-arrow list rows, flat handle-row header, exact coordinate cloning. Both review models flagged verbatim cloning of a same-network founder's site as a reputational own-goal; the user chose structure without the fingerprint. |
| 2026-07-23 | **Dark scope deleted (hardens 2026-05-01 "light-only")** | The dormant `.dark` block caused a real production bug (theme hijacking, PR #6). Light-only is now enforced with `color-scheme: light`, not merely preferred. |
| 2026-07-23 | **Byline footer on essays** | Conversion moment for direct-link readers; identity is the site's job. |
| 2026-07-23 | **Domain stays prerit.website** | Gate UC2: no move without evidence of a discoverability problem. |
| 2026-07-24 | **Projects and Thoughts sections removed** | User call, post-launch: fewer, stronger sections. Nav is Home / Writing / Bookshelf. Old URLs 307-redirect home (temporary — becomes permanent if the removal sticks). Echoes the review's nav-hierarchy critique: a permanent rail slot is a claim that a section matters. |
| 2026-07-24 | **Rail anchored to the 720px column (fixes overlap)** | The 560px-anchored formula put the rail inside essay text on wide viewports. Anchoring to the wide column gives essays the full 160px gutter and a page-independent rail position. |
