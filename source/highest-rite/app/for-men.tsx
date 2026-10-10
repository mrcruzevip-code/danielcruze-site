import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { SERVICES, ARTICLES, IMAGES, SOCIALS, BRAND } from "@/lib/content";
import { useRouter } from "expo-router";
import { Linking } from "react-native";

export default function ForMenScreen() {
  const colors = useColors();
  const router = useRouter();

  const menServices = SERVICES.filter(
    (s) => s.audience === "men" || s.audience === "all"
  );
  const menArticles = ARTICLES.filter(
    (a) =>
      a.category === "Sacred Masculinity" ||
      a.category === "Men's Work"
  );

  return (
    <AppShell showBack title="For Men">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.forMen}
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
            <Text style={styles.heroTitle}>FOR MEN</Text>
            <Text style={styles.heroSub}>
              Masculine development is not a concept.{"\n"}It is a lived practice.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.body, { color: colors.muted }]}>
            If you have read the books, listened to the podcasts, and still
            feel disconnected from your own masculine power — this work is
            for you. The bridge between knowing and being is not more
            information. It is embodiment.
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            YOUR PATH
          </Text>
          {menServices.map((service) => (
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
            FROM THE JOURNAL
          </Text>
          {menArticles.map((article) => (
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            JOIN THE BROTHERHOOD
          </Text>
          <Text style={[styles.body, { color: colors.muted, textAlign: "center", marginBottom: 24 }]}>
            The Sacred Masculinity Telegram channel is where the conversation continues. Doctrine drops, reflections, and community.
          </Text>
          <CTAButton
            label="Join Sacred Masculinity →"
            onPress={() => Linking.openURL(SOCIALS.telegramChannel.url)}
            variant="ghost"
          />
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
