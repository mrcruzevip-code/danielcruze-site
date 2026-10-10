# Daniel Cruze Website + Telegram Members Portal — Architecture Design

**Date:** 2026-10-10
**Stage:** Superpowers architectural design FOR OWNER REVIEW. No site deployment, member activation or commerce activation.
**Priority:** Finish `danielcruze.com` first, separate from the future `the33rdhouse.com` House website.
**Canonical source:** `mrcruzevip-code/danielcruze-site`, branch `main`.
**Bot:** `@danielcruzelife_bot` — visitor contact, Telegram login entry and owner-restricted website controls.

## User intent and success criteria

1. Complete the Daniel Cruze personal website with all published pages, menus, buttons, anchors, downloads, outbound links, forms, mobile interactions, and legal/SEO pages working.
2. Inventory and verify EVERY payment gateway CTA against the intended account, amount, currency, GST/tax, payment state and fulfilment; no fake payment success.
3. Add a real members portal at `/members`; website visitors authenticate using Telegram through the named bot, and the bot can open the portal within Telegram.
4. Give only verified owner accounts limited website administration through the bot, with preview, explicit confirmation, immutable action audit and rollback.
5. Preserve the current live origin and DNS until isolated builds pass acceptance. Keep all House-specific curriculum and membership infrastructure on `the33rdhouse.com`, linked by referral only.

## Verified baseline (connected GitHub + Cloudflare, 2026-10-10)

- Cloudflare zone `danielcruze.com` status **active**, Cloudflare nameservers huxley and paislee. Apex: four **proxied** GitHub Pages A records; `www`: **proxied** CNAME to `mrcruzevip-code.github.io`. Mail, MX, SPF, DMARC and existing TXT records preserved; email-service CNAMEs DNS-only. Existing Vercel-alias subdomains `app`, `api`, `dashboard`, `docs`, `portal` must not be assumed verified.
- Live web requests could not confirm healthy origin: apex surfaced a Shopify authentication redirect, and www surfaced HTTP 502. The main issue needs direct browser/HTTP tracing, not guessing.
- Cloudflare zone Worker routes contain ONLY `bot.danielcruze.com/*` to `danielcruzelife-bot`. `daniel-cruze-launch` is uploaded as a Worker but has no apex/www route. Deploying a Worker alone does NOT establish that it serves the domain.
- The canonical repo contains 16 named root HTML pages, duplicate books aliases, `article/[id].html`, `service/[id].html`, static assets and a `CNAME`. It contains a generated Expo Web export rather than clearly recoverable editable source. GitHub's large bundled JavaScript could not be retrieved through the available file reader (metadata returned, content empty). Navigation is hydration-dependent and individual button handlers are **not yet verified**.
- Another repo `The33rdHouse/the33rdhouse-living-codex` contains Daniel personal pages and hosted Stripe links inside House code: `client/src/App.tsx` routes personal home at `/`, House home at `/living-codex`. Do not deploy that whole repo as Daniel's site and blend both brands; migrate only specifically approved Daniel material.
- Stripe connector lists one account label `CHRISTOPHER VALURI` in test and live contexts. This does not prove public Payment Links belong to that account or establish which other merchant accounts are authoritative.
- P0: Existing `danielcruzelife-bot` Cloudflare Worker **contains a hard-coded Telegram-token-pattern string in deployed code**; no secret/environment bindings shown, no evidence of website OIDC login. Stop before giving it member sessions or site-wide actions. The user must revoke/rotate the token via @BotFather and configure the replacement only as an encrypted Worker secret, never through chats/commits/issues.

## Architecture alternatives and choice

**A — RECOMMENDED:** Maintain a GitHub Pages/Cloudflare static PUBLIC frontend (after recovering editable Expo source or replacing it with a source-controlled rebuild) plus a dedicated Cloudflare Workers/D1 backend for `/members`, `/auth/*`, `/api/*` and the existing bot Worker. Keep the website on `danielcruze.com` so secure HttpOnly host-scoped cookies can serve the portal. Benefits: low hosting overhead, clear backend/permission boundary; risk: must carefully test Workers route precedence and backups.

**B — Full-stack Vercel/Cloudflare:** Unified Node app and route backend. Easier to implement if Vercel canonical repo mapping is corrected, but higher platform and billing/deployment conflict risk.

**C — GitHub Pages-only with a Telegram contact link:** Insufficient. A static site cannot securely validate OIDC, gate member downloads, receive trusted Stripe webhooks or administer a bot.

**Proposed selection:** A. New API/portal Workers must remain **staging-only** until security and payment gates pass.

## Route contracts

Public routes: `/`, `/about`, `/books` + `/the-books` alias, `/journal`, `/contact`, `/work-with-daniel`, `/soul-blueprint`, `/decoding-cosmos`, `/for-men`, `/for-women`, `/for-couples`, `/sacred-masculinity`, `/beyond-duality`, `/policies`. `/the-33rd-house` becomes a checked external referral to `https://the33rdhouse.com`; preserve inbound links. Dynamic `/article/:id` and `/service/:id` require real page lookup, accessible titles and 404 tests, rather than trusting literal bracket-name files. Record route-specific anchors, button labels, expected destination and observed result in the separate inventory document.

