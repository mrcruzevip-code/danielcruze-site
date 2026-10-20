/** Owner-editable content registry. Changes are reviewed on the owner branch before release.
 * Upload public images to public/images, audio to an approved public media host;
 * never place private masters, credentials or paid files in the public folder.
 */
export type PageEntry = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  robots?: 'index,follow' | 'noindex,follow';
};
export const PAGE_CONTENT: Record<string, PageEntry> = {
  '/': {
    title: 'Daniel Cruze | The Highest Rite',
    description: 'Discover Daniel Cruze: author, founder of The 33rd House and creator of the Living Codex. Explore books, writing and the Temple beyond.',
    keywords: 'Daniel Cruze, The Highest Rite, The 33rd House, books, Living Codex',
    image: '/images/hiHseYIRZnypehcZ.jpg',
    imageAlt: 'Daniel Cruze — The Highest Rite',
  },
  '/about': { title: 'About Daniel Cruze | The Highest Rite', description: 'Meet Daniel Cruze, an Italian-Australian author and founder of The 33rd House, and explore the philosophy behind his work.' },
  '/books': { title: 'Books by Daniel Cruze | The Highest Rite', description: 'Discover books and published writing by Daniel Cruze, including the Gentleman’s Series and reflections on presence, identity and transformation.' },
  '/journal': { title: 'Journal | Daniel Cruze', description: 'Essays, reflections and perspectives on sacred masculinity, relationships, meaning and the journey behind The Highest Rite.' },
  '/social': { title: 'Connect with Daniel Cruze', description: 'Find Daniel Cruze’s public channels, media and updates through verified social links.' },
  '/contact': { title: 'Contact Daniel Cruze', description: 'Contact Daniel Cruze for professional enquiries, interviews, publishing or collaborations.' },
  '/work-with-daniel': { title: 'Work with Daniel Cruze', description: 'Explore professional enquiries, mentoring information and collaboration opportunities with Daniel Cruze.' },
  '/the-33rd-house': { title: 'The 33rd House | Enter the Temple', description: 'Daniel Cruze is the front door to The 33rd House Temple. Discover LAW, LORE, the Living Codex, Gate 0 and the 144 Realms.' },
  '/soul-blueprint': { title: 'Soul Blueprint | Daniel Cruze', description: 'Explore Soul Blueprint as an interpretive framework within the teachings of Daniel Cruze and The 33rd House.' },
  '/sacred-masculinity': { title: 'Sacred Masculinity | Daniel Cruze', description: 'Explore Daniel Cruze’s writing and perspectives on masculine presence, responsibility, relationships and embodiment.' },
  '/for-men': { title: 'For Men | Daniel Cruze', description: 'Explore masculine embodiment, self-leadership and personal development with Daniel Cruze.' },
  '/for-women': { title: 'For Women | Daniel Cruze', description: 'Explore Daniel Cruze’s perspectives on presence, intimacy, connection and respectful relationships.' },
  '/for-couples': { title: 'For Couples | Daniel Cruze', description: 'Explore communication, connection and mutual understanding in relationships through Daniel Cruze’s work.' },
  '/policies': { title: 'Policies | Daniel Cruze', description: 'Read current public information and policies for the Daniel Cruze website.' },
};
export type MediaEntry = {
  id: string; page: string; kind: 'image' | 'audio' | 'book-cover';
  src: string; alt?: string; caption?: string; public: boolean; enabled: boolean;
};
export const MEDIA: MediaEntry[] = [
  { id: 'home-portrait', page: '/', kind: 'image', src: '/images/hiHseYIRZnypehcZ.jpg', alt: 'Daniel Cruze — The Highest Rite', public: true, enabled: true },
];
export type PaymentEntry = {
  id: string; page: string; label: string; url: string;
  provider: 'stripe'; currency?: string; enabled: boolean; verified: boolean;
};
/** Links are NOT activated by adding them here. Activate after owner verification and fulfilment review. */
export const PAYMENTS: PaymentEntry[] = [];
