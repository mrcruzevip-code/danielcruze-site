# The Highest Rite — App-First Consolidation and Universal Responsive Images

**Design date:** 2026-10-10.
**Approval stage:** App-first structure was approved conversationally by the owner on 2026-10-10; this written specification is for separate review before implementation planning.
**Authority:** This spec supersedes the web-only architectural assumption of `2026-10-10-danielcruze-website-telegram-members-design.md`. Its prior security audit and route inventory remain useful.
**Public domain:** `danielcruze.com`; **separate institution:** `the33rdhouse.com`. Do not co-deploy their websites or member systems.
**Review PR:** #3 in `mrcruzevip-code/danielcruze-site`, with documentation changes only.

## 1. Product objective

Recover The Highest Rite as a real Expo/React Native app, not a single-page marketing site. Deliver a public personal website for Daniel Cruze and a secure companion members app at `/app`, sharing an authorized content catalogue and an Expo Android code path. Features: Daniel founder profile; services; verified public editorial blog; private member journal; spoken-word/audio player; digital book reader and library; authenticated member portal; verified payment entitlements; consent-based contact; and a hardened `@danielcruzelife_bot` as member access and owner-restricted site control.

The owner requires **all site images to adapt fluidly to every screen type and device**, including previously problematic portrait/hero photos. No forced cropping of faces/cover content, distorted aspect ratios, cramped mobile images, broken buttons or horizontal overflow. This is a **hard release gate**.

## 2. Source evidence and use decisions

| Source | Verified relevant data | Use |
|---|---|---|
| Library `Comprehensive_Analysis___The_Highest_Rite__APK_&_T.md` | Technical analysis of The Highest Rite Android APK v1.0.0: Expo Router/Hermes, personal services/books routes, microphone and playback permissions | Historical app routes; not a verified editable source checkout |
| Google Drive `highest_rite_build_notes.md` | Eleven core screens and a separately labeled feature wishlist, older `app.danielcruze.com` target | Keep core-screen provenance; do not assume wishlist implemented |
| GitHub `mrcruzevip-code/danielcruze-site` | Multi-page Expo Web *export* with images, public journal/article previews, duplicate routes | Canonical destination and route inventory; source recovery necessary |
| Cloudflare `danielcruze-com` Worker | Historic Highest Rite styling, homepage and static books/digital/services, KV enquiries; unsafe hard-coded enquiry admin credential | Recover selected visuals and editorial content; never reuse insecure runtime |
| GitHub private `The33rdHouse/daniel-cruze-elite` | Black/ivory/gold founder experience, DC mark, CSS and copy | Selective visual/content import only after private-to-public clearance |
| GitHub `The33rdHouse/333` | Journal UI saves to localStorage; blog contains literal placeholder article bodies | UX reference only; no private data or fabricated published posts |
| GitHub `The33rdHouse/the-33rd-house-production` | Signed-in tRPC journal methods `journal.create` and `journal.list` | Secure data-scoping idea only; production matrix lock remains untouched |
| Drive `The Highest Rite — Flagship E-book` | Ten-page completed PDF, editable manuscript, Typst production source | Rights-reviewed responsive reader source |
| Drive `daniel-cruze-audio-hub/audio` | Fifteen enhanced MP3 assets: D01–D12 and three DW1/DW2 spoken recordings | Metadata inventory only; September 2026 owner release/commerce **HOLD** |
| Selected Drive folder `https://drive.google.com/drive/folders/1gwCx5lm_u8SZvxg3i2Pt9DTU3n-MkfPq` | Exact owner-selected folder in DANIEL CRUZE account; one PPTX, `Copy of The Ultimate Spiritual Guide Integrating Ancient Wisdom for Modern Mastery.pptx`, about ancient wisdom traditions | Optional editorial reference; NOT app source or image gallery; do not publish automatically |

Original Expo editable source remains unconfirmed. Recover it before rebuilding; if unavailable, reconstruct maintainable source from verified app requirements, exports and screenshots with provenance. Public GitHub MUST NOT store credentials, journal entries, held audio or paid-only PDFs.

## 3. Selected architecture

**Universal Expo Router source** for Web and Android + **Cloudflare Workers + D1** for authenticated services, **private R2** for cleared paid media, GitHub for code/public editorial data and release audit. Keep `mrcruzevip-code/danielcruze-site` as the source-controlled destination until recovered code can be assessed. Deploy a static public web export only after proof of working routing. Gate `/auth/*`, `/api/*`, `/members/*`, and `/app/*` behind appropriate Workers/session checks, rather than trusting public GitHub Pages files.

