# Daniel Cruze — app-first GitHub repair

## Selected source and scope

The owner supplied `highest-rite-recovered-responsive-source-2026-10-10.zip`. This supersedes the temporary standalone-HTML fallback prepared earlier in this session. The selected implementation restores the editable Expo/React Native source under `source/highest-rite/` in `mrcruzevip-code/danielcruze-site`; `The33rdHouse/danielcruze-site` remains a historical reference, not a simultaneous production source.

The release is the public **web edition of the recovered app** at danielcruze.com. The original native identifiers and source are retained. This does not claim an Android or iOS release build. A member portal, private journal, Telegram login, R2 protected audio/books and payment entitlements require separate backend and owner decisions; they are not implemented or enabled by this repair. Existing audio release/commerce HOLD remains in force.

## Concrete repairs

The standalone web route frame was overridden with a default width and height of zero and updated only through parent-frame messages. Root layout will use the browser's reactive window dimensions for the web frame. Dynamic article/service routes receive static parameter lists. The books route gets an actual `/books` source file and predictable legacy aliases. `/social` is a real app route with a `/social.html` legacy entry. Existing imagery is hosted locally with the build; full owner frames are displayed without cropping. Contact actions open email drafts and do not claim server receipt.

The public web edition uses responsive React Native components and the recovered black/gold editorial identity, with clothed author imagery and verified book covers. Public pages avoid adult destinations, legacy adult-profile links and checkout activation. Native originals remain available in source; platform-specific web entries implement the required public-vs-18+ boundary. The 33rd House gets a clearly separate referral page, not a copied curriculum or mixed membership system. Its guiding line is “Law and Lore walk hand in hand; Spirit runs through the middle.” AIB Hub is not presented as a Daniel product.

## Project structure

`source/highest-rite/app/` contains recovered Expo routes and public `.web.tsx` companions. `components/` contains reusable responsive public layout and native components. `lib/content.ts` retains source provenance; a separate public-content module defines only reviewed public references. `public/images/` holds existing owner web assets. `assets/images/` restores the original icon references needed by export; no native distribution claim is made. Scripts build the public static output and add GitHub Pages aliases/metadata. Root GitHub Actions validates and uploads only the export directory, never repository docs, server source, held media or secret files.

## Design

Use the original Highest Rite black/gold editorial vocabulary: understated gold wordmark, serif-feel titles, warm readable secondary copy and full-frame owner portraits. Phone pages stack naturally; wider screens use paired text/image flow, capped readable line lengths and flexible book cards. Controls have visible labels and adequate touch targets, not invisible hamburger-only navigation. No CSS overlay on a compiled Expo bundle is the source of truth. No unreviewed asset generation or new likeness is needed.

## Release boundary

Prepare and test the feature branch and temporary preview, then show the exact pages and GitHub commit before asking for production merge and any DNS/HTTPS correction. Do not mutate main, DNS, Worker code/token, membership permissions or payments beforehand. Current evidence supersedes stale audit warnings: the deployed bot has a `BOT_TOKEN` secret-text binding and the source has no Telegram token literal. Telegram command operation and account security are not established by a health response alone.
