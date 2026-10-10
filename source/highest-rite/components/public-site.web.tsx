import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { useWebViewport } from '@/hooks/use-web-viewport';
import { BOOKS, ARTICLES, BRAND } from '@/lib/content';

const GOLD = '#E0C36C';
const MUTED = '#C6BEAF';
const PORTRAIT = '/images/suited-chair_8e0b5ce6.jpg';
const NAV = [['About', '/about'], ['Books', '/books'], ['Journal', '/journal'], ['Social', '/social'], ['Contact', '/contact']] as const;
export const PUBLIC_ARTICLES = ARTICLES.filter(a => !['Intimacy', 'Polarity', 'The 33rd House'].includes(a.category) && Boolean(a.body));
const SOCIALS = [
  ['Instagram', '@danielcruzelife', 'https://instagram.com/danielcruzelife'],
  ['Facebook', 'Daniel Cruze', 'https://facebook.com/danielcruzelife'],
  ['Telegram channel', 'Sacred Masculinity', 'https://t.me/SacredMasculinity'],
  ['Telegram community', 'Sacred Masculine', 'https://t.me/SacredMasculine'],
  ['Telegram bot', '@danielcruzelife_bot', 'https://t.me/danielcruzelife_bot'],
];

type PageKind = 'home' | 'about' | 'books' | 'journal' | 'article' | 'social' | 'contact' | 'house' | 'work' | 'boundary';
const META: Record<PageKind, [string, string]> = {
  home: ['Daniel Cruze — The Highest Rite', 'Books, public reflections and creator work by Daniel Cruze, an Australian author based in Perth.'],
  about: ['About Daniel Cruze | Author & Creator', 'Meet Daniel Cruze, an Australian author and creator whose public work explores presence, meaning and personal transformation.'],
  books: ['Books by Daniel Cruze | Published Works', 'Explore The Path of Transformation and 12 Sacred Principles for Living with Meaning by Daniel Cruze.'],
  journal: ['Daniel Cruze Journal | Public Reflections', 'Public essays and reflections by Daniel Cruze. This author journal is separate from private member writing.'],
  article: ['Public Reflection | Daniel Cruze Journal', 'Read an existing public reflection by Daniel Cruze on presence, meaning and the initiated path.'],
  social: ['Daniel Cruze | Official Public Social Links', 'Follow Daniel Cruze on his public creator profiles and Telegram communities. Adult-only destinations stay separate.'],
  contact: ['Contact Daniel Cruze | Books & Public Work', 'Contact Daniel Cruze about books, speaking and public creator collaborations. Email drafts are sent by you, not by this website.'],
  house: ['The 33rd House | A Separate Brand', 'The 33rd House is a separate framework and brand. Law and Lore walk hand in hand; Spirit runs through the middle.'],
  work: ['Work With Daniel | Public Enquiries', 'Book questions, speaking and public creator collaborations with Daniel Cruze. Availability is discussed directly.'],
  boundary: ['Daniel Cruze | Public Website', 'Find Daniel Cruze’s current public books, essays and creator profiles. Legacy private-service offers are not activated here.'],
};

