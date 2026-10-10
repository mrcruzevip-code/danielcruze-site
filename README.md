# Daniel Cruze — The Highest Rite

The canonical GitHub Pages repository for the public web edition at **https://danielcruze.com**. The editable recovered Expo/React Native source is under `source/highest-rite/`. Root legacy HTML and bundles are retained for history but are **not** the output of the new deployment workflow.

## Build and validate

Node 22 and pnpm 9.12.0 are pinned by the workflow/source package. From the repository root:

```sh
cd source/highest-rite
pnpm install --frozen-lockfile
pnpm check
pnpm test:source
pnpm build:web
python3 scripts/check-export.py
pip install playwright==1.55.0
python3 -m playwright install chromium
python3 scripts/test-web.py
```

`build:web` pre-generates NativeWind CSS before Metro creates its file map, runs a real Expo static web export, and prepares canonical directory pages and redirect-only `.html` aliases. Export output is `source/highest-rite/dist`. The deployment artifact is that directory alone — never the entire repository.

## Deployment

`.github/workflows/expo-pages.yml` validates pull requests without publishing. A push to **main** triggers the validated production build and GitHub Pages deploy. Only main may deploy. This workflow adds no Cloudflare or Telegram credential, does not require a private API and does not activate payment links.

The custom domain is danielcruze.com and is recorded in the export's `CNAME`. Root-relative assets intentionally target this domain; an unconfigured `owner.github.io/repository/` subpath is not the supported production origin.

## Canonical public pages

Home, About, Books, public Journal, Social, Contact, Work With Daniel and the separate House referral page use canonical directory URLs. Six existing public essays have generated article permalinks. `/books.html`, `/the-books.html`, `/the-books/` and `/social.html` are redirect aliases, not duplicate homepage shells. Unknown routes use the branded HTTP 404 page. Legacy private-service, policy and member-related routes show a neutral noindex public-boundary page, not a new policy or activated offer.

The House referral preserves the guiding line: **Law and Lore walk hand in hand; Spirit runs through the middle.** Its separate HTTPS destination was not verified during repair and is not exposed as a broken public CTA. AIB Hub, House membership and Daniel author commerce are not combined.

## Security and release boundaries

Adult-only profile/destination links are absent from the public web edition. Original native source is retained, but no Android/iOS release is claimed. All held audio and book-file masters remain excluded. The public Journal is editorial source, not a private journal product. Existing symbolic essays are labelled as spiritual interpretation, not medical guidance.

The Telegram bot is linked only through its owner-specified public deep link. The deployed `BOT_TOKEN` is already a Cloudflare secret-text binding; this repository neither contains nor replaces it. A bot HTTP health response is not proof of authenticated webhook operation, member login or payment fulfilment.

Production deployment and DNS/HTTPS changes require the owner's review of the exact release payload. See `docs/app-first-repair-plan-2026-10-10.md` and `docs/recovery-and-launch-status-2026-10-10.md`. The source archive's original recovery-status documents are historical evidence and are superseded by those current reports.
