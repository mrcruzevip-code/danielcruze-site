import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { SERVICES, IMAGES, BRAND } from "@/lib/content";
import { useRouter } from "expo-router";

const FAQ = [
  {
    q: "Is this therapy?",
    a: "No. This is embodiment and polarity work. It is experiential, not clinical. Daniel is not a therapist — he is a practitioner of sacred masculine arts.",
  },
  {
    q: "What are the boundaries?",
    a: "All boundaries are discussed before any session begins. Consent, safety, and discretion are non-negotiable foundations of the work.",
  },
  {
    q: "Do both partners need to attend?",
    a: "Ideally, yes. However, individual sessions can be arranged as preparation for couples work.",
  },
  {
    q: "How do we begin?",
    a: "Submit a private enquiry. Daniel will respond personally to discuss your needs, readiness, and the right path forward.",
  },
];

export default function ForCouplesScreen() {
  const colors = useColors();
  const router = useRouter();

  const couplesServices = SERVICES.filter(
    (s) => s.audience === "couples" || s.audience === "all"
  );

  return (
    <AppShell showBack title="For Couples">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.forCouples}
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
            <Text style={styles.heroTitle}>FOR COUPLES</Text>
            <Text style={styles.heroSub}>
              Restoring the magnetic field{"\n"}between partners.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.muted }]}>
            When the polarity fades, desire fades with it. Couples polarity
            work restores the energetic dynamic between masculine and
            feminine — the tension, the pull, the devotion that transforms
            roommates back into lovers.
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            YOUR PATH
          </Text>
          {couplesServices.map((service) => (
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
              <Text style={[styles.serviceSub, { color: colors.muted }]}>
                {service.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            FREQUENTLY ASKED
          </Text>
          {FAQ.map((item, i) => (
            <View
              key={i}
              style={[
                styles.faqCard,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text style={[styles.faqQ, { color: colors.foreground }]}>
                {item.q}
              </Text>
              <Text style={[styles.faqA, { color: colors.muted }]}>
                {item.a}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <CTAButton
            label="Make a Private Enquiry →"
            onPress={() => router.push("/contact" as any)}
            variant="outline"
          />
          <View style={{ height: 16 }} />
          <CTAButton
            label="View the Books →"
            onPress={() => router.push("/the-books" as any)}
            variant="ghost"
          />
        </View>

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
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  serviceSub: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
  },
  faqCard: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  faqQ: {
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  faqA: {
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
