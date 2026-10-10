# Highest Rite Source Recovery and Responsive Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the real editable Highest Rite Expo/React Native source into a recoverable, testable canonical codebase and fix image resizing, route usability, and overflow on phone, tablet and desktop.

**Architecture:** Maintain the existing public `mrcruzevip-code/danielcruze-site` GitHub Pages output while restoring a separate editable source tree under `source/highest-rite`. The first implementation changes only source and unit tests, not compiled production assets. Extract and inventory the owner-supplied original `the-highest-rite.zip` with original relative paths and hashes; preserve all originals. Once a reproducible build exists, a separately reviewed release maps static export back to live site. Use Expo Router for web/Android and defer members/payments/Telegram to separately verified implementation tracks.

**Tech Stack:** Expo SDK 54, React 19.1, React Native 0.81.5, TypeScript, `expo-image`, Expo Router 6, Node 22+ built-in node:test for dependency-free image-layout tests; Vitest/Playwright after package installation.

**Spec:** `docs/superpowers/specs/2026-10-10-highest-rite-app-first-responsive-design.md`.

## Global Constraints

- Only public Daniel Cruze app assets and code; do not mix the House platform or its member records.
- Protect private data and credentials; no secrets, held audio masters, service tokens or customer records in public GitHub.
- Maintain original filenames, SHA-256 inventory and a source provenance archive.
- **Images show the whole subject and preserve their aspect ratios by default** (contain, not cover). Responsive sizing must adjust on orientation/viewport changes. Only nonessential decorative imagery may intentionally crop.
- Do not modify Cloudflare DNS, Shopify, Stripe, BotFather, worker secrets or `main` in this source-recovery PR.
- The initial source ZIP has an Expo server/back-end with historical Manus dependencies; do not deploy it as a secure backend. Its legacy OAuth remains untrusted and needs replacement in Track B.
- The audio-pack files in the archive (five WAV files) and Drive audio masters are held; do not push WAV/MP3 or publicly link them.
- Validate every button and checkout *before* a production publication claim; no false-success form behavior.

## Review Focus

- 320-pixel narrow viewport: no image outside its container; CTA remains visible.
- Aspect mismatch (portrait image in landscape screen): no cropping or stretching.
- Device rotates after initial render: viewport dimensions re-evaluated instead of using module-level Dimensions constants.
- Old fixed-width book cards and full-viewport hero: fit within safe-area content without horizontal scrolling or tiny portraits.
- Unsupported or absent media: frame keeps space and appropriate placeholder/error state; not an invisible interactive target.

---

### Task 1: Restore and fingerprint original Expo source

**Files:**
- Create locally: `source/highest-rite/**` from the available original ZIP, excluding `.expo`, audio masters, build binaries, secrets and unreviewed private materials from public GitHub import.
- Create: `source/highest-rite/SOURCE-RECOVERY.md`.
- Create: `source/highest-rite/source-manifest.sha256` for files actually imported.

**Interfaces:**
- Consumes: original `the-highest-rite.zip` with Expo Router source.
- Produces: static paths `app/*`, `lib/content.ts`, `components/*` and testable package manifest, preserved as source and not merged into current deployed static export.

- [ ] Step 1: Inventory ZIP paths, file sizes and SHA-256. Verify archive is nonempty, contains `app/(tabs)/index.tsx`, `app/journal.tsx`, `__tests__/images.test.ts`, and `package.json`.
- [ ] Step 2: Scan ZIP for hard-coded credentials, deployment bindings, private media and unreviewed assets; identify exclusions.
- [ ] Step 3: Copy approved source into isolated workspace without changing originals; write recovery README and hashes.
- [ ] Step 4: Verify byte hashes and route manifest against ZIP; record any missing binary media and uninstalled dependencies.
- [ ] Step 5: Commit only safe source files into isolated GitHub branch, keeping production export `index.html`, `CNAME` and `_expo` intact.

### Task 2: Responsive ratio-preserving media primitive

**Files:**
- Create: `source/highest-rite/lib/responsive-media.ts` (pure layout calculations).
- Create: `source/highest-rite/components/responsive-media.tsx` (Expo Image reusable wrapper).
- Test: `source/highest-rite/tests/responsive-media.test.mjs` (Node built-in test; no install needed).

