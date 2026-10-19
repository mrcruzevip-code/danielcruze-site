// Brand content data for The Highest Rite / Daniel Cruze

export const IMAGES = {
  hero: "/images/hiHseYIRZnypehcZ.jpg",
  books: {
    gentlemansGuide: "/images/the-gentlemans-guide-cover.jpg",
    pathOfTransformation: "/images/JEAPxcuKIPiAcekA.webp",
    sacredPrinciples: "/images/TFJThplzLeYHMeAW.webp",
  },
  icons: {
    begin: "/images/icons/begin.png",
    teachings: "/images/icons/teachings.png",
    theWork: "/images/icons/the-work.png",
    men: "/images/icons/men.png",
    house: "/images/icons/house.png",
  },
};

export const RITE_ICONS = [
  { id: "begin", label: "BEGIN", image: IMAGES.icons.begin, href: "/" },
  { id: "teachings", label: "TEACHINGS", image: IMAGES.icons.teachings, href: "/journal" },
  { id: "the-work", label: "THE WORK", image: IMAGES.icons.theWork, href: "/work-with-daniel" },
  { id: "men", label: "MEN", image: IMAGES.icons.men, href: "/for-men" },
  { id: "house", label: "HOUSE", image: IMAGES.icons.house, href: "/the-33rd-house" },
];

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
    description: "Intimacy begins with presence, listening, trust, clear communication, and respect for boundaries.",
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
    description: "A guide through the initiatory descent.",
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
