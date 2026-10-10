# Highest Rite — source-derived CTA census (read-only)

Scanned 21 Expo TSX route files and found **83 action references**: 35 internal router transitions, 15 external/email openings, and 33 visible CTAButton label declarations. This is NOT an exhaustive click/DOM audit: TouchableOpacity and generated React event handlers require browser/Android instrumentation. Individual rows in CTA-SOURCE-CENSUS.csv provide file, line, action kind, target expression and NOT CLICK-TESTED status.

**Payment mapping:** No checkout has been verified as belonging to the correct merchant; payment-enabled pages remain on hold. Do not infer purchases, live checkout or fulfilled bookings from CTA strings.

**Contacts:** legacy mailto handoff is now labelled 'Email Draft Opened', never 'Enquiry Received', because opening a mail client does not prove receipt. A server-side verified contact endpoint is still required.

**Members:** @danielcruzelife_bot token was owner-reported rotated, but Cloudflare Worker secret bindings were empty at last read-only verification. Do not connect site login to the existing insecure bot code.
