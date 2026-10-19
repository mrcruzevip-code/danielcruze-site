import { ScrollView, Text, View, Linking } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { AppShell } from "@/components/app-shell";
import { CTAButton } from "@/components/cta-button";
import { SectionDivider } from "@/components/section-divider";
import { BOOKS } from "@/lib/content";
import { StyleSheet } from "react-native";
import { useSiteDimensions } from "@/hooks/use-site-dimensions";

export default function TheBooksScreen() {
  const { width } = useSiteDimensions();
  const desktop = width >= 960;

  return (
    <AppShell>
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={[styles.heroSection, desktop && styles.heroSectionDesktop]}>
            <LinearGradient colors={["#0A0A0A", "#1A0A0A", "#0A0A0A"]} style={StyleSheet.absoluteFill} />
            <Text style={styles.heroLabel}>PUBLISHED WORKS</Text>
            <Text style={styles.heroTitle}>THE BOOKS</Text>
            <Text style={styles.heroSubtitle}>
              Doctrine made portable. Wisdom distilled into language that can be lived, not merely read.
            </Text>
          </View>

          <SectionDivider />

          {BOOKS.map((book, index) => (
            <View key={book.id}>
              <View style={[styles.bookCard, desktop && styles.bookCardDesktop]}>
                <View style={[styles.coverContainer, desktop && styles.coverContainerDesktop]}>
                  <Image source={{ uri: book.coverImage }} style={styles.coverImage} contentFit="contain" transition={400} />
                </View>
                <View style={[styles.bookInfo, desktop && styles.bookInfoDesktop]}>
                  <Text style={[styles.bookTitle, desktop && styles.bookTitleDesktop]}>{book.title}</Text>
                  <Text style={[styles.bookSubtitle, desktop && styles.bookSubtitleDesktop]}>{book.subtitle}</Text>
                  <View style={styles.dividerLine} />
                  <Text style={[styles.bookDescription, desktop && styles.bookDescriptionDesktop]}>{book.description}</Text>
                  {book.availabilityLabel && (
                    <View style={styles.checkoutBlock}>
                      <Text style={styles.priceLabel}>{book.availabilityLabel}</Text>
                    </View>
                  )}
                  {book.checkoutUrl && (
                    <View style={styles.checkoutBlock}>
                      <Text style={styles.priceLabel}>{book.priceLabel}</Text>
                      {book.secondaryCheckoutUrl ? (
                        <>
                          <CTAButton label="AMAZON KINDLE" onPress={() => Linking.openURL(book.checkoutUrl!)} />
                          <CTAButton label="STRIPE CHECKOUT" onPress={() => Linking.openURL(book.secondaryCheckoutUrl!)} />
                        </>
                      ) : (
                        <CTAButton label="SECURE CHECKOUT" onPress={() => Linking.openURL(book.checkoutUrl!)} />
                      )}
                    </View>
                  )}
                </View>
              </View>
              {index < BOOKS.length - 1 && <SectionDivider />}
            </View>
          ))}
        </ScrollView>
      </ScreenContainer>
    </AppShell>
  );
}
