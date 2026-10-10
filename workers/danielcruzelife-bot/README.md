# `@danielcruzelife_bot`

This is the version-controlled source for **The Highest Rite / Daniel Cruze** Telegram bot. It mirrors the public Daniel Cruze site and uses the existing Highest Rite app mark as its welcome image.

## Current live bot experience

- Uses the existing **Highest Rite app mark** hosted on `danielcruze.com` as its welcome card.
- Uses The Highest Rite visual language: deep black, burgundy and ivory with Daniel Cruze as the founder voice.
- Provides `/books`, `/blueprint`, `/enquire`, `/journal`, and `/site`.
- Sends people to the live Daniel Cruze pages and the verified AIB HUB PTY LTD book / Soul Blueprint checkout links.

## Easy owner edits

Open `worker.js` and edit only:

- `BRAND` — public brand mark, website routes and signature.
- `CHECKOUT` — a verified replacement Stripe link.
- The text inside each command handler.

Do **not** add any token or key to Git. `BOT_TOKEN` stays as the existing Cloudflare Worker secret.

## Deploy from `main`

```bash
npx wrangler deploy --keep-vars
```

`--keep-vars` retains the existing Cloudflare Worker secret binding. Verify `/start`, `/books`, `/blueprint`, `/enquire`, `/journal`, and `/site` in Telegram after deployment.

## Stripe webhook status

The bot currently opens the verified Stripe checkout links. It does **not** yet claim or send a paid delivery after Stripe checkout. That requires a second, authenticated integration: a Stripe webhook secret, an exact selected AIB HUB PTY LTD seller account, and a durable mapping between a Telegram chat and a Stripe Checkout Session. Those must be added before making any purchase-triggered Telegram promise.
