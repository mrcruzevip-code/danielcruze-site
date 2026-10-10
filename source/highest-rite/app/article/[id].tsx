import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { ARTICLES } from "@/lib/content";



export function generateStaticParams() {
  return ARTICLES.map(item => ({ id: item.id }));
}

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();

  const article = ARTICLES.find((a) => a.id === id);
  const relatedArticles = ARTICLES.filter(
    (a) => a.id !== id
  ).slice(0, 2);

  if (!article) {
    return (
      <AppShell showBack title="Article">
        <View style={styles.centered}>
          <Text style={[styles.body, { color: colors.muted }]}>
            Article not found.
          </Text>
        </View>
      </AppShell>
    );
  }

  const bodyText = article.body || article.excerpt;

  return (
    <AppShell showBack title="Journal">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View style={styles.hero}>
          <Text style={[styles.category, { color: colors.primary }]}>
            {article.category.toUpperCase()}
          </Text>
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>
            {article.title}
          </Text>
          {article.subtitle ? (
            <Text
              style={[
                styles.subtitle,
                { color: colors.muted },
              ]}
            >
              {article.subtitle}
            </Text>
          ) : null}
          <Text style={[styles.meta, { color: colors.muted }]}>
            {article.readTime} read
          </Text>
        </View>

        <SectionDivider />

        <View style={styles.section}>
          {bodyText.split("\n\n").map((paragraph, i) => (
            <Text
              key={i}
              style={[
                styles.body,
                { color: colors.foreground, marginBottom: 16 },
              ]}
            >
              {paragraph}
            </Text>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            RELATED
          </Text>
          {relatedArticles.map((related) => (
            <TouchableOpacity
              key={related.id}
              onPress={() =>
                router.push({
                  pathname: "/article/[id]" as any,
                  params: { id: related.id },
                })
              }
              activeOpacity={0.7}
              style={[
                styles.relatedCard,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  styles.relatedTitle,
                  { color: colors.foreground },
                ]}
              >
                {related.title}
              </Text>
              <Text
                style={[styles.relatedExcerpt, { color: colors.muted }]}
              >
                {related.excerpt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionDivider />

        <View style={styles.section}>
          <CTAButton
            label="← Back to Journal"
            onPress={() => router.push("/journal" as any)}
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
  hero: {
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
  },
  category: {
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 3,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "200",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "300",
    fontStyle: "italic" as const,
    letterSpacing: 0.3,
    textAlign: "center" as const,
    marginBottom: 16,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  meta: {
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 1,
  },
  section: { paddingHorizontal: 32 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "300",
    letterSpacing: 5,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  relatedCard: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  relatedExcerpt: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
  },
});
