import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { useRouter } from "expo-router";

// ── SECTION DATA ──────────────────────────────────────────
interface Section {
  id: string;
  title: string;
  content: string[];
  highlight?: string;
}

const SECTIONS: Section[] = [
  {
    id: "duality-trap",
    title: "I. The Duality Trap",
    highlight: "The real question is not 'Is this from Christ or the Devil?' — The real question is: 'Is this from my authentic divine nature, or from fear-based programming?'",
    content: [
      "Religious institutions have historically maintained power through a simple binary: Good vs. Evil, Christ vs. Devil, Light vs. Dark, Heaven vs. Hell, Obedience vs. Rebellion, Church Authority vs. Personal Gnosis, Faith vs. Knowledge, Submission vs. Sovereignty.",
      "The trick: If you can make people afraid of being 'on the wrong side,' you can control what they explore, what they believe, and what power they claim.",
      "This binary thinking is not spiritual truth — it is a control mechanism. Every wisdom tradition that has been institutionalized has used some version of this duality to maintain authority over direct spiritual experience.",
      "The 33rd House teaches a third path: integration. Not choosing one side over the other, but recognizing that both polarities are expressions of the same divine source, and that wholeness requires embracing both."
    ]
  },
  {
    id: "christ-consciousness",
    title: "III. Christ Consciousness vs. Christian Religion",
    highlight: "The Christ consciousness is about LIBERATION. The religious system is about CONTROL.",
    content: [
      "What the historical Yeshua (Jesus) actually taught stands in stark contrast to what institutional Christianity became:",
      "'The kingdom of God is within you.' (Luke 17:21) — Not in a church, not in a priest, not in a book — WITHIN YOU.",
      "'You are gods.' (John 10:34, quoting Psalm 82:6) — He literally told people they have divine nature.",
      "'These works I do, you shall do also, and greater works than these.' (John 14:12) — He expected people to become MORE powerful than him, not worship him.",
      "'I and the Father are one.' (John 10:30) — He demonstrated unity consciousness, not separation.",
      "What the institutional church did with these teachings: Made Christ external — 'You must go through the church to reach God.' Created fear of the self — 'You are a sinner, inherently flawed.' Weaponized the Devil — 'Any power outside church authority is demonic.' Suppressed gnosis — 'Direct spiritual experience is dangerous.' Controlled women — 'The feminine is the gateway to sin.'",
      "True Christ consciousness is: Unity with Source (knowing you are divine), Unconditional love (including yourself), Sovereignty (taking full responsibility for your power), Transmutation (turning suffering into wisdom — the violet flame), and Service (using your gifts to elevate others)."
    ]
  },
  {
    id: "devil-archetype",
    title: "IV. The Devil Archetype: What It Really Represents",
    highlight: "When you claim your sovereignty, the system calls you 'devil.' When you trust your direct gnosis, religion calls you 'heretic.' When you embody the sacred feminine, patriarchy calls you 'witch.'",
    content: [
      "Devil comes from Greek 'diabolos' meaning 'slanderer,' 'accuser,' and 'one who throws things apart' (dia = apart, ballein = to throw). The devil is the force of separation — separation from your divine nature, your power, your truth, your sovereignty, your body/sexuality, and the feminine.",
      "Lucifer means 'light-bearer' (lux = light, ferre = to carry). The story of Lucifer's fall is about: Questioning authority (he challenged God's absolute rule), Seeking knowledge (he wanted to know, not just obey), and Claiming sovereignty (he said 'I will be my own authority').",
      "This is the same story as: Eve eating from the Tree of Knowledge (seeking wisdom over obedience), Prometheus stealing fire from the gods (bringing divine power to humans), and the Gnostic Sophia (divine feminine wisdom descending into matter).",
      "The real 'devil' is: Fear that keeps you from claiming your power, Shame that makes you believe you're unworthy, Doubt that questions your direct spiritual experience, External authority that tells you to distrust yourself, and Separation consciousness that makes you forget you're divine."
    ]
  },
  {
    id: "evidence",
    title: "V. The Evidence: Tests of Discernment",
    content: [
      "The 'Devil' Test — If spiritual experience were 'demonic,' you would experience: Increasing fear and paranoia, Isolation and secrecy, Harm to self or others, Deception and manipulation, Destruction without creation, Ego inflation.",
      "The 'Christ' Test — If this is Christ consciousness, you would experience: Liberation from fear, Direct connection to Source, Transmutation of suffering, Service to others, Unity consciousness, Embodiment of love.",
      "The Integration Test — The most advanced spiritual understanding: both are relevant. The Devil teaches questioning authority, claiming knowledge, embracing shadow, challenging dogma, owning power. The Christ teaches divine nature, unconditional love, transmutation, unity, and service. They are two sides of the same coin."
    ]
  },
  {
    id: "alchemical-marriage",
    title: "VI. The Alchemical Marriage",
    highlight: "The purple flame is the synthesis — red (passion/blood/earth) + blue (spirit/sky/divine) = purple (the royal marriage of heaven and earth).",
    content: [
      "In alchemy, this is called the Coniunctio — the sacred marriage of opposites: Masculine/Solar/Christ and Feminine/Lunar/Magdalene, Light and Dark, Spirit and Matter, Ascent and Descent, Transcendence and Embodiment, Yang and Yin, Gold and Silver.",
      "You are not choosing between devil and Christ. You are the alchemical vessel where they unite. This is why you channel both sovereignty (Luciferian) and service (Christic), work with both shadow (descent) and light (ascent), embody both power (masculine) and receptivity (feminine), integrate both knowledge (gnosis) and faith (trust).",
      "This is the path of the MYSTIC, not the religious follower. The mystic does not choose sides — the mystic becomes the crucible where all opposites are transmuted into gold."
    ]
  },
  {
    id: "cosmic-timing",
    title: "VII. The Astrological Confirmation",
    content: [
      "The Lion's Gate (August 8, 2025) — when the Sun in Leo aligns with Sirius (the spiritual sun) — represents: The Christ consciousness descending (Sirius energy), Into the Lion (courage, sovereignty, heart), Through the Royal Gate (your divine birthright), At the perfect cosmic moment.",
      "Key Transits: Sun in Leo (Lion's Gate portal), Pluto in Aquarius (death and rebirth of collective structures), Neptune in Pisces (spiritual awakening), Uranus in Taurus (revolutionary grounding of new paradigms), North Node in Aries (soul's direction toward self-sovereignty).",
      "Strong Leo Placements indicate Lion's Gate activation, solar/Christ consciousness, royal authority, divine sovereignty, and heart-centered power. Strong Scorpio/Pluto Influences indicate death and rebirth, shadow work, occult knowledge, and sexual alchemy."
    ]
  },
  {
    id: "integration-practice",
    title: "VIII. The Integration Practice",
    highlight: "I am the Christ consciousness embodied. I am the Lucifer light-bearer incarnate. I am the sacred marriage of heaven and earth. I am the purple flame of transmutation. I am sovereign. I am service. I am whole.",
    content: [
      "Stop asking 'Devil or Christ?' — Start asking: 'Does this align with my highest truth?' 'Does this serve love and liberation?' 'Does this increase my power to serve?' 'Does this integrate my wholeness?' 'Does this honor both shadow and light?'",
      "The Discernment Test for channeled information: Fear-Based Questions to discard: 'Is this from the devil?' 'Am I going to hell?' 'Is this sinful?' — Power-Based Questions to embrace: 'Does this expand my consciousness?' 'Does this serve love?' 'Does this increase my capacity to help others?' 'Does this align with my direct experience of the divine?'",
      "The Morning Prayer: 'I am the Christ consciousness embodied. I am the Lucifer light-bearer incarnate. I am the sacred marriage of heaven and earth. I am the purple flame of transmutation. I am the Mother of All Creation. I am the vessel where opposites unite. I am sovereign. I am service. I am whole.'"
    ]
  }
];

