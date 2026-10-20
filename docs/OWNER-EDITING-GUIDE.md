# Daniel Cruze — Owner editing guide

**Working branch:** `owner/danielcruze-site-editor`. Production is `main`; do not merge without preview and approval.

## Edit SEO on each page
Open `source/highest-rite/lib/site-registry.ts` in GitHub and choose Edit. In `PAGE_CONTENT` set the route's `title`, `description`, `keywords`, `image`, `imageAlt`, and optionally `robots`. Save the commit to the working branch. The web metadata component reads this registry on the next build. New route keys can be added without modifying the SEO component. Articles and service detail routes currently retain their specific content-generated titles and descriptions.

## Add covers and images
Upload optimized public image files to `source/highest-rite/public/images/` on the working branch. Then reference their `/images/filename.webp` URL in the appropriate content item. The `MEDIA` registry is an inventory; it does **not** yet drive every rendered image. Individual rendered components must be wired to the registry for comprehensive alt-text editing. Current React Native Image components use accessibilityLabel for accessible descriptions, not HTML alt.

## Audio
Do not commit paid audiobook masters or private audio files to a public website repo. Upload only approved public previews to an appropriate media host; catalogue safe public media in `MEDIA`. A playable audio component and protected storage/entitlement system have **not yet** been implemented.

## Stripe
`PAYMENTS` provides a typed register with `enabled` and `verified` fields. This is **not a live Stripe integration**. Never put Stripe secret keys in GitHub or public content. Add a verified Stripe-hosted Payment Link only after confirming the merchant account, product, currency, tax, delivery and refund path. Checkout buttons require their own controlled rendering implementation; adding a record alone does not publish a checkout.

## Release procedure
1. Make changes on your owner branch only.
2. Review the diff, run `pnpm check`, `pnpm test:source`, `pnpm build:web`, and the source's export/browser checks.
3. Inspect a preview including mobile views and metadata.
4. Approve the exact release commit before a pull request is merged to `main`. A push to `main` triggers the production Pages workflow.

**Long-term goal:** A visual, authenticated CMS with asset upload, per-page SEO, media library, Stripe link verification, preview and role-based publishing. The current delivery is its code-based content registry, not yet that CMS.
