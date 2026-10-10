import { ScrollView, Text, View, Linking } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { AppShell } from "@/components/app-shell";
import { CTAButton } from "@/components/cta-button";
import { SectionDivider } from "@/components/section-divider";
import { BOOKS, BRAND, LIVE_BOOK_CHECKOUTS, SOCIALS } from "@/lib/content";
import { StyleSheet } from "react-native";

export default function TheBooksScreen() {
  return (
    <AppShell>
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {/* Hero */}
          <View style={styles.heroSection}>
            <LinearGradient
              colors={["#0A0A0A", "#1A0A0A", "#0A0A0A"]}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.heroLabel}>PUBLISHED WORKS</Text>
            <Text style={styles.heroTitle}>THE BOOKS</Text>
            <Text style={styles.heroSubtitle}>
              Doctrine made portable. Wisdom distilled into language that can be lived, not merely read.
            </Text>
          </View>

          <SectionDivider />

          {/* Book Cards */}
          {BOOKS.map((book, index) => (
            <View key={book.id}>
              <View style={styles.bookCard}>
                <View style={styles.coverContainer}>
                  <Image
                    source={{ uri: book.coverImage }}
                    style={styles.coverImage}
                    contentFit="contain"
                    transition={400}
                  />
                </View>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookSubtitle}>{book.subtitle}</Text>
                  <View style={styles.dividerLine} />
                  <Text style={styles.bookDescription}>{book.description}</Text>
                  {book.checkoutUrl && (
                    <View style={styles.checkoutBlock}>
                      <Text style={styles.priceLabel}>{book.priceLabel}</Text>
                      <CTAButton
                        label="SECURE CHECKOUT"
                        onPress={() => Linking.openURL(book.checkoutUrl!)}
                      />
                    </View>
                  )}
                </View>
              </View>
              {index < BOOKS.length - 1 && <SectionDivider />}
            </View>
          ))}

          <SectionDivider />

          {/* Existing written transmissions with verified live checkout */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE TREASURY</Text>
            <Text style={styles.sectionTitle}>Further Transmissions</Text>
            {LIVE_BOOK_CHECKOUTS.map((book) => (
              <View key={book.id} style={styles.treasuryCard}>
                <Text style={styles.treasuryTitle}>{book.title}</Text>
                <Text style={styles.treasuryDescription}>{book.description}</Text>
                <Text style={styles.priceLabel}>{book.priceLabel}</Text>
                <CTAButton
                  label="SECURE CHECKOUT"
                  onPress={() => Linking.openURL(book.checkoutUrl)}
                />
              </View>
            ))}
          </View>

          <SectionDivider />

          {/* Star Gate Series Reference */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE LARGER BODY OF WORK</Text>
            <Text style={styles.sectionTitle}>The Star Gate Series</Text>
            <Text style={styles.sectionBody}>
              Beyond these published volumes lies a larger body of work — over 60 volumes spanning the 12-Gate, 144-Realm consciousness system of The 33rd House. The Star Gate series maps the complete architecture of human transformation, from primal awakening through transcendent integration.
            </Text>
            <Text style={styles.sectionBody}>
              These works are available through The 33rd House platform for members at the Seeker, Initiate, and Elder tiers.
            </Text>
            <CTAButton
              label="EXPLORE THE 33RD HOUSE"
              onPress={() => Linking.openURL(SOCIALS.the33rdHouse.url)}
            />
          </View>

          <SectionDivider />

          {/* Author Note */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>FROM THE AUTHOR</Text>
            <Text style={styles.authorQuote}>
              "I did not write these books to be admired. I wrote them because the path I walked had no map — and I decided that the men and women who came after me deserved one."
            </Text>
            <Text style={styles.authorAttribution}>— Daniel Cruze</Text>
          </View>

          <SectionDivider />

          {/* CTA */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Begin the Path</Text>
            <Text style={styles.sectionBody}>
              For enquiries about the books, bulk orders, or speaking engagements, contact Daniel directly.
            </Text>
            <CTAButton
              label="PRIVATE ENQUIRY"
              onPress={() => Linking.openURL(`mailto:${BRAND.email}`)}
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
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 48,
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
    fontSize: 36,
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
    maxWidth: 320,
  },
  bookCard: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  coverContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  coverImage: {
    width: "100%",
    maxWidth: 220,
    aspectRatio: 2 / 3,
    borderRadius: 4,
  },
  bookInfo: {
    alignItems: "center",
  },
  bookTitle: {
    color: "#F5F0E8",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 8,
  },
  bookSubtitle: {
    color: "#8B2635",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 16,
  },
  dividerLine: {
    width: 40,
    height: 1,
    backgroundColor: "#8B2635",
    marginBottom: 16,
  },
  bookDescription: {
    color: "#9B9B8F",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
  checkoutBlock: {
    alignItems: "center",
    marginTop: 24,
  },
  priceLabel: {
    color: "#8B2635",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 14,
  },
  treasuryCard: {
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#2A2520",
    marginTop: 24,
    paddingTop: 24,
  },
  treasuryTitle: {
    color: "#F5F0E8",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.8,
    lineHeight: 26,
    marginBottom: 12,
    textAlign: "center",
  },
  treasuryDescription: {
    color: "#9B9B8F",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
    textAlign: "center",
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
  sectionBody: {
    color: "#9B9B8F",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  authorQuote: {
    color: "#F5F0E8",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  authorAttribution: {
    color: "#8B2635",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2,
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
