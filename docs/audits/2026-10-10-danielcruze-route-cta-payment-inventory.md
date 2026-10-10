# Daniel Cruze — Source-Derived Route / CTA / Payment Inventory

**Snapshot:** 2026-10-10.
**Status:** **PRELIMINARY**; THIS IS NOT A LIVE CRAWL OR A PASSING TEST REPORT.
**Canonical site:** `mrcruzevip-code/danielcruze-site` on `main` at reviewed commit `6a3e280eefd65171fed8ce9ab220595a19d1e80c`.
**Related code:** `The33rdHouse/the33rdhouse-living-codex` on `main` at `e7958925ae3def5dace0337c63b9e2c356d4a2cb` for *candidate* Stripe links; this repository currently mixes Daniel pages and House content and is not the selected Daniel production source.

## Baseline

There are **16 named root static pages** in canonical source. The exported site also includes `books/index.html`, `the-books/index.html`, `(tabs)/index.html`, bracket-pattern `article/[id].html` and `service/[id].html`, and a simple `404.html`. A bracket-pattern export is not proof arbitrary article/service IDs are routable. All HTML titles checked in the static export read "Daniel Cruze — Sacred Masculinity"; route-specific titles and description/canonical behavior must be tested and corrected as needed.

## Static page routing register

| Intended URL | Exported HTML | Kind | Current audit result |
| --- | --- | --- | --- |
| `/` | `index.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/about` | `about.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/books` | `books.html` | CATALOG | File exists; all interaction/live behavior UNVERIFIED |
| `/journal` | `journal.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/contact` | `contact.html` | FORM | File exists; all interaction/live behavior UNVERIFIED |
| `/work-with-daniel` | `work-with-daniel.html` | SERVICE | File exists; all interaction/live behavior UNVERIFIED |
| `/soul-blueprint` | `soul-blueprint.html` | SERVICE | File exists; all interaction/live behavior UNVERIFIED |
| `/decoding-cosmos` | `decoding-cosmos.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/for-men` | `for-men.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/for-women` | `for-women.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/for-couples` | `for-couples.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/sacred-masculinity` | `sacred-masculinity.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/beyond-duality` | `beyond-duality.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/policies` | `policies.html` | CONTENT | File exists; all interaction/live behavior UNVERIFIED |
| `/the-33rd-house` | `the-33rd-house.html` | REFERRAL | File exists; all interaction/live behavior UNVERIFIED |
| `/the-books` | `the-books.html` | CATALOG | File exists; all interaction/live behavior UNVERIFIED |

**Aliases and dynamic content:** `/books/` and `/the-books/` are duplicated exports; decide the canonical books route then issue verified redirects. `/article/:id`, `/service/:id` require real data/page 200 and unknown-ID 404 tests. All pages need an explicit static/JS hydration, image, accessibility, SEO and form/CTA test.

## Navigation/CTA contract — to be verified with real browser

| Surface | Target / effect | Acceptance evidence needed | State |
| --- | --- | --- | --- |
| Main navigation (Home, About, Books, Journal, Services, Contact) | Appropriate canonical route | Click every visible nav item via mouse, touchscreen, keyboard; verify URL/page/H1 | NOT TESTED |
| Books cards / download links | Verified product or sample details; correct purchase/referral URL | Link status, amount and fulfilment; no public paid PDF | NOT TESTED |
| `/work-with-daniel` | Contact/booking route | Valid destination and no fabricated booking confirmation | NOT TESTED |
| `/soul-blueprint` | Approved service checkout or enquiry | Correct price, merchant account, policy, confirmation | NOT TESTED |
| `/for-men`, `/for-women`, `/for-couples` | Valid service/contact path | All audience-specific CTAs tested | NOT TESTED |
| `/journal` | Working article routes | Each visible card loads expected article; invalid IDs 404 | NOT TESTED |
| `/decoding-cosmos` | Daniel-authored education or referral | Correct 13/144 claim where applicable; House full curriculum not duplicated | NOT TESTED |
| `/the-33rd-house` | `https://the33rdhouse.com` | Distinct-domain referral, checked destination, no content crossover | NOT TESTED |
| `/contact` | Real `POST /api/contact` | Invalid/valid/spam submission, delivery-provider acknowledgement, user-visible fail/retry, no mailto-success claim | NOT IMPLEMENTED/NOT TESTED |
| Footer privacy/terms/refunds | Real /policies sections | Exact navigation and legal terms verified | NOT TESTED |
| Website Telegram CTA | `https://t.me/danielcruzelife_bot` or Telegram OIDC | Bot contact opens; website OIDC separately verified | NOT IMPLEMENTED/NOT TESTED |
| Member login | `/members/login` | OIDC state/nonce/PKCE/JWKS + cookie tests; owner ID not equal mere member login | NOT IMPLEMENTED |
| Member dashboard | `/members` | Server authorization, forbidden/expired session denial and logout | NOT IMPLEMENTED |
| Telegram Mini App | Bot opens HTTPS portal, validates signed initData server-side | Forged, expired, replayed data rejected | NOT IMPLEMENTED |
| Bot owner control | Bot command → reviewed preview → owner approval → audited publish | Nonowner privilege denial and rollback proven | NOT IMPLEMENTED |
| Hosted payment CTA | Verified merchant Stripe/Shopify destination | Live/test mode, legal entity, exact AUD/US$+GST, webhook, receipt, fulfilment, refund | NOT VERIFIED |

**Accessibility note:** Static Expo HTML largely embeds interactive navigation into hydrated React/React Native Web elements; the observed source contains few native `a href` anchors and no native `button` HTML elements. This is not evidence there are no visible buttons; it is a reason to insist on browser-interaction and keyboard testing.

## Candidate payment catalogue (source inventory ONLY)

