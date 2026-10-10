/**
 * Geometry shared by Highest Rite's web and native responsive images.
 * No CSS-style "cover" crop is ever applied to meaningful content.
 */
export function fitWithin(
  frameWidth: number,
  frameHeight: number,
  sourceWidth: number,
  sourceHeight: number,
): { width: number; height: number } {
  if (![frameWidth, frameHeight, sourceWidth, sourceHeight].every(n => Number.isFinite(n) && n > 0)) {
    return { width: 0, height: 0 };
  }
  const scale = Math.min(frameWidth / sourceWidth, frameHeight / sourceHeight);
  return { width: sourceWidth * scale, height: sourceHeight * scale };
}

/** Screen-aware upper bound; retain available space for navigation and CTAs. */
export function responsiveHeight(viewportWidth: number, viewportHeight: number, ratio: number): number {
  if (![viewportWidth, viewportHeight, ratio].every(n => Number.isFinite(n) && n > 0)) return 0;
  return Math.min(viewportWidth / ratio, viewportHeight * 0.8, Math.max(0, viewportHeight - 80));
}
