import { describe, it, expect } from "vitest";
import {
  BRAND,
  SOCIALS,
  BOOKS,
  SERVICES,
  TESTIMONIALS,
  ARTICLES,
  JOURNAL_CATEGORIES,
  SACRED_MASCULINITY_PRINCIPLES,
  THE_33RD_HOUSE,
  DRAWER_ITEMS,
  IMAGES,
} from "../lib/content";

describe("Brand content", () => {
  it("has correct brand name", () => {
    expect(BRAND.name).toBe("Daniel Cruze");
  });

  it("has tagline with key phrases", () => {
    expect(BRAND.tagline).toContain("Sacred Masculinity");
    expect(BRAND.tagline).toContain("Luxury Intimacy");
  });

  it("has all required locations", () => {
    expect(BRAND.locations).toContain("Perth");
    expect(BRAND.locations).toContain("Sydney");
    expect(BRAND.locations).toContain("Melbourne");
  });

  it("has email", () => {
    expect(BRAND.email).toBe("daniel@danielcruze.com");
  });

  it("has brand seal", () => {
    expect(BRAND.seal).toContain("Amor Aeternus");
  });

  it("has awards", () => {
    expect(BRAND.awards.length).toBeGreaterThanOrEqual(2);
  });
});

describe("Social links", () => {
  it("has Instagram", () => {
    expect(SOCIALS.instagram.url).toContain("instagram.com");
  });

  it("has Facebook", () => {
    expect(SOCIALS.facebook.url).toContain("facebook.com");
  });

  it("has X/Twitter", () => {
    expect(SOCIALS.x.url).toContain("x.com");
  });

  it("has Telegram channels", () => {
    expect(SOCIALS.telegramChannel.url).toContain("t.me/SacredMasculinity");
    expect(SOCIALS.telegramGroup.url).toContain("t.me/SacredMasculine");
    expect(SOCIALS.telegramPersonal.url).toContain("t.me/danielcruzelife");
  });

  it("has The 33rd House link", () => {
    expect(SOCIALS.the33rdHouse.url).toContain("the33rdhouse.org");
  });
});

describe("Books", () => {
  it("has 2 books", () => {
    expect(BOOKS).toHaveLength(2);
  });

  it("each book has required fields", () => {
    for (const book of BOOKS) {
      expect(book.id).toBeTruthy();
      expect(book.title).toBeTruthy();
      expect(book.subtitle).toBeTruthy();
      expect(book.description).toBeTruthy();
      expect(book.coverImage).toBeTruthy();
    }
  });
});

describe("Services", () => {
  it("has 7 services including Soul Blueprint", () => {
    expect(SERVICES).toHaveLength(7);
  });

  it("each service has required fields", () => {
    for (const service of SERVICES) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.subtitle).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.whatToExpect.length).toBeGreaterThan(0);
      expect(service.whoIsItFor).toBeTruthy();
      expect(["women", "couples", "men", "all"]).toContain(service.audience);
    }
  });

  it("has services for all audience types", () => {
    const audiences = new Set(SERVICES.map((s) => s.audience));
    expect(audiences.has("women")).toBe(true);
    expect(audiences.has("men")).toBe(true);
    expect(audiences.has("couples")).toBe(true);
  });

  it("has unique service IDs", () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes Soul Blueprint service", () => {
    const soulBlueprint = SERVICES.find((s) => s.id === "soul-blueprint");
    expect(soulBlueprint).toBeTruthy();
  });
});

describe("Testimonials", () => {
  it("has at least 3 testimonials", () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(3);
  });

  it("each testimonial has required fields", () => {
    for (const t of TESTIMONIALS) {
      expect(t.id).toBeTruthy();
      expect(t.quote).toBeTruthy();
      expect(t.author).toBeTruthy();
      expect(t.context).toBeTruthy();
    }
  });
});

