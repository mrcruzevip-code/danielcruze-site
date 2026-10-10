# Highest Rite recovery and launch status — 10 October 2026

The owner-supplied editable source has now been restored under `source/highest-rite/`, dependencies installed from the supplied lockfile, and the Expo web export built successfully. The original archive is untouched. The temporary standalone-HTML branch is superseded and not proposed for deployment.

The web implementation is an Expo web edition, not a replacement of the original native application. Web-platform route companions enforce the existing public/18+ separation while keeping native route source and identifiers intact. Local owner portrait and cover files replace fragile external image dependencies. Audio masters, book PDFs and EPUBs are not imported or published.

The old public deployment's Books alias files were copies of the homepage. The new pipeline exports genuine page HTML, then converts routes to directory pages with redirect-only `.html` aliases. Real source routes exist for Books and Social. Static article parameter generation creates readable public permalinks rather than `[id]` placeholders.

The native root previously used an overriding 0×0 frame on standalone web until a parent iframe sent metrics. That path is fixed. A dedicated standalone web root also removes forced hidden-homepage stack rendering and unused server/auth providers. It does not depend on a Manus parent frame or server session.

Native Android/iOS builds, device permissions, microphone, push, offline storage and launcher icon compliance have not been tested. Do not describe this source recovery as an APK/App Store release. The original owner logo is reused for web/build compatibility; platform launcher review is still required for native distribution.

Membership, private journal, secure book/audio delivery, Telegram authentication, entitlements and checkout are not activated. The current bot token is already a secret-text binding. No bot token value is retrieved or committed; no token replacement, webhook setup or message is performed by this repair. The Telegram deep link is not evidence of member authentication or fulfilment.

Production remains unchanged until the owner approves the tested preview and exact GitHub/Cloudflare deployment payload. After approval, CI must successfully build and deploy the same commit; the live site must then be verified separately from the preview.
