# Gentleman’s Lion implementation plan

Goal: Complete the selected branded guide-and-chat experience and Telegram handoff.
Architecture: A browser-local, curated conversational guide mounted once outside Expo hydration. Same public answer resolver is reusable by the existing Telegram Worker. No model credentials, browser persistence, or forwarding of chat history. This is a bounded public guide, not general-purpose AI.

- [ ] Test public topic matching, unknown questions, hostile input and command parsing.
- [ ] Implement public resolver and accessible responsive widget using approved lion pixels.
- [ ] Add widget to exported pages, including static studio, without changing native screens.
- [ ] Add ordinary private-chat replies to bot; preserve webhook authentication and all commands.
- [ ] Run source tests, type checks, export checks and mobile/keyboard browser checks.
- [ ] Commit a reviewable branch and verify release status before publishing.

Constraints: no private handoff files in the public knowledge index; no invented prices, availability or medical claims; no automatic messages to people; Telegram handoff carries only fixed `website_guide` campaign text.
