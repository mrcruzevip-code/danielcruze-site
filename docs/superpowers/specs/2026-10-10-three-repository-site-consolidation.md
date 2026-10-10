# danielcruze.com — Three-Repository Consolidation Design

**Date:** 2026-10-10
**Status:** Proposed for owner review. Design only, not a production release.
**Canonical site:** `mrcruzevip-code/danielcruze-site`, default branch `main`
**Other inputs:** `The33rdHouse/danielcruze-site` and `The33rdHouse/daniel-cruze-elite`
**Site:** `https://danielcruze.com`
**Owner's direction:** One site, one canonical source, GitHub Pages preferred for its low hosting cost. The other repositories remain preserved for provenance/rollback.

## 1. Baseline verified from GitHub

| Repository | Visibility | Relevant assets | Role |
| --- | --- | --- | --- |
| `mrcruzevip-code/danielcruze-site` | Public | Expo-generated static pages: About, Books, Journal, Decoding Cosmos, Soul Blueprint, For Men/Women/Couples, Contact, Work With Daniel, The 33rd House; `CNAME` | Destination/authoritative web build |
| `The33rdHouse/danielcruze-site` | Public | Lightweight landing, Gates, books, social landing, redirect stubs, `CNAME`, Cloudflare notes | Candidate content/links; retain backup |
| `The33rdHouse/daniel-cruze-elite` | Private | Founder & Builder homepage, original copy, CSS, JS, DC brand-mark SVG and social artwork | Candidate founder section; remain private until asset and rights review |

The canonical and 33rd House fallback repositories **both** contain `CNAME` with `danielcruze.com`; this is a deployment-ownership ambiguity, not evidence both sites are serving the domain. The Elite README describes branch-based GitHub Pages on `main`, and its sitemap points to a Vercel preview address. Do not copy that sitemap or external preview link into production unchanged.

Manus's canonical repo PR #1, `fix/site-route-aliases-20261008`, is open and unmerged. The 33rd House site's PR #3 is open, draft, and unmerged. Review both; do not merge them merely because the branch is mergeable.

The domain was shown active/protected in Cloudflare dashboard screenshots on 2026-10-09. Earlier screenshots showed four GitHub Pages A records for `@`, a `www` CNAME for `mrcruzevip-code.github.io`, mail-service records corrected to DNS-only, and other Vercel-bound subdomains. The prior Vercel review also found an unrelated project with apex/www domain assignments. Current authoritative hosting and GitHub Pages custom-domain state still require fresh verification.

## 2. Product and audience architecture

The public homepage stays Daniel Cruze's personal authority gateway with the existing The Highest Rite experience, and consistent links to the user's distinct programs and brands. Unique material is incorporated without replacing the main site: founder/business philosophy from Elite, social directory only after accuracy and publication review, and books/offer descriptions reconciled against their canonical source.

Preserve the verified content model: **Gate 0 = Threshold outside the Realm matrix; Gates 1–12 = 12 Realms each; total = 13 Gates and 144 Realms**. Do not renumber existing Realms, create a new Gate 13, or publish claims of 156 Realms.

Suggested route ownership:
- **Existing canonical routes** remain served by the full site: `/`, `/about`, `/books`, `/journal`, `/decoding-cosmos`, `/soul-blueprint`, `/contact`, `/for-men`, `/for-women`, `/for-couples`, `/work-with-daniel`, `/the-33rd-house`.
- **Founder/business material** from Elite becomes an integrated section/page after review; no duplicate homepage or contradictory canonical tags.
- **Social directory** is an optional integrated page. Because the public legacy page includes links to adult services and other third-party platforms, explicitly review audience separation, privacy, accuracy and suitability before importing. Do not silently publish it.
- **Gates compatibility alias** `/gates/` may redirect to a verified `/decoding-cosmos` route; retain legacy inbound links with one canonical destination.
- **Storefront** stays an independently operated Shopify target (`shop.danielcruze.com`) only after DNS/domain/store ownership is verified. Do not activate unverified Stripe links.

## 3. Source-of-truth and migration strategy

**Preferred:** Recover and sanitize original editable Expo app source (the separately provided `the-highest-rite.zip` archive), store it under a clearly separated, documented source folder on a review branch, and rebuild an exact, reproducible static export for GitHub Pages. Never treat generated `_expo/static/js/` bundle edits as the authoritative source. Import *selected* Elite copy/graphics and *selected* 33rd House content at source level, preserving attribution and provenance.

