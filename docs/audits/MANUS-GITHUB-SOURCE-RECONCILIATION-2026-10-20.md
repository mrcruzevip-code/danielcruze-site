# MANUS → GITHUB | SOURCE RECONCILIATION AUDIT 001
Date: 2026-10-20
Status: PARTIAL — evidence-only transfer; no Manus account export
Protocol: CONNECT → DISCOVER → INVENTORY → CLASSIFY → ANALYSE → DEDUPLICATE → CANONICAL → DEPENDENCIES → REPORT → STOP

## Connector and evidence boundaries
- The Manus connector research request failed with HTTP 429 "credit limit exceeded". No Manus audit task was created.
- The available Manus interface does not expose a historical task/project index or private source export.
- All findings below are based on GitHub repository source files accessible to the linked GitHub account. These files are **claims of their authors**, not operational verification.
- No Manus private database, audio master, payment record, user data, secret, or authentication configuration was transferred.

## Confirmed GitHub references

### A. The33rdHouse/sacred-library
- Source: https://github.com/The33rdHouse/sacred-library
- Evidence: TODO.md, DEPLOYMENT.md on main (read 2026-10-20)
- Manus-specific provenance: DEPLOYMENT.md describes "Manus webdev platform", Manus OAuth, Manus-injected environment variables, and an S3/media infrastructure; operational status unverified.
- TODO.md marks 33 books, 23 audio teachings, 37 images, tier-based member portal, assessments and forums as completed. Do NOT present these numbers as independently verified assets without checking actual records and file delivery.
- DEPLOYMENT.md describes Stripe, Resend, MySQL/TiDB, Manus OAuth and purported Cloudflare R2/S3 uploads. Environment variable **names** were inspected, never values. Credentials and live services NOT verified.
- Classification: LORE / Sacred Library application and commerce/member dependencies.
- Migration: compare code, routes, schema, actual media manifest, entitlement model and exportability; hold private/member data and audio until explicit authorization, ownership and protected target verified.

### B. The33rdHouse/the33rdhouse-website
- Source: https://github.com/The33rdHouse/the33rdhouse-website
- Evidence: SITE_RESEARCH.md, DESIGN_REFERENCE.md on main (read 2026-10-20).
- SITE_RESEARCH.md records earlier snapshots of 33rdhouse.com, the33rdhouse.com, the33rdhouse.org, ancientwisdom.manus.space and deityatlas-kzhctuvq.manus.space. These status claims are HISTORICAL, not today's verified availability.
- DESIGN_REFERENCE.md identifies candidate gate covers, sacred-geometry symbols, era imagery, mandala and starfield. Verify exact files/license/provenance before reuse.
- Classification: TEMPLE design/reference candidate.
- CRITICAL CONTENT ISSUE: SITE_RESEARCH.md states "Compiled for: The Trustee for the Trust Jesus 33", inconsistent with the user's stated Cruze Estate Trust / The 33rd House Pty Ltd structure. Treat as disputed historical copy; never reuse as verified legal ownership.
- Related discrepancy: historical documents variously use 12 Gates/144 Realms versus intended Gate 0 + 12 Gates/144 Realms. Owner architecture wins as editorial brief pending source-level reconciliation.

### C. mrcruzevip-code/australian-network-publisher-62e14627
- Source: https://github.com/mrcruzevip-code/australian-network-publisher-62e14627
- Evidence: shared/pipeline.ts, shared/const.ts and mobile/lib/trpc.ts have Manus references in code search.
- Classification: OPERATIONS / publishing. No migration into the personal website without dependency review.

### D. Destination
- https://github.com/mrcruzevip-code/danielcruze-site
- Working branch: owner/danielcruze-site-editor
- Branch comparison to main at audit time: 7 commits ahead, 6 changed files.
- Stage only owner-approved PERSONAL FRONT DOOR source and references here. Temple/Lore code needs separately classified canonical destination; do not place full protected library or mixed-membership backend in the public Expo Pages export.

## Release and transfer gates
1. Export/download Manus-owned projects and assets by a verified authorized mechanism, or establish exact GitHub copies by comparing commits, file hashes and API schema.
2. Inventory every route, media item, document, source tree, dataset, service endpoint, webhook, domain and configuration without recording secret values.
3. Identify ownership/entity and LAW/LORE/TEMPLE location of each asset.
4. Reconcile duplicates by SHA-256 and semantic function; preserve audit trail, retire redundant code only after validated migration and backup.
5. Refactor platform-specific dependencies (Manus OAuth/S3/DB/Stripe/Resend) only after viable replacement and test plan.
6. Test protected content access, Stripe test fulfilment, responsive pages, SEO and backups before an approved release.
7. Provide exact diff, preview, and approval request. NEVER push to main, deploy, touch DNS or enable payments automatically.

## Status
Source evidence mapped to GitHub: YES.
Manus export or source transfer: NO — connector blocked and direct export unsupported.
Production modifications: NONE.
Next step: obtain verifiable Manus project exports or authenticated source access; continue source-level GitHub-to-GitHub comparison in parallel as a separately authorized source set.
