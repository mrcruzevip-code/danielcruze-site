import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AppShell } from "@/components/app-shell";
import { CTAButton } from "@/components/cta-button";
import { useColors } from "@/hooks/use-colors";
import { BOOKS, BRAND, IMAGES } from "@/lib/content";
import qrManifest from "@/data/qr-commerce.json";

type QrKind = "gold" | "temple";

const publicBookIds = new Set(["path-of-transformation", "12-sacred-principles"]);

export function QrCommerceLanding({ kind }: { kind: QrKind }) {
  const colors = useColors();
  const router = useRouter();
  const entry = qrManifest.codes.find((code) => code.id === kind);

  if (!entry) {
    return (
      <AppShell showBack title="QR Collection">
        <View style={styles.page}>
          <Text style={{ color: colors.foreground }}>This collection is unavailable.</Text>
        </View>
      </AppShell>
    );
  }

  const isTemple = kind === "temple";
  const intro = isTemple
    ? "An introduction to The 33rd House and its 12 × 12 Gate framework. The central Spirit is the unifying principle. Member-only experiences and paid subscriptions are not active on this QR route."
    : "Explore Daniel Cruze's public educational writing, including The Path of Transformation and 12 Sacred Principles. Browse the existing catalogue; this QR route does not create or activate any new checkout.";
  const image = isTemple ? IMAGES.the33rdHouse.crest : IMAGES.books.sacredPrinciples;

  return (
    <AppShell showBack title={entry.title}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>
          {isTemple ? "THE 33RD HOUSE" : "DANIEL CRUZE • PUBLICATIONS"}
        </Text>
        <Text accessibilityRole="header" style={[styles.heading, { color: colors.foreground }]}>
          {entry.title}
        </Text>
        <Text style={[styles.description, { color: colors.muted }]}>{intro}</Text>

        <View style={[styles.imageFrame, { borderColor: colors.border }]}>
          <Image
            source={image}
            contentFit="contain"
            accessibilityLabel={isTemple ? "The 33rd House original crest" : "12 Sacred Principles existing book cover"}
            style={styles.image}
          />
        </View>

        <View style={[styles.notice, { borderColor: colors.border }]}>
          <Text style={[styles.noticeText, { color: colors.muted }]}>
            PREVIEW ONLY — No new QR checkout, subscription or restricted-content access is enabled.
          </Text>
        </View>

        {isTemple ? (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Explore the framework</Text>
            <Text style={[styles.description, { color: colors.muted }]}>
              Learn about the Gate architecture and the vision behind the Digital Temple.
              Membership registration, pricing and protected access require separate verification and approval.
            </Text>
            <View style={styles.action}>
              <CTAButton
                label="Discover The 33rd House"
                onPress={() => router.push("/the-33rd-house" as any)}
                variant="outline"
              />
            </View>
          </>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Featured publications</Text>
            {BOOKS.filter((book) => publicBookIds.has(book.id)).map((book) => (
              <View key={book.id} style={[styles.bookCard, { borderColor: colors.border }]}>
                <Text style={[styles.bookTitle, { color: colors.foreground }]}>{book.title}</Text>
                <Text style={[styles.bookSubtitle, { color: colors.muted }]}>{book.subtitle}</Text>
              </View>
            ))}
            <View style={styles.action}>
              <CTAButton
                label="Browse Existing Books"
                onPress={() => router.push("/books" as any)}
                variant="outline"
              />
            </View>
          </>
        )}

        <Text style={[styles.seal, { color: colors.muted }]}>{BRAND.seal}</Text>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 72,
    gap: 18,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 3,
    textAlign: "center",
  },
  heading: {
    fontSize: 29,
    fontWeight: "300",
    letterSpacing: 1,
    lineHeight: 37,
    textAlign: "center",
  },
  description: {
    maxWidth: 610,
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 25,
    textAlign: "center",
  },
  imageFrame: {
    width: "100%",
    maxWidth: 360,
    aspectRatio: 1,
    borderWidth: 1,
    padding: 20,
    backgroundColor: "#111018",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  notice: {
    maxWidth: 610,
    width: "100%",
    borderWidth: 1,
    padding: 15,
  },
  noticeText: {
    fontSize: 11,
    lineHeight: 19,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 14,
  },
  bookCard: {
    width: "100%",
    maxWidth: 580,
    borderWidth: 1,
    padding: 18,
    gap: 8,
  },
  bookTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    textAlign: "center",
  },
  bookSubtitle: {
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
  },
  action: {
    marginTop: 7,
    marginBottom: 18,
  },
  seal: {
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 24,
    textAlign: "center",
  },
});
