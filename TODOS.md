# TODOS

Deferred items from the 2026-07-23 /autoplan review (CEO + Design + Eng phases). Format: what / why / context.

- [ ] **"Most read" sorting on /writing** (P3, M) — needs analytics history that doesn't exist yet. Blocked by: analytics decision (gate T-item), ~30 days of data. Context: kahlil-parity feature deliberately dropped from the restyle.
- [ ] **Subscribe mechanism (email)** (P2, M) — RSS ships in PR1; email capture is a product decision (provider, tone). Context: both review models flagged the missing retention loop for a writing-first site.
- [ ] **Editorial strategy note** (P2, S) — topics to own, cadence, audience, how essays feed Prototyping.io. Context: Codex CEO voice: "a Notion status field is a CMS workflow, not a publishing system." Not a code task.
- [ ] **Formal test framework** (P3, M) — Playwright or Vitest. Context: repo has zero test infra; smoke.sh + Vercel build gate accepted for now (eng decision #34).
- [ ] **Proxy 429-path test + concurrent-publish races** (P3, S) — accepted coverage gaps from the eng phase.
- [ ] **Domain move (SKIPPED at gate)** — staying on prerit.website; revisit only on evidence of a discoverability problem. Reference checklist preserved in the plan §12.
- [ ] **Portrait photo on home** (P3, S) — structure leaves the slot; needs a real photo from Prerit.
- [ ] **Durable image storage (Vercel Blob) if proxy proves flaky** (P3, M) — rejected for now (new infra); revisit if Notion rate limits bite despite CDN caching.
