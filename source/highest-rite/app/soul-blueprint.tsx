import { ScrollView, Text, View, Linking } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { AppShell } from "@/components/app-shell";
import { CTAButton } from "@/components/cta-button";
import { SectionDivider } from "@/components/section-divider";
import { IMAGES, BRAND, SOCIALS, THE_33RD_HOUSE } from "@/lib/content";
import { StyleSheet } from "react-native";

export default function SoulBlueprintScreen() {
  return (
    <AppShell>
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {/* Hero with image */}
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: IMAGES.services["soul-blueprint"] }}
              style={StyleSheet.absoluteFill}
              contentFit="contain"
              transition={400}
            />
            <LinearGradient
              colors={["rgba(10,10,10,0.4)", "rgba(10,10,10,0.85)", "#0A0A0A"]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroLabel}>CHARTOGRAPHY</Text>
              <Text style={styles.heroTitle}>SOUL{"\n"}BLUEPRINT</Text>
              <Text style={styles.heroSubtitle}>
                Your personal map through the 12 Gates of consciousness.
              </Text>
            </View>
          </View>

          <SectionDivider />

          {/* What Is It */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE READING</Text>
            <Text style={styles.sectionTitle}>What Is a Soul Blueprint?</Text>
            <Text style={styles.body}>
              The Soul Blueprint is a personalised Chartography reading that maps your birth data to the 12-Gate consciousness system of The 33rd House. It reveals your primary Gate, your shadow patterns, your integration path, and the specific Realms that hold your deepest potential.
            </Text>
            <Text style={styles.body}>
              This is not astrology. It is not personality typing. It is a cosmological map drawn from 5,000 years of initiatory wisdom — Mesopotamian, Egyptian, Vedic, Hermetic — synthesised into a living system by Daniel Cruze.
            </Text>
          </View>

          <SectionDivider />

          {/* The Gate System */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE ARCHITECTURE</Text>
            <Text style={styles.sectionTitle}>The 12-Gate System</Text>
            {Object.values(THE_33RD_HOUSE.gateSystem).map((level, i) => (
              <View key={i} style={styles.gateRow}>
                <View style={styles.gateDot} />
                <Text style={styles.gateText}>{level}</Text>
              </View>
            ))}
            <Text style={styles.bodySmall}>
              {THE_33RD_HOUSE.currents}
            </Text>
          </View>

          <SectionDivider />

          {/* What You Receive */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>WHAT YOU RECEIVE</Text>
            <Text style={styles.sectionTitle}>Your Personal Map</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bullet}>Personalised PDF report delivered within 7–10 business days</Text>
              <Text style={styles.bullet}>Your primary Gate and shadow Gate identified</Text>
              <Text style={styles.bullet}>Integration path through the Realm system</Text>
              <Text style={styles.bullet}>Specific practices and principles for your path</Text>
              <Text style={styles.bullet}>Delivered via The 33rd House platform</Text>
            </View>
          </View>

          <SectionDivider />

          {/* How It Works */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE PROCESS</Text>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <View style={styles.stepContainer}>
              {[
                { num: "01", text: "Visit The 33rd House and select your Chartography reading" },
                { num: "02", text: "Provide your birth data (date, time, location)" },
                { num: "03", text: "Receive your personalised Soul Blueprint within 7–10 days" },
                { num: "04", text: "Optional: book a follow-up session with Daniel for deeper integration" },
              ].map((step) => (
                <View key={step.num} style={styles.step}>
                  <Text style={styles.stepNum}>{step.num}</Text>
                  <Text style={styles.stepText}>{step.text}</Text>
                </View>
              ))}
            </View>
          </View>

          <SectionDivider />

          {/* CTA */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Begin Your Reading</Text>
            <Text style={styles.body}>
              Investment is discussed upon booking. Soul Blueprint readings are processed through The 33rd House platform.
            </Text>
            <CTAButton
              label="BOOK YOUR SOUL BLUEPRINT"
              onPress={() => Linking.openURL(SOCIALS.the33rdHouse.url)}
            />
            <View style={{ height: 16 }} />
            <CTAButton
              label="ENQUIRE WITH DANIEL"
              onPress={() => Linking.openURL(`mailto:${BRAND.email}`)}
              variant="outline"
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerSeal}>{BRAND.seal}</Text>
            <Text style={styles.footerCopy}>{BRAND.copyright}</Text>
          </View>
        </ScrollView>
      </ScreenContainer>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 500,
    justifyContent: "flex-end",
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  heroLabel: {
    color: "#8B2635",
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: "600",
    marginBottom: 12,
  },
  heroTitle: {
    color: "#F5F0E8",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 6,
    textAlign: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    color: "#9B9B8F",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 300,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
  },
  sectionLabel: {
    color: "#8B2635",
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#F5F0E8",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 16,
  },
  body: {
    color: "#9B9B8F",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  bodySmall: {
    color: "#8B2635",
    fontSize: 13,
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
  gateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  gateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8B2635",
    marginRight: 12,
  },
  gateText: {
    color: "#F5F0E8",
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  bulletList: {
    width: "100%",
    paddingHorizontal: 8,
  },
  bullet: {
    color: "#9B9B8F",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    paddingLeft: 16,
  },
  stepContainer: {
    width: "100%",
  },
  step: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  stepNum: {
    color: "#8B2635",
    fontSize: 20,
    fontWeight: "700",
    width: 40,
    letterSpacing: 1,
  },
  stepText: {
    color: "#9B9B8F",
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  footer: {
    paddingVertical: 40,
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#1A1A1A",
    marginTop: 20,
  },
  footerSeal: {
    color: "#8B2635",
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: "500",
    fontStyle: "italic",
    marginBottom: 8,
  },
  footerCopy: {
    color: "#4A4A4A",
    fontSize: 11,
  },
});
