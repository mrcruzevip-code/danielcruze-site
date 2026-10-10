import { describe, it, expect } from "vitest";
import { IMAGES, SERVICES } from "../lib/content";

describe("IMAGES constant", () => {
  it("has a hero image URL", () => {
    expect(IMAGES.hero).toBeDefined();
    expect(IMAGES.hero).toMatch(/^https:\/\//);
  });

  it("has about portrait image URL", () => {
    expect(IMAGES.aboutPortrait).toBeDefined();
    expect(IMAGES.aboutPortrait).toMatch(/^https:\/\//);
  });

  it("has about secondary image URL", () => {
    expect(IMAGES.aboutSecondary).toBeDefined();
    expect(IMAGES.aboutSecondary).toMatch(/^https:\/\//);
  });

  it("has sacredMasculinity image URL", () => {
    expect(IMAGES.sacredMasculinity).toBeDefined();
    expect(IMAGES.sacredMasculinity).toMatch(/^https:\/\//);
  });

  it("has forMen image URL", () => {
    expect(IMAGES.forMen).toBeDefined();
    expect(IMAGES.forMen).toMatch(/^https:\/\//);
  });

  it("has forWomen image URL", () => {
    expect(IMAGES.forWomen).toBeDefined();
    expect(IMAGES.forWomen).toMatch(/^https:\/\//);
  });

  it("has forCouples image URL", () => {
    expect(IMAGES.forCouples).toBeDefined();
    expect(IMAGES.forCouples).toMatch(/^https:\/\//);
  });

  it("has temple image URL", () => {
    expect(IMAGES.temple).toBeDefined();
    expect(IMAGES.temple).toMatch(/^https:\/\//);
  });

  it("has workWithDaniel image URL", () => {
    expect(IMAGES.workWithDaniel).toBeDefined();
    expect(IMAGES.workWithDaniel).toMatch(/^https:\/\//);
  });

  it("has contact image URL", () => {
    expect(IMAGES.contact).toBeDefined();
    expect(IMAGES.contact).toMatch(/^https:\/\//);
  });

  it("has a gallery array with at least 5 images", () => {
    expect(Array.isArray(IMAGES.gallery)).toBe(true);
    expect(IMAGES.gallery.length).toBeGreaterThanOrEqual(5);
    IMAGES.gallery.forEach((url: string) => {
      expect(url).toMatch(/^https:\/\//);
    });
  });

  it("has service-specific images for all services", () => {
    expect(IMAGES.services).toBeDefined();
    SERVICES.forEach((service) => {
      const img = IMAGES.services[service.id];
      expect(img).toBeDefined();
      expect(img).toMatch(/^https:\/\//);
    });
  });

  it("all image URLs point to CDN domain", () => {
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
    ];
    allUrls.forEach((url: string) => {
      expect(url.includes("cloudfront.net") || url.includes("manuscdn.com")).toBe(true);
    });
  });
});