Backend routes (no public static fallbacks):
- `GET /members`, `GET /members/login` → public login or private member dashboard depending on server session.
- `GET /auth/telegram/callback` → Telegram OIDC Authorization Code + PKCE token exchange, signature/JWKS verification, strict issuer/audience/expiry/nonce/state verification, then short-lived server session.
- `POST /api/telegram/miniapp/session` → validate RAW Telegram WebApp `initData` server-side (HMAC or Telegram signed public-key method); deny stale/forged/unsigned data and `initDataUnsafe`.
- `GET /api/members/me`, `POST /auth/logout` → identity details limited to signed-in member, session revocation.
- `POST /api/contact` → anti-spam, CSRF/origin control, actual delivery provider result; never display sent-success for `mailto:` alone.
- `POST /api/stripe/webhook` → raw-body signature check, correct merchant account, idempotent event record and server-side entitlement/fulfilment/refund transitions.
- `GET /api/health` → nonsecret read-only health.
- `bot.danielcruze.com/*` → Telegram webhook receiver, protected by secret-token header, narrow path, request throttling and independent deployment.

Site HTML/JS never contains Telegram bot secret, Stripe secret, contact-provider credentials, private member content, admin numeric ID allowlist or raw payment receipt PII.

## Telegram behavior

Public bot: `/start`, `/portal`, `/login`, `/help`, `/support`; portal links open the authenticated website or Mini App. Website “Log in with Telegram” uses Telegram’s approved web OAuth/OIDC integration, configured in @BotFather using allowed HTTPS origins/redirects, with server-side PKCE/JWT verification (see https://core.telegram.org/bots/telegram-login).

Owner-only bot: `/site_status`, `/draft`, `/review`, `/approve`, `/publish`, `/members_summary`. Immutable numeric Telegram sender ID must match a separately verified owner allowlist; mutable usernames, chat group membership, a login link and possession of a member session grant NO admin privilege. Commands requiring state changes generate preview, require explicit owner confirmation, log requester/action/commit SHA/result and have defined rollback. Site publishing is blocked if tests, rollout protection or secret checks fail.

Do not give the bot arbitrary Workers/DNS/Stripe commands, execute user text as code, or accept webhook events without origin validation. Use a separate `TELEGRAM_BOT_TOKEN` secret and `TELEGRAM_WEBHOOK_SECRET` secret, add test-only values in non-production environments, then rotate any other discovered copies. The current Worker must be replaced/hardened AFTER BotFather rotation; it has not been secured by this design.

## Member data and payment safety

Cloudflare D1 scoped to Daniel membership only; schema for `members`, `telegram_identities`, `sessions`, `purchases`, `entitlements`, `stripe_events`, `bot_admin_allowlist`, `bot_action_audit`, `contact_submissions`, `migrations`. Never merge House-member identities automatically. Unique Telegram user ID + internal UUID; server-generated opaque sessions, hash stored server side; `Secure; HttpOnly; SameSite=Lax` cookie with CSRF and session expiry/revocation; rate-limit sensitive endpoints. Stripe event payloads validated with webhook signing secret, correct account and event-ID uniqueness; client-side success redirect is NOT an entitlement grant. Restrict PDFs to authenticated delivery signed URLs, never plain public repositories for paid-only files.

Existing hosted payment links: inventory first; do not assume the connected Stripe account owns them. Verify legal contracting entity, AUD/GST display, price ID/link mode, refund policy, server webhook, test/full refund/cancellation and fulfilment BEFORE offering a buy CTA. Services are enquiry only until actual booking provider/appointment availability verified.

## Acceptance and phased implementation

1. **Contain the bot credential (P0)**. Owner revokes/rotates via @BotFather and configures a new Cloudflare secret. Do not ask owner to paste token into chat.
2. **Recover editable site source** (historical Expo source archive/other repositories); identify source-vs-export hash, restore original visual components, migrate ONLY Daniel-relevant reviewed Elite and 33rd House static personal pages; preserve originals.
3. **Build a page/CTA/link inventory and automated browser suite**. For every route/anchor/button: target, method, HTTP result, responsive behavior, keyboard, image, 404, canonical and referral. Fail if a visible CTA is inert or unknown. Fix false contact success, routing and assets. Add tests first, then code.
4. **Implement auth/backend in staging**. Telegram OIDC and Mini App data verification with forgery/replay/cross-member tests; Worker + D1 migrations; secure sessions; owner-only bot command authorization and audit; deploy only to isolated test host.
5. **Implement signed commerce and actual contact delivery**. Correct merchant account, test and live links explicitly differentiated; signature verification, refunds, failures and idempotent access gating. Observe results rather than treating any setup document as proof.
6. **Staging soak and independent release QA**. Build/typecheck/test/Playwright, page/link census, accessibility/SEO, contact end-to-end, Telegram login from web and Mini App, nonowner privilege denial, payment account/mode checks, error states, rate limits, backup/restore.
7. **Production only with separate owner release approval**. Back up Cloudflare zone/Workers routes, verify GitHub Pages and both www/apex HTTPS, isolate unrelated Vercel/Shopify ownership, route auth/API/portal precisely, do reversible cutover and monitor. Preserve working MX/SPF/DKIM/DMARC and existing House site.
8. **Second domain later:** The 33rd House build and monetisation are independent; no production changes to `the33rdhouse.com` in this project.

## Outstanding verification and approval

- Owner reviews and approves Option A and bot permission split before production code implementation.
- Owner confirms which Stripe business account is allowed to collect Daniel Cruze payments (the connector's single connected account may be insufficient).
- BotFather rotation and allowed-login-URL registration require owner/administrator interaction; we cannot do those from GitHub or Cloudflare alone.
- The full dynamic click/action map requires successfully loading and hydrating a preview in a browser; the GitHub connector did not return the large generated JavaScript source. **Do not claim all buttons and payment links are working before browser and real/test-provider evidence exists.**

**Excluded:** No code merge, website deployment, DNS rewrite, webhook registration, token disclosure, Stripe charge, member-data migration or Telegram administrative power change is made by this documentation PR.
