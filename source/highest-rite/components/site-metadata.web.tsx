import Head from 'expo-router/head';
import { usePathname } from 'expo-router';
import { ARTICLES, SERVICES, BRAND, IMAGES, SOCIALS } from '@/lib/content';
import { PAGE_SEO, DEFAULT_DESCRIPTION } from '@/lib/page-seo';


export function SiteMetadata() {
  const path = usePathname().replace(/\/$/, '') || '/';
  const id = path.split('/').at(-1);
  const article = path.startsWith('/article/') ? ARTICLES.find((item) => item.id === id) : null;
  const service = path.startsWith('/service/') ? SERVICES.find((item) => item.id === id) : null;
  const pageSeo = PAGE_SEO[path];
  const title = pageSeo?.title || (article ? `${article.title} | Daniel Cruze` : service ? `${service.title} | Daniel Cruze` : 'The Highest Rite | Daniel Cruze');
  const description = pageSeo?.description || article?.excerpt || service?.subtitle || DEFAULT_DESCRIPTION;
  const ogImage = pageSeo?.ogImage || IMAGES.hero;
  const ogImageAlt = pageSeo?.ogImageAlt || title;
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
        sameAs: [SOCIALS.instagram.url, SOCIALS.facebook.url, SOCIALS.x.url, SOCIALS.telegramChannel.url, 'https://orcid.org/0009-0004-2616-0923'],
      },
    ],
  });

  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="Daniel Cruze, The Highest Rite, sacred masculinity, Soul Blueprint, embodied presence, spiritual books" />
    <link rel="canonical" href={url} />
    <meta property="og:site_name" content="The Highest Rite | Daniel Cruze" />
    <meta property="og:type" content={article ? 'article' : 'website'} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={`https://danielcruze.com${ogImage}`} />
    <meta property="og:image:alt" content={ogImageAlt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`https://danielcruze.com${ogImage}`} />
    <meta name="robots" content={path.startsWith('/dev/') || path.startsWith('/oauth/') ? 'noindex,follow' : pageSeo?.robots || 'index,follow,max-image-preview:large'} />
    <script type="application/ld+json">{structuredData}</script>
  </Head>;
}
