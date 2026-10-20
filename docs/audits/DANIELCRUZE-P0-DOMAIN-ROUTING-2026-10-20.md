# danielcruze.com — Production entry incident and repair gate
Date: 2026-10-20
Priority: P0 public front door
Status: Unresolved, evidence captured without private redirect tokens.

## Observed
- An unauthenticated request to https://danielcruze.com was redirected into a Shopify customer-account OAuth authorization flow rather than presenting the website homepage.
- A request to https://www.danielcruze.com failed with HTTP 502 in the same external check.
- These observations do NOT prove the precise responsible service, DNS record, or permanent state. No OAuth state, nonce or customer token values were retained.
- The GitHub source CNAME on main specifies danielcruze.com.
- GitHub workflow .github/workflows/expo-pages.yml is configured to deploy on pushes to main. Recent successful workflow runs establish CI activity, not current DNS routing or healthy public serving.
- Owner editing branch owner/danielcruze-site-editor has additional unmerged content and SEO edits. It must NOT be merged simply to fix the Shopify redirect.

## Required owner-controlled checks
1. In Namecheap authoritative DNS zone for danielcruze.com, record existing A, AAAA, CNAME, ALIAS, URL forwarding and www records; preserve MX/TXT/SPF/DKIM/DMARC; never reveal TXT secret values in reports.
2. Check GitHub Pages custom-domain and HTTPS status for mrcruzevip-code/danielcruze-site; compare expected host targets to authoritative DNS. Verify whether the validated Expo export has been served on Pages.
3. Inspect Shopify domain association and customer-account login redirect configuration for danielcruze.com. Do not disconnect Shopify or alter customer accounts until actual cause confirmed.
4. Check Vercel/Cloudflare domain assignments and any redirect rule for apex/www if actually linked.
5. Confirm HTTPS requests to /, /about/, /books/, /journal/, /contact/ from multiple uncached clients and correct SEO canonical; no auth redirect on public pages.
6. Check 404, robots.txt, sitemap.xml, all major nav and mobile rendering.
7. If DNS or hosting change is needed: prepare exact before/after record changes and rollback, obtain owner signoff, then verify routing in production.

## Protection
No DNS/Shopify/Vercel/GitHub Pages settings or production branch changed as part of this incident logging.
Do not publish the OAuth redirect URL or bearer/session credentials.
