// Public navigation only. Edit this index alongside the linked public pages.
// No private documents, prices, availability or personal account data belong here.
export const TELEGRAM = 'https://t.me/danielcruzelife_bot?start=website_guide';
const topics = {
  books: { text: 'Explore Daniel’s published works in Books. The public catalogue has the current descriptions and links.', links: [{ label: 'Explore books', href: '/books/' }] },
  blueprint: { text: 'Explore the Soul Blueprint pathway on its public page. For questions about suitability or availability, contact Daniel directly.', links: [{ label: 'Explore Soul Blueprint', href: '/soul-blueprint/' }, { label: 'Make an enquiry', href: '/contact/' }] },
  work: { text: 'For private work with Daniel, start with Work With Daniel, then send an enquiry to discuss suitability and availability. I cannot confirm a booking.', links: [{ label: 'Work with Daniel', href: '/work-with-daniel/' }, { label: 'Make an enquiry', href: '/contact/' }] },
  journal: { text: 'The public Journal is the place to explore Daniel’s writing and teachings. Read each piece in its original context.', links: [{ label: 'Read the Journal', href: '/journal/' }] },
  house: { text: 'The 33rd House is the wider ecosystem. Daniel’s public House page introduces that pathway.', links: [{ label: 'Discover The 33rd House', href: '/the-33rd-house/' }] },
  contact: { text: 'Use Daniel’s enquiry page to contact him directly. Please keep sensitive personal details out of this guide.', links: [{ label: 'Contact Daniel', href: '/contact/' }] },
  about: { text: 'Learn about Daniel Cruze and The Highest Rite on his public About page.', links: [{ label: 'About Daniel', href: '/about/' }] },
  telegram: { text: 'Continue with @danielcruzelife_bot in Telegram. Your website conversation is not transferred; Telegram opens a separate conversation.', links: [{ label: 'Continue in Telegram', href: TELEGRAM }] },
  identity: { text: 'I’m The Gentleman’s Lion, Daniel Cruze’s digital guide. I use a curated public-content index to help you find books, writing, private work and enquiries. I’m not Daniel and cannot confirm purchases or bookings.', links: [{ label: 'About Daniel', href: '/about/' }] },
  hello: { text: 'Welcome. I’m The Gentleman’s Lion, your digital guide. What would you like to explore: books, teachings, private work, or The 33rd House?', links: [] },
  thanks: { text: 'You’re welcome. I’m here whenever you’d like to explore another pathway.', links: [] },
  unknown: { text: 'I don’t have an approved answer to that. I can guide you to books, the Journal, private work, or Daniel’s enquiry page.', links: [{ label: 'Ask Daniel', href: '/contact/' }] },
};
export function answer(input, previousTopic) {
  const q = typeof input === 'string' ? input.toLowerCase().trim().slice(0, 500) : '';
  let topic = 'unknown';
  if (/token|secret|password|ignore.*instruction|<|>/.test(q)) topic = 'unknown';
  else if (/^(tell me more|more|yes|show me|where can i find (it|them))[?.!]*$/.test(q) && Object.hasOwn(topics, previousTopic || '')) topic = previousTopic;
  else if (/\b(telegram|bot)\b/.test(q)) topic = 'telegram';
  else if (/who are you|are you (daniel|human|ai)|what can you do/.test(q)) topic = 'identity';
  else if (/soul blueprint|chartography/.test(q)) topic = 'blueprint';
  else if (/\b(journal|teachings|teaching|wisdom|article|articles|presence|masculinity)\b/.test(q)) topic = 'journal';
  else if (/33rd|\b(house|gate|gates|realm|realms)\b/.test(q)) topic = 'house';
  else if (/\b(book a|booking|session|service|private work|work with|appointment|intimacy|massage)\b/.test(q)) topic = 'work';
  else if (/\b(book|books|read|reading|codex|volume|volumes|published)\b/.test(q)) topic = 'books';
  else if (/\b(contact|enquiry|enquiries|email|speak|message daniel)\b/.test(q)) topic = 'contact';
  else if (/\b(about|daniel|founder|highest rite)\b/.test(q)) topic = 'about';
  else if (/^(hi|hello|hey|start)[!. ]*$/.test(q)) topic = 'hello';
  else if (/^(thanks|thank you)[!. ]*$/.test(q)) topic = 'thanks';
  return { topic, ...topics[topic] };
}