Another connected private repo contains **25** `STORE_PRODUCTS` with distinct hosted Stripe URLs and published price strings: Services 2, Programs 1, Books 11, Digital 6, Intelligence 3, Memberships 2. Currency display **mixes AUD and USD**. Every product currently carries source code's `LIVE_LAUNCH_STATE = "live_active"`, which is an unverified claim, not proof the related merchant checkout or fulfilment functions.

**Protective rule:** The URL strings are not duplicated into this public-repository audit; they remain in source file `The33rdHouse/the33rdhouse-living-codex/client/src/pages/storeCatalog.ts`. No inference is made that the connected Stripe account owns those links. Owner must choose correct merchant and product scope before integrating anything into `danielcruze.com`.

| # | Product title (private-source reference) | Category | Advertised price | Billing | Verification |
|---|---|---|---|---|---|
| 01 | Soul Blueprint | Services | A$333.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 02 | Dragon Path Foundations | Programs | A$111.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 03 | 12 Sacred Principles for Living With Meaning | Books | A$33.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 04 | Gate 1: Sensory Awakening — The Five Gateways | Books | A$33.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 05 | The Grand Codex of the Heart | Books | A$97.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 06 | The 33rd House Monthly Initiation Deck - Complete Annual Edition | Digital | A$67.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 07 | The 33rd House Monthly Initiation Deck - Deluxe Preview Edition | Digital | A$33.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 08 | The 33rd House Universal Device Curriculum - Canva Master Edition | Digital | US$333.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 09 | The 33rd House Reference Compendium - Volume I | Books | US$555.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 10 | Sovereign Intelligence Dashboard Access - AI Infrastructure Control Board | Intelligence | US$99.00 / month | subscription | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 11 | Sovereign Intelligence Dashboard Access - AI Infrastructure Control Board | Intelligence | US$333.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 12 | Digital Ecosystem Strategy Session - Premium | Services | US$333.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 13 | Sovereign Intelligence Reports - Monthly AI Infrastructure Brief | Intelligence | US$99.00 / month | subscription | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 14 | AI Workspace OS - Master Build Pack | Digital | US$144.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 15 | Sacred Kings Order - Telegram Bot Deployment Kit | Digital | US$144.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 16 | Operations Dashboard Starter | Digital | US$97.00 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 17 | Codex Adept | Memberships | US$14.99 / month | subscription | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 18 | The Dragon Journal Archetypal Mapping Report | Books | A$34.95 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 19 | The Complete 360° Zodiac Codex | Books | A$34.95 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 20 | Life-to-Archetype Mapping Analysis | Books | A$34.95 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 21 | Comprehensive Birth Chart Analysis: The Archetypal Blueprint of a Visionary Architect | Books | A$34.95 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 22 | Birth Chart Synthesis: Core Patterns and Archetypal Framework | Books | A$34.95 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 23 | Advanced Numerical & Symbolic Translations | Books | A$34.95 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 24 | The Path of Transformation | Books | A$34.95 | one-time | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |
| 25 | The Temple | Memberships | A$33.00 / month | subscription | External link recorded; merchant/mode/fulfilment **UNVERIFIED** |

## Backend, bot and domain snapshot

| Component | Observed state | Risk / prerequisite |
| --- | --- | --- |
| Cloudflare zone `danielcruze.com` | Active; GitHub Pages A records and www CNAME proxied | Cannot verify correct live origin: apex Shopify auth redirect / www 502 reported |
| `daniel-cruze-launch` Worker | Deployed, **no apex/www routes** | Do not mistake upload for active production |
| `danielcruzelife-bot` Worker | Route `bot.danielcruze.com/*`, deployed source | P0 code contains token-pattern literal and settings list NO encrypted Worker bindings; rotate secret BEFORE extending |
| GitHub Pages | Canonical repo public; CNAME root | Pages deployment settings/custom-domain certificate not verified via connector |
| Login/member DB | No site-specific D1 binding found on bot Worker; account has two unrelated/unclassified D1 databases | New schema and ownership approval required |
| Contact provider | Static export contains contact inputs, but no verified server delivery | Build trusted API + confirmation |
| Stripe | One connected account has both test/live contexts, not confirmed merchant for exported URLs | Do not redirect visitors to unverified payment links |

## Repeatable acceptance suite required BEFORE 'complete' status

1. Enumerate actual visible DOM anchors, buttons, tappable elements and form submit controls on every exported page and every routed React page after hydration.
2. Record each element's human-facing label, CSS locator, source route, expected navigation/action, exact URL or HTTP method, response status, screenshot on desktop/mobile, and supported payment mode (if relevant).
3. Fail the test suite on missing handler, empty/nonfunctional href, inaccessible keyboard action, JavaScript exception, inconsistent URL, invalid 404/redirect, broken media asset, missing title/canonical, false success message, or outbound link lacking verified destination.
4. Test contact delivery with valid and invalid data, user consent, abuse/rate controls and retry; only provider acknowledgement may trigger “sent.”
5. Test Telegram OIDC login and Mini App inside actual Telegram clients; verify deny-by-default for fabricated/expired tokens and nonowner admin commands.
6. Test hosted checkout against the **correct confirmed Stripe account**, signatures and idempotent event handling, refunds/cancellation and protected downloads. Live payment tests require separate owner approval.
7. Produce a **checked-off full link inventory** with test commands, failures, captured URLs and immutable release SHA; none of this page/CTA matrix is yet proof of passing end-to-end checks.

## Review gates

P0 bot token rotation; source recovery; merchant choice; isolated Worker/D1 prototype; browser inventory; QA; reversible Cloudflare routing; owner go-live approval. Remain on the review branch, do not change GitHub `main`, Cloudflare DNS or live payments during this documentation phase.
