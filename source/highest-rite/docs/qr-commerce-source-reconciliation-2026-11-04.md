# QR Commerce Pilot — Source Reconciliation Handoff
Snapshot date: 2026-11-04. Review only, not a release sign-off.

## Scope and authority
This evidence handoff supports draft [PR #22](https://github.com/mrcruzevip-code/danielcruze-site/pull/22), which is stacked on site release draft PR #15. It does not amend any canonical 12-Gate / 13-Gate material, ownership agreement, merchant setup, DNS configuration, or publishing status.

The 10 uploaded register files were inspected and cross-referenced:
- `CONSOLIDATED_CORPUS_INVENTORY.csv`
- `SCHEDULE_1_MASTER_v2_0.csv`
- `CONSOLIDATED_SCHEDULE_1_MASTER_GDRIVE.xlsx`
- `DEPOSIT_REGISTER_GDRIVE.xlsx`
- `analyze_visual_assets.csv`
- `comprehensive_image_tagging.csv`
- `enhanced_asset_inventory.csv`
- `toc_asset_crossmap.csv`
- `grand_codex_placement_map.csv`
- `connector_research (1).csv`

## Verified *register-level* reconciliation
| Test | Result | Caveat |
| --- | ---: | --- |
| Schedule 1 rows | 729 | 698 CONSOLIDATED, 18 DEPOSITED, 10 PENDING HASH, 3 PHASE 1 FIXED |
| Schedule 1 valid SHA-256 fields | 698 | 31 placeholder fields: **not** independently verified |
| Valid Schedule 1 SHA-256 fields matching corpus | 698/698 | Matching metadata is not physical-file custody verification |
| Consolidated corpus rows | 715 | 700 GOOGLE_DRIVE + 15 NOTION; all fields have syntactically valid SHA-256 |
| Legacy workbook rows | 18 each | Two workbooks agree on filename/hash/size/path for each row |
| Legacy hashes present in corpus | 18/18 | Historical filesystem paths may not be currently available |
| ToC visual crossmap rows | 106 | 52 unique references absent from enhanced asset inventory |
| Image tagging rows | 102 | 49 tagged filenames absent from enhanced asset inventory |
| Enhanced asset inventory rows | 104 | Metadata does not establish image availability or license |
| Grand Codex placement rows | 112 | Placement suggestions require editorial and IP review |
| Visual extraction errors | 1 | `1000031514.jpg` reported missing in historical analysis |

Do not infer that all corpus entries are distinct copyrighted works: the corpus register has repeated basenames and repeated digests. Do not auto-populate SHA placeholders from similarly named works without source-file identity and chain-of-custody evidence.

## Existing Google Drive anchor
The existing [MASTER 04 — Asset, IP & Commercial Register](https://docs.google.com/spreadsheets/d/1Ty15lN403bKicGjNxdPybfD8roYHYj4IHVqUCRuSk4M/edit) contains Asset Register, Source Registers, Commerce View and Stripe Live tabs. It was **read, not overwritten**.

A new native [QR Commerce release control summary](https://docs.google.com/spreadsheets/d/1c1wpetLXwBGzoijxS-Ng3ogDkJW929Wdq6_ymLudcCA/edit) has been created inside the [review folder](https://drive.google.com/drive/folders/1NK5I5d9inbXODT54nhMrtHy7ual5nsSG). The full nine-tab local workbook `QR_COMMERCE_PROVENANCE_MASTER_2026-11-04.xlsx` was generated and provided in the conversation; do not assume it has been imported into Google Sheets.

## Merchant discrepancy — P0
The Drive MASTER 04 Commerce View references Stripe account `acct_1TOmVcE3kxaa4wuu`. The previously connected The 33rd House Stripe account exposed `acct_1TNFOnBBKgxRjVRb` in live mode, with zero matching payment links returned at the time checked, and `acct_1TNFP3BPZ8qlzSKi` as a sandbox. These are **not the same account IDs**. Resolve whether they are different entities, migrated accounts or separate merchant environments before any payment linkage.

At least two screenshot QR codes pointed to different Stripe Checkout payment URLs than existing `content.ts` book entries. Same prices do not prove they are the same product or merchant. Do not silently replace existing buy URLs.

## QR source separation
- **Public product and landing candidates:** Gold Collection, Temple Introduction, The Felt Sense (A$33 observed), The Path of Transformation (A$34.95 observed), Bank-Ready Blueprint (49 observed; currency unverified).
- **Community:** The 33rd House Telegram requires official-account ownership confirmation; unrelated communities must stay separate.
- **Restricted / development:** Telegram folder invitation, Manus dashboard, Netlify preview.
- **Expired:** Android APK v1.0.4 and v1.0.10 signed download links. Their temporary bearer URLs were deliberately omitted from public materials.

QR candidate metadata lives in `data/qr-source-candidates.json`, marked unapproved. No QR code is a payment entitlement or authentication credential.

## Release gates
1. Resolve PR #15 build and site acceptance blocks first.
2. Run PR #22 checks: `pnpm check`, `pnpm test:source`, `pnpm test`, `pnpm build:web`; inspect generated `/qr/gold/` and `/qr/temple/` routes.
3. Verify public host TLS, browser accessibility and physical QR scans on two devices.
4. Verify original image availability, legal usage rights and editorial placement. Do not publish imagery based only on filenames.
5. Identify each payment product's merchant of record, catalog SKU, price, refunds, GST/tax position and delivery rights.
6. Before paid membership, implement signature-verified Stripe webhooks with idempotency, non-public media and server-side entitlements.
7. Final independent security/design review, then explicit owner approval for any merge, deployment, DNS change, Stripe activation or publishing.

## Current delivery state
**Audit pack and evidence index prepared. Production remains NO-GO.** No live website, payments, DNS, identities, credentials, or canonical content changed in this reconciliation.