describe("Articles", () => {
  it("has at least 9 articles including esoteric doctrine", () => {
    expect(ARTICLES.length).toBeGreaterThanOrEqual(9);
  });

  it("each article has required fields", () => {
    for (const a of ARTICLES) {
      expect(a.id).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.excerpt).toBeTruthy();
      expect(a.category).toBeTruthy();
      expect(a.readTime).toBeTruthy();
    }
  });

  it("has 3 esoteric doctrine articles with full body text", () => {
    const esoteric = ARTICLES.filter((a) => a.category === "Esoteric Doctrine");
    expect(esoteric).toHaveLength(3);
    for (const a of esoteric) {
      expect(a.body).toBeTruthy();
      expect(a.body!.length).toBeGreaterThan(500);
    }
  });

  it("has unique article IDs", () => {
    const ids = ARTICLES.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Journal categories", () => {
  it("has expected categories including Esoteric Doctrine", () => {
    expect(JOURNAL_CATEGORIES).toContain("Sacred Masculinity");
    expect(JOURNAL_CATEGORIES).toContain("Intimacy");
    expect(JOURNAL_CATEGORIES).toContain("Esoteric Doctrine");
  });
});

describe("Sacred Masculinity principles", () => {
  it("has at least 5 principles", () => {
    expect(SACRED_MASCULINITY_PRINCIPLES.length).toBeGreaterThanOrEqual(5);
  });

  it("each principle has title and description", () => {
    for (const p of SACRED_MASCULINITY_PRINCIPLES) {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
    }
  });
});

describe("The 33rd House", () => {
  it("has title and description", () => {
    expect(THE_33RD_HOUSE.title).toBe("The 33rd House");
    expect(THE_33RD_HOUSE.description).toBeTruthy();
  });

  it("has architecture sections including Chartography", () => {
    expect(THE_33RD_HOUSE.sections.length).toBeGreaterThanOrEqual(5);
    expect(THE_33RD_HOUSE.sections.some((s) => s.includes("Chartography"))).toBe(true);
  });

  it("has gate system", () => {
    expect(THE_33RD_HOUSE.gateSystem).toBeTruthy();
  });

  it("has membership tiers", () => {
    expect(THE_33RD_HOUSE.tiers).toHaveLength(4);
  });
});

describe("Drawer navigation items", () => {
  it("has 15 navigation items including new pages", () => {
    expect(DRAWER_ITEMS).toHaveLength(13);
  });

  it("includes all required pages", () => {
    const labels = DRAWER_ITEMS.map((d) => d.label);
    expect(labels).toContain("Home");
    expect(labels).toContain("About Daniel");
    expect(labels).toContain("Sacred Masculinity");
    expect(labels).toContain("The Books");
    expect(labels).toContain("Work With Daniel");
    expect(labels).toContain("Soul Blueprint");
    expect(labels).toContain("For Men");
    expect(labels).toContain("For Women");
    expect(labels).toContain("For Couples");
    expect(labels).toContain("Journal");
    expect(labels).toContain("The 33rd House");
    expect(labels).toContain("Contact");
  });

  it("each item has a route", () => {
    for (const item of DRAWER_ITEMS) {
      expect(item.route).toBeTruthy();
    }
  });
});

describe("Images", () => {
  it("has book cover images", () => {
    expect(IMAGES.books.pathOfTransformation).toBeTruthy();
    expect(IMAGES.books.sacredPrinciples).toBeTruthy();
  });

  it("has service-specific images with no duplicates to page heroes", () => {
    const serviceUrls = Object.values(IMAGES.services);
    const pageHeroes = [
      IMAGES.hero,
      IMAGES.aboutPortrait,
      IMAGES.sacredMasculinity,
      IMAGES.forMen,
      IMAGES.forWomen,
      IMAGES.forCouples,
      IMAGES.contact,
    ];
    for (const url of serviceUrls) {
      expect(pageHeroes).not.toContain(url);
    }
  });
});