Proposed source layout on an isolated implementation branch:
- `apps/highest-rite/app/`: public and private Expo Router screens
- `apps/highest-rite/components/ResponsiveMedia.tsx`: one reusable ratio-preserving image renderer
- `apps/highest-rite/components/AudioPlayer.tsx` and `BookReader.tsx`: accessible player/readers
- `apps/highest-rite/theme/`: fluid sizing, device safe-area, interaction design tokens
- `packages/content/`: approved Daniel-authored public articles/books/audio metadata (never private writing)
- `workers/daniel-api/` and `workers/daniel-api/migrations/`: Telegram OIDC/Mini App auth, sessions, private journal, secure media, contacts, signed Stripe webhooks, audit
- `tests/`: page/button/link crawler, privacy/auth negative tests, device-image screenshot comparisons and checkout delivery tests

Alternative rejected: legacy single-html Cloudflare Worker (unsafe enquiry endpoint, broken subroute routing). Also rejected: web-only landing site without editable Expo app or secure members service.

## 4. User journeys and routes

**Public at `danielcruze.com`:** Home/Highest Rite, About, Work With Daniel, For Men, For Women, For Couples, Soul Blueprint, Sacred Masculinity, Decoding Cosmos, Beyond Duality, `/journal` (public authored blog), `/journal/:slug` (complete article), `/books`, `/books/:slug`, `/audio` (only explicitly approved release items), Contact, Policies, and `/the-33rd-house` (external referral). Preserve existing legacy `/the-books`, `/article/:id`, `/service/:id` URLs via verified redirects or valid 404s; never serve the homepage with a 200 response for unknown pages.

**Members under `/app`:** dashboard, `/app/journal` private journal with server-scoped create/edit/search/tags/delete/export, `/app/library` with verified purchases, `/app/read/:id` PDF/reflow reader/bookmarks, `/app/listen/:id` approved audio player/transcripts/progress, `/app/account` identity/receipts/logout. `/members/login` via server-verified Telegram identity. Native Expo app uses the same content identifiers, not the legacy Manus login.

Keep **public Blog/Journal** separated from **members' private Journal**: founder's Drive `journal entries` document must not be automatically copied to public GitHub or member records. No placeholder blog articles represented as genuine published writing.

## 5. Mandatory image-auto-adjust design contract

**Default rule: show the ENTIRE image, maintain original proportions, and fit within the available screen.**

- **Content photographs, portraits, original artworks, book covers, logos, diagrams and audio art:** use natural `width:100%; max-width:100%; height:auto` for inline content. If displayed inside a bounded viewport use `object-fit: contain`; React Native/Expo equivalent `resizeMode='contain'` or the platform Image/Expo Image component's content-fit `contain`. The viewport must not crop the subject, cover edges or embedded title.
- **Hero images:** define a fluid max-width plus viewport-conscious max-height using `svh`/safe-area-aware constraints, preserve the complete photo and maintain a visually prominent frame. On very different aspect ratios choose graceful letterboxing/soft nonessential backdrop and responsive layout—not a cropped face, distorted photograph or a tiny image stranded at the bottom of the page. Do not cover navigation or primary call-to-action buttons.
- **Decorative background textures only:** `cover` permitted if cropping cannot remove meaningful subject matter, and after owner sign-off. Never treat portraits, diagrams, book-cover lettering or brand marks as decorative.
- **Responsive assets:** retain originals, generate licensed optimized image derivatives only, use `srcset`/`sizes`/`<picture>` for web or DPI-appropriate Expo asset resolution. Preserve intrinsic dimensions or ratio to avoid cumulative layout shift, lazy-load below fold and prioritize visible hero. No low-resolution upscaling into blurred hero; no unnecessary 5 MB downloads for a mobile thumbnail.
- **Layout:** use flexible grid and `minmax(0, 1fr)`, `min-width:0`, clamp-based typography/padding, natural text wrapping, safe-area inset awareness, consistent margins and no fixed viewport width. Full-image modals, carousels, nested audio-card art and authenticated image screens obey the same rules. Fallback/error states reserve appropriate frame dimensions.
- **Controls & accessibility:** image frames never overlap clickable buttons, navigation or captions; interactive controls have high contrast, clear hover/focus and reasonable 44 px/dp targets. Use appropriate alt text, transcript/captions for meaningful media, reduced-motion support and responsive orientation changes.

**Test matrix:** screenshot visual regression and browser DOM checks on viewport sizes `320×568`, `360×640`, `375×667`, `390×844`, `430×932`, `540×720`, `768×1024`, `820×1180`, `1024×768`, `1280×720`, `1440×900`, `1920×1080`, `2560×1440`; also portrait/landscape, retina/high DPR, 200% browser zoom, dynamic large fonts, keyboard, slow network and image load failures. Cover Chrome/Android, Safari/iPhone/iPad, desktop Firefox and Expo Android on representative real/simulated devices as available.