function Body({ children }: { children: React.ReactNode }) {
  return <Text style={styles.body}>{children}</Text>;
}
function Heading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ color: "#F5F0E8", fontSize: 26, lineHeight: "34px", fontWeight: 400, margin: "0 0 12px", overflowWrap: "anywhere" }}>{children}</h2>;
}
function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href as any} style={styles.button}>{children}</Link>;
}
function Section({ children }: { children: React.ReactNode }) {
  return <View style={styles.section}>{children}</View>;
}
function BookCards() {
  const { width } = useWebViewport();
  return <View style={[styles.cards, { flexDirection: width >= 900 ? 'row' : 'column' }]}>
    {BOOKS.map(book => <View key={book.id} style={styles.bookCard}>
      <Image source={{ uri: book.coverImage }} accessibilityLabel={`Cover of ${book.title} by Daniel Cruze`} resizeMode="contain" style={styles.bookImage} />
      <Heading>{book.title}</Heading><Text style={styles.subtitle}>{book.subtitle}</Text>
      <Body>{book.id === 'path-of-transformation' ? 'A book on the movement from ego toward essence, by Daniel Cruze.' : 'Twelve principles for reflection and living with meaning.'}</Body>
      <Button href={`mailto:${BRAND.email}?subject=${encodeURIComponent('Book enquiry: ' + book.title)}`}>Ask about availability</Button>
    </View>)}
  </View>;
}
function ArticleCards({ limit }: { limit?: number }) {
  return <View style={styles.cards}>{PUBLIC_ARTICLES.slice(0, limit).map(a => <Link key={a.id} href={`/article/${a.id}` as any} style={styles.articleLink}>
    <View style={styles.articleCard}><Text style={styles.eyebrow}>{a.category}</Text><Heading>{a.title}</Heading><Body>{a.excerpt}</Body><Text style={styles.gold}>Read reflection →</Text></View>
  </Link>)}</View>;
}

