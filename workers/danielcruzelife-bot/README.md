# `@danielcruzelife_bot`

This is the version-controlled source for the live Daniel Cruze / The Highest Rite Telegram bot.

## What it does

- Sends the existing **33rd House crest** as a branded welcome card.
- Keeps the existing `/oath`, `/buy`, `/order`, and `/founder` flows.
- Adds public, easy-to-edit commands:
  - `/books` — verified live book checkout links.
  - `/blueprint` — the live Soul Blueprint booking link.
  - `/site` — Daniel Cruze website and private enquiry route.
- Holds all brand copy, image URLs, website links, book links and legacy links in the `BRAND` and `LINKS` blocks at the top of `worker.js`.

## Safe edit rule

Edit **only** the values in `BRAND`, `LINKS`, labels, and copy unless a technical change is intended. Do not add `BOT_TOKEN` to any file. The token remains the existing Cloudflare `BOT_TOKEN` secret binding.

## Deploy

From this folder, after reviewing changes:

```bash
npx wrangler deploy --keep-vars
```

`--keep-vars` is required so the existing Worker secret binding is retained. After deployment, send `/start`, `/books`, `/blueprint`, and `/site` to the bot and verify the buttons open only the intended public destinations.

## Stripe boundary

The bot provides the verified public checkout links. It does **not** yet receive or fulfil Stripe webhooks. Do not claim a Telegram delivery or entitlement after payment until a signed Stripe webhook plus buyer identity mapping is separately implemented.