**Interfaces:**
- `fitWithin(width:number,height:number,sourceWidth:number,sourceHeight:number): {width:number,height:number}` returns a non-cropping maximum rectangle.
- `responsiveHeight(viewportWidth:number,viewportHeight:number,ratio:number):number` returns clamped available vertical size for image panels.
- `ResponsiveMedia({source,alt,style,maxHeight,decorative})` displays actual content using `contentFit='contain'` unless `decorative` is true.

- [ ] Step 1: Write tests for portrait-in-landscape, landscape-in-portrait, 320/390/768/1440 widths, invalid dimensions and rotation; expect a maximum frame inside viewport preserving ratio.
- [ ] Step 2: Run `node --experimental-strip-types --test tests/responsive-media.test.mjs`; confirm red because module does not yet exist.
- [ ] Step 3: Implement minimal pure functions.
- [ ] Step 4: Run same tests; expect all green. Implement Expo component that reads `useWindowDimensions`, uses contain by default and decorative cover only when requested.
- [ ] Step 5: Commit the implementation and tests.

### Task 3: Fix app hero/image sections and responsive navigation

**Files:**
- Modify: `source/highest-rite/app/(tabs)/index.tsx` and its styles.
- Modify: `source/highest-rite/components/drawer-menu.tsx`.
- Modify: `source/highest-rite/app/about.tsx` and remaining visual routes using cropped content images.
- Test: `source/highest-rite/tests/image-contract.test.mjs` static source guard; browser/Expo visual tests remain release gate.

**Interfaces:** consumes `useWindowDimensions` + ResponsiveMedia, produces dynamic orientation-aware hero, book card widths, drawer width, and no content image `cover` unless reviewed decorative layer.

- [ ] Step 1: Write failing static guard for `Dimensions.get('window')` module-level constants and meaningful image `contentFit='cover'` in public route content; hero may retain background cover only with a complete visible foreground image.
- [ ] Step 2: Run `node --test tests/image-contract.test.mjs`, expect red.
- [ ] Step 3: Convert to dynamic viewport dimensions; use full portrait in hero and content image containment, move hero text/CTA into accessible overlay, and make book tiles use flex with `maxWidth` rather than module-level static width.
- [ ] Step 4: Run Node media/image tests and spot-check native component contract; record why full Expo typecheck cannot execute if dependencies are unavailable.
- [ ] Step 5: Commit.

### Task 4: Content and release mapping (no accidental publication)

**Files:**
- Create: `source/highest-rite/docs/media-and-content-register.md`.
- Update: `docs/audits/2026-10-10-danielcruze-route-cta-payment-inventory.md`.

**Interfaces:** records real source content and held assets; does not generate hosted payment links or public audio download URLs.

- [ ] Step 1: Compare original journal/blog routes, full authored manuscript versus placeholder articles, five local WAV recordings (packaged archive), fifteen enhanced Drive MP3s (held), book PDF versus paid rights.
- [ ] Step 2: Save a media ledger with explicit unverified and HOLD statuses.
- [ ] Step 3: Record first-release public routes and CTA validation matrix; document missing backend/login/contact integrations.
- [ ] Step 4: Verify media lists and no private data or credentials in review artifacts; commit documentation.

### Task 5: Stage-and-release boundaries

**Files:**
- Create: `source/highest-rite/docs/qa-responsive-matrix.md`.

- [ ] Step 1: Define Playwright/browser and native screenshot checks for 320, 360, 390, 430, 768, 1024, 1440, 1920, 2560 widths, orientation, browser zoom 200%, alt text, visible buttons, no horizontal overflow and fail-fast broken image URLs.
- [ ] Step 2: Verify safety gates: Telegram token rotated but deployed Worker secret unverified, old enquiry Worker fixed bearer unsafe, Stripe merchant links unverified, backend login/checkout missing.
- [ ] Step 3: Create draft implementation PR with diff/tests/source manifest; do NOT merge/deploy without end-to-end source build and separate release decision.

## Execution Ruling

The owner has asked for execution using Superpowers, and prior project instructions prefer native executor mode. Work can proceed on a review branch. No implied production authority for secrets, payment charges, publication or DNS writes. Complete these source-recovery and responsive-source tasks, report test evidence and remaining blockers instead of falsely claiming a live site.
