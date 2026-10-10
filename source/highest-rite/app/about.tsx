import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { BRAND, IMAGES, BOOKS } from "@/lib/content";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <AppShell showBack title="About">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero portrait */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.aboutPortrait}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            contentPosition="top"
            transition={500}
          />
          <LinearGradient
            colors={["transparent", "rgba(10,10,10,0.6)", colors.background]}
            locations={[0.3, 0.7, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>ABOUT DANIEL</Text>
            <Text style={styles.heroSub}>
              The man behind the work.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.muted }]}>
            {BRAND.fullBio}
          </Text>
        </View>

        <SectionDivider />

        {/* Second image */}
        <View style={styles.inlineImage}>
          <Image
            source={IMAGES.aboutSecondary}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            contentPosition="top"
            transition={400}
          />
          <LinearGradient
            colors={["transparent", "rgba(10,10,10,0.7)"]}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            RECOGNITION
          </Text>
          {BRAND.awards.map((award, i) => (
            <View
              key={i}
              style={[
                styles.awardCard,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text style={[styles.awardText, { color: colors.foreground }]}>
                {award}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            PHILOSOPHY
          </Text>
          <Text style={[styles.body, { color: colors.muted }]}>
            {BRAND.philosophy}
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            BASED IN
          </Text>
          <Text style={[styles.bodyCenter, { color: colors.muted }]}>
            {BRAND.locations.join(" · ")}
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            PUBLISHED AUTHOR
          </Text>
          <Text style={[styles.body, { color: colors.muted, textAlign: "center", marginBottom: 24 }]}>
            Daniel’s doctrine is not only lived — it is written. His published works distill years of initiatory experience into language that transforms.
          </Text>
          <CTAButton
            label="View Books →"
            onPress={() => router.push("/the-books" as any)}
            variant="ghost"
          />
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
    marginBottom: 12,
    color: "#F5F0E8",
  },
  heroSub: {
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 22,
    color: "rgba(245,240,232,0.7)",
  },
  inlineImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    maxHeight: 760,
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
  bodyCenter: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    letterSpacing: 2,
    textAlign: "center",
  },
  awardCard: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  awardText: {
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 0.5,
    lineHeight: 22,
  },
});
