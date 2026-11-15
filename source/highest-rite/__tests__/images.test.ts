import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { IMAGES, SERVICES } from "../lib/content";

describe("IMAGES constant", () => {
  it("has a hero image URL", () => {
    expect(IMAGES.hero).toBeDefined();
    expect(IMAGES.hero).toMatch(/^\/images\//);
  });

  it("has about portrait image URL", () => {
    expect(IMAGES.aboutPortrait).toBeDefined();
    expect(IMAGES.aboutPortrait).toMatch(/^\/images\//);
  });

  it("has about secondary image URL", () => {
    expect(IMAGES.aboutSecondary).toBeDefined();
    expect(IMAGES.aboutSecondary).toMatch(/^\/images\//);
  });

  it("has sacredMasculinity image URL", () => {
    expect(IMAGES.sacredMasculinity).toBeDefined();
    expect(IMAGES.sacredMasculinity).toMatch(/^\/images\//);
  });

  it("has forMen image URL", () => {
    expect(IMAGES.forMen).toBeDefined();
    expect(IMAGES.forMen).toMatch(/^\/images\//);
  });

  it("has forWomen image URL", () => {
    expect(IMAGES.forWomen).toBeDefined();
    expect(IMAGES.forWomen).toMatch(/^\/images\//);
  });

  it("has forCouples image URL", () => {
    expect(IMAGES.forCouples).toBeDefined();
    expect(IMAGES.forCouples).toMatch(/^\/images\//);
  });

  it("has temple image URL", () => {
    expect(IMAGES.temple).toBeDefined();
    expect(IMAGES.temple).toMatch(/^\/images\//);
  });

  it("has workWithDaniel image URL", () => {
    expect(IMAGES.workWithDaniel).toBeDefined();
    expect(IMAGES.workWithDaniel).toMatch(/^\/images\//);
  });

  it("has contact image URL", () => {
    expect(IMAGES.contact).toBeDefined();
    expect(IMAGES.contact).toMatch(/^\/images\//);
  });

  it("has a gallery array with at least 5 images", () => {
    expect(Array.isArray(IMAGES.gallery)).toBe(true);
    expect(IMAGES.gallery.length).toBeGreaterThanOrEqual(5);
    IMAGES.gallery.forEach((url: string) => {
      expect(url).toMatch(/^\/images\//);
    });
  });

  it("has service-specific images for all services", () => {
    expect(IMAGES.services).toBeDefined();
    SERVICES.forEach((service) => {
      const img = IMAGES.services[service.id];
      expect(img).toBeDefined();
      expect(img).toMatch(/^\/images\//);
    });
  });

  it("all image URLs resolve to existing, bundled public assets", () => {
    const allUrls = [
      IMAGES.hero,
      IMAGES.aboutPortrait,
      IMAGES.aboutSecondary,
      IMAGES.sacredMasculinity,
      IMAGES.forMen,
      IMAGES.forWomen,
      IMAGES.forCouples,
      IMAGES.temple,
      IMAGES.workWithDaniel,
      IMAGES.contact,
      ...IMAGES.gallery,
      ...Object.values(IMAGES.services),
      ...Object.values(IMAGES.books),
      ...Object.values(IMAGES.the33rdHouse),
      ...Object.values(IMAGES.icons),
    ];
    allUrls.forEach((url: string) => {
      expect(url.startsWith("/images/")).toBe(true);
      expect(existsSync(join(process.cwd(), "public", url.slice(1)))).toBe(true);
    });
  });
});
