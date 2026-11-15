# Editing public page SEO — DanielCruze.com

This is the **first live-wired owner-editable register** on the consolidated review branch. It replaces page-specific SEO entries in `lib/page-seo.ts`. It is **not yet a complete content CMS**.

## How to edit
1. Open `source/highest-rite/content/page-seo.json` in GitHub and create a review branch (never edit production or a generated `dist/` file).
2. Change the exact route's `title`, `description`, optional `ogImage`, `ogImageAlt` or `robots`. Keep the existing route key; /the-books is a non-indexed alias.
3. Upload only already-approved public artwork to `source/highest-rite/public/images/`. For `ogImage`, specify a local `/images/<file>` path and meaningful alt text.
4. Open a pull request and require `pnpm test:source`, `pnpm check`, static build/export validation and visual review of the route's social/SEO preview before any owner-approved merge.
5. Confirm live pages/canonical domain separately after deployment. A passing CI run is not live verification.

## Current scope and restrictions
- Route titles, SEO descriptions, OG artwork, image alt text and robots directives are wired via `SiteMetadata`.
- Page body copy, on-screen H1s, books, image galleries, CTA URLs, Stripe links and audio are **not** managed by this JSON yet. They remain on the final release backlog; don't claim this first step solves them.
- Never paste keys, private URLs, adult/restricted records, unverified payment links or audio masters into a public-bundled JSON file.
- Keep private control-portal entitlement and licence workflows in a separately authenticated product; this public SEO file must not activate checkout or reveal restricted assets.
