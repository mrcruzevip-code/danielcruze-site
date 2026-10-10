import { ScrollView, Text, View, StyleSheet, Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { THE_33RD_HOUSE, IMAGES, BRAND } from "@/lib/content";
import { useRouter } from "expo-router";

const TIERS = [
  {
    name: "THE OUTER COURT",
    desc: "Free access. Journal articles, public teachings, and the Telegram community.",
  },
  {
    name: "THE INNER SANCTUM",
    desc: "Subscription access. Gate teachings, doctrine modules, and guided practices.",
  },
  {
    name: "THE PRIVATE CHAMBER",
    desc: "By invitation. Direct mentoring, Soul Blueprint readings, and initiatory work with Daniel.",
  },
];

const GATES_PREVIEW = [
  { num: "I", name: "The Gate of Foundation", realm: "Identity & Sovereignty" },
  { num: "II", name: "The Gate of Desire", realm: "Eros & Sacred Sexuality" },
  { num: "III", name: "The Gate of Power", realm: "Will & Masculine Force" },
  { num: "IV", name: "The Gate of Devotion", realm: "Heart & Relational Depth" },
  { num: "V", name: "The Gate of Integration", realm: "Shadow & Wholeness" },
  { num: "VI–XII", name: "The Higher Gates", realm: "Revealed through practice" },
];

export default function The33rdHouseScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <AppShell showBack title="The 33rd House">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero — Gold Shield Crest on black */}
        <View style={styles.crestHero}>
          <Image
            source={IMAGES.the33rdHouse.crest}
            style={styles.crestImage}
            contentFit="contain"
            transition={600}
          />
        </View>


        <View style={styles.section}>
          <Text style={[styles.subtitleText, { color: colors.muted }]}>
            {THE_33RD_HOUSE.subtitle}
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          {THE_33RD_HOUSE.description.split("\n\n").map((p, i) => (
            <Text
              key={i}
              style={[
                styles.body,
                { color: colors.muted, marginBottom: 16 },
              ]}
            >
              {p}
            </Text>
          ))}
        </View>

        <SectionDivider />

        {/* Photo hero below description */}
        <View style={styles.photoHero}>
          <Image
            source={IMAGES.temple}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            contentPosition="center"
            transition={500}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.1)", "rgba(10,10,10,0.7)", colors.background]}
            locations={[0.2, 0.65, 1]}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        {/* The Gate System */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            THE GATE SYSTEM
          </Text>
          <Text style={[styles.body, { color: colors.muted, marginBottom: 24 }]}>
            12 Gates. 144 Realms. A cosmological map of masculine initiation
            that moves from foundation to transcendence. Each Gate contains 12
            Realms of practice, doctrine, and embodied wisdom.
          </Text>
          {GATES_PREVIEW.map((gate, i) => (
            <View
              key={i}
              style={[styles.gateRow, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.gateNum, { color: colors.primary }]}>
                {gate.num}
              </Text>
              <View style={styles.gateInfo}>
                <Text style={[styles.gateName, { color: colors.foreground }]}>
                  {gate.name}
                </Text>
                <Text style={[styles.gateRealm, { color: colors.muted }]}>
                  {gate.realm}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* Tiers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            THREE TIERS OF ACCESS
          </Text>
          {TIERS.map((tier, i) => (
            <View
              key={i}
              style={[styles.tierCard, { borderColor: colors.border }]}
            >
              <Text style={[styles.tierName, { color: colors.primary }]}>
                {tier.name}
              </Text>
              <Text style={[styles.tierDesc, { color: colors.muted }]}>
                {tier.desc}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* Chartography */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            SOUL BLUEPRINT
          </Text>
          <Text style={[styles.body, { color: colors.muted }]}>
            The Chartography system maps your unique position within the 144
            Realms. A Soul Blueprint reading reveals your dominant Gate, your
            shadow patterns, and your initiatory path forward. This is not
            astrology. It is a living diagnostic built from Daniel's doctrine.
          </Text>
          <View style={{ marginTop: 24 }}>
            <CTAButton
              label="Learn About Soul Blueprints →"
              onPress={() => router.push("/soul-blueprint" as any)}
              variant="ghost"
            />
          </View>
        </View>

        <SectionDivider />

        {/* The Architecture */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            THE ARCHITECTURE
          </Text>
          {THE_33RD_HOUSE.sections.map((item, i) => (
            <View
              key={i}
              style={[
                styles.archCard,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text style={[styles.archText, { color: colors.foreground }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* The Relationship */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            THE RELATIONSHIP
          </Text>
          <Text style={[styles.body, { color: colors.muted }]}>
            Daniel Cruze is the founder and primary practitioner of The 33rd
            House. His private work — the sessions, the mentoring, the
            embodiment practice — is the doorway. The 33rd House is what lies
            beyond.
          </Text>
          <Text
            style={[styles.body, { color: colors.muted, marginTop: 16 }]}
          >
            The two are connected but distinct. This app is the personal
            flagship. The 33rd House is the larger temple, the doctrine
            ecosystem, the world that extends beyond any single practitioner.
          </Text>
        </View>

        <SectionDivider />

        {/* CTAs */}
        <View style={styles.section}>
          <CTAButton
            label="Enter The 33rd House →"
            onPress={() => Linking.openURL("https://the33rdhouse.org")}
            variant="outline"
          />
          <View style={{ height: 16 }} />
          <CTAButton
            label="About Daniel →"
            onPress={() => router.push("/about" as any)}
            variant="ghost"
          />
          <View style={{ height: 16 }} />
          <CTAButton
            label="Make an Enquiry →"
            onPress={() => router.push("/contact" as any)}
            variant="ghost"
          />
        </View>

        {/* Seal */}
        <View style={styles.sealContainer}>
          <Text style={[styles.seal, { color: colors.muted }]}>
            {BRAND.seal}
          </Text>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  crestHero: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 8,
    backgroundColor: "#000000",
  },
  crestImage: {
    width: 220,
    height: 260,
  },

  subtitleText: {
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
  },
  photoHero: {
    width: "100%",
    height: 320,
    position: "relative",
    overflow: "hidden",
  },
  section: { paddingHorizontal: 32, paddingVertical: 8 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 5,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  gateRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    gap: 16,
  },
  gateNum: {
    fontSize: 16,
    fontWeight: "200",
    letterSpacing: 2,
    width: 40,
    textAlign: "center",
  },
  gateInfo: { flex: 1 },
  gateName: {
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 1,
    marginBottom: 4,
  },
  gateRealm: {
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  tierCard: {
    borderWidth: 0.5,
    padding: 20,
    marginBottom: 12,
  },
  tierName: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 4,
    marginBottom: 10,
  },
  tierDesc: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  archCard: {
    paddingVertical: 18,
    borderBottomWidth: 0.5,
  },
  archText: {
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  sealContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  seal: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 4,
    textAlign: "center",
  },
});