For each displayed asset verify naturalWidth/naturalHeight nonzero, no distorted ratio, no clipping of meaningful pixels under full-content mode, within visible viewport or intended scroll frame, no horizontal overflow, no inaccessible hidden CTA, valid alt or decoration marking, acceptable visual size, and usable fallback. Screen capture review is mandatory for face and text visibility. A failing screenshot or automated overflow/ratio test blocks release. Broad responsive behavior is the goal; a matrix cannot prove every future physical device.

## 6. Audio, books and paid access

Audio folder has **15** enhanced audio MP3s (twelve book clips, three reflective recordings). Existing September status is **HOLD** for publishing and commerce. Create internal catalogue records only; DO NOT upload to public storage, issue public share links, enable playback on a public site or create Stripe products before separately approved release. Preserve masters, derivatives and source attribution. Metadata requires accurate title, transcript, cover, rights and duration.

The Highest Rite flagship book is a 10-page PDF with editable/production sources. Classify as free sample or paid before making it publicly downloadable. Responsive reader must fit book pages to viewport and support zoom, readable content where possible, keyboard and screen reader access, and paid-member signed-download authorization when applicable.

Blog publication only from verified actual manuscripts; old House blog sample content with `Full article content here...` is **not publishable**. Record draft/review/published status, slug, byline, metadata, provenance, canonical and RSS/sitemap support.

## 7. Telegram, contact, checkout and privacy gates

- User confirms BotFather old token revoked and new token issued. New `TELEGRAM_BOT_TOKEN` encrypted Cloudflare Worker secret and deployed script use remain **unverified**. No new admin powers before confirming binding, replacement code and webhook secret-header verification.
- Member login: Telegram OIDC code+PKCE, state/nonce, JWT signature/JWKS and expiry checks or Mini App server-validated `initData`; backend session `HttpOnly; Secure; SameSite=Lax`; explicit logout/revocation, CSRF, rate-limits, immutable numeric Telegram ID mapping. Member status is NEVER owner-admin authorization.
- Only allowlisted owner identity controls `/site_status`, `/draft`, `/review`, `/approve`, `/publish` with audited preview and explicit confirmation; no arbitrary remote execution/Cloudflare/DNS/payment commands.
- Old `danielcruze-com` Worker `/enquiries` endpoint has fixed source bearer string; protect or retire it before using this worker for any real member data. Contact success must follow actual durable provider acceptance, not `mailto:` opening or best-effort asynchronous attempted delivery.
- Verify each button, form, link, booking and payment gateway by intended action, actual working destination, correct merchant and currency, GST/consumer terms, signed webhook/event dedupe, receipts, entitlement and refund/cancel behavior. No live charges or payment product creation from spec approval alone.
- Preserve data minimization, explicit permission and private journal confidentiality; never bring House private or locked production database into Daniel member store.

## 8. Delivery workstreams (each testable, separate implementation plan/review)

**A. Source recovery + image-correct public shell:** source/commit crosswalk; public routes; responsive component and device screenshot suite; clean editorial structure. Can ship a verified public preview without auth/payments.

**B. Auth + journal + Telegram:** Cloudflare Worker/D1 identity, immutable member records, private journal CRUD/export/deletion, owner-only bot command audit; proof against cross-member access and forgery.

**C. Editorial/content:** real articles, authored public blog, rights-reviewed book catalogue and search; no placeholders.

**D. Media and reading:** protected audio/ebook catalog, players, transcripts, readers, responsive thumbnails, test data; maintain HOLD for public audio release.

**E. Commerce + contact:** signed payments/fulfilment and verified contact only after account/terms/provider approvals.

**F. Production + native:** origin verification, GitHub Pages/Shopify/Vercel/Cloudflare conflict repair, backup/rollback, HTTPS, apex/www, email DNS preservation, tested Expo Android build and separate distribution approval.

**Production release gates:** owner reviews written design; approves implementation plan; engineers execute isolated tests/preview; owner accepts deployment separately. No GitHub `main` merge, public release, DNS rewrite, credential reveal, Stripe changes or audio distribution is authorized by this documentation PR.

## 9. Readiness questions and exact status

Original editable Expo source = NOT RECOVERED; real browser CTA/image suite = NOT EXECUTED; bot secret deployment = UNVERIFIED; original worker enquiry endpoint = UNSAFE AS-IS; Stripe merchant and payments = UNVERIFIED; private journal backend = NOT IMPLEMENTED; audio/public commerce = HOLD. **Do not describe this specification as a working application.**

**Next gate:** Owner reviews this written specification in GitHub PR #3. Only after that written-spec approval invoke Superpowers `writing-plans` for precise implementation tasks and independently reviewed workstreams.
