# Daniel Cruze — Final Website Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish and independently verify the existing public Daniel Cruze website at danielcruze.com, with a durable owner-controlled editing mechanism for every public page, without starting another build.

**Architecture:** Reuse the recovered Expo Router/React Native Web source in `source/highest-rite/` and the existing GitHub Pages web-export pipeline. Centralise owner-edited public metadata/media/link configuration using versioned, validated source files; keep runtime rendering separate from edit data; preserve historical evidence outside the published export. One final release PR against `main`.

**Tech Stack:** Expo 54, Expo Router 6, React 19 / React Native Web, TypeScript, Node 22, pnpm 9.12.0, Python 3.11, Playwright, GitHub Actions and GitHub Pages.

**Spec:** This file, repository `AGENTS.md`, `docs/app-first-repair-plan-2026-10-10.md`, `docs/preserve-and-build-review-2026-10-19.md`, and `README.md`. Where older notes conflict, verify current source and explicitly record the decision.

## Global constraints
- Canonical public website: `https://danielcruze.com/`; assess `https://www.danielcruze.com/` as its redirect/alias, not independent editorial source.
- Do not build or move production to another repository, Vercel project, Manus export or template. Do not edit generated root legacy bundles in place.
- Preserve exact author/brand voice and supplied source assets; do not fabricate portraits, book release dates, ISBNs, testimonials, legal claims or checkout URLs.
- Brand hierarchy: Daniel Cruze = personal/author entry; The 33rd House = separate referral into the framework; AIB Hub = separate business. Do not conflate legal ownership.
- Owner expects repeatable site-wide editing: every page's SEO, heading, description, images, image alt, book-cover reference, allowed audio reference, CTA and Stripe link must be addressable through a documented, version-controlled data source. Never expose private key/token values or a publicly writable admin console.
- **HOLD:** adult-only destinations, private journal, member authentication, Telegram auth, protected audio/book masters, R2 access, Stripe checkout/entitlements, non-approved sales links and policy claims. A visible held/disabled state is preferable to a fake or broken CTA.
- Do not unilaterally change DNS, production hosting provider, bot configuration or finance settings. Owner must approve production diff and deployment.
- CI is evidence only for the exact tested commit. No merge until all mandatory gates pass and independent review is recorded.

## Repository map (verified 22 Oct 2026)
- `source/highest-rite/lib/content.ts`: existing large source of images, texts, social destinations, books, sections.
- `source/highest-rite/components/site-metadata.web.tsx`: current route title, canonical, description and OG wiring.
- `source/highest-rite/components/cta-button.tsx`: shared clickable buttons; candidate change in open PR #12.
- `source/highest-rite/components/responsive-media.tsx`: images default to contain/full framing.
- `source/highest-rite/app/(tabs)/index.tsx`, `app/about.tsx`, `app/the-books.tsx`, `app/journal.tsx`, `app/social.web.tsx`, `app/contact.tsx`, `app/work-with-daniel.tsx`, `app/the-33rd-house.tsx`: principal source routes.
- `source/highest-rite/scripts/check-export.py` and `scripts/test-web.py`: current static/web QA.
- `.github/workflows/expo-pages.yml`: existing validate and Pages deploy pipeline.
- `source/highest-rite/__tests__/`, `tests/`: existing tests; `tests/auth.logout.test.ts` currently intentionally skipped.
- Open PRs: #12 CTA visibility; #13 canonical domain. Open issue #14: Vitest/Vite mismatch and missing CI execution. PR #7 merged.

## Review focus
1. **Broken/outdated outbound URL** → fail a link inventory check and show held state, never silently navigate to a nonexistent destination (Task 3).
2. **Owner edits page metadata** → correct title, description, canonical, OG image and alt survive static build on that route (Task 4).
3. **Narrow/mobile portrait/book cover** → meaningful art remains entirely visible and no horizontal overflow at 320 and 390 pixels (Task 2).
4. **Unverified payment or private-media path** → no active CTA to checkout, protected audio or unpublished book; no credential in exported HTML/JS (Tasks 3, 4).
5. **Direct load/refresh on nested route / legacy redirect** → correct HTML content, meaningful 404, correct canonical and no blank SPA shell (Tasks 2, 5).