**Not recommended:** Directly `git merge` unrelated repository histories, copy the Elite site's entire homepage over `index.html`, or blindly sync both repositories' `CNAME`/DNS settings. These would lose routes or create conflicting deployment ownership.

**Fallback if source cannot be recovered:** Preserve current exported static pages intact; create a staging-only route for unique content and record that the current build cannot be fully maintained at source level. Do not edit hashed client-side JS for untested production patches.

Keep a per-file migration crosswalk containing source URL/commit SHA, intended route, duplicate/nonduplicate status, rights/privacy decision, expected link updates, migration commit, and validation result. Mark every imported asset with its origin in the crosswalk—not publicly in site copy.

## 4. Domain and infrastructure boundaries

- One canonical GitHub Pages publisher for `danielcruze.com`; confirm GitHub Pages custom-domain settings and published branch before DNS changes.
- Verify DNS authority, HTTP/HTTPS for apex and www, Vercel project ownership/domain assignments, Cloudflare SSL mode/certificates, GitHub Pages HTTPS status and live origin routing.
- Preserve or export the complete DNS zone (MX, SPF, DKIM, DMARC, third-party verification, site subdomains) before any cutover.
- Avoid changing Cloudflare nameservers, proxy status, mail service, Vercel aliases or Shopify checkout without a tested preview and rollback plan. Cloudflare activation does **not** establish that the intended GitHub pages are currently deployed.
- Only after confirming the definitive published origin, remove or reassign competing custom-domain claims with minimal changes and observed rollback options.

## 5. User experience and trust boundaries

- Keep navigation usable by keyboard, touch and screen reader; mobile test narrow viewports and avoid missing route aliases.
- Fix known false enquiry confirmation: `mailto:` composer launch is **not** a successful server delivery. Use clear 'email app opened' or fallback states.
- Maintain internal links, social previews, favicons, valid sitemap and robots; remove old sitemap links to unrelated Vercel previews.
- Keep contact/customer data, API keys, private identity documents and payment secrets out of public client bundles, public commits and support evidence packs.
- No payments, bookings or downloads go live until linked merchant account, currency, GST, entitlement/fulfilment, refunds and legal terms are verified.

## 6. Work packages and review gates

**Gate A — inventory and design approval (this PR).**
Read each source, compare shared and unique pages/assets, produce a provenance crosswalk, list PR #1/#3 collisions and domain ownership. Owner approves the written design and content that will become public.

**Gate B — implementation plan approval.**
Create a task-by-task plan for Expo source recovery, test-first content fixes, selected content import, preview publishing, and DNS cutover; owner reviews before engineering changes.

**Gate C — implementation in review branch.**
Restore sanitized editable source; write failing regression tests for 13/144 content and contact error behavior; implement smallest fixes; export to staging; integrate only reviewed unique material. Re-run source test suite, typecheck/lint and export; then inspect static/hydration behavior and file diffs.

**Gate D — preview release acceptance.**
Verify desktop/mobile pages, asset accessibility, 404, redirects, links, metadata, security/privacy, and no unintended payment CTA. Record preview URL, commit SHA, screenshot and rollback baseline. Ensure no existing pages were silently displaced.

**Gate E — separate production approval.**
Confirm Cloudflare/GitHub Pages/Vercel ownership and SSL; back up DNS; then change only necessary site routing, monitor apex/www, and document rollback. Keep the two source repositories unmodified for historical fallback.

## 7. Explicit exclusions

This design **does not** merge or delete other repositories, deploy new code, change GitHub Pages settings, remove either `CNAME`, modify Cloudflare/Vercel/Shopify DNS, activate Stripe or other checkout links, or promote currently private Elite assets. It authorizes only review of the proposed consolidation approach.

## 8. References

- Canonical: https://github.com/mrcruzevip-code/danielcruze-site
- Open Manus PR: https://github.com/mrcruzevip-code/danielcruze-site/pull/1
- Static fallback: https://github.com/The33rdHouse/danielcruze-site
- Open fallback PR: https://github.com/The33rdHouse/danielcruze-site/pull/3
- Elite (private): https://github.com/The33rdHouse/daniel-cruze-elite
