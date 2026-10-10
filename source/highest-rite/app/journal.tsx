import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { ARTICLES, JOURNAL_CATEGORIES, IMAGES } from "@/lib/content";
import { useRouter } from "expo-router";

export default function JournalScreen() {
  const colors = useColors();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? ARTICLES.filter((a) => a.category === activeCategory)
    : ARTICLES;

  return (
    <AppShell showBack title="Journal">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.journal}
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
            <Text style={styles.heroTitle}>THE JOURNAL</Text>
            <Text style={styles.heroSub}>
              Thought leadership. Doctrine. Depth.
            </Text>
          </View>
        </View>

        {/* Category filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory(null)}
            activeOpacity={0.7}
            style={[
              styles.categoryPill,
              {
                borderColor: !activeCategory
                  ? colors.foreground
                  : colors.border,
                backgroundColor: !activeCategory
                  ? colors.foreground
                  : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: !activeCategory
                    ? colors.background
                    : colors.muted,
                },
              ]}
            >
              ALL
            </Text>
          </TouchableOpacity>
          {JOURNAL_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.7}
              style={[
                styles.categoryPill,
                {
                  borderColor:
                    activeCategory === cat
                      ? colors.foreground
                      : colors.border,
                  backgroundColor:
                    activeCategory === cat
                      ? colors.foreground
                      : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      activeCategory === cat
                        ? colors.background
                        : colors.muted,
                  },
                ]}
              >
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 16 }} />

        {/* Sacred Teachings */}
        <View style={styles.section}>
          <Text style={styles.teachingsLabel}>SACRED TEACHINGS</Text>
          <Text style={styles.teachingsSub}>
            Deep esoteric doctrine from The 33rd House. Gateway transmissions for the initiated.
          </Text>
          <View style={{ gap: 12, marginTop: 16, marginBottom: 8 }}>
            <TouchableOpacity
              onPress={() => router.push("/decoding-cosmos" as any)}
              activeOpacity={0.7}
              style={[
                styles.teachingCard,
                { borderColor: "rgba(212,175,55,0.25)" },
              ]}
            >
              <View style={styles.teachingCardInner}>
                <View style={[styles.teachingIcon, { backgroundColor: "rgba(212,175,55,0.12)" }]}>
                  <Text style={{ fontSize: 22 }}>{"\u2726"}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.teachingTitle}>Decoding the Cosmos</Text>
                  <Text style={styles.teachingDesc}>
                    The 144 Realms of Consciousness — 13 Gates {"\u00D7"} 12 Realms. The complete map of human experience.
                  </Text>
                </View>
                <Text style={{ color: "#D4AF37", fontSize: 16 }}>{"\u203A"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/beyond-duality" as any)}
              activeOpacity={0.7}
              style={[
                styles.teachingCard,
                { borderColor: "rgba(155,89,182,0.25)" },
              ]}
            >
              <View style={styles.teachingCardInner}>
                <View style={[styles.teachingIcon, { backgroundColor: "rgba(155,89,182,0.12)" }]}>
                  <Text style={{ fontSize: 22 }}>{"\u2696"}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.teachingTitle, { color: "#bb86fc" }]}>Beyond Duality</Text>
                  <Text style={styles.teachingDesc}>
                    Christ Consciousness vs. Christian Religion — The Alchemical Marriage of Opposites.
                  </Text>
                </View>
                <Text style={{ color: "#bb86fc", fontSize: 16 }}>{"\u203A"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <SectionDivider />

        {/* Articles */}
        <View style={styles.section}>
          {filtered.map((article) => (
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
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[styles.articleCategory, { color: colors.primary }]}
              >
                {article.category.toUpperCase()}
              </Text>
              <Text
                style={[styles.articleTitle, { color: colors.foreground }]}
              >
                {article.title}
              </Text>
              <Text
                style={[styles.articleExcerpt, { color: colors.muted }]}
              >
                {article.excerpt}
              </Text>
              <Text
                style={[styles.articleMeta, { color: colors.muted }]}
              >
                {article.readTime} read
              </Text>
            </TouchableOpacity>
          ))}

          {filtered.length === 0 && (
            <Text
              style={[
                styles.emptyText,
                { color: colors.muted },
              ]}
            >
              No articles in this category yet.
            </Text>
          )}
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: "100%",
    aspectRatio: 16 / 9,
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
  categoryRow: {
    paddingHorizontal: 32,
    paddingTop: 16,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 0.5,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 2,
  },
  section: { paddingHorizontal: 32 },
  articleCard: {
    padding: 24,
    borderWidth: 0.5,
    marginBottom: 16,
  },
  articleCategory: {
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 3,
    marginBottom: 8,
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
    marginBottom: 12,
  },
  articleMeta: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 1,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "300",
    textAlign: "center",
    paddingVertical: 40,
  },
  teachingsLabel: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 4,
    color: "#D4AF37",
    marginBottom: 8,
  },
  teachingsSub: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 21,
    color: "rgba(245,240,232,0.5)",
  },
  teachingCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    backgroundColor: "rgba(20,20,20,0.8)",
  },
  teachingCardInner: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 14,
  },
  teachingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  teachingTitle: {
    fontSize: 15,
    fontWeight: "400" as const,
    letterSpacing: 0.5,
    color: "#D4AF37",
    marginBottom: 4,
  },
  teachingDesc: {
    fontSize: 12,
    fontWeight: "300" as const,
    lineHeight: 18,
    color: "#8a8a8a",
  },
});
