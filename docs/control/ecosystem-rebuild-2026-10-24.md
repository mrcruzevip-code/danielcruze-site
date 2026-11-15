# Ecosystem rebuild control note — 24 October 2026

Status: review-branch implementation; **not** a production release, legal attestation or security certification.

## Rebuild authority
1. **Public entry:** danielcruze.com, canonical implementation `mrcruzevip-code/danielcruze-site/source/highest-rite/`, release PR #15. Retain the existing Expo/React Native web build and current GitHub Pages validation.
2. **Framework:** The 33rd House (Gate 0 plus Gates 1–12; 144 Realms) and its Living Codex / Sacred Library / Deity Atlas. Do not import restricted source documents into the public web export.
3. **Operations:** AIB Hub and enterprise services remain logically separate from the author website.
4. **Private systems:** Master Control Portal, evidence/control registers, customer licence/entitlement workflows, payment webhook processing and administrator tools require independent authentication, ownership verification and security review.
5. **Entity/legal questions:** Existing documents concerning The Cruze Estate Trust, The 33rd House Pty Ltd and AIB HUB PTY LTD are evidence to reconcile, not authority for this branch to make fresh licensing or regulatory claims.

## Source reconciliation
The owner's 193-page DANIEL CRUZE ECOSYSTEM DOCUMENT COMPENDIUM is a branded presentation copy of prior Markdown documents. Its July 2026 ecosystem inventory and platform health/compliance claims are historical assertions, not current runtime tests. In particular, the asset register repeats a total of 81 while its numbered inventory runs through item 84; audit the original source and current platform inventory before using either number.

The compendium's Legal Framework Portal pilot proposes Shopify purchase -> webhook -> signed access token -> licensed download after login. **Do not implement or activate this flow on the unrestricted Daniel Cruze site.** Secure webhook verification, replay protection, persistent entitlements, access revocation and legal review precede any pilot.

## Delivery priority (P0 -> P3)
- **P0**: Finish existing site release PR #15; accurate public pages, owner-editable SEO/metadata, tested navigation, accessible responsive design, approved public links. Preserve production main.
- **P1**: Centralise verified owner-editable page body, media, covers, CTA, held payment/audio references with typed ID validation. Require explicit approval before activating sales or protected downloads.
- **P2**: Reconcile Gate canon, knowledge hierarchy, and repository/file provenance; choose canonical implementations based on tests and source evidence. Plan archive candidates, but do not delete/merge branches or repositories without a verified replacement.
- **P3**: Build private command-centre and Legal Framework Portal pilot behind access controls, with signed webhook ingress and end-to-end fulfilment tests.

## Current change
Migrated the existing 17 route SEO records verbatim into `source/highest-rite/content/page-seo.json` and wired the app metadata loader to that single source. Added a regression test covering route keys, required metadata, local artwork and indexing boundaries. Release integration remains subject to GitHub Actions and owner review.

## Release gates
New source test; typecheck; existing source/Vitest tests; web export; static HTML/SEO check; Playwright links/keyboard/responsiveness at 320/390/768/1440/2560; independently checked external URLs and live HTTPS; clear rollback commit and release approval. No silent checkout, DNS, production merge, token rotation, bot change, archival or restricted-content publication.
