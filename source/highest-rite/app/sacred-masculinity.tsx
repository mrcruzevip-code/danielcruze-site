import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { SACRED_MASCULINITY_PRINCIPLES, IMAGES, BRAND } from "@/lib/content";
import { useRouter } from "expo-router";

const ESOTERIC_PILLARS = [
  {
    title: "KUNDALINI AWAKENING",
    body: "The dormant serpent energy at the base of the spine. When awakened through disciplined practice — not force — it rises through the chakra system, dissolving blockages and igniting states of consciousness most men never access. This is the engine of sacred sexuality.",
  },
  {
    title: "THE MILK & HONEY PATH",
    body: "An ancient alchemical metaphor for the refinement of sexual energy. Milk represents the raw vital force; Honey is its transmuted form — creative power, spiritual clarity, and magnetic presence. The path teaches men to channel desire rather than be consumed by it.",
  },
  {
    title: "THE CHRISTOS OIL",
    body: "The sacred secretion that rises through the spinal column during deep states of retention and meditation. Known across traditions as the 'oil of anointing,' it is the biological basis of spiritual illumination. Daniel's work integrates this ancient knowledge into modern masculine practice.",
  },
];

export default function SacredMasculinityScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <AppShell showBack title="Sacred Masculinity">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.sacredMasculinity}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            contentPosition="top"
            transition={500}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.2)", "rgba(10,10,10,0.7)", colors.background]}
            locations={[0.2, 0.65, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>SACRED{"\n"}MASCULINITY</Text>
            <Text style={styles.heroSub}>
              The intersection of erotic intelligence,{"\n"}embodied presence, and initiated{"\n"}masculine depth.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.muted }]}>
            Sacred masculinity is not a trend, a hashtag, or a weekend
            workshop. It is the lived practice of a man who has done the work
            — who has faced his shadow, claimed his sovereignty, and learned
            to hold space without flinching.
          </Text>
          <Text style={[styles.body, { color: colors.muted, marginTop: 16 }]}>
            It is the capacity to be both fierce and tender, both commanding
            and devoted. It is what happens when a man stops performing
            strength and starts embodying it.
          </Text>
        </View>

        <SectionDivider />

        {/* Esoteric Pillars */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            THE ESOTERIC PILLARS
          </Text>
          <Text style={[styles.body, { color: colors.muted, marginBottom: 24 }]}>
            Daniel's work draws from three ancient streams of initiatory
            knowledge, integrated into a modern framework for embodied
            masculine transformation.
          </Text>
          {ESOTERIC_PILLARS.map((pillar, i) => (
            <View
              key={i}
              style={[styles.pillarCard, { borderColor: colors.border }]}
            >
              <Text style={[styles.pillarTitle, { color: colors.primary }]}>
                {pillar.title}
              </Text>
              <Text style={[styles.pillarBody, { color: colors.muted }]}>
                {pillar.body}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* The 12 Principles */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            THE 12 PRINCIPLES
          </Text>
          {SACRED_MASCULINITY_PRINCIPLES.map((p, i) => (
            <View
              key={i}
              style={[
                styles.principleCard,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[styles.principleTitle, { color: colors.foreground }]}
              >
                {p.title}
              </Text>
              <Text style={[styles.principleDesc, { color: colors.muted }]}>
                {p.description}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* Connection to Books */}
        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.muted, textAlign: "center", fontStyle: "italic" }]}>
            "The 12 Sacred Principles are not rules. They are thresholds.
            Each one opens a gate to deeper practice."
          </Text>
          <View style={{ marginTop: 24 }}>
            <CTAButton
              label="View the Books →"
              onPress={() => router.push("/the-books" as any)}
              variant="ghost"
            />
          </View>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <CTAButton
            label="Work With Daniel →"
            onPress={() => router.push("/work-with-daniel" as any)}
            variant="outline"
          />
          <View style={{ height: 16 }} />
          <CTAButton
            label="Read the Journal →"
            onPress={() => router.push("/journal" as any)}
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
  heroImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    maxHeight: 720,
    position: "relative",
    overflow: "hidden",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 32,
    paddingHorizontal: 32,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "200",
    letterSpacing: 8,
    textAlign: "center",
    marginBottom: 16,
    color: "#F5F0E8",
    lineHeight: 34,
  },
  heroSub: {
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 22,
    color: "rgba(245,240,232,0.7)",
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
  pillarCard: {
    borderWidth: 0.5,
    padding: 20,
    marginBottom: 16,
  },
  pillarTitle: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 4,
    marginBottom: 12,
  },
  pillarBody: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  principleCard: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  principleTitle: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  principleDesc: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 22,
    letterSpacing: 0.3,
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
