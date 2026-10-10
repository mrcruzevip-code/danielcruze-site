import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { SERVICES, IMAGES } from "@/lib/content";

export function generateStaticParams() {
  return SERVICES.map(item => ({ id: item.id }));
}

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();

  const service = SERVICES.find((s) => s.id === id);

  // Soul Blueprint has its own dedicated page
  if (id === "soul-blueprint") {
    return <Redirect href="/soul-blueprint" />;
  }

  if (!service) {
    return (
      <AppShell showBack title="Service">
        <View style={styles.centered}>
          <Text style={[styles.body, { color: colors.muted }]}>
            Service not found.
          </Text>
        </View>
      </AppShell>
    );
  }

  const serviceImage = IMAGES.services[service.id] || IMAGES.hero;

  return (
    <AppShell showBack title={service.title}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={serviceImage}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            contentPosition="top"
            transition={500}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.1)", "rgba(10,10,10,0.65)", colors.background]}
            locations={[0.2, 0.6, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>
              {service.title.toUpperCase()}
            </Text>
            <Text style={styles.heroSub}>
              {service.subtitle}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.foreground }]}>
            {service.description}
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            WHAT TO EXPECT
          </Text>
          {service.whatToExpect.map((item, i) => (
            <View key={i} style={styles.expectItem}>
              <Text style={[styles.expectDot, { color: colors.primary }]}>
                ·
              </Text>
              <Text style={[styles.expectText, { color: colors.muted }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            WHO IS THIS FOR
          </Text>
          <Text style={[styles.body, { color: colors.muted }]}>
            {service.whoIsItFor}
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <CTAButton
            label="Make an Enquiry →"
            onPress={() => router.push("/contact" as any)}
            variant="outline"
          />
          <View style={{ height: 16 }} />
          <CTAButton
            label="← All Services"
            onPress={() => router.push("/work-with-daniel" as any)}
            variant="ghost"
          />
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    fontSize: 18,
    fontWeight: "200",
    letterSpacing: 6,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 28,
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
  section: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
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
  expectItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 12,
  },
  expectDot: {
    fontSize: 20,
    lineHeight: 22,
  },
  expectText: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 22,
    flex: 1,
    letterSpacing: 0.3,
  },
});
