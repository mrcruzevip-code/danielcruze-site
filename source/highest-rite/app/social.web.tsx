import { ScrollView, Text, View, StyleSheet, Linking, Pressable } from 'react-native';
import { AppShell } from '@/components/app-shell';
import { SectionDivider } from '@/components/section-divider';
import { useSiteDimensions } from '@/hooks/use-site-dimensions';
import { BRAND, SOCIALS } from '@/lib/content';

const links = [
  { label: 'INSTAGRAM', name: SOCIALS.instagram.handle, detail: 'Visual stories and daily field notes', url: SOCIALS.instagram.url },
  { label: 'FACEBOOK', name: SOCIALS.facebook.handle, detail: 'Book updates and public announcements', url: SOCIALS.facebook.url },
  { label: 'X', name: SOCIALS.x.handle, detail: 'Short reflections and new writing', url: SOCIALS.x.url },
  { label: 'OFFICIAL TELEGRAM GUIDE', name: SOCIALS.telegramBot.handle, detail: 'Find the books, journal and ways to connect', url: SOCIALS.telegramBot.url },
  { label: 'DIRECT MESSAGE', name: 'Daniel Cruze', detail: 'Personal Telegram enquiries', url: SOCIALS.telegramPersonal.url },
];

export default function SocialScreen() {
  const { width } = useSiteDimensions();
  const wide = width >= 800;
  return (
    <AppShell>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Text style={styles.label}>STAY CONNECTED</Text>
          <Text accessibilityRole="header" style={styles.title}>CONNECT</Text>
          <Text style={styles.body}>The work continues beyond a single page. Choose where to follow the writing, discover the books, or begin a conversation.</Text>
        </View>
        <SectionDivider />
        <View style={[styles.list, wide && styles.listWide]}>
          {links.map((link) => (
            <Pressable
              key={link.label}
              accessibilityRole="link"
              accessibilityLabel={link.label + ': ' + link.name}
              onPress={() => Linking.openURL(link.url)}
              style={({ pressed }) => [styles.card, wide && styles.cardWide, pressed && styles.cardPressed]}
            >
              <Text style={styles.cardLabel}>{link.label}</Text>
              <Text style={styles.cardName}>{link.name}</Text>
              <Text style={styles.cardDetail}>{link.detail}</Text>
            </Pressable>
          ))}
        </View>
        <SectionDivider />
        <View style={styles.footer}>
          <Text style={styles.email} onPress={() => Linking.openURL('mailto:' + BRAND.email)} accessibilityRole="link">{BRAND.email}</Text>
          <Text style={styles.seal}>{BRAND.seal}</Text>
          <Text style={styles.copy}>{BRAND.copyright}</Text>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 72 },
  hero: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 32, alignItems: 'center', width: '100%', maxWidth: 850, alignSelf: 'center' },
  label: { color: '#8B2635', fontSize: 11, letterSpacing: 3, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  title: { color: '#F5F0E8', fontSize: 28, fontWeight: '300', letterSpacing: 6, marginBottom: 20, textAlign: 'center' },
  body: { color: '#B9B3A8', fontSize: 16, lineHeight: 26, textAlign: 'center', maxWidth: 550 },
  list: { width: '100%', maxWidth: 960, alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 24, gap: 16 },
  listWide: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  card: { borderWidth: 1, borderColor: '#3B332D', width: '100%', minHeight: 140, paddingHorizontal: 20, paddingVertical: 24, alignItems: 'center', justifyContent: 'center' },
  cardWide: { width: '48%' },
  cardPressed: { backgroundColor: '#261D1B' },
  cardLabel: { color: '#D4B78F', fontSize: 11, letterSpacing: 2, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
  cardName: { color: '#F5F0E8', fontSize: 17, fontWeight: '500', marginBottom: 8, textAlign: 'center' },
  cardDetail: { color: '#B9B3A8', fontSize: 14, lineHeight: 22, textAlign: 'center' },
  footer: { paddingHorizontal: 20, paddingVertical: 36, alignItems: 'center' },
  email: { color: '#D4B78F', fontSize: 14, marginBottom: 28, textAlign: 'center' },
  seal: { color: '#8B2635', fontSize: 12, letterSpacing: 3, fontStyle: 'italic', marginBottom: 8, textAlign: 'center' },
  copy: { color: '#77736D', fontSize: 11 }
});
