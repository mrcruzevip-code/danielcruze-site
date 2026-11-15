import Head from 'expo-router/head';
import { usePathname } from 'expo-router';
import { ARTICLES, SERVICES, BRAND, IMAGES, SOCIALS } from '@/lib/content';

const titles: Record<string, string> = {
  '/': 'Daniel Cruze | The Highest Rite',
  '/about': 'About Daniel Cruze | The Highest Rite',
  '/books': 'Books by Daniel Cruze | The Highest Rite',
  '/the-books': 'Books by Daniel Cruze | The Highest Rite',
  '/journal': 'Journal | The Highest Rite',
  '/social': 'Connect With Daniel Cruze | The Highest Rite',
  '/contact': 'Private Enquiries | Daniel Cruze',
  '/sacred-masculinity': 'Sacred Masculinity | The Highest Rite',
  '/soul-blueprint': 'Soul Blueprint | The Highest Rite',
  '/beyond-duality': 'Beyond Duality | The Highest Rite',
  '/decoding-cosmos': 'Decoding the Cosmos | The Highest Rite',
  '/for-men': 'For Men | Daniel Cruze',
  '/for-women': 'For Women | Daniel Cruze',
  '/for-couples': 'For Couples | Daniel Cruze',
  '/work-with-daniel': 'Work With Daniel | The Highest Rite',
  '/the-33rd-house': 'The 33rd House | Daniel Cruze',
  '/policies': 'Terms and Policies | Daniel Cruze',
};

const DEFAULT_DESCRIPTION = 'Discover Daniel Cruze’s books, Soul Blueprint readings and The Highest Rite manuscript. Explore embodied presence, The 33rd House and ways to connect.';
const pageDescriptions: Record<string, string> = {
  '/': DEFAULT_DESCRIPTION,
  '/about': 'Meet Daniel Cruze, Italian-Australian author and founder of The 33rd House. Explore his writing, The Highest Rite and the story behind the work.',
  '/books': 'Explore Daniel Cruze’s books and The Highest Rite flagship manuscript. Discover available titles, learn about the work and enquire about publication.',
  '/the-books': 'Explore Daniel Cruze’s books and The Highest Rite flagship manuscript. Discover available titles, learn about the work and enquire about publication.',
  '/social': 'Follow Daniel Cruze’s books, public writing and updates. Find Instagram, Facebook, X and the official Telegram guide.',
  '/contact': 'Contact Daniel Cruze for enquiries about books, Soul Blueprint readings and private guidance. Discover the available ways to connect.',
};

export function SiteMetadata() {
  const path = usePathname().replace(/\/$/, '') || '/';
  const id = path.split('/').at(-1);
  const article = path.startsWith('/article/') ? ARTICLES.find((item) => item.id === id) : null;
  const service = path.startsWith('/service/') ? SERVICES.find((item) => item.id === id) : null;
  const title = article ? `${article.title} | Daniel Cruze` : service ? `${service.title} | Daniel Cruze` : titles[path] || 'The Highest Rite | Daniel Cruze';
  const description = article?.excerpt || service?.subtitle || pageDescriptions[path] || DEFAULT_DESCRIPTION;
  const canonicalPath = path === '/the-books' ? '/books/' : path === '/' ? '/' : `${path}/`;
  const url = `https://danielcruze.com${canonicalPath}`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://danielcruze.com/#website',
        name: 'Daniel Cruze | The Highest Rite',
        url: 'https://danielcruze.com/',
        inLanguage: 'en-AU',
      },
      {
        '@type': 'Person',
        '@id': 'https://danielcruze.com/#daniel-cruze',
        name: BRAND.name,
        url: 'https://danielcruze.com/',
        email: BRAND.email,
        image: `https://danielcruze.com${IMAGES.aboutPortrait}`,
        description: 'Italian-Australian author, founder of The 33rd House and creator of The Highest Rite.',
        sameAs: [SOCIALS.instagram.url, SOCIALS.facebook.url, SOCIALS.x.url],
      },
    ],
  });

  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <meta property="og:site_name" content="The Highest Rite | Daniel Cruze" />
    <meta property="og:type" content={article ? 'article' : 'website'} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={`https://danielcruze.com${IMAGES.hero}`} />
    <meta property="og:image:alt" content="Daniel Cruze | The Highest Rite — homepage editorial image" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`https://danielcruze.com${IMAGES.hero}`} />
    <meta name="twitter:image:alt" content="Daniel Cruze | The Highest Rite — homepage editorial image" />
    {path.startsWith('/dev/') || path.startsWith('/oauth/') ? <meta name="robots" content="noindex,follow" /> : <meta name="robots" content="index,follow,max-image-preview:large" />}
    <script type="application/ld+json">{structuredData}</script>
  </Head>;
}
