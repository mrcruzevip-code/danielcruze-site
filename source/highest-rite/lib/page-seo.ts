/**
 * Owner-editable public route metadata.
 *
 * To edit a page: open this file on a review branch, change the matching path,
 * and let CI verify the exported page before approval and merge.
 * Do not put account credentials, private URLs or unapproved payment links here.
 * Image values refer to images already approved for public use under /images/.
 */
export type PageSeo = {
  title: string;
  description: string;
  ogImage?: string;
  ogImageAlt?: string;
  robots?: 'index,follow,max-image-preview:large' | 'noindex,follow';
};
export const DEFAULT_DESCRIPTION = 'The Highest Rite by Daniel Cruze: sacred masculinity, embodied presence, published books, Soul Blueprint readings and private work.';
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': { title: 'Daniel Cruze | The Highest Rite', description: 'Daniel Cruze — author and creator of The Highest Rite. Explore published works, writing, philosophy and contact information.', ogImage: '/images/hiHseYIRZnypehcZ.jpg', ogImageAlt: 'Daniel Cruze — The Highest Rite' },
  '/about': { title: 'About Daniel Cruze | The Highest Rite', description: 'About Daniel Cruze: author, creative work, philosophy and professional background.', ogImage: '/images/suited-chair_8e0b5ce6.jpg', ogImageAlt: 'Portrait of Daniel Cruze' },
  '/books': { title: 'Books by Daniel Cruze | The Highest Rite', description: 'Browse the public book catalogue and author information for Daniel Cruze.', ogImage: '/images/the-gentlemans-guide-cover.jpg', ogImageAlt: 'The Gentleman’s Guide book cover' },
  '/the-books': { title: 'Books by Daniel Cruze | The Highest Rite', description: 'Browse the public book catalogue and author information for Daniel Cruze.', ogImage: '/images/the-gentlemans-guide-cover.jpg', ogImageAlt: 'The Gentleman’s Guide book cover', robots: 'noindex,follow' },
  '/journal': { title: 'Journal | The Highest Rite', description: 'Read essays and reflections in the public Daniel Cruze journal.' },
  '/social': { title: 'Connect With Daniel Cruze | The Highest Rite', description: 'Official public channels and social links for Daniel Cruze.' },
  '/contact': { title: 'Private Enquiries | Daniel Cruze', description: 'Contact Daniel Cruze through published enquiry and social channels.' },
  '/sacred-masculinity': { title: 'Sacred Masculinity | The Highest Rite', description: 'Essays and personal philosophy on sacred masculinity by Daniel Cruze.' },
  '/soul-blueprint': { title: 'Soul Blueprint | The Highest Rite', description: 'Explore the Soul Blueprint gateway and its separate 33rd House referral.' },
  '/beyond-duality': { title: 'Beyond Duality | The Highest Rite', description: 'A public symbolic reflection on polarity and integration.' },
  '/decoding-cosmos': { title: 'Decoding the Cosmos | The Highest Rite', description: 'An introduction to the symbolic 33rd House cosmology.' },
  '/for-men': { title: 'For Men | Daniel Cruze', description: 'Published writing and public information for men exploring Daniel Cruze’s work.' },
  '/for-women': { title: 'For Women | Daniel Cruze', description: 'Published writing and public information for women exploring Daniel Cruze’s work.' },
  '/for-couples': { title: 'For Couples | Daniel Cruze', description: 'Published writing and public information for couples exploring Daniel Cruze’s work.' },
  '/work-with-daniel': { title: 'Work With Daniel | The Highest Rite', description: 'Public information about working with Daniel Cruze and enquiry options.' },
  '/the-33rd-house': { title: 'The 33rd House | Daniel Cruze', description: 'A separate gateway from Daniel Cruze to The 33rd House framework.' },
  '/policies': { title: 'Terms and Policies | Daniel Cruze', description: 'Public terms, notices and policies for the Daniel Cruze website.', robots: 'noindex,follow' },
};
