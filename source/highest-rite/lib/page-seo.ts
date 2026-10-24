/** Public page SEO: edit ../content/page-seo.json on a review branch.
 * Existing route copy is retained verbatim from the 22 October release source.
 * Do not place credentials or unapproved sales/audio links in public metadata.
 */
import pageSeoData from '../content/page-seo.json';

export type PageSeo = {
  title: string;
  description: string;
  ogImage?: string;
  ogImageAlt?: string;
  robots?: 'index,follow,max-image-preview:large' | 'noindex,follow';
};

export const DEFAULT_DESCRIPTION = 'The Highest Rite by Daniel Cruze: sacred masculinity, embodied presence, published books, Soul Blueprint readings and private work.';
export const PAGE_SEO: Record<string, PageSeo> = pageSeoData as Record<string, PageSeo>;
