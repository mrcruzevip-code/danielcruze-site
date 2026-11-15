# Repository Execution Directive — Daniel Cruze Website (22 October 2026)

## Mission
**FINALISE THIS EXISTING BUILD at https://danielcruze.com.** Do not generate a replacement site, create another production repository, move the canonical source, or abandon the recovered Expo app. The GitHub repository `mrcruzevip-code/danielcruze-site` is the website release repository. `source/highest-rite/` is editable source and `source/highest-rite/dist/` is generated output, never the editing surface.

**Primary execution specification:** `docs/superpowers/plans/2026-10-22-danielcruze-final-release.md`. Work through its acceptance checks, commit in reviewable increments and provide exact links to test runs, changed files, screenshots and release SHA. Follow Superpowers test-first, review and fresh verification procedures.

## Non-negotiable release outcome
- Daniel Cruze is the front door. The 33rd House is a separate clearly labelled referral; AIB Hub is not combined into the author site.
- Finish Home, About, Books, Journal, Social, Contact, Work With Daniel and approved referral pages. Every visible button, link, image and route must work. Explicitly distinguish non-operational/held destinations.
- Correct mobile/tablet/desktop presentation, full-frame meaningful photographs and covers, accessible CTA contrast and keyboard controls, functional navigation, route-specific SEO/canonicals/social previews, no blank/zero-width content.
- Establish a **single owner-editable, per-page content configuration and documented workflow** for headings, descriptions, SEO/OG, alt text, images, covers, external URLs, approved Stripe payment links, and held audio references. Updates must be possible repeatedly without hand-editing scattered application components. Git-backed review/publish is acceptable; no fake CMS, unauthenticated editing endpoint or client-side secrets.
- Commercial links and downloadable audio/books remain **OFF** until each item is verified, explicitly approved and independently tested. No made-up prices, book publication statuses, licensing statements, merchant IDs, or completed enquiries.
- Resolve or incorporate existing PR #12 (CTA), PR #13 (canonical domain) and issue #14 (Vitest/Vite test coverage) after checking current conflicts and actual tests. PR #7 is already merged; do not repeat it.
- Use one working release branch and a final reviewed PR. Do not silently merge, force-push main, change DNS/Cloudflare/Vercel, enable checkout, publish restricted material, archive or delete branches/repositories.

## Current facts (do not reinterpret stale docs as live status)
- Production Pages workflow: `.github/workflows/expo-pages.yml`. Post-PR-#7 push build/deploy on 22 Oct 2026 succeeded; that alone does not prove every live route/checkout.
- Workflow currently omits `pnpm test` (Vitest), despite the Vitest 5 upgrade; treat issue #14 as a real verification gate.
- Legacy root HTML is historical only; Expo web export is what deploys.
- Existing source docs disagree about previous bot token binding and audio readiness. Do not touch bot credentials, authenticated areas, protected media or payment entitlements on the basis of either claim.

## How to declare completion
Show passing **current commit** checks: frozen install; typecheck; source tests; Vitest unit tests; web build; export verifier; Playwright page/CTA/image/navigation/SEO tests; responsive screenshots at 320/390/768/1440/2560; manual verified external URLs; apex and www HTTPS/canonical host; actual GitHub Pages deployment SHA and rollback. A claimed fix without test output remains OPEN.

**OWNER APPROVAL GATE:** Preview and the exact release payload must be reviewed before any production merge or DNS/payment mutation. The instruction to finalise is authority to prepare and verify the release, not blanket authority to bypass safety and production change control.
