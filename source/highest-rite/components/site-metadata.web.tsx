import Head from 'expo-router/head';
import { usePathname } from 'expo-router';
import { ARTICLES, SERVICES, BRAND, IMAGES } from '@/lib/content';
const titles: Record<string, string> = {
  '/': 'Daniel Cruze — The Highest Rite', '/about': 'About Daniel Cruze — The Highest Rite',
  '/books': 'The Books — Daniel Cruze', '/the-books': 'The Books — Daniel Cruze',
  '/journal': 'The Journal — The Highest Rite', '/social': 'Connect With Daniel Cruze — The Highest Rite',
  '/contact': 'Private Enquiries — Daniel Cruze', '/sacred-masculinity': 'Sacred Masculinity — The Highest Rite',
  '/soul-blueprint': 'Soul Blueprint — The Highest Rite', '/beyond-duality': 'Beyond Duality — The Highest Rite',
  '/decoding-cosmos': 'Decoding the Cosmos — The Highest Rite', '/for-men': 'For Men — Daniel Cruze',
  '/for-women': 'For Women — Daniel Cruze', '/for-couples': 'For Couples — Daniel Cruze',
  '/work-with-daniel': 'Work With Daniel — The Highest Rite', '/the-33rd-house': 'The 33rd House — Daniel Cruze',
  '/policies': 'Terms and Policies — Daniel Cruze',
};
export function SiteMetadata() {
  const path = usePathname().replace(/\/$/, '') || '/';
  const id = path.split('/').at(-1);
  const article = path.startsWith('/article/') ? ARTICLES.find(a => a.id === id) : null;
  const service = path.startsWith('/service/') ? SERVICES.find(a => a.id === id) : null;
  const title = article ? `${article.title} — Daniel Cruze` : service ? `${service.title} — Daniel Cruze` : titles[path] || 'The Highest Rite — Daniel Cruze';
  const description = article?.excerpt || service?.subtitle || 'The Highest Rite by Daniel Cruze. Sacred masculinity, embodied presence, published books, private work and the original teachings.';
  const canonicalPath = path === '/the-books' ? '/books/' : path === '/' ? '/' : `${path}/`;
  const url = `https://danielcruze.com${canonicalPath}`;
  return <Head>
    <title>{title}</title><meta name="description" content={description} />
    <link rel="canonical" href={url} /><meta property="og:site_name" content="The Highest Rite — Daniel Cruze" />
    <meta property="og:type" content={article ? 'article' : 'website'} /><meta property="og:title" content={title} />
    <meta property="og:description" content={description} /><meta property="og:url" content={url} />
    <meta property="og:image" content={`https://danielcruze.com${IMAGES.hero}`} />
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} /><meta name="twitter:image" content={`https://danielcruze.com${IMAGES.hero}`} />
    {path.startsWith('/dev/') || path.startsWith('/oauth/') ? <meta name="robots" content="noindex,follow" /> : null}
  </Head>;
}
