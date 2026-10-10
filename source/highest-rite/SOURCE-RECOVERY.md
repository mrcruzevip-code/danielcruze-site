# THE HIGHEST RITE — recovered, patched editable source

**Source:** original uploaded `the-highest-rite.zip`, 2026-10-10. SHA-256: `9b30228b051b4339b13438a40d4a160b1a449cee89ab8910c0bbfc2e4288a091`.

**Changes in this patch:** dynamic screen dimensions on home/drawer; all meaning-bearing route images use full-image `contain`; images have a reusable responsive renderer and geometry helper; section layouts are fluid; contact mailto does not claim an enquiry was delivered.

**Tests run:** `node --experimental-strip-types --test tests/*.test.mjs` — 14/14 PASS.

**Build status:** NO full Expo install/typecheck/build/browser run in this environment (dependencies unavailable offline); do not deploy as production.

**Excluded for safety:** all audio-pack WAV/ZIP files (release HOLD), ebook PDF/Typst assets until authorization, social assets, original icon binary assets, original large draft content, `.expo` generated cache. Source asset references in `app.config.ts` require the original `assets/images` directory before a full Expo app build; the user already holds the original unmodified archive. Server/Manus OAuth is included for provenance but is **not** approved as secure production authentication; replace before public member/checkout release.

**GitHub:** stage this source under `source/highest-rite/` or as a clean dedicated Expo source repository in a separate draft PR, leaving static GitHub Pages live export untouched.

**Sources of truth:** public blog `app/journal.tsx` is separate from a future private signed-in journal; no private records are included. The House curriculum/platform remains outside this site.
