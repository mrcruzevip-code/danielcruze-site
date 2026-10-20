import Head from 'expo-router/head';
import { PAGE_CONTENT } from '@/lib/site-registry';
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

export function SiteMetadata() {
  const path = usePathname().replace(/\/$/, '') || '/';
  const id = path.split('/').at(-1);
  const article = path.startsWith('/article/') ? ARTICLES.find((item) => item.id === id) : null;
  const service = path.startsWith('/service/') ? SERVICES.find((item) => item.id === id) : null;
  const page = PAGE_CONTENT[path];
  const title = article ? `${article.title} | Daniel Cruze` : service ? `${service.title} | Daniel Cruze` : page?.title || titles[path] || 'The Highest Rite | Daniel Cruze';
  const description = article?.excerpt || service?.subtitle || page?.description || 'Daniel Cruze: books, writing and The Highest Rite.';
  const imageUrl = page?.image ? (page.image.startsWith('https://') ? page.image : `https://danielcruze.com${page.image}`) : `https://danielcruze.com${IMAGES.hero}`;
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
        sameAs: [SOCIALS.instagram.url, SOCIALS.facebook.url, SOCIALS.x.url, SOCIALS.telegramChannel.url],
      },
    ],
  });

  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={page?.keywords || "Daniel Cruze, The Highest Rite, books, The 33rd House"} />
    <link rel="canonical" href={url} />
    <meta property="og:site_name" content="The Highest Rite | Daniel Cruze" />
    <meta property="og:type" content={article ? 'article' : 'website'} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={imageUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    {page?.imageAlt ? <meta name="twitter:image:alt" content={page.imageAlt} /> : null}
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
    {path.startsWith('/dev/') || path.startsWith('/oauth/') || page?.robots === 'noindex,follow' ? <meta name="robots" content="noindex,follow" /> : <meta name="robots" content="index,follow,max-image-preview:large" />}
    <script type="application/ld+json">{structuredData}</script>
  </Head>;
}
