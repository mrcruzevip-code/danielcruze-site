import { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
  Platform,
  Linking,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useColors } from "@/hooks/use-colors";
import { DrawerMenu } from "@/components/drawer-menu";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import {
  BRAND,
  SOCIALS,
  BOOKS,
  SERVICES,
  TESTIMONIALS,
  ARTICLES,
  THE_33RD_HOUSE,
  IMAGES,
} from "@/lib/content";
import Animated, {
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";

export default function HomeScreen() {
  const colors = useColors();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const audienceTiles = [
    {
      label: "For Women",
      sub: "Luxury Intimacy\n& Erotic Depth",
      route: "/for-women",
      image: IMAGES.forWomen,
    },
    {
      label: "For Couples",
      sub: "Couples Polarity\n& Tantric Guidance",
      route: "/for-couples",
      image: IMAGES.forCouples,
    },
    {
      label: "For Men",
      sub: "Masculine Embodiment\n& Private Mentoring",
      route: "/for-men",
      image: IMAGES.forMen,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Floating hamburger — appears after scroll */}
      {scrolled && (
        <Animated.View
          entering={FadeIn.duration(300)}
          style={styles.floatingHeader}
        >
          <Text
            style={[styles.floatingTitle, { color: colors.foreground }]}
          >
            DANIEL CRUZE
          </Text>
          <TouchableOpacity
            onPress={() => setDrawerOpen(true)}
            style={styles.hamburgerBtn}
          >
            <View style={{ gap: 5 }}>
              <View
                style={[
                  styles.hamburgerLine,
                  { backgroundColor: colors.foreground },
                ]}
              />
              <View
                style={[
                  styles.hamburgerLineShort,
                  { backgroundColor: colors.foreground },
                ]}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          setScrolled(e.nativeEvent.contentOffset.y > SCREEN_HEIGHT * 0.5);
        }}
        scrollEventThrottle={16}
      >
        {/* ===== SECTION 1: THE THRESHOLD (HERO) ===== */}
        <View
          style={[
            styles.heroSection,
            { minHeight: SCREEN_HEIGHT },
          ]}
        >
          <Image
            source={IMAGES.hero}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            contentPosition="top"
            transition={600}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.15)", "rgba(10,10,10,0.6)", "rgba(10,10,10,0.95)", colors.background]}
            locations={[0, 0.4, 0.75, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <Animated.View
            entering={FadeInDown.duration(800).delay(200)}
            style={styles.heroContent}
          >
            <Text style={[styles.heroName, { color: "#F5F0E8" }]}>
              DANIEL CRUZE
            </Text>
            <Text style={[styles.heroTagline, { color: "rgba(245,240,232,0.7)" }]}>
              {BRAND.tagline}
            </Text>
            <View style={{ marginTop: 40 }}>
              <CTAButton
                label="Enter"
                onPress={() => {
                  scrollRef.current?.scrollTo({ y: SCREEN_HEIGHT, animated: true });
                }}
                variant="outline"
                size="lg"
              />
            </View>
          </Animated.View>

          {/* Subtle hamburger in top-right on hero */}
          <TouchableOpacity
            onPress={() => setDrawerOpen(true)}
            style={styles.heroHamburger}
          >
            <View style={{ gap: 5 }}>
              <View
                style={[
                  styles.hamburgerLine,
                  { backgroundColor: "#F5F0E8", opacity: 0.6 },
                ]}
              />
              <View
                style={[
                  styles.hamburgerLineShort,
                  { backgroundColor: "#F5F0E8", opacity: 0.6 },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== SECTION 2: THE MAN ===== */}
        <View style={styles.imageSection}>
          <Image
            source={IMAGES.theMan}
            style={styles.sectionImage}
            contentFit="contain"
            transition={400}
          />
          <LinearGradient
            colors={["transparent", "rgba(10,10,10,0.7)", colors.background]}
            locations={[0, 0.5, 1]}
            style={styles.sectionImageOverlay}
          />
          <View style={styles.sectionImageContent}>
            <Text style={[styles.sectionQuote, { color: "#F5F0E8" }]}>
              He is not a service.{"\n"}He is a standard.
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.bodyText, { color: colors.muted }]}>
            Italian-Australian. {BRAND.awards.join(". ")}. Founder of The 33rd House. Published author.
          </Text>
          <View style={{ marginTop: 32 }}>
            <CTAButton
              label="About Daniel →"
              onPress={() => router.push("/about" as any)}
              variant="ghost"
            />
          </View>
        </View>

        <SectionDivider />

        {/* ===== SECTION 3: THE FIELD ===== */}
        <View style={styles.imageSection}>
          <Image
            source={IMAGES.sacredMasculinity}
            style={styles.sectionImageTall}
            contentFit="contain"
            transition={400}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.3)", "rgba(10,10,10,0.8)", colors.background]}
            locations={[0, 0.6, 1]}
            style={styles.sectionImageOverlay}
          />
          <View style={styles.sectionImageContentBottom}>
            <Text
              style={[styles.sectionHeader, { color: "#F5F0E8" }]}
            >
              SACRED MASCULINITY
            </Text>
            <Text style={[styles.overlayBody, { color: "rgba(245,240,232,0.8)" }]}>
              The intersection of erotic intelligence, embodied presence, and
              initiated masculine depth.
            </Text>
          </View>
        </View>
        <View style={[styles.section, { paddingTop: 0 }]}>
          <View style={{ marginTop: 16 }}>
            <CTAButton
              label="Enter the Field →"
              onPress={() => router.push("/sacred-masculinity" as any)}
              variant="ghost"
            />
          </View>
        </View>

        <SectionDivider />

        {/* ===== SECTION 4: THE EXPERIENCES ===== */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionHeader, { color: colors.foreground }]}
          >
            PRIVATE WORK
          </Text>
          <View style={styles.tilesContainer}>
            {audienceTiles.map((tile) => (
              <TouchableOpacity
                key={tile.label}
                onPress={() => router.push(tile.route as any)}
                activeOpacity={0.7}
                style={styles.tileWithImage}
              >
                <Image
                  source={tile.image}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="contain"
                  transition={300}
                />
                <LinearGradient
                  colors={["rgba(10,10,10,0.2)", "rgba(10,10,10,0.75)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.tileContent}>
                  <Text style={styles.tileLabelWhite}>
                    {tile.label}
                  </Text>
                  <Text style={styles.tileSubWhite}>
                    {tile.sub}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <SectionDivider />

        {/* ===== SECTION 5: THE BOOKS ===== */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.foreground }]}>
            PUBLISHED WORKS
          </Text>
          <Text style={[styles.bodyText, { color: colors.muted, marginBottom: 32 }]}>
            Doctrine made portable. Wisdom distilled into language that can be lived, not merely read.
          </Text>
          <View style={styles.booksRow}>
            {BOOKS.map((book) => (
              <TouchableOpacity
                key={book.id}
                onPress={() => router.push("/the-books" as any)}
                activeOpacity={0.8}
                style={styles.bookItem}
              >
                <Image
                  source={{ uri: book.coverImage }}
                  style={styles.bookCover}
                  contentFit="contain"
                  transition={400}
                />
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {book.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ marginTop: 24 }}>
            <CTAButton
              label="View All Books →"
              onPress={() => router.push("/the-books" as any)}
              variant="ghost"
            />
          </View>
        </View>

        <SectionDivider />

        {/* ===== SECTION 6: THE PROOF ===== */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionHeader, { color: colors.foreground }]}
          >
            TESTIMONIALS
          </Text>
          {TESTIMONIALS.map((t) => (
            <View
              key={t.id}
              style={[
                styles.testimonialCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.testimonialQuote,
                  { color: colors.foreground },
                ]}
              >
                "{t.quote}"
              </Text>
              <Text
                style={[styles.testimonialAuthor, { color: colors.muted }]}
              >
                — {t.author} · {t.context}
              </Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* ===== SECTION 7: THE JOURNAL ===== */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionHeader, { color: colors.foreground }]}
          >
            FROM THE JOURNAL
          </Text>
          {ARTICLES.slice(0, 3).map((article) => (
            <TouchableOpacity
              key={article.id}
              onPress={() =>
                router.push({
                  pathname: "/article/[id]" as any,
                  params: { id: article.id },
                })
              }
              activeOpacity={0.7}
              style={[
                styles.articleCard,
                {
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.articleCategory,
                  { color: colors.primary },
                ]}
              >
                {article.category}
              </Text>
              <Text
                style={[
                  styles.articleTitle,
                  { color: colors.foreground },
                ]}
              >
                {article.title}
              </Text>
              <Text
                style={[
                  styles.articleExcerpt,
                  { color: colors.muted },
                ]}
              >
                {article.excerpt}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={{ marginTop: 24 }}>
            <CTAButton
              label="Read →"
              onPress={() => router.push("/journal" as any)}
              variant="ghost"
            />
          </View>
        </View>

        <SectionDivider />

        {/* ===== SECTION 8: THE TEMPLE ===== */}
        <View style={styles.imageSection}>
          <Image
            source={IMAGES.temple}
            style={styles.sectionImage}
            contentFit="contain"
            transition={400}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.3)", "rgba(10,10,10,0.85)", colors.background]}
            locations={[0, 0.55, 1]}
            style={styles.sectionImageOverlay}
          />
          <View style={styles.sectionImageContentBottom}>
            <Text
              style={[styles.sectionHeader, { color: "#F5F0E8" }]}
            >
              THE 33RD HOUSE
            </Text>
            <Text style={[styles.overlayBody, { color: "rgba(245,240,232,0.8)" }]}>
              Beyond the private session is a larger initiatory world.{"\n"}A
              system. A doctrine. A map of human consciousness evolution.
            </Text>
          </View>
        </View>
        <View style={[styles.section, { paddingTop: 0 }]}>
          <View style={{ marginTop: 16 }}>
            <CTAButton
              label="Enter the Temple →"
              onPress={() => router.push("/the-33rd-house" as any)}
              variant="ghost"
            />
          </View>
        </View>

        <SectionDivider />

        {/* ===== SECTION 9: THE COMMUNITY ===== */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.foreground }]}>
            THE COMMUNITY
          </Text>
          <Text style={[styles.bodyText, { color: colors.muted, marginBottom: 32 }]}>
            Join the conversation. Sacred Masculinity is not a solo path — it is forged in the presence of other initiated men and the women who hold them accountable.
          </Text>
          <View style={styles.communityLinks}>
            <TouchableOpacity
              onPress={() => Linking.openURL(SOCIALS.telegramChannel.url)}
              activeOpacity={0.7}
              style={styles.communityCard}
            >
              <Text style={styles.communityLabel}>TELEGRAM CHANNEL</Text>
              <Text style={styles.communityName}>Sacred Masculinity</Text>
              <Text style={styles.communityDesc}>Doctrine, teachings, and transmissions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(SOCIALS.telegramGroup.url)}
              activeOpacity={0.7}
              style={styles.communityCard}
            >
              <Text style={styles.communityLabel}>TELEGRAM GROUP</Text>
              <Text style={styles.communityName}>Sacred Masculine</Text>
              <Text style={styles.communityDesc}>Community discussion and brotherhood</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(SOCIALS.telegramPersonal.url)}
              activeOpacity={0.7}
              style={styles.communityCard}
            >
              <Text style={styles.communityLabel}>DIRECT MESSAGE</Text>
              <Text style={styles.communityName}>Daniel Cruze</Text>
              <Text style={styles.communityDesc}>Personal Telegram for private enquiries</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SectionDivider />

        {/* ===== SECTION 10: PRIVATE ENQUIRIES ===== */}
        <View style={styles.imageSection}>
          <Image
            source={IMAGES.contact}
            style={styles.sectionImageShort}
            contentFit="contain"
            contentPosition="top"
            transition={400}
          />
          <LinearGradient
            colors={["rgba(10,10,10,0.2)", "rgba(10,10,10,0.85)", colors.background]}
            locations={[0, 0.6, 1]}
            style={styles.sectionImageOverlay}
          />
          <View style={styles.sectionImageContentBottom}>
            <Text
              style={[styles.sectionHeader, { color: "#F5F0E8" }]}
            >
              PRIVATE ENQUIRIES
            </Text>
            <Text style={[styles.overlayBody, { color: "rgba(245,240,232,0.7)" }]}>
              Bookings are by appointment.{"\n"}Pre-booking is preferred.{"\n"}
              All enquiries are handled with complete discretion.
            </Text>
          </View>
        </View>
        <View style={[styles.section, { paddingTop: 0 }]}>
          <View style={{ marginTop: 16 }}>
            <CTAButton
              label="Make an Enquiry →"
              onPress={() => router.push("/contact" as any)}
              variant="outline"
            />
          </View>
        </View>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <Text style={styles.footerSeal}>{BRAND.seal}</Text>
          <View style={{ height: 16 }} />
          <View style={styles.footerSocialRow}>
            <TouchableOpacity onPress={() => Linking.openURL(SOCIALS.instagram.url)}>
              <Text style={styles.footerLink}>Instagram</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL(SOCIALS.facebook.url)}>
              <Text style={styles.footerLink}>Facebook</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL(SOCIALS.x.url)}>
              <Text style={styles.footerLink}>X</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL(SOCIALS.telegramChannel.url)}>
              <Text style={styles.footerLink}>Telegram</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${BRAND.email}`)}>
            <Text style={styles.footerEmail}>{BRAND.email}</Text>
          </TouchableOpacity>
          <View style={{ height: 12 }} />
          <Text style={styles.footerLocations}>
            {BRAND.locations.join(" · ")}
          </Text>
          <TouchableOpacity onPress={() => router.push("/policies" as any)} activeOpacity={0.7}>
            <Text style={[styles.footerLink, { marginBottom: 8 }]}>Terms & Policies</Text>
          </TouchableOpacity>
          <Text style={styles.footerCopy}>
            {BRAND.copyright}
          </Text>
        </View>
      </ScrollView>

      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  heroContent: {
    alignItems: "center",
    zIndex: 2,
  },
  heroName: {
    fontSize: 28,
    fontWeight: "200",
    letterSpacing: 12,
    textAlign: "center",
    marginBottom: 24,
  },
  heroTagline: {
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 2,
    textAlign: "center",
    lineHeight: 24,
  },
  heroHamburger: {
    position: "absolute",
    top: Platform.OS === "web" ? 20 : 54,
    right: 20,
    padding: 8,
    zIndex: 3,
  },
  floatingHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "web" ? 16 : 54,
    paddingBottom: 12,
    backgroundColor: "rgba(10,10,10,0.95)",
  },
  floatingTitle: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 4,
  },
  hamburgerBtn: {
    padding: 8,
  },
  hamburgerLine: {
    width: 22,
    height: 1,
  },
  hamburgerLineShort: {
    width: 16,
    height: 1,
    alignSelf: "flex-end",
  },
  // Image sections
  imageSection: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  sectionImage: {
    width: "100%",
    aspectRatio: 2 / 3,
    maxHeight: 760,
  },
  sectionImageTall: {
    width: "100%",
    aspectRatio: 3 / 4,
    maxHeight: 700,
  },
  sectionImageShort: {
    width: "100%",
    aspectRatio: 16 / 9,
    maxHeight: 540,
  },
  sectionImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionImageContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  sectionImageContentBottom: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 24,
  },
  overlayBody: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0.5,
    marginTop: 12,
  },
  // Standard sections
  section: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 6,
    textAlign: "center",
    marginBottom: 24,
  },
  sectionQuote: {
    fontSize: 22,
    fontWeight: "200",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 34,
    fontStyle: "italic",
  },
  bodyText: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  // Tiles with images
  tilesContainer: {
    gap: 16,
    marginTop: 8,
  },
  tileWithImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    maxHeight: 340,
    overflow: "hidden",
    position: "relative",
  },
  tileContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 24,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  tileLabelWhite: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 8,
    color: "#F5F0E8",
  },
  tileSubWhite: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
    textAlign: "center",
    letterSpacing: 0.5,
    color: "rgba(245,240,232,0.75)",
  },
  // Books section
  booksRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  bookItem: {
    alignItems: "center",
    width: "44%",
    maxWidth: 180,
  },
  bookCover: {
    width: "100%",
    height: 200,
    marginBottom: 12,
  },
  bookTitle: {
    color: "#F5F0E8",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 18,
  },
  // Community section
  communityLinks: {
    gap: 16,
    width: "100%",
  },
  communityCard: {
    borderWidth: 0.5,
    borderColor: "#1A1A1A",
    padding: 20,
    alignItems: "center",
  },
  communityLabel: {
    color: "#8B2635",
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: "600",
    marginBottom: 8,
  },
  communityName: {
    color: "#F5F0E8",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 2,
    marginBottom: 6,
  },
  communityDesc: {
    color: "#9B9B8F",
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  // Testimonials
  testimonialCard: {
    padding: 24,
    borderWidth: 0.5,
    marginBottom: 16,
  },
  testimonialQuote: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    fontStyle: "italic",
    letterSpacing: 0.3,
  },
  testimonialAuthor: {
    fontSize: 12,
    fontWeight: "300",
    marginTop: 16,
    letterSpacing: 1,
  },
  // Articles
  articleCard: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  articleCategory: {
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  articleTitle: {
    fontSize: 17,
    fontWeight: "300",
    letterSpacing: 0.5,
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 21,
    letterSpacing: 0.3,
  },
  // Footer
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 48,
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
  },
  footerSocialRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  footerLink: {
    color: "#9B9B8F",
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 1,
  },
  footerDot: {
    color: "#4A4A4A",
    fontSize: 12,
  },
  footerEmail: {
    color: "#8B2635",
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 1,
    marginBottom: 12,
  },
  footerLocations: {
    color: "#4A4A4A",
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 1,
    marginBottom: 4,
  },
  footerCopy: {
    color: "#4A4A4A",
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 1,
  },
});
