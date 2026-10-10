# The Highest Rite — editable source recovery and responsive implementation

**Source archive recovered:** `the-highest-rite.zip` (23 MB), SHA-256 `9b30228b051b4339b13438a40d4a160b1a449cee89ab8910c0bbfc2e4288a091`. Contains Expo Router 6 / Expo 54 / React Native 0.81.5 / TypeScript, real `app/` route TSX files, `lib/content.ts`, `components/`, tests, audio and e-book assets.

**Local recovery completed:** 111 safe non-media source/test/doc files were copied to a separate recovery package; 14 focused Node tests passed locally (responsive geometry, image styles, hero/book flow and contact mailto no-false-receipt). Local source package exists as a downloadable conversation artifact `highest-rite-recovered-responsive-source-2026-10-10.zip`, but it is **not automatically synchronized to this GitHub branch**.

**This PR stages:** reversible CSS overlays in 22 existing exported HTML routes plus a reusable TypeScript `ResponsiveMedia` component, mathematical helper and no-dependency tests under `source/highest-rite`. **These are not yet a full Expo source import.** The local recovery ZIP is the complete current source artifact. Do not claim an Android/web build or successful visual regression from this PR: Node dependencies were unavailable offline, and a complete Expo export/device test remains pending.

**Run helper tests:** `node --experimental-strip-types --test source/highest-rite/tests/responsive-media.test.mjs`.

**Original app content:** public blog/editorial and personal brand pages are present; private member journal, secured Telegram OIDC, payment/webhook fulfilment and protected digital library remain implementation work. Original audio recordings are **HOLD**; WAV/MP3 masters and paid books are deliberately NOT copied to public GitHub.

**Release boundary:** No main-branch merge, Cloudflare route change, DNS cutover, Telegram token write, private content publication, or live payment change is authorized by this source implementation review.
