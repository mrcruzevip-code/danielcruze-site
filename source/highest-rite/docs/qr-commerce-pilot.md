# QR Commerce Pilot — review only

This pilot is stacked on the `finalize/danielcruze-release-2026-10-22` workstream.
It is not a separate website, release approval or payment activation.

## Entry points

| Code | Proposed canonical destination | Public action |
| --- | --- | --- |
| Gold | `https://danielcruze.com/qr/gold/` | Explore existing public book catalogue |
| Temple | `https://danielcruze.com/qr/temple/` | Learn about The 33rd House |

All URLs in `data/qr-commerce.json` are **proposed** and not yet published. The uploaded dotted QR images were not reliably decoded; do not print or distribute them as functional links.

## Build/verify

1. Install dependencies in `source/highest-rite` using the existing lockfile.
2. Run `node scripts/generate_product_qr.mjs --out /tmp/qr-review` to generate SVG and PNG QR assets without touching production.
3. Run `pnpm test:source`, `pnpm check`, `pnpm test`, and `pnpm build:web` (subject to inherited PR #15 release blockers).
4. Inspect static output for `qr/gold/index.html` and `qr/temple/index.html`. Check the mobile and desktop layouts.
5. Scan both QR images on at least two phones and in print at intended sizes; preserve quiet zones. Confirm HTTPS destinations, redirect behavior, and no sensitive-data leakage.
6. Check the origin domain's live TLS and that existing catalogue links are valid before public distribution.

The generated QR assets are deliberately **conventional high-contrast codes**. No external images, logos, or unverified image rights were introduced. Any visual emblem overlay requires source provenance and repeatable smartphone scan testing before use.

## Commerce and security gates

- Existing book checkout references are reused only indirectly through the existing `/books/` page. No new payment links, prices or subscriptions are created here.
- The Temple route contains **no** login, registration form, member-only media or payment CTA. The site's existing informational route remains independent.
- Before enabling membership: confirm merchant of record, product pricing, tax/refund policies, Stripe account, test-mode purchases, and digital delivery rights. Keep adult-only catalogue and data separate.
- Implement secure server-side Stripe webhook signature verification and idempotency, order/customer entitlements, and restricted media storage outside the public repository. Never grant entitlements on a return/success URL alone.
- GitHub Pages is static. Use a separately reviewed backend such as a Cloudflare Worker and private database/storage for payment verification and access control.
- For analytics, use first-party aggregate scan counts with a privacy notice. Do not store unnecessary device identifiers or send sensitive membership information to URL parameters.
- Retargetable QR destinations need a controlled, authenticated redirect endpoint and an audit log; not included in this safe first iteration.

## Release gates

- Original two QR image destinations decoded, ownership and image provenance established; or the newly generated codes formally approved as replacements.
- Screenshots, accessibility, mobile scan tests and build checks pass.
- Verified book order/fulfilment and any subscription webhooks pass test mode.
- Independent review and owner approval **before** any live Stripe updates, deployments, DNS changes, branch merges, or printing.

The branch is a draft implementation only. No change to The 33rd House canonical doctrine.
