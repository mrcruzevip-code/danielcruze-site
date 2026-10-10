import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { SERVICES, IMAGES } from "@/lib/content";
import { useRouter } from "expo-router";

export default function WorkWithDanielScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <AppShell showBack title="Work With Daniel">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.workWithDaniel}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            contentPosition="top"
            transition={500}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.15)", "rgba(10,10,10,0.7)", colors.background]}
            locations={[0.2, 0.65, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>WORK WITH{"\n"}DANIEL</Text>
            <Text style={styles.heroSub}>
              Every path begins with a single enquiry.{"\n"}Choose the work that calls to you.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.muted }]}>
            The work is not one-size-fits-all. Each offering is designed for
            a specific need, a specific depth, a specific threshold. Whether
            you come as a woman seeking intimacy, a man seeking embodiment,
            or a couple seeking polarity — the path is yours to choose.
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() =>
                router.push({
                  pathname: "/service/[id]" as any,
                  params: { id: service.id },
                })
              }
              activeOpacity={0.7}
              style={[
                styles.serviceCard,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[styles.serviceTitle, { color: colors.foreground }]}
              >
                {service.title}
              </Text>
              <Text
                style={[styles.serviceSub, { color: colors.muted }]}
              >
                {service.subtitle}
              </Text>
              <Text
                style={[styles.serviceArrow, { color: colors.primary }]}
              >
                Explore →
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            HOW TO CHOOSE
          </Text>
          <Text style={[styles.body, { color: colors.muted }]}>
            If you are unsure which path is right for you, begin with a
            private enquiry. Daniel will guide you to the work that matches
            your need, your readiness, and your intention.
          </Text>
          <View style={{ marginTop: 32 }}>
            <CTAButton
              label="Make an Enquiry →"
              onPress={() => router.push("/contact" as any)}
              variant="outline"
            />
          </View>
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
  serviceCard: {
    paddingVertical: 24,
    borderBottomWidth: 0.5,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  serviceSub: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  serviceArrow: {
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 2,
  },
});
