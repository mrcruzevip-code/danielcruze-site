import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { CTAButton } from "@/components/cta-button";
import { IMAGES, BRAND } from "@/lib/content";
import { useRouter } from "expo-router";

const INTEREST_OPTIONS = [
  "Private Mentoring",
  "Intimacy Coaching",
  "Masculine Embodiment",
  "Couples Polarity Work",
  "Tantric Guidance",
  "Soul Blueprint Reading",
  "Retreat / Travel",
  "Other",
];

export default function ContactScreen() {
  const colors = useColors();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      if (Platform.OS === "web") {
        alert("Please provide your name and email.");
      } else {
        Alert.alert("Required", "Please provide your name and email.");
      }
      return;
    }

    const subject = interest
      ? `Private Enquiry — ${interest}`
      : "Private Enquiry";

    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      interest ? `Interest: ${interest}` : "",
      "",
      message.trim() || "(No message provided)",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Launching a mail client is NOT proof an enquiry was delivered.
    Linking.openURL(mailto).then(() => {
      setSubmitted(true);
    }).catch(() => {
      const errorMessage = "Unable to open your email app. Please email " + BRAND.email + " directly.";
      if (Platform.OS === "web") {
        alert(errorMessage);
      } else {
        Alert.alert("Email app unavailable", errorMessage);
      }
    });
  };

  if (submitted) {
    return (
      <AppShell showBack title="Contact">
        <View style={styles.centered}>
          <Text style={[styles.thankTitle, { color: colors.foreground }]}>
            EMAIL DRAFT OPENED
          </Text>
          <Text style={[styles.thankBody, { color: colors.muted }]}>
            Your email app should now contain your draft. You must send the
            message yourself. This website cannot confirm receipt until Daniel
            receives your email. If the app did not open, email {BRAND.email} directly.
          </Text>
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell showBack title="Contact">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero image */}
        <View style={styles.heroImage}>
          <Image
            source={IMAGES.contact}
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
            <Text style={styles.heroTitle}>PRIVATE{"\n"}ENQUIRIES</Text>
            <Text style={styles.heroSub}>
              Bookings are by appointment.{"\n"}Pre-booking is preferred.{"\n"}
              All enquiries are handled with complete discretion.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.foreground }]}>
            YOUR NAME
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor={colors.muted}
            style={[
              styles.input,
              {
                color: colors.foreground,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
            returnKeyType="next"
          />

          <Text style={[styles.label, { color: colors.foreground }]}>
            EMAIL
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              {
                color: colors.foreground,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
            returnKeyType="next"
          />

          <Text style={[styles.label, { color: colors.foreground }]}>
            AREA OF INTEREST
          </Text>
          <View style={styles.interestGrid}>
            {INTEREST_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => setInterest(opt)}
                activeOpacity={0.7}
                style={[
                  styles.interestPill,
                  {
                    borderColor:
                      interest === opt
                        ? colors.foreground
                        : colors.border,
                    backgroundColor:
                      interest === opt
                        ? colors.foreground
                        : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.interestText,
                    {
                      color:
                        interest === opt
                          ? colors.background
                          : colors.muted,
                    },
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { color: colors.foreground }]}>
            YOUR MESSAGE
          </Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Tell Daniel about your intention..."
            placeholderTextColor={colors.muted}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            style={[
              styles.textArea,
              {
                color: colors.foreground,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
          />

          <View style={{ marginTop: 32 }}>
            <CTAButton
              label="Open Email Draft"
              onPress={handleSubmit}
              variant="outline"
              size="lg"
            />
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${BRAND.email}`)}
              accessibilityRole="link"
              style={{ alignSelf: "center", marginTop: 20, padding: 8 }}
            >
              <Text style={[styles.directEmail, { color: colors.primary }]}>
                EMAIL DANIEL DIRECTLY · {BRAND.email.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <SectionDivider />

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
          <Text
            style={[
              styles.body,
              { color: colors.muted, marginTop: 16 },
            ]}
          >
            {BRAND.locations.join(" · ")}{"\n"}{BRAND.email}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/policies" as any)}
            activeOpacity={0.7}
            style={{ marginTop: 20 }}
          >
            <Text style={[styles.body, { color: colors.primary, textAlign: "center", fontSize: 12, letterSpacing: 2 }]}>
              VIEW TERMS & POLICIES
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 32,
  },
  thankTitle: {
    fontSize: 18,
    fontWeight: "200",
    letterSpacing: 6,
    textAlign: "center",
    marginBottom: 20,
  },
  thankBody: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0.3,
  },
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
    lineHeight: 34,
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
  label: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 3,
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 0.5,
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 0.5,
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 0.5,
    minHeight: 120,
  },
  interestGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 0.5,
  },
  interestText: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 1,
  },
  directEmail: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 1.5,
    textAlign: "center",
  },
});
