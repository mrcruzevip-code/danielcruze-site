# Vercel recovery inventory — 12 October 2026

**Status: PARTIAL RECOVERY. Do not delete projects, repositories, domains, or environment variables.**

This recovery branch was created to stage copies from connected Vercel accounts without modifying existing production branches or Vercel deployments. This is a preservation branch, NOT a deployable replacement for the live sites.

## Findings

- Audited **17 projects** in the Vercel teams `the-33rd-house-wisdom` (12) and `aibhubofficial` (5). Third known team `daniels-ecosytem` returned zero projects.
- 10 project configurations show GitHub source links; several reference the same repo.
- 7 projects have no confirmed GitHub source; 3 of those have deployed artifacts.
- Of the 10 source-linked projects, 5 link to accessible GitHub repositories and 5 link to repositories that were not accessible using the connected GitHub account.
- The custom domain `danielcruze.com` and `www.danielcruze.com` are verified on Vercel project `the-daniel-cruze-experience`. Its last inspected READY production deployment is `dpl_ErBWA8q6DHjkoPJkiUZXtzMXw9jV`, commit `7668d76114421142d8e3755d30408a5e139710a4`. The declared GitHub repository `The33rdHouse/the33rdhouse-living-codex` was not accessible.
- The `33` Vercel deployment `dpl_kJS63hpQuMbZVFhrxL4vdfpeebqj` exposed a **partial** file listing with 145 file entries (139 WebP) and 23 truncated nodes; its full asset tree is not confirmed. Large file contents are truncated by the connector and **were not copied**.
- The `daniel-cruze` deployment `dpl_6cBYRGK4sFC8GsRBwsmSKih49YP8` exposes static HTML/CSS/JS/SVG source. Smaller complete files copied under `vercel-recovery/aibhubofficial/daniel-cruze/`. Its `index.html`, `404.html` and CSS exceeded connector output limits and are NOT copied.
- The `daniel-cruze-site` deployment `dpl_GGsa4RzHoFMmLnhiLS4fyHF7TPDZ` has an index-only preview file, copied here.
- There are five environment-variable entries on `the-daniel-cruze-experience`, including Shopify connection variables and `EDGE_CONFIG`; **no values or credentials were copied**. Other project environments were not all inspectable.

## Copied and verified in this private recovery branch

- `aibhubofficial/daniel-cruze/assets/app.js`
- `aibhubofficial/daniel-cruze/assets/mark.svg`
- `aibhubofficial/daniel-cruze/assets/social-card.svg`
- `aibhubofficial/daniel-cruze/robots.txt`
- `aibhubofficial/daniel-cruze/sitemap.xml`
- `aibhubofficial/daniel-cruze-site/index.html`

## Missing before leaving Vercel

1. Recover inaccessible GitHub source repositories or transfer/reconnect source-access permissions.
2. Export complete deployed output for unlinked applications (including the `33` WebP assets and large HTML/CSS files) through the account owner's authorized local Vercel CLI/API access.
3. Inventory and export external data stores / Edge Config / Blob / database content separately. A Git repository is not a database backup.
4. Securely recreate environment secrets directly at the new provider; NEVER commit decrypted values to GitHub.
5. Choose and test replacement hosting for static content and any SSR/API components, payments, webhooks, routing and DNS.
6. Confirm both the apex domain and www load correctly and Stripe/Shopify callback URLs before cutover.
7. Only after verified backup + replacement deployment and rollback plan should Vercel services be decommissioned.

## Full project index

See `project-inventory.json`. Statuses are observations, not a complete forensic export.
