# Two Distinct Websites — Daniel Cruze Consolidation and The 33rd House Separation

**Date:** 2026-10-10
**Status:** Revised design for owner review; no implementation, deployment, domain modification, or repository deletion.
**Owner clarification:** Migrate the usable Daniel Cruze material from the three supplied repositories into one site at `danielcruze.com`; then build **The 33rd House as a separately branded website on its own different domain**. Do not merge both brands into one website.

## 1. Outcomes and scope

### A — Daniel Cruze personal site: first priority

- **Domain:** `danielcruze.com`.
- **Canonical source:** `mrcruzevip-code/danielcruze-site`, public, default `main`.
- **Additional sources to review and selectively migrate:** `The33rdHouse/danielcruze-site` (static content, personal social/landing material) and `The33rdHouse/daniel-cruze-elite` (private founder-brand copy, design and graphics).
- **Goal:** One coherent personal brand experience for Daniel Cruze: founder/author identity, About, Work With Daniel, Books, Journal, relevant personal teachings, audience pages, personal social links, contact and authorised products/services.
- **Important:** Review every potential import for authorship, ownership, accuracy, audience fit, privacy and duplication. Reuse personal-brand content or assets, not entire second and third homepages. Keep source commit/blob provenance in a private migration crosswalk.
- **Preserve current routes** while enhancing the site. Do not silently remove `/the-33rd-house` before verifying existing inbound links; it may become a concise referral to the independent site instead of duplicating the curriculum.
- **Shop:** `shop.danielcruze.com` is an independently controlled storefront only once Shopify ownership, hostname, payments and fulfilment are verified. Do not activate unverified Stripe links.

### B — The 33rd House: second, independent project

- **Domain:** a **different domain** from `danielcruze.com`. Proposed existing brand domain: `the33rdhouse.com`, **pending the owner's confirmation**. Do not change the domain or assume that registration, DNS or hosting is already properly connected.
- **Source:** a separate The 33rd House repository/project to be selected and verified in a **separate design and implementation plan**, not a copy of Daniel Cruze's homepage. The supplied `The33rdHouse/danielcruze-site` must not be assumed to be the correct platform/curriculum source merely because of its organisation owner.
- **Goal:** Distinct The 33rd House brand, teachings, Gate 0 / Gates 1–12, 144 Realms, memberships, knowledge platform, independent navigation, policies, membership/checkout and deployment lifecycle.
- **Shared relationship:** A limited Daniel Cruze founder/about attribution and intentional cross-links between the two sites. No automatic mirroring, shared CNAME, shared production deployment or blending of product-entitlement responsibilities.

### Why this is not one combined website

We can ingest reusable intellectual property, writing, media, layout inspiration and brand assets from existing repositories while keeping two separate public destinations. **Repositories are source collections; they do not have to become the same public website.**

## 2. GitHub inventory already verified

| Repository | Visibility | Relevant material | Use |
| --- | --- | --- | --- |
| `mrcruzevip-code/danielcruze-site` | Public | Full Expo-generated personal website with About, Books, Journal, Decoding Cosmos, Soul Blueprint, For Men/Women/Couples, Contact, Work With Daniel and The 33rd House referral; `CNAME` | Destination for Daniel Cruze content |
| `The33rdHouse/danielcruze-site` | Public | Smaller landing, books, Gates, social directory, redirects, `CNAME`, Cloudflare notes | **Selective** Daniel-relevant migration; otherwise preserve as legacy |
| `The33rdHouse/daniel-cruze-elite` | Private | Founder & Builder page, CSS, JS, DC mark and artwork | Select founder-brand copy/design assets after private-to-public suitability review |

The two `danielcruze-site` repositories both currently contain `CNAME` values of `danielcruze.com`. This is a competing configuration requiring Pages/hosting review, not permission to delete either `CNAME` immediately. `The33rdHouse/daniel-cruze-elite` contains a sitemap pointed at an old Vercel preview, which must not be copied unchanged.

The open, unmerged GitHub PRs remain independent:
- `mrcruzevip-code/danielcruze-site` PR #1: Manus static-export Gate wording/route corrections.
- `The33rdHouse/danielcruze-site` PR #3: legacy site's mobile/navigation/Gate/domain documentation.

Do not bulk-merge those PRs across repositories or equate their static output with editable Expo source.

## 3. Content segregation rules

**Daniel Cruze publishes:** his personal authority and founder profile; authored books/articles/journal; appropriate personal programs and contact options; relevant personal content adopted from source repositories. References to The 33rd House may remain as links or founder attribution.

**The 33rd House publishes separately:** full curriculum and institutional doctrine, the Gate system, 144 Realms, teaching/member interfaces, House-specific commerce/policies and its own social/operational channels.

