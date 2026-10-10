import { ScrollView, Text, View, StyleSheet, Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { SERVICES, ARTICLES, IMAGES, SOCIALS, BRAND } from "@/lib/content";
import { useRouter } from "expo-router";

const EXPERIENCE_PILLARS = [
  {
    title: "PRESENCE",
    desc: "The ability to be fully here — not performing, not rushing, not distracted. A man whose attention is a gift.",
  },
  {
    title: "SAFETY",
    desc: "Complete discretion. No judgement. A space where you can exhale, surrender, and be received exactly as you are.",
  },
  {
    title: "DEPTH",
    desc: "Not surface-level connection. Real intimacy — emotional, physical, energetic. The kind most women have stopped believing exists.",
  },
  {
    title: "DEVOTION",
    desc: "Every encounter is held with reverence. Your pleasure, your boundaries, your experience — all sacred.",
  },
];

export default function ForWomenScreen() {
  const colors = useColors();
  const router = useRouter();

  const womenServices = SERVICES.filter(
    (s) => s.audience === "women" || s.audience === "all"
  );
  const womenArticles = ARTICLES.filter(
    (a) =>
      a.category === "Intimacy" ||
      a.category === "Polarity" ||
      a.category === "Relationship Depth"
  );

  return (
    <AppShell showBack title="For Women">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.forWomen}
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
            <Text style={styles.heroTitle}>FOR WOMEN</Text>
            <Text style={styles.heroSub}>
              Luxury intimacy. Erotic depth.{"\n"}The experience of being truly met.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.muted }]}>
            This is not a service in the ordinary sense. It is an experience
            — of being seen, held, and met by a man who has done the work.
            Daniel brings a rare combination of masculine presence, emotional
            intelligence, and physical attunement that most women have stopped
            believing exists.
          </Text>
          <Text style={[styles.body, { color: colors.muted, marginTop: 16 }]}>
            Every encounter is held with complete discretion, safety, and
            devotion to your experience. Pre-booking is preferred. All
            enquiries are handled personally.
          </Text>
        </View>

        <SectionDivider />

        {/* The Experience */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            THE EXPERIENCE
          </Text>
          {EXPERIENCE_PILLARS.map((pillar, i) => (
            <View
              key={i}
              style={[styles.pillarCard, { borderColor: colors.border }]}
            >
              <Text style={[styles.pillarTitle, { color: colors.primary }]}>
                {pillar.title}
              </Text>
              <Text style={[styles.pillarDesc, { color: colors.muted }]}>
                {pillar.desc}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            YOUR PATH
          </Text>
          {womenServices.map((service) => (
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

        {/* Discretion note */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            DISCRETION & BOUNDARIES
          </Text>
          <Text style={[styles.body, { color: colors.muted }]}>
            All enquiries are confidential. Daniel personally reviews every
            submission. Not all enquiries result in a booking — this is
            intentional. The work requires mutual readiness, clear intention,
            and respect for the process.
          </Text>
          <Text style={[styles.body, { color: colors.muted, marginTop: 16, textAlign: "center" }]}>
            {BRAND.locations.join(" · ")}
          </Text>
        </View>

        <SectionDivider />

        {womenArticles.length > 0 && (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                RELATED READING
              </Text>
              {womenArticles.map((article) => (
                <TouchableOpacity
                  key={article.id}
                  onPress={() =>
                    router.push({
                      pathname: "/article/[id]" as any,
                      params: { id: article.id },
                    })
                  }
                  activeOpacity={0.7}
                  style={[styles.articleItem, { borderBottomColor: colors.border }]}
                >
                  <Text
                    style={[styles.articleTitle, { color: colors.foreground }]}
                  >
                    {article.title}
                  </Text>
                  <Text style={[styles.articleExcerpt, { color: colors.muted }]}>
                    {article.excerpt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <SectionDivider />
          </>
        )}

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
  pillarCard: {
    borderWidth: 0.5,
    padding: 20,
    marginBottom: 12,
  },
  pillarTitle: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 4,
    marginBottom: 10,
  },
  pillarDesc: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 22,
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
  articleItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  articleExcerpt: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
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
