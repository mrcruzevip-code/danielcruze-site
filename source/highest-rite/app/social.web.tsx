import { ScrollView, Text, View, StyleSheet, Linking } from 'react-native';
import { AppShell } from '@/components/app-shell';
import { SectionDivider } from '@/components/section-divider';
import { BRAND, SOCIALS } from '@/lib/content';

const links = [
  { label: 'INSTAGRAM', name: SOCIALS.instagram.handle, detail: 'Daily field notes and public transmissions', url: SOCIALS.instagram.url },
  { label: 'SACRED MASCULINITY', name: 'Telegram Channel', detail: 'Doctrine, teachings, and transmissions', url: SOCIALS.telegramChannel.url },
  { label: 'SACRED MASCULINE', name: 'Telegram Community', detail: 'Community discussion and brotherhood', url: SOCIALS.telegramGroup.url },
  { label: 'DIRECT MESSAGE', name: 'Daniel Cruze', detail: 'Personal Telegram for private enquiries', url: SOCIALS.telegramPersonal.url },
];
export default function SocialScreen() {
  return <AppShell><ScrollView contentContainerStyle={styles.scroll}>
    <View style={styles.hero}><Text style={styles.label}>THE COMMUNITY</Text><Text style={styles.title}>CONNECT</Text><Text style={styles.body}>Sacred Masculinity is not a solo path. Find the public channels, teachings, and direct contact points for Daniel Cruze.</Text></View>
    <SectionDivider />
    <View style={styles.list}>{links.map(link => <View key={link.label} style={styles.card}>
      <Text style={styles.cardLabel}>{link.label}</Text><Text onPress={() => Linking.openURL(link.url)} accessibilityRole="link" style={styles.cardName}>{link.name}</Text><Text style={styles.cardDetail}>{link.detail}</Text>
    </View>)}</View>
    <SectionDivider />
    <View style={styles.footer}><Text style={styles.email} onPress={() => Linking.openURL(`mailto:${BRAND.email}`)} accessibilityRole="link">{BRAND.email}</Text><Text style={styles.seal}>{BRAND.seal}</Text><Text style={styles.copy}>{BRAND.copyright}</Text></View>
  </ScrollView></AppShell>;
}
const styles=StyleSheet.create({scroll:{paddingBottom:72},hero:{paddingHorizontal:32,paddingTop:56,paddingBottom:32,alignItems:'center'},label:{color:'#8B2635',fontSize:11,letterSpacing:4,fontWeight:'600',marginBottom:16},title:{color:'#F5F0E8',fontSize:28,fontWeight:'200',letterSpacing:8,marginBottom:20},body:{color:'#9B9B8F',fontSize:14,lineHeight:24,letterSpacing:.3,textAlign:'center',maxWidth:420},list:{padding:24,gap:16},card:{borderWidth:.5,borderColor:'#2A2520',padding:22,alignItems:'center'},cardLabel:{color:'#8B2635',fontSize:10,letterSpacing:3,fontWeight:'600',marginBottom:8},cardName:{color:'#F5F0E8',fontSize:16,fontWeight:'300',letterSpacing:1.5,marginBottom:8,textAlign:'center'},cardDetail:{color:'#9B9B8F',fontSize:13,lineHeight:20,textAlign:'center'},footer:{padding:32,alignItems:'center'},email:{color:'#8B2635',fontSize:13,letterSpacing:1,marginBottom:28},seal:{color:'#8B2635',fontSize:12,letterSpacing:4,fontStyle:'italic',marginBottom:8},copy:{color:'#4A4A4A',fontSize:11,letterSpacing:1}});