---

### Task 1 — Establish trustworthy release baseline and fix test gate
**Files:** inspect `source/highest-rite/package.json`, `pnpm-lock.yaml`, `.github/workflows/expo-pages.yml`, `tests/auth.logout.test.ts`; adjust dependency versions only if tests prove necessary.
**Interfaces:** Existing package scripts `check`, `test`, `test:source`, `build:web`; existing CI workflow.
- [ ] Record `main` SHA and both current PR heads; use this branch for controlled integration, without modifying main or deploying.
- [ ] Reproduce issue #14: `cd source/highest-rite && pnpm install --frozen-lockfile && pnpm test`. Record Node, pnpm and dependency versions.
- [ ] Resolve Vitest 5 / Vite peer incompatibility or revert only the incompatible test-tool bump with proof; document exact decision.
- [ ] Add `pnpm test` to CI as a separate required step; unit test skips must be enumerated separately.
- [ ] Run `pnpm check`, `pnpm test:source`, `pnpm test`, and `pnpm build:web`; require exit code 0. Commit and attach log links.

### Task 2 — Restore responsive visibility and all public routes
**Files:** `source/highest-rite/components/cta-button.tsx`, `responsive-media.tsx`, `app/(tabs)/index.tsx`, public route components, `scripts/test-web.py`; use changes from PR #12 after compare/review.
**Interfaces:** `CTAButton`, `ResponsiveMedia`, existing Expo Router navigation.
- [ ] Add a failing Playwright test for each visible CTA's keyboard/click activation and one primary destination per public page; run to confirm failure for known defects.
- [ ] Merge/cherry-pick verified PR #12 CTA changes into **the release branch**, not main; resolve conflicts and ensure visible focus/touch states.
- [ ] Fix blank clicks, overlapping content, wrong image crop/scale, missing active states and any layout overflow without replacing original imagery.
- [ ] Run route/screenshots at 320, 390, 768, 1440, **2560** widths, plus reduced motion and keyboard-only traversal; check both dark-mode contrast and meaningful alt.
- [ ] Verify Home, About, Books, Journal/article, Social, Contact, Work With Daniel, House referral, approved ancillary routes and branded 404; commit test evidence.

### Task 3 — Establish one truthful destination and product/link register
**Files:** create `source/highest-rite/content/links.json`, `content/media.json`, `content/books.json`; modify `lib/content.ts` consuming public values and `app/the-books.tsx`, `app/contact.tsx`; add `tests/public-link-contract.test.mjs`.
**Interfaces:** Each record has a stable ID, label, URL (nullable), type (internal/external/mailto/payment/download), approval status (verified/hold), evidence reference and last-reviewed date. No secret fields.
- [ ] Inventory every CTA, social URL, book cover, enquiry action, publisher/retailer link and existing page route, including earlier CTA census; label VERIFIED / HOLD / BROKEN / HISTORICAL.
- [ ] Add tests: approved external HTTPS/mailto destination renders and opens; unverified checkout/audio/retailer endpoint renders inactive and cannot navigate; internal links match static routes.
- [ ] Move active public destinations to the typed/validated register; preserve existing working URLs and copy, only correct those with actual evidence.
- [ ] Do not imply a mailto handoff confirms receipt. If no authenticated backend is approved, label it as email handoff rather than submitted enquiry.
- [ ] Rebuild, click-test external links without sending messages or making purchases; commit link census with no tokens.

