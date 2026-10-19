# Daniel Cruze — Preserve and Build Review Gate (2026-10-19)

Status: REVIEW ONLY. This document does not approve deployment, DNS changes, payment activation, publication, or removal of historical assets.

## Canonical source and immutable release boundary
- Repository: mrcruzevip-code/danielcruze-site
- Default production branch: main (unchanged by this review).
- Editable application: source/highest-rite/
- Web export: source/highest-rite/dist (build output, not source of truth).
- CI workflow: .github/workflows/expo-pages.yml.
- Custom domain: danielcruze.com, with www variant.

## Preserve
1. Retain the Expo/React Native application and root legacy HTML as historical evidence until dependencies are mapped.
2. Preserve books, journal, author, contact, social, and work-with-Daniel pages. Do not invent retailer URLs, payment links, offers, ISBNs, book launch status or credentials.
3. Keep Daniel Cruze editorial content separate from The 33rd House and AIB Hub commercial operations.
4. Preserve original source recordings, book masters, artwork and provenance; do not publish or substitute an unverified audio master.
5. Keep DNS, Cloudflare Workers, GitHub Pages, Vercel domains and SSL unchanged during review.

## Build and validation sequence
1. Check the latest GitHub Pages workflow run, branch protection, Pages source, and deployed SHA. Do not infer success from the workflow YAML alone.
2. Run from source/highest-rite: pnpm install --frozen-lockfile; pnpm check; pnpm test:source; pnpm build:web; python3 scripts/check-export.py; python3 scripts/test-web.py (after required dependencies).
3. Inspect rendered mobile/desktop pages, CTA contrast, images, navigation, accessibility and link destinations.
4. Check live apex and www response status, redirect chains, TLS certificate, cache behaviour and GitHub Pages custom-domain status.
5. Compare the active Vercel project the-daniel-cruze-experience against the GitHub Pages release. The verified Vercel domain attachment does not establish live serving. Do not remove it before rollback evidence.
6. Review the exact proposed diff and evidence with the owner before merging or deploying.

## Acceptance criteria
- No files removed and no production change.
- CI/build/tests pass and evidence is retained.
- Home, About, Books, Journal, Social and Contact are readable on mobile and desktop.
- Only verified links, offers and assets appear publicly.
- Both domain variants resolve predictably to one approved production host.
- Production merge and DNS changes require separate explicit approval.

## Open items
- GitHub Pages configuration and latest successful deployment SHA are not yet verified.
- Actual public domain responses and TLS have not yet been verified in this review.
- Vercel custom-domain attachment still requires reconciliation.
- The Path Is a Spiral original audio and approved compass cover are unverified.