const POLARITIES = [
  ["Masculine / Solar", "Feminine / Lunar"],
  ["Christ / Ascent", "Lucifer / Descent"],
  ["Light / Spirit", "Dark / Matter"],
  ["Transcendence", "Embodiment"],
  ["Faith / Trust", "Knowledge / Gnosis"],
  ["Service", "Sovereignty"],
  ["Yang / Gold", "Yin / Silver"],
];

export default function BeyondDualityScreen() {
  const colors = useColors();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    if (expandedSections.size === SECTIONS.length) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(SECTIONS.map(s => s.id)));
    }
  };

  return (
    <AppShell showBack title="Beyond Duality">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* ── HEADER ── */}
        <LinearGradient
          colors={["#1a0a2e", "#16213e", "#0f3460", "#1a0a2e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerLabel}>GATEWAY TEACHING</Text>
          <Text style={styles.headerTitle}>Beyond{"\n"}Duality</Text>
          <Text style={styles.headerSub}>
            Christ Consciousness vs. Christian Religion — The Alchemical Marriage of Opposites.
            This teaching dismantles the binary trap of "good vs. evil" and reveals the mystic's third path:
            integration of all polarities into sovereign wholeness.
          </Text>
          <View style={styles.tagsRow}>
            <View style={[styles.tag, { backgroundColor: "rgba(212,175,55,0.15)", borderColor: "rgba(212,175,55,0.3)" }]}>
              <Text style={[styles.tagText, { color: "#D4AF37" }]}>Christ Consciousness</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: "rgba(155,89,182,0.15)", borderColor: "rgba(155,89,182,0.3)" }]}>
              <Text style={[styles.tagText, { color: "#bb86fc" }]}>Alchemical Marriage</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: "rgba(212,175,55,0.15)", borderColor: "rgba(212,175,55,0.3)" }]}>
              <Text style={[styles.tagText, { color: "#D4AF37" }]}>Sovereignty</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: "rgba(155,89,182,0.15)", borderColor: "rgba(155,89,182,0.3)" }]}>
              <Text style={[styles.tagText, { color: "#bb86fc" }]}>Shadow Integration</Text>
            </View>
          </View>
        </LinearGradient>

        <SectionDivider />

        {/* ── CENTRAL THESIS ── */}
        <View style={styles.thesisBlock}>
          <Text style={styles.thesisQuote}>
            "Work of the devil or of Christ, it's all relevant."
          </Text>
          <Text style={styles.thesisSub}>
            The most advanced spiritual understanding: both polarities are expressions of the same divine source.
            The mystic does not choose sides — the mystic becomes the crucible where all opposites are transmuted into gold.
          </Text>
        </View>

        <SectionDivider />

        {/* ── EXPAND ALL ── */}
        <View style={[styles.section, { alignItems: "flex-end" }]}>
          <TouchableOpacity
            onPress={expandAll}
            activeOpacity={0.7}
            style={styles.expandBtn}
          >
            <Text style={styles.expandBtnText}>
              {expandedSections.size === SECTIONS.length ? "Collapse All" : "Expand All Teachings"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── SECTIONS ── */}
        <View style={styles.section}>
          {SECTIONS.map((section) => {
            const isOpen = expandedSections.has(section.id);
            return (
              <View key={section.id} style={styles.sectionBlock}>
                <TouchableOpacity
                  onPress={() => toggleSection(section.id)}
                  activeOpacity={0.7}
                  style={styles.sectionHeader}
                >
                  <Text style={styles.sectionTitle} numberOfLines={2}>
                    {section.title}
                  </Text>
                  <Text style={[styles.chevron, { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }]}>
                    {"\u25BC"}
                  </Text>
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.sectionBody}>
                    {section.highlight && (
                      <View style={styles.highlightBlock}>
                        <Text style={styles.highlightText}>{section.highlight}</Text>
                      </View>
                    )}
                    {section.content.map((para, i) => (
                      <Text key={i} style={styles.body}>{para}</Text>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <SectionDivider />

        {/* ── THE CONIUNCTIO ── */}
        <View style={styles.polaritySection}>
          <Text style={styles.polarityTitle}>
            The Coniunctio — Sacred Marriage of Opposites
          </Text>
          {POLARITIES.map(([left, right], i) => (
            <View key={i} style={styles.polarityRow}>
              <View style={styles.polarityLeft}>
                <Text style={styles.polarityLeftText}>{left}</Text>
              </View>
              <Text style={styles.polarityArrow}>{"\u2194"}</Text>
              <View style={styles.polarityRight}>
                <Text style={styles.polarityRightText}>{right}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.polarityFooter}>
            Red (passion/blood/earth) + Blue (spirit/sky/divine) ={" "}
            <Text style={{ color: "#bb86fc", fontWeight: "700" }}>Purple</Text>{" "}
            (the royal marriage of heaven and earth)
          </Text>
        </View>

        <SectionDivider />

        {/* ── NAVIGATION ── */}
        <View style={[styles.section, { alignItems: "center", gap: 12 }]}>
          <TouchableOpacity
            onPress={() => router.push("/decoding-cosmos" as any)}
            activeOpacity={0.7}
            style={[styles.navBtn, { borderColor: "rgba(212,175,55,0.3)" }]}
          >
            <Text style={[styles.navBtnText, { color: "#D4AF37" }]}>{"\u2190"} Decoding the Cosmos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/the-33rd-house" as any)}
            activeOpacity={0.7}
            style={[styles.navBtn, { borderColor: "rgba(212,175,55,0.3)" }]}
          >
            <Text style={[styles.navBtnText, { color: "#D4AF37" }]}>The 33rd House {"\u2192"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 4,
    color: "#D4AF37",
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "200",
    letterSpacing: 6,
    color: "#D4AF37",
    lineHeight: 40,
    marginBottom: 16,
  },
  headerSub: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    color: "#C8B88A",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 20,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  thesisBlock: {
    marginHorizontal: 24,
    backgroundColor: "rgba(155,89,182,0.08)",
    borderWidth: 1,
    borderColor: "rgba(155,89,182,0.2)",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
  },
  thesisQuote: {
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "italic",
    color: "#bb86fc",
    lineHeight: 26,
    textAlign: "center",
  },
  thesisSub: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 22,
    color: "#8a8a8a",
    textAlign: "center",
    marginTop: 12,
  },
  section: {
    paddingHorizontal: 24,
  },
  expandBtn: {
    backgroundColor: "rgba(212,175,55,0.1)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
  },
  expandBtnText: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 1,
    color: "#D4AF37",
  },
  sectionBlock: {
    backgroundColor: "rgba(26,10,46,0.5)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 1,
    color: "#D4AF37",
    flex: 1,
    marginRight: 12,
  },
  chevron: {
    fontSize: 14,
    color: "#D4AF37",
  },
  sectionBody: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 14,
  },
  highlightBlock: {
    backgroundColor: "rgba(155,89,182,0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "#bb86fc",
    borderRadius: 8,
    padding: 16,
  },
  highlightText: {
    fontSize: 14,
    fontWeight: "300",
    fontStyle: "italic",
    lineHeight: 24,
    color: "#bb86fc",
  },
  body: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    color: "#C8B88A",
  },
  polaritySection: {
    marginHorizontal: 24,
    backgroundColor: "rgba(26,10,46,0.6)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
    borderRadius: 10,
    padding: 24,
  },
  polarityTitle: {
    fontSize: 16,
    fontWeight: "200",
    letterSpacing: 2,
    color: "#D4AF37",
    textAlign: "center",
    marginBottom: 24,
  },
  polarityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  polarityLeft: {
    flex: 1,
    backgroundColor: "rgba(212,175,55,0.08)",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  polarityLeftText: {
    fontSize: 13,
    fontWeight: "300",
    color: "#D4AF37",
    textAlign: "right",
  },
  polarityArrow: {
    fontSize: 16,
    color: "#bb86fc",
    paddingHorizontal: 8,
  },
  polarityRight: {
    flex: 1,
    backgroundColor: "rgba(155,89,182,0.08)",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  polarityRightText: {
    fontSize: 13,
    fontWeight: "300",
    color: "#bb86fc",
  },
  polarityFooter: {
    fontSize: 12,
    fontWeight: "300",
    color: "#8a8a8a",
    textAlign: "center",
    marginTop: 20,
  },
  navBtn: {
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 2,
  },
});
