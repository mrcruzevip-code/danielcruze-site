// Brand content data for The Highest Rite / Daniel Cruze
// PRODUCTION BUILD — all copy, images, books, socials, doctrine

// ── CDN Image URLs (optimized for mobile) ──
export const IMAGES = {
  hero: "/images/hiHseYIRZnypehcZ.jpg",
  aboutPortrait: "/images/suited-chair_8e0b5ce6.jpg",
  aboutSecondary: "/images/bathroom-washing_685eecc4.jpg",
  theMan: "/images/mirror-towel_62d9e09d.jpg",
  sacredMasculinity: "/images/outdoor-shirtless_03dde843.jpg",
  forWomen: "/images/torso-dark_598bc865.jpg",
  forMen: "/images/gym-leaning_4306f9b6.jpg",
  forCouples: "/images/poker-bw_1dadcff6.jpg",
  temple: "/images/poker-closeup_7b5b5aa8.jpg",
  workWithDaniel: "/images/gym-side_ecb586b1.jpg",
  contact: "/images/ItZMxLYusmCeOsge.jpg",
  journal: "/images/TTJOyjGRtoruQvHS.jpg",
  gallery: [
    "/images/city-night-whiskey_e831a6a7.jpg",
    "/images/hero-whiskey-dark_34aa3fe1.jpg",
    "/images/suited-chair_8e0b5ce6.jpg",
    "/images/white-shirt-night_e3a07e76.jpg",
    "/images/poker-bw_1dadcff6.jpg",
    "/images/gym-side_ecb586b1.jpg",
    "/images/outdoor-shirtless_03dde843.jpg",
    "/images/gym-leaning_4306f9b6.jpg",
    "/images/mirror-towel_62d9e09d.jpg",
    "/images/poker-drinking_92ef8119.jpg",
    "/images/poker-wide_910659a7.jpg",
    "/images/poker-lean_5ef7bccd.jpg",
    "/images/bathroom-towel_bdb6771c.jpg",
    "/images/bathroom-washing_685eecc4.jpg",
    "/images/torso-dark_598bc865.jpg",
  ],
  services: {
    "private-mentoring": "/images/white-shirt-night_e3a07e76.jpg",
    "intimacy-coaching": "/images/bathroom-towel_bdb6771c.jpg",
    "masculine-embodiment": "/images/poker-wide_910659a7.jpg",
    "couples-polarity": "/images/poker-drinking_92ef8119.jpg",
    "tantric-guidance": "/images/poker-lean_5ef7bccd.jpg",
    "retreat-travel": "/images/city-night-whiskey_e831a6a7.jpg",
    "soul-blueprint": "/images/bathroom-towel_bdb6771c.jpg",
  } as Record<string, string>,
  the33rdHouse: {
    wordmark: "/images/jTvoneHQxdNrkLmR.jpg",
    crest: "/images/jXhnNoPYqlORBtZJ.jpg",
  },
  books: {
    gentlemansGuide: "/images/the-gentlemans-guide-cover.jpg",
    pathOfTransformation: "/images/JEAPxcuKIPiAcekA.webp",
    sacredPrinciples: "/images/TFJThplzLeYHMeAW.webp",
  },
};

export const SOCIALS = {
  instagram: { label: "Instagram", handle: "@danielcruzelife", url: "https://instagram.com/danielcruzelife" },
  facebook: { label: "Facebook", handle: "@danielcruzelife", url: "https://facebook.com/danielcruzelife" },
  x: { label: "X", handle: "@DanielCruzeAU", url: "https://x.com/DanielCruzeAU" },
  telegramChannel: { label: "Sacred Masculinity", handle: "Channel", url: "https://t.me/SacredMasculinity" },
  telegramGroup: { label: "Sacred Masculine", handle: "Community", url: "https://t.me/SacredMasculine" },
  telegramPersonal: { label: "Daniel Cruze", handle: "Telegram", url: "https://t.me/danielcruzelife" },
  the33rdHouse: { label: "The 33rd House", handle: "the33rdhouse.org", url: "https://the33rdhouse.org" },
};

export const BRAND = {
  name: "Daniel Cruze",
  tagline: "Sacred Masculinity. Luxury Intimacy.\nThe Art of Sensual Dominance.",
  email: "daniel@danielcruze.com",
  seal: "Amor Aeternus. Libertas Sacra.",
  shortBio: "He is not a service. He is a standard.\n\nItalian-Australian. 2025 Australian Adult Industry Awards — Best Male Escort. Best Male Entrepreneur. Founder of The 33rd House. Published author.",
  fullBio: "Daniel Cruze is a practitioner of sacred masculinity, luxury intimacy, and initiated masculine depth.",
  philosophy: "Sacred masculinity is not a performance.",
  awards: ["2025 Australian Adult Industry Awards — Best Male Escort", "2025 Australian Adult Industry Awards — Best Male Entrepreneur"],
  locations: ["Perth", "Sydney", "Melbourne", "Touring"],
  baseCity: "Perth",
  website: "danielcruze.com.au",
  copyright: `Daniel Cruze © ${new Date().getFullYear()}`,
};

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  checkoutUrl?: string;
  secondaryCheckoutUrl?: string;
  priceLabel?: string;
  availabilityLabel?: string;
}

export const BOOKS: Book[] = [
  {
    id: "gentlemans-guide-book-one",
    title: "The Gentleman's Guide to Intimacy, Pleasure, & Sensual Dominance",
    subtitle: "Book 1 of 5 — Foundations of Connection and Pleasure",
    description: "Intimacy begins with presence, listening, trust, clear communication, and respect for boundaries. This opening volume lays the foundation for connection and pleasure.",
    coverImage: IMAGES.books.gentlemansGuide,
    availabilityLabel: "AVAILABLE NOW",
    checkoutUrl: "https://www.amazon.com.au/dp/B0HNGVX967",
    secondaryCheckoutUrl: "https://buy.stripe.com/9B6dR92jv68A2SY2K46wE0F",
    priceLabel: "Kindle $14.32",
  },
  {
    id: "path-of-transformation",
    title: "The Path of Transformation",
    subtitle: "From Ego to Essence",
    description: "A guide through the initiatory descent — from the constructed self to the essential self.",
    coverImage: IMAGES.books.pathOfTransformation,
    checkoutUrl: "https://buy.stripe.com/7sY4gzcY9fJaalq2K46wE0E",
    priceLabel: "A$34.95 AUD",
  },
  {
    id: "12-sacred-principles",
    title: "12 Sacred Principles",
    subtitle: "For Living with Meaning",
    description: "Twelve principles distilled from the initiatory path.",
    coverImage: IMAGES.books.sacredPrinciples,
    checkoutUrl: "https://buy.stripe.com/3cIdR93nz7cEfFK1G06wE0m",
    priceLabel: "A$33 AUD",
  },
];