export function PublicPage({ kind }: { kind: PageKind }) {
  const { width } = useWebViewport();
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = PUBLIC_ARTICLES.find(a => a.id === id);
  let [title, description] = META[kind];
  if (kind === 'article' && article) { title = `${article.title} | Daniel Cruze`; description = article.excerpt; }
  const pathname = kind === 'home' || kind === 'boundary' ? '/' : kind === 'article' ? `/article/${id}` : kind === 'house' ? '/the-33rd-house' : kind === 'work' ? '/work-with-daniel' : `/${kind}`;
  return <ScrollView style={styles.screen} contentContainerStyle={styles.flow}>
    <Head>
      <title>{title}</title><meta name="description" content={description} />
      <link rel="canonical" href={`https://danielcruze.com${pathname}`} />
      <meta property="og:type" content={kind === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content="Daniel Cruze" /><meta property="og:title" content={title} />
      <meta property="og:description" content={description} /><meta property="og:url" content={`https://danielcruze.com${pathname}`} />
      <meta property="og:image" content={`https://danielcruze.com${PORTRAIT}`} />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} /><meta name="twitter:image" content={`https://danielcruze.com${PORTRAIT}`} />
      {kind === 'boundary' ? <meta name="robots" content="noindex,follow" /> : null}
    </Head>
    <View style={styles.header}>
      <Link href="/" style={styles.wordmark}>DANIEL CRUZE</Link>
      <View accessibilityRole="menu" style={styles.nav}>{NAV.map(([label, href]) => <Link key={href} href={href as any} style={styles.navLink}>{label}</Link>)}</View>
    </View>
    <View style={styles.content}>
      {kind === 'home' ? <>
        <View style={[styles.hero, { flexDirection: width >= 760 ? 'row' : 'column' }]}>
          <View style={styles.heroText}><Text style={styles.eyebrow}>THE HIGHEST RITE · PUBLIC WORK</Text><Text accessibilityRole="header" style={[styles.h1, { fontSize: width < 390 ? 38 : width < 760 ? 46 : 64 }]}>Daniel Cruze</Text><Text style={styles.lead}>Presence. Meaning. Transformation.</Text><Body>Books and reflections from an Australian author and creator based in Perth.</Body><View style={styles.actions}><Button href="/books">Explore the books</Button><Button href="/journal">Read the journal</Button></View></View>
          <Image source={{ uri: PORTRAIT }} accessibilityLabel="Daniel Cruze seated in a charcoal suit" resizeMode="contain" style={[styles.portrait, { width: width >= 760 ? '38%' : '100%' }]} />
        </View>
        <Section><Text style={styles.eyebrow}>BOOKS BY DANIEL CRUZE</Text><Heading>The written work</Heading><BookCards /></Section>
        <Section><Text style={styles.eyebrow}>PUBLIC REFLECTIONS</Text><Heading>From the journal</Heading><ArticleCards limit={3} /><Button href="/journal">View all public essays</Button></Section>
        <Section><Heading>Follow the public work</Heading><Body>Find the official creator profiles, communities and Telegram bot in one public directory.</Body><Button href="/social">Official social links</Button></Section>
      </> : <>
        <View style={styles.pageHero}><Text style={styles.eyebrow}>DANIEL CRUZE · PUBLIC WORK</Text><Text accessibilityRole="header" style={[styles.h1, { fontSize: width < 390 ? 32 : 42 }]}>{kind === 'about' ? 'About Daniel' : kind === 'books' ? 'The Books' : kind === 'journal' ? 'The Public Journal' : kind === 'article' ? article?.title || 'Reflection unavailable' : kind === 'social' ? 'Stay Connected' : kind === 'contact' ? 'Contact Daniel' : kind === 'house' ? 'The 33rd House' : kind === 'work' ? 'Work With Daniel' : 'A New Public Chapter'}</Text></View>
        {kind === 'about' ? <Section><View style={[styles.hero, { flexDirection: width >= 760 ? 'row' : 'column' }]}><View style={styles.heroText}><Body>Daniel Cruze is an Australian author and creator based in Perth. His public work explores embodied presence, reflection and the search for a life shaped by meaning.</Body><Body>His books include The Path of Transformation: From Ego to Essence and 12 Sacred Principles for Living with Meaning.</Body><Button href="/books">Explore the books</Button></View><Image source={{ uri: PORTRAIT }} accessibilityLabel="Daniel Cruze seated in a charcoal suit" resizeMode="contain" style={[styles.portrait, { width: width >= 760 ? '38%' : '100%' }]} /></View></Section> : null}
        {kind === 'books' ? <Section><Body>Two existing works on transformation, reflection and living with meaning. Ask Daniel about current availability and formats; this page does not take payments.</Body><BookCards /></Section> : null}
        {kind === 'journal' ? <Section><Body>Existing public essays from Daniel’s recovered app source. This editorial journal is not a private member journal.</Body><Text style={styles.note}>These writings express spiritual and symbolic interpretations, not verified anatomy or medical guidance.</Text><ArticleCards /></Section> : null}
        {kind === 'article' ? <Section>{article ? <><Text style={styles.eyebrow}>{article.category} · Daniel Cruze</Text><Text style={styles.note}>An existing public essay. Spiritual and symbolic interpretations are not medical guidance.</Text>{(article.body || article.excerpt).split('\n\n').map((p, i) => <Body key={i}>{p}</Body>)}</> : <Body>This legacy article is not included in the public edition.</Body>}<Button href="/journal">Back to public journal</Button></Section> : null}
        {kind === 'social' ? <Section><Body>Public creator updates and community links. Adult-only profiles and destinations are kept separate.</Body><View style={[styles.cards, { flexDirection: width >= 760 ? 'row' : 'column', flexWrap: 'wrap' }]}>{SOCIALS.map(([label, handle, url]) => <Link key={url} href={url as any} target="_blank" rel="noopener noreferrer" style={styles.socialLink}><View><Heading>{label}</Heading><Text style={styles.body}>{handle}</Text></View></Link>)}</View><Text style={styles.note}>The bot link opens Telegram. This website does not sign you in, grant membership or confirm any payment.</Text></Section> : null}
        {kind === 'contact' || kind === 'work' ? <Section><Body>For book questions, speaking and public creator collaborations, email Daniel directly.</Body><Button href={`mailto:${BRAND.email}`}>Open email draft</Button><Text style={styles.note}>Your email app opens a draft. Nothing is sent until you send it. This website does not collect a form submission or confirm a booking.</Text><Button href="/social">Official social links</Button></Section> : null}
        {kind === 'house' ? <Section><Body>The 33rd House is a separate framework and brand, not Daniel Cruze’s public author catalogue.</Body><Text style={styles.lead}>Law and Lore walk hand in hand; Spirit runs through the middle.</Text><Body>Its curriculum, membership, records and commerce remain separate from this Daniel Cruze website.</Body><Text style={styles.note}>The separate House website will be linked once its HTTPS destination is verified.</Text><Button href="mailto:daniel@danielcruze.com?subject=The%2033rd%20House%20public%20enquiry">Ask about The 33rd House</Button></Section> : null}
        {kind === 'boundary' ? <Section><Body>This legacy route is not part of the current public author and creator edition. Private-service offers, membership and checkout are not activated here.</Body><View style={styles.actions}><Button href="/books">Explore the books</Button><Button href="/contact">Public enquiries</Button></View></Section> : null}
      </>}
      <View style={styles.footer}><Link href="/" style={styles.wordmark}>DANIEL CRUZE</Link><Text style={styles.note}>Public writing, books and creator work. Separate brands and adult-only destinations remain separate.</Text><View style={styles.nav}>{NAV.map(([label, href]) => <Link key={href} href={href as any} style={styles.navLink}>{label}</Link>)}</View><Text style={styles.note}>{BRAND.copyright}</Text></View>
    </View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0A0A0A' }, flow: { paddingBottom: 40, alignItems: 'center' },
  header: { width: '100%', padding: 20, borderBottomWidth: 1, borderBottomColor: '#403A2B', alignItems: 'center', gap: 12 },
  content: { width: '100%', maxWidth: 1120, paddingHorizontal: 24 },
  wordmark: { color: '#F5F0E8', letterSpacing: 4, fontSize: 17, paddingVertical: 10 },
  nav: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  navLink: { color: MUTED, fontSize: 15, paddingHorizontal: 12, paddingVertical: 12, minHeight: 44 },
  hero: { gap: 32, alignItems: 'center', paddingVertical: 48 }, heroText: { flex: 1, width: '100%', minWidth: 0 },
  portrait: { maxWidth: 390, aspectRatio: 1, height: undefined, alignSelf: 'center' },
  eyebrow: { color: GOLD, fontSize: 12, letterSpacing: 2, lineHeight: 20, marginBottom: 16 },
  h1: { color: '#F5F0E8', fontWeight: '300', lineHeight: undefined, marginBottom: 20 },
  h2: { color: '#F5F0E8', fontSize: 26, lineHeight: 34, fontWeight: '400', marginBottom: 12 },
  lead: { color: GOLD, fontSize: 24, lineHeight: 34, marginBottom: 24 },
  body: { color: MUTED, fontSize: 16, lineHeight: 28, marginBottom: 20, maxWidth: 760 },
  subtitle: { color: GOLD, fontSize: 17, lineHeight: 25, marginBottom: 16 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  button: { color: GOLD, borderWidth: 1, borderColor: GOLD, paddingVertical: 14, paddingHorizontal: 18, minHeight: 48, fontSize: 15, lineHeight: 23, alignSelf: 'flex-start', maxWidth: '100%', marginBottom: 12 },
  section: { paddingVertical: 40, borderTopWidth: 1, borderTopColor: '#403A2B', gap: 8 },
  pageHero: { paddingTop: 48, paddingBottom: 24 },
  cards: { gap: 24, width: '100%' },
  bookCard: { flex: 1, minWidth: 0, width: '100%', padding: 24, backgroundColor: '#141414', borderWidth: 1, borderColor: '#403A2B' },
  bookImage: { width: '100%', maxWidth: 320, aspectRatio: 1, alignSelf: 'center', marginBottom: 24 },
  articleLink: { width: '100%' }, articleCard: { padding: 24, borderWidth: 1, borderColor: '#403A2B', backgroundColor: '#141414' },
  socialLink: { flexGrow: 1, flexBasis: 240, width: '100%', padding: 20, backgroundColor: '#141414', borderWidth: 1, borderColor: '#403A2B' },
  gold: { color: GOLD, fontSize: 16 }, note: { color: MUTED, fontSize: 14, lineHeight: 24, marginVertical: 16, maxWidth: 760 },
  footer: { borderTopWidth: 1, borderTopColor: '#403A2B', paddingTop: 32, marginTop: 40, alignItems: 'center' },
});