### Task 4 — Permanent owner-editable per-page content, SEO and media
**Files:** create `source/highest-rite/content/pages/*.json`, `content/schema.ts`, `scripts/validate-content.mjs` (or one equivalent cohesive typed validator); adapt `lib/content.ts`, `components/site-metadata.web.tsx`, `scripts/check-export.py`, relevant source routes. Add `tests/content-contract.test.mjs`.
**Interfaces:** `PageRecord` contains `route`, `title`, `description`, `h1`, `ogTitle`, `ogDescription`, `ogImageId`, `canonicalPath`, `robots`, `sections`, `ctaIds`, `imageIds`, `altText`, `bookIds`, `audioIds`. Validate all IDs against `links.json` / `media.json` / `books.json`. Fields may be optional when inapplicable; missing required SEO must fail build.
- [ ] Add a failing fixture test editing one page's title/description/image alt and another page's book cover/CTA; assert only the intended pages' exported metadata/content changes.
- [ ] Implement a source-backed content loader plus schema validation; migrate *all public routes*, without flattening editorial copy into a universal template or dropping native functionality.
- [ ] Support repeatable owner updates through documented GitHub branch/file edit → automatic checks → preview → approval → merge. Provide a short README: edit SEO/description/image/book/Stripe/audio per page and upload media **to approved public content directories only**, then link by ID. Never promise a protected admin UI without authenticated backend.
- [ ] Never activate audio or Stripe on data-entry alone; require verified link/merchant/rights checks and a separate owner-approved activation flag. No direct client-side file uploads or secrets.
- [ ] Validate `og:`, Twitter card, schema.org Person/WebSite, sitemap, robots and canonical routes; verify the generated HTML without relying solely on JS hydration.
- [ ] Confirm edited page build persists and no unrelated page changes; commit with side-by-side export diff evidence.

### Task 5 — Canonical domain, public accessibility and release checks
**Files:** integrate verified PR #13 change in `source/highest-rite/lib/content.ts`, amend `scripts/prepare-pages.mjs`, `scripts/check-export.py`, `scripts/test-web.py`, `.github/workflows/expo-pages.yml` if required.
- [ ] Verify all brand.website/canonical/OG/sitemap/CNAME values use `danielcruze.com` and that `www` resolves or redirects by an approved rule. Do not change DNS based only on repo values.
- [ ] Add regression tests for /about/, /books/, /journal/, /contact/, /social/, /work-with-daniel/, /the-33rd-house/, article permalinks, 404, and legacy aliases.
- [ ] Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, `pnpm test:source`, `pnpm build:web`, `python3 scripts/check-export.py`, `python3 scripts/test-web.py`, plus lint where configured.
- [ ] Validate exported files contain no keys, tokens, private manuscript/audio/book masters, adult-only destination URLs, or unsupported offers. Ensure the only deployment artifact is `source/highest-rite/dist`.
- [ ] Record **current SHA-specific** checks, screenshots, broken-link report, accessibility results and rollback instructions. Request independent review of the consolidated release PR.

### Task 6 — Controlled production cutover and cleanup (separate explicit approval)
**Files:** `README.md`, new `docs/final-release-verification-2026-10-22.md`, future release commit only after approval.
- [ ] Present the owner a page-by-page preview, exact tested commit, list of held items, changed-domain/routing proposal and a rollback point.
- [ ] Obtain separate explicit approval for production merge and any DNS/hosting/payment change. Until then leave main/domain unchanged.
- [ ] Merge **one** approved release PR only after all checks pass; verify production Pages workflow and deployed SHA.
- [ ] Smoke-test actual apex and www HTTPS, 200/404 responses, canonical redirects, links, hero imagery, forms and sitemap after deployment; document measured results, not expectations.
- [ ] Once live verified, mark superseded review PRs/branches for **separately approved** closure/archive, without deleting evidence or other repos silently.

## Completion criteria
- [ ] One editable Expo source, one approved release branch/PR, one tested Pages deploy commit.
- [ ] All expected public pages and browser/keyboard/mobile interactions verified, not merely compiled.
- [ ] Every page edit operation is documented and regression-tested; SEO, descriptions, cover/alt, links, audio and Stripe fields can be changed from one controlled content source.
- [ ] No unapproved payments, protected media, member auth, adult destinations or keys exported.
- [ ] GitHub issue #14 and PR #12/#13 dispositions are documented with clear evidence.
- [ ] Published apex/www, canonical, SSL and rollback validated following separate owner approval.

**IMPORTANT:** This document creates an execution plan, not a claim of completed site fixes or authority for auto-deployment.
