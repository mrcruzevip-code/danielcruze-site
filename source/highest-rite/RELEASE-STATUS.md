# Release and verification status — 2026-10-10

The original Expo source is recovered and locally patched. Node's focused responsive/contact tests are green (14/14). A complete Expo build and device screenshots have **not** run: the pinned Expo/React dependencies are not available offline in this environment. The public GitHub Pages site's content remains a prebuilt static export and requires real browser/hydration testing after the review merge; no live merge or DNS cutover has been approved.

The historical Telegram bot token was reportedly rotated, but encrypted-secret deployment and removal of hard-coded credentials remain UNVERIFIED. The old Cloudflare enquiry-list endpoint has an embedded bearer token and must not be reused. Live payments and member login remain NOT IMPLEMENTED. The original 5 WAV files and 15 enhanced Drive MP3s are on distribution HOLD; none of the WAV, MP3 or private manuscript content is included here.

Next: integrate the source on a reviewed GitHub branch, install pinned dependencies, run Expo web export and Playwright 320–2560px screenshots on real devices, then implement API and Telegram auth in isolated staging. Never publish a public payment button or protected content before merchant and entitlement validation.

CTA audit: 83 source references (35 navigation, 15 outbound/email, 33 visible labels). None independently click-tested.
