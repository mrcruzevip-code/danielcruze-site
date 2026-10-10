# The Highest Rite — Mobile App Design

## Brand Identity

Daniel Cruze is a luxury sacred masculinity practitioner, intimacy coach, and founder of The 33rd House. The app must feel like entering a temple — not browsing a service directory. Every interaction should convey sovereignty, discretion, and depth.

## Color Palette

| Token | Light | Dark (Primary) | Purpose |
|-------|-------|-----------------|---------|
| background | #0A0A0A | #0A0A0A | Near-black cinematic base |
| foreground | #F5F0E8 | #F5F0E8 | Warm ivory text |
| primary | #8B2F3A | #8B2F3A | Scarlet/deep crimson — brand accent |
| surface | #141414 | #141414 | Cards, elevated panels |
| muted | #7A7268 | #7A7268 | Secondary text, subtle labels |
| border | #2A2520 | #2A2520 | Subtle warm borders |
| success | #4A7C59 | #4A7C59 | Confirmation states |
| warning | #C4923A | #C4923A | Warm amber |
| error | #9B3333 | #9B3333 | Error states |

The app is dark-mode only. The aesthetic is cinematic, near-black with warm ivory text and scarlet accents. No bright whites, no blues, no tech-startup colors.

## Typography Direction

Serif headings (system serif or loaded custom), sans-serif body. All caps for section headers. Generous letter-spacing on headings. Thin, elegant weight for body copy.

## Screen List & Layout

### 1. Home Screen (Scrollable, 8 sections)
The homepage follows the exact wireframe from the brand document. No tab bar visible initially — the experience begins with a full-viewport threshold.

**Section 1 — The Threshold (Hero)**
Full viewport dark background. "DANIEL CRUZE" in large serif. Tagline: "Sacred Masculinity. Luxury Intimacy. The Art of Sensual Dominance." Single "Enter" button. No nav visible on load.

**Section 2 — The Man (Authority)**
Short bio paragraph. Awards: 2025 Australian Adult Industry Awards. "About Daniel →" link.

**Section 3 — The Field (Doctrine)**
"SACRED MASCULINITY" header. One-sentence doctrine definition. "Enter the Field →" link to Sacred Masculinity screen.

**Section 4 — The Experiences (Offers)**
Three minimal tiles: For Women, For Couples, For Men. Each with one-line description and link.

**Section 5 — The Proof (Testimonials)**
2-3 curated testimonials. Press/media mentions area.

**Section 6 — The Journal (Depth)**
2 featured article cards with title and excerpt.

**Section 7 — The Temple (33rd House)**
Short mysterious description. "Enter the Temple →" link.

**Section 8 — Private Enquiries (Contact)**
Discretion-focused contact section. "Make an Enquiry →" link.

**Footer**
Minimal: Daniel Cruze © 2026. Perth · Sydney · Melbourne · Touring. Three links: Instagram, Scarlet Blue, The 33rd House.

### 2. About Daniel Screen
Daniel's bio, philosophy, presence/intimacy/masculine leadership principles. Awards and recognition. Perth base + touring info. Links to services and journal.

### 3. Sacred Masculinity Screen
Doctrine page. What sacred masculinity means, who it's for, key principles (embodiment, polarity, devotion, truth, leadership). Links to services and articles.

### 4. Work With Daniel Screen (Service Hub)
Service philosophy intro. Six service cards: Private Mentoring, Intimacy Coaching, Masculine Embodiment Sessions, Couples Polarity Work, Tantric Guidance, Retreat/Travel/Touring. Each card links to a detail screen.

### 5. Service Detail Screens (6 screens)
Each service gets its own detail screen with description, who it's for, what to expect, and enquiry CTA.

### 6. For Men Screen
Masculine development focus. Links to Private Mentoring, Masculine Embodiment, related articles.

### 7. For Women Screen
Buyer-intent page. Links to Intimacy Coaching, Private Mentoring, Tantric Guidance, relationship content.

### 8. For Couples Screen
Couples-intent page. Links to Couples Polarity Work, Intimacy Coaching, Tantric Guidance. FAQ on boundaries.

### 9. Journal Screen
Featured articles grid. Categories: Sacred Masculinity, Intimacy, Polarity, Men's Work, Ritual/Initiation, Relationship Depth. City tags.

### 10. Article Detail Screen
Full article view with image, title, category, body text, related articles.

### 11. The 33rd House Screen
What The 33rd House is. Temple/library/teachings/community. How it relates to Daniel Cruze. Links to deeper ecosystem.

### 12. Contact Screen
Enquiry form (name, email, interest area, message). Location/touring note. Screening/boundaries/privacy note. Booking expectations.

## Navigation Architecture

The app uses a **drawer/hamburger navigation** pattern — no bottom tab bar. This matches the premium, editorial feel. The hamburger icon appears after the user scrolls past the hero section or navigates to any inner screen.

**Drawer Menu Items:**
- Home
- About Daniel
- Sacred Masculinity
- Work With Daniel (expandable: 6 services)
- For Men
- For Women
- For Couples
- Journal
- The 33rd House
- Contact

## Key User Flows

**Flow 1: First Impression → Explore**
Home hero → scroll → The Man section → tap "About Daniel" → About screen

**Flow 2: Service Discovery**
Home → The Experiences section → tap "For Women" → For Women screen → tap service → Service Detail → "Make an Enquiry" → Contact

**Flow 3: Content Engagement**
Home → Journal section → tap article → Article Detail → related articles → back to Journal

**Flow 4: Doctrine Deep-Dive**
Home → The Field section → "Enter the Field" → Sacred Masculinity → sub-topics → related services

**Flow 5: Enquiry**
Any screen → hamburger → Contact → fill form → submit

## Interaction Design

All transitions should feel slow, intentional, and cinematic. Fade-ins over 400ms. No bouncy springs. Scale changes minimal (0.97-0.99). The app should feel like turning pages in a sacred text, not scrolling a feed.
