# The Gentleman’s Lion

The selected black, gold and ivory lion wears a burgundy ascot. Website animation and static fallbacks come from the approved generated lion artwork, not a replacement portrait of Daniel.

The public guide is at `source/highest-rite/public/guide/`. Edit `knowledge.mjs` to change its curated public answers and source links. The widget answers navigation questions using that index; it is not general-purpose AI. No API keys or paid model calls are needed. Conversation exists only in the current tab’s DOM, with a 40-message display limit; reloading clears it. No analytics, local storage or forwarding is added.

The export script includes the widget once outside Expo hydration on every non-redirect HTML page, including Video Studio. It persists through Expo client navigation. Native mobile screens are unchanged. Shadow DOM scopes styling, ordinary DOM text nodes prevent HTML execution, and reduced-motion users get a static image. The dialog is nonmodal so visitors can keep using the page. Escape returns focus to the launcher.

“Continue in Telegram” opens `https://t.me/danielcruzelife_bot?start=website_guide`. This is an explicit handoff to a separate conversation. The bot can use the same bounded public answer resolver for ordinary private-chat messages; existing command checkouts and webhook authentication are retained. No webhook replacement or token rotation is required by this change.

Website release: the repository’s normal validated GitHub Pages workflow builds `source/highest-rite/dist` from main. Bot release: Wrangler bundles `workers/danielcruzelife-bot/worker.js`, retaining its existing `BOT_TOKEN` secret. A working HTTP health response alone does not prove Telegram webhook delivery.

Checks: source tests; bot tests with intercepted outbound calls; TypeScript; Expo export; export integrity; browser checks of typed questions, safe rendering, source links, Telegram URL, keyboard focus, mobile bounds, static reduced-motion fallback and animation at widths 320/390/768/1440.