**Canonical Gate consistency across any reference:** Gate 0 is the Threshold outside the numbered Realm matrix; Gates 1–12 contain twelve numbered Realms each, total 144. Do not state 156 or invent a separately numbered Gate 13. Detailed Gate functionality belongs to the second project unless explicitly included in a Daniel Cruze-authored personal product.

**Do not migrate automatically:** organisation-only content, private audience/contact records, private files, exposed credentials, unverified third-party goods, client records, unlicensed assets, operational admin pages, or any live payment configuration.

## 4. Technical direction

### Daniel Cruze site

1. Recover/sanitise the original editable Expo source from the separately supplied `the-highest-rite.zip` and identify compatibility with the current GitHub-exported static site. Do not author permanent changes in hashed `_expo/static/js` bundles.
2. Make a source-to-destination crosswalk of unique personal copy, assets, links and pages across all three repositories. Mark duplicate and out-of-scope House-only items.
3. Review founder-brand presentation; incorporate selected Elite design/copy only after approval for public release.
4. Use failing regression tests before fixes: 13/144 displayed correctly wherever present, consistent post-hydration output, mobile navigation, no broken internal links, and no false `ENQUIRY RECEIVED` when a `mailto:` composer fails.
5. Export and validate a static preview for GitHub Pages; check domain, DNS and content collisions before any live cutover.

### The 33rd House site (separate follow-up)

1. Verify the authorised domain and canonical repository for the House independently.
2. Inventory its curriculum code, platform services, membership identity, IP assets, 13 Gate / 144 Realm model and entitlement policies.
3. Design a distinct UI, route map, knowledge/membership backend, preview environment, separate commerce entitlements and release workflow.
4. Link the finished House site to Daniel Cruze only where relevant.

The two sites may share generic UI components or a release process as versioned reusable libraries in future, but they must not share a conflicting origin, `CNAME`, cookie namespace, login entitlement or deployment without explicit design and validation.

## 5. Infrastructure and safety checks

Cloudflare onboarding was shown active/protected in screenshots on 2026-10-09; no guarantee follows that the correct GitHub Pages origin was deployed. Earlier Vercel records associated apex/www with a project deploying a different The 33rd House repository. Verify authoritative DNS, current HTTP/HTTPS, GitHub Pages custom domain, Cloudflare SSL, Vercel domain assignments and current registrar before changing routing.

Keep working MX, SPF, DKIM, DMARC, mail/autoconfig/autodiscover DNS-only and third-party TXT records intact. Back up the entire zone before any cutover. Confirm both `danielcruze.com` and `www.danielcruze.com`, and later the separate House domain, using real response checks.

GitHub Pages can host a static site but cannot run an Expo backend, protected membership logic or secure checkout itself. The House platform may need independent backend/hosting infrastructure; do not force it onto GitHub Pages solely to eliminate recurring charges.

Payments, Shopify, Vercel domain transfers and member access remain outside this design PR's immediate write scope.

## 6. Delivery stages

**A — Review this corrected architecture (current draft PR):** Confirm that the immediate migration destination is only `danielcruze.com`, drawing selected Daniel-related content from all three repositories, and that the House gets a different website/domain subsequently.

**B — Daniel Cruze implementation plan:** Produce precise source file mapping, selection decisions, tests, preview process, necessary redirects and DNS rollback, then seek owner review.

**C — Daniel Cruze implementation on isolated GitHub branch:** Restore source, preserve existing routes, incorporate approved assets, execute TDD, build, run tests and verify preview. No merge/deploy until accepted.

**D — Separate production cutover:** Verify origin, canonical/domain conflicts, SSL, email DNS and rollback; publish Daniel Cruze site without overwriting the House.

**E — Independent House design:** Choose the House domain (suggested `the33rdhouse.com`), repo, hosting/backend and commerce requirements, then produce its own reviewed spec and implementation plan.

## 7. Non-destructive control

Nothing in this spec authorises removing either source repository, publicising all contents of the Elite private repository, switching domains or nameservers, merging Manus PR #1 or legacy PR #3, activating payment products, or deploying the House site.

This PR contains documentation only. GitHub `main`, Cloudflare and live sites remain unchanged until their own release checks and approvals.

## 8. Sources

- https://github.com/mrcruzevip-code/danielcruze-site
- https://github.com/mrcruzevip-code/danielcruze-site/pull/1
- https://github.com/The33rdHouse/danielcruze-site
- https://github.com/The33rdHouse/danielcruze-site/pull/3
- https://github.com/The33rdHouse/daniel-cruze-elite
