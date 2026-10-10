import { useState, useMemo } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { useRouter } from "expo-router";

// ── GATE DEFINITIONS ──────────────────────────────────────────
interface GateDef {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  weeks: string;
  archetype: string;
  realms: RealmDef[];
}

interface RealmDef {
  num: number;
  name: string;
  description: string;
}

const GATES: GateDef[] = [
  {
    id: 0, name: "The Threshold", subtitle: "The Sacred Beginning", color: "#9B59B6",
    weeks: "Pre-Entry (3 weeks)", archetype: "The Threshold Crosser",
    realms: [
      { num: 1, name: "The Call", description: "The first stirring — the sense that something must change. The whisper from the depths that says 'there is more.'" },
      { num: 2, name: "The Question", description: "The sacred doubt that cracks open certainty. 'Who am I beyond what I have been told?'" },
      { num: 3, name: "The Courage", description: "The gathering of will to step beyond the known. The moment before the leap." },
      { num: 4, name: "The Preparation", description: "Setting intention, clearing space, gathering tools for the journey ahead." },
      { num: 5, name: "The Farewell", description: "Releasing attachment to the old identity. Saying goodbye to who you were." },
      { num: 6, name: "The Crossing", description: "The actual step across the threshold. The point of no return." },
      { num: 7, name: "The Disorientation", description: "The vertigo of the new. Nothing is familiar. Everything is possible." },
      { num: 8, name: "The Surrender", description: "Releasing the need to control the process. Trusting the path." },
      { num: 9, name: "The Silence", description: "The sacred pause before the first breath. The void pregnant with potential." },
      { num: 10, name: "The Intention", description: "Crystallizing purpose. Declaring what you seek from this journey." },
      { num: 11, name: "The Covenant", description: "The agreement between seeker and path. The sacred contract." },
      { num: 12, name: "The First Step", description: "The journey begins. The threshold is crossed. There is no going back." },
    ]
  },
  {
    id: 1, name: "Origin", subtitle: "The First Breath", color: "#7C3AED",
    weeks: "Weeks 1–4", archetype: "The Awakener",
    realms: [
      { num: 1, name: "The Void", description: "The infinite potential before manifestation. The darkness from which all light is born." },
      { num: 2, name: "The Spark", description: "The first glimmer of consciousness. The initial flicker of awareness in the vast darkness." },
      { num: 3, name: "The Witness", description: "The capacity to observe oneself. The birth of the inner observer." },
      { num: 4, name: "The Womb", description: "The gestating space of becoming. Where potential takes form." },
      { num: 5, name: "The Pulse", description: "The rhythmic heartbeat of existence. The first vibration." },
      { num: 6, name: "The Seed", description: "The potential form waiting to emerge. Everything encoded, nothing yet expressed." },
      { num: 7, name: "The Root", description: "The grounding into earth and body. The first anchor." },
      { num: 8, name: "The Source", description: "The origin point, the fountain from which all flows." },
      { num: 9, name: "The Womb (Second)", description: "The return to the gestating space with awareness. Conscious gestation." },
      { num: 10, name: "The Emergence", description: "The birth, the manifestation. Form breaking through into being." },
      { num: 11, name: "The First Cry", description: "The first expression of self. The primal declaration of existence." },
      { num: 12, name: "The Recognition", description: "The dawning of self-awareness. 'I am. I exist. I am here.'" },
    ]
  },
  {
    id: 2, name: "Focus", subtitle: "The Directed Will", color: "#1D4ED8",
    weeks: "Weeks 5–8", archetype: "The Grounder / Mover",
    realms: [
      { num: 1, name: "The Descent", description: "Spirit moving into matter. The divine choosing to inhabit form." },
      { num: 2, name: "The Current", description: "The flow of life-force through the body. Prana, chi, kundalini in motion." },
      { num: 3, name: "The Spiral", description: "The cyclical nature of movement. Nothing moves in straight lines." },
      { num: 4, name: "The Perpetuum", description: "Perpetual motion, the infinity of flow. Energy that never stops." },
      { num: 5, name: "The Tide", description: "The rhythm of expansion and contraction. Inhale and exhale of the cosmos." },
      { num: 6, name: "The Vortex", description: "The spiraling energy of transformation. The whirlpool that draws you deeper." },
      { num: 7, name: "The Wave", description: "The undulating motion of energy. Rising and falling, cresting and dissolving." },
      { num: 8, name: "The Dragon Current", description: "Life-force rising through the spine. The serpent power awakening." },
      { num: 9, name: "The Dance", description: "The body as instrument of expression. Movement as prayer." },
      { num: 10, name: "The Shapeshifter", description: "The capacity to adapt and transform. Fluid identity." },
      { num: 11, name: "The Momentum", description: "The power of sustained movement. Unstoppable force." },
      { num: 12, name: "The Flow State", description: "Complete absorption in motion. The dissolution of self in action." },
    ]
  },
  {
    id: 3, name: "Expansion", subtitle: "The Opening", color: "#065F46",
    weeks: "Weeks 9–12", archetype: "The Architect",
    realms: [
      { num: 1, name: "The Boundary", description: "The edge between self and other. Where you end and the world begins." },
      { num: 2, name: "The Mandala", description: "The sacred geometric pattern of wholeness. The map of the cosmos in miniature." },
      { num: 3, name: "The Cube", description: "The foundation of material reality. The four-square stability of form." },
      { num: 4, name: "The Geometry", description: "The mathematical order beneath surface chaos. The hidden structure of all things." },
      { num: 5, name: "The Lattice", description: "The interconnected structure of reality. Everything linked to everything." },
      { num: 6, name: "The Architecture", description: "The conscious design of form. Building with intention." },
      { num: 7, name: "The Garden", description: "The cultivated space of growth. Tending what you have planted." },
      { num: 8, name: "The Temple", description: "The sacred container for practice. The space set apart." },
      { num: 9, name: "The Fortress", description: "The protective boundary against intrusion. Healthy defense." },
      { num: 10, name: "The Threshold", description: "The doorway between inner and outer. The liminal space." },
      { num: 11, name: "The Container", description: "The vessel that holds transformation. The alchemical crucible." },
      { num: 12, name: "The Manifestation", description: "Form emerging from formlessness. Spirit becoming matter." },
    ]
  },
  {
    id: 4, name: "Power", subtitle: "The Sacred Flame", color: "#92400E",
    weeks: "Weeks 13–16", archetype: "The Shadow Worker",
    realms: [
      { num: 1, name: "The Descent", description: "The journey into the underworld. Going down to go deep." },
      { num: 2, name: "The Shadow", description: "The rejected parts of the self. Everything you have been told is unacceptable." },
      { num: 3, name: "The Wounded Child", description: "The unhealed trauma from the past. The part that still cries in the dark." },
      { num: 4, name: "The Rage", description: "The suppressed anger seeking expression. The fire that was never allowed to burn." },
      { num: 5, name: "The Shame", description: "The internalized belief that 'I am bad.' The deepest wound." },
      { num: 6, name: "The Grief", description: "The unprocessed loss and sorrow. The tears that were never shed." },
      { num: 7, name: "The Reclamation", description: "Taking back disowned power. Reclaiming what was given away." },
      { num: 8, name: "The Integration", description: "Bringing shadow into consciousness. Making the unconscious conscious." },
      { num: 9, name: "The Alchemy", description: "Transforming shadow into gold. The lead of suffering becoming wisdom." },
      { num: 10, name: "The Crown", description: "The reclaimed sovereignty. Standing in full power." },
      { num: 11, name: "The Sun", description: "The radiant power of the integrated self. Shining without apology." },
      { num: 12, name: "The Throne", description: "Sitting in your power without apology. The sovereign seat." },
    ]
  },
  {
    id: 5, name: "Connection", subtitle: "The Heart Opening", color: "#9D174D",
    weeks: "Weeks 17–20", archetype: "The Heart Opener",
    realms: [
      { num: 1, name: "The Opening", description: "The first crack in the armor around the heart. Vulnerability begins." },
      { num: 2, name: "The Heart", description: "The center of compassion and connection. The seat of love." },
      { num: 3, name: "The Beloved", description: "The experience of being deeply loved. Receiving without condition." },
      { num: 4, name: "The Lover", description: "The capacity to love fully. Giving without reservation." },
      { num: 5, name: "The Bridge", description: "The connection between self and other. The span across the abyss." },
      { num: 6, name: "The Web", description: "The network of relationships. The invisible threads that bind us." },
      { num: 7, name: "The Communion", description: "The shared experience of presence. Being together in truth." },
      { num: 8, name: "The Resonance", description: "The vibrational attunement with another. Hearts beating in sync." },
      { num: 9, name: "The Interdependence", description: "The recognition of mutual support. We need each other." },
      { num: 10, name: "The Compassion", description: "Feeling with others without losing yourself. Empathy with boundaries." },
      { num: 11, name: "The Forgiveness", description: "Releasing resentment and opening to love. The ultimate liberation." },
      { num: 12, name: "The Sacred Marriage", description: "The union of self and other in love. The hieros gamos." },
    ]
  },
  {
    id: 6, name: "Shadow", subtitle: "The Inner Alchemy", color: "#1E3A5F",
    weeks: "Weeks 21–24", archetype: "The Mirror",
    realms: [
      { num: 1, name: "The Mirror", description: "Seeing yourself reflected in others. What triggers you teaches you." },
      { num: 2, name: "The Witness", description: "The observing consciousness. Watching without judgment." },
      { num: 3, name: "The Projection", description: "Recognizing what you see in others as your own shadow." },
      { num: 4, name: "The Polarity", description: "Holding light and dark simultaneously. Both/and, not either/or." },
      { num: 5, name: "The Balance", description: "The equilibrium between opposites. The still point." },
      { num: 6, name: "The Wholeness", description: "Integration of all parts of self. Nothing excluded." },
      { num: 7, name: "The Reflection", description: "Seeing yourself truly. Without masks, without filters." },
      { num: 8, name: "The Recognition", description: "Acknowledging what is real. Accepting what you see." },
      { num: 9, name: "The Integration", description: "Bringing opposites into unity. The alchemical marriage within." },
      { num: 10, name: "The Paradox", description: "Holding contradictions without collapsing. Living in the tension." },
      { num: 11, name: "The Clarity", description: "Seeing without distortion. The polished mirror." },
      { num: 12, name: "The Truth", description: "Recognizing what is, without judgment. Pure seeing." },
    ]
  },
  {
    id: 7, name: "Union", subtitle: "The Sacred Marriage", color: "#5B21B6",
    weeks: "Weeks 25–28", archetype: "The Unifier",
    realms: [
      { num: 1, name: "The Polarity", description: "The recognition that opposites are one. Duality dissolving." },
      { num: 2, name: "The Infinity", description: "The boundless nature of consciousness. No edges, no limits." },
      { num: 3, name: "The Union", description: "The merging of self and other. Two becoming one." },
      { num: 4, name: "The Crown", description: "The opening of the crown center. Connection to the infinite." },
      { num: 5, name: "The Light", description: "The radiant awareness of pure consciousness. Luminous emptiness." },
      { num: 6, name: "The Dissolution", description: "The melting of boundaries. Edges becoming permeable." },
      { num: 7, name: "The All", description: "The recognition that everything is one. Total inclusion." },
      { num: 8, name: "The Nothing", description: "The recognition that nothing is separate. Emptiness as fullness." },
      { num: 9, name: "The Paradox", description: "Holding 'I am everything' and 'I am nothing' simultaneously." },
      { num: 10, name: "The Transcendence", description: "Moving beyond the limitations of ego. The cage door opens." },
      { num: 11, name: "The Immanence", description: "Recognizing the divine in all things. God in the mud." },
      { num: 12, name: "The Unity", description: "The complete integration of all into one. The circle closes." },
    ]
  },
  {
    id: 8, name: "Death & Rebirth", subtitle: "The Phoenix Gate", color: "#7F1D1D",
    weeks: "Weeks 29–32", archetype: "The Phoenix",
    realms: [
      { num: 1, name: "The Death", description: "The ending of the old. What was must die for what will be." },
      { num: 2, name: "The Ashes", description: "The remains of what was. The residue of the fire." },
      { num: 3, name: "The Void (Return)", description: "The space between death and rebirth. The bardo." },
      { num: 4, name: "The Spark (Return)", description: "The first stirring of new life. The ember in the ashes." },
      { num: 5, name: "The Phoenix", description: "The rising from the ashes. Rebirth through fire." },
      { num: 6, name: "The Rebirth", description: "The emergence of the new. Fresh, raw, alive." },
      { num: 7, name: "The Renewal", description: "The fresh beginning. Everything washed clean." },
      { num: 8, name: "The Cycle", description: "The recognition of the eternal return. Death feeds life feeds death." },
      { num: 9, name: "The Ouroboros", description: "The serpent eating its tail. The cycle completing itself." },
      { num: 10, name: "The Transformation", description: "The alchemical change. Lead into gold." },
      { num: 11, name: "The Resurrection", description: "The return to life. Consciousness surviving death." },
      { num: 12, name: "The Eternal Life", description: "The recognition that consciousness never dies. Only forms change." },
    ]
  },
  {
    id: 9, name: "Vision", subtitle: "The Cosmic Eye", color: "#1E3A5F",
    weeks: "Weeks 33–36", archetype: "The Seer",
    realms: [
      { num: 1, name: "The Third Eye", description: "The center of inner vision. The eye that sees what physical eyes cannot." },
      { num: 2, name: "The Seer", description: "The one who sees beyond the veil. The prophet within." },
      { num: 3, name: "The Prophet", description: "The one who speaks truth. The voice of the future." },
      { num: 4, name: "The Vision", description: "The image of what could be. The dream made visible." },
      { num: 5, name: "The Insight", description: "The sudden understanding. The lightning bolt of clarity." },
      { num: 6, name: "The Revelation", description: "The unveiling of hidden truth. The curtain pulled back." },
      { num: 7, name: "The Discernment", description: "The capacity to distinguish truth from illusion. The sharp blade." },
      { num: 8, name: "The Pattern", description: "Seeing the hidden order. The matrix beneath the surface." },
      { num: 9, name: "The Symbol", description: "Understanding the language of the unconscious. Signs and portents." },
      { num: 10, name: "The Dream", description: "Receiving messages from the depths. The nightly oracle." },
      { num: 11, name: "The Oracle", description: "Speaking truth from the source. The channel opens." },
      { num: 12, name: "The Clarity", description: "Seeing with perfect vision. The eye fully open." },
    ]
  },
  {
    id: 10, name: "Law", subtitle: "The Foundation", color: "#78350F",
    weeks: "Weeks 37–40", archetype: "The Lawgiver",
    realms: [
      { num: 1, name: "The Law", description: "The recognition of universal principles. The order beneath chaos." },
      { num: 2, name: "The Balance", description: "The scales of justice. Everything seeks equilibrium." },
      { num: 3, name: "The Order", description: "The emergence of pattern from chaos. Structure from entropy." },
      { num: 4, name: "The Foundation", description: "The solid ground of practice. The bedrock." },
      { num: 5, name: "The Cube (Return)", description: "The material manifestation of spirit. Heaven made earth." },
      { num: 6, name: "The Merkaba", description: "The vehicle of ascension grounded in form. Star tetrahedron." },
      { num: 7, name: "The Temple (Return)", description: "The sacred structure. The house of the divine." },
      { num: 8, name: "The Commandments", description: "The ethical guidelines. The laws written on the heart." },
      { num: 9, name: "The Integrity", description: "Living in alignment with truth. Walking the talk." },
      { num: 10, name: "The Sustainability", description: "Building structures that endure. Legacy architecture." },
      { num: 11, name: "The Embodiment", description: "Bringing spirit into matter. The word made flesh." },
      { num: 12, name: "The Completion", description: "The full integration of law and love. Justice and mercy united." },
    ]
  },
  {
    id: 11, name: "Transcendence", subtitle: "Beyond the Known", color: "#4C1D95",
    weeks: "Weeks 41–44", archetype: "The Mystic",
    realms: [
      { num: 1, name: "The Ascent", description: "Rising beyond previous limitations. The upward spiral." },
      { num: 2, name: "The Transcendence", description: "Moving beyond the known. Into the unmapped territory." },
      { num: 3, name: "The Spiral (Return)", description: "The path that loops back on itself. Higher octave of the same lesson." },
      { num: 4, name: "The Return", description: "Coming back to the beginning with new eyes. The hero returns home." },
      { num: 5, name: "The Mystery", description: "The unknowable ground of being. What cannot be spoken." },
      { num: 6, name: "The Question", description: "The inquiry that has no answer. The koan." },
      { num: 7, name: "The Surrender", description: "Releasing the need to know. Resting in not-knowing." },
      { num: 8, name: "The Trust", description: "Faith in the process. Letting go of the steering wheel." },
      { num: 9, name: "The Paradox (Return)", description: "Holding contradictions. Both true. Neither true." },
      { num: 10, name: "The Zen", description: "The wisdom of emptiness. The sound of one hand clapping." },
      { num: 11, name: "The Mobius", description: "The path that has no inside or outside. The infinite loop." },
      { num: 12, name: "The Eternal Return", description: "The recognition that the journey never ends. And never began." },
    ]
  },
  {
    id: 12, name: "Return", subtitle: "Crown & Integration", color: "#D4AF37",
    weeks: "Weeks 45–48", archetype: "The Sage / Elder",
    realms: [
      { num: 1, name: "The Integration", description: "Bringing all parts into unity. The great gathering." },
      { num: 2, name: "The Wholeness", description: "Recognizing that nothing is missing. You are already complete." },
      { num: 3, name: "The Completion", description: "Honoring the journey. Every step was necessary." },
      { num: 4, name: "The Sage", description: "The wisdom of experience. Knowledge earned through living." },
      { num: 5, name: "The Elder", description: "The one who has walked the path. The keeper of stories." },
      { num: 6, name: "The Christ Consciousness", description: "The recognition of divinity in all things. God in everything." },
      { num: 7, name: "The Bodhisattva", description: "The one who returns to help others. Compassion as purpose." },
      { num: 8, name: "The All-in-One", description: "The unity of all things. No separation anywhere." },
      { num: 9, name: "The Rainbow", description: "The full spectrum of light. All colors, all frequencies, all truths." },
      { num: 10, name: "The Zodiac", description: "The complete cycle. The wheel that turns and returns." },
      { num: 11, name: "The Twelve", description: "The number of completion. The circle of gates fulfilled." },
      { num: 12, name: "The Return to Zero", description: "Preparing for the next cycle. The end that is a beginning." },
    ]
  },
];

const CURRENTS = [
  { name: "Life Current", color: "#22c55e", description: "Breath, circulation, metabolism, reproduction — the flow of biological vitality that animates matter.", gates: "Gates 1–3" },
  { name: "Mind Current", color: "#3b82f6", description: "Sensation, perception, conception, reflection — the flow of thought and cognition.", gates: "Gates 4–6" },
  { name: "Soul Current", color: "#a855f7", description: "Feeling, intuition, imagination, aspiration — the flow of meaning, value, and purpose.", gates: "Gates 7–9" },
  { name: "Infinite Current", color: "#d4af37", description: "Presence, stillness, spaciousness, dissolution — the flow of pure awareness itself.", gates: "Gates 10–12" },
];

const SIGNIFICANCE = [
  { title: "12 \u00D7 12 = 144", text: "Completion squared. The 12 Gates each contain 12 Realms, creating the complete map of consciousness states." },
  { title: "144,000 Sealed", text: "In the Book of Revelation, 144,000 are 'sealed' from the twelve tribes — a symbolic encoding of complete spiritual attainment." },
  { title: "Fibonacci Connection", text: "144 is the 12th Fibonacci number. The spiral of consciousness follows the same mathematical pattern as galaxies and shells." },
  { title: "The 33rd House Encoding", text: "33 vertebrae \u00D7 the 4 Great Currents = 132. Add the 12 Gates as meta-realms = 144. The human spine IS the cosmic map." },
];

export default function DecodingCosmosScreen() {
  const colors = useColors();
  const router = useRouter();
  const [selectedGate, setSelectedGate] = useState<number | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<{ gateId: number; realmIdx: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGates = useMemo(() => {
    if (!searchTerm) return GATES;
    const q = searchTerm.toLowerCase();
    return GATES.map(g => ({
      ...g,
      realms: g.realms.filter(r =>
        r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
      )
    })).filter(g => g.realms.length > 0 || g.name.toLowerCase().includes(q));
  }, [searchTerm]);

  const activeGate = selectedRealm ? GATES[selectedRealm.gateId] : null;
  const activeRealm = selectedRealm ? GATES[selectedRealm.gateId]?.realms[selectedRealm.realmIdx] : null;
  const globalRealmNum = selectedRealm ? (selectedRealm.gateId * 12) + selectedRealm.realmIdx + 1 : null;

  return (
    <AppShell showBack title="Decoding the Cosmos">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* ── HEADER ── */}
        <LinearGradient
          colors={["#0a0a1a", "#1a0a2e", "#0f1a3e", "#0a0a1a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerLabel}>STAR GATE COSMOLOGY SYSTEM</Text>
          <Text style={styles.headerTitle}>Decoding{"\n"}the Cosmos</Text>
          <Text style={styles.headerSub}>
            12 Gates {"\u00D7"} 12 Realms ={" "}
            <Text style={{ color: "#D4AF37", fontWeight: "700" }}>144 Realms</Text>{" "}
            of Consciousness. The complete map of human experience — from the first stirring of awareness to the return to source.
          </Text>
          <View style={styles.statsRow}>
            <Text style={styles.stat}><Text style={styles.statNum}>13</Text> Gates</Text>
            <Text style={styles.statDivider}>|</Text>
            <Text style={styles.stat}><Text style={styles.statNum}>156</Text> Realms</Text>
            <Text style={styles.statDivider}>|</Text>
            <Text style={styles.stat}><Text style={styles.statNum}>4</Text> Currents</Text>
            <Text style={styles.statDivider}>|</Text>
            <Text style={styles.stat}><Text style={styles.statNum}>48</Text> Weeks</Text>
          </View>
        </LinearGradient>

        <SectionDivider />

        {/* ── FOUR GREAT CURRENTS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THE FOUR GREAT CURRENTS</Text>
          {CURRENTS.map((c, i) => (
            <View
              key={i}
              style={[styles.currentCard, { borderColor: c.color + "40", backgroundColor: c.color + "10" }]}
            >
              <Text style={[styles.currentName, { color: c.color }]}>{c.name}</Text>
              <Text style={styles.currentDesc}>{c.description}</Text>
              <Text style={[styles.currentGates, { color: c.color + "cc" }]}>{c.gates}</Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* ── SEARCH ── */}
        <View style={styles.section}>
          <TextInput
            placeholder="Search realms..."
            placeholderTextColor="#5A5A5A"
            value={searchTerm}
            onChangeText={setSearchTerm}
            returnKeyType="done"
            style={[styles.searchInput, { borderColor: "#D4AF3730", color: "#F0E6D3" }]}
          />
        </View>

        {/* ── REALM DETAIL PANEL ── */}
        {activeRealm && activeGate && (
          <View style={[styles.realmDetail, { backgroundColor: activeGate.color + "15", borderColor: activeGate.color + "40" }]}>
            <TouchableOpacity
              onPress={() => setSelectedRealm(null)}
              activeOpacity={0.7}
              style={styles.closeBtn}
            >
              <Text style={{ color: "#8a8a8a", fontSize: 12 }}>Close</Text>
            </TouchableOpacity>
            <View style={styles.realmDetailInner}>
              <View style={[styles.realmNumCircle, { backgroundColor: activeGate.color + "30" }]}>
                <Text style={[styles.realmNumText, { color: activeGate.color }]}>{globalRealmNum}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.realmGateLabel, { color: activeGate.color }]}>
                  Gate {activeGate.id}: {activeGate.name} — Realm {selectedRealm!.realmIdx + 1} of 12
                </Text>
                <Text style={styles.realmName}>{activeRealm.name}</Text>
                <Text style={styles.realmDesc}>{activeRealm.description}</Text>
                <View style={styles.realmNav}>
                  {selectedRealm!.realmIdx > 0 && (
                    <TouchableOpacity
                      onPress={() => setSelectedRealm({ gateId: selectedRealm!.gateId, realmIdx: selectedRealm!.realmIdx - 1 })}
                      activeOpacity={0.7}
                      style={[styles.realmNavBtn, { backgroundColor: activeGate.color + "20" }]}
                    >
                      <Text style={{ color: activeGate.color, fontSize: 12 }}>{"\u2190"} Realm {selectedRealm!.realmIdx}</Text>
                    </TouchableOpacity>
                  )}
                  {selectedRealm!.realmIdx < 11 && (
                    <TouchableOpacity
                      onPress={() => setSelectedRealm({ gateId: selectedRealm!.gateId, realmIdx: selectedRealm!.realmIdx + 1 })}
                      activeOpacity={0.7}
                      style={[styles.realmNavBtn, { backgroundColor: activeGate.color + "20" }]}
                    >
                      <Text style={{ color: activeGate.color, fontSize: 12 }}>Realm {selectedRealm!.realmIdx + 2} {"\u2192"}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ── GATE LIST ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THE 13 GATES</Text>
          {filteredGates.map(gate => (
            <View key={gate.id} style={[styles.gateBlock, { borderColor: gate.color + "30" }]}>
              <TouchableOpacity
                onPress={() => setSelectedGate(selectedGate === gate.id ? null : gate.id)}
                activeOpacity={0.7}
                style={[styles.gateHeader, { backgroundColor: gate.color + "15" }]}
              >
                <View style={styles.gateHeaderLeft}>
                  <View style={[styles.gateNumCircle, { backgroundColor: gate.color + "30" }]}>
                    <Text style={[styles.gateNum, { color: gate.color }]}>{gate.id}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.gateName, { color: gate.color }]}>
                      Gate {gate.id}: {gate.name}
                    </Text>
                    <Text style={styles.gateMeta}>
                      {gate.subtitle} — {gate.weeks} — {gate.archetype}
                    </Text>
                  </View>
                </View>
                <Text style={{ color: gate.color, fontSize: 16 }}>
                  {selectedGate === gate.id ? "\u25B2" : "\u25BC"}
                </Text>
              </TouchableOpacity>

              {selectedGate === gate.id && (
                <View style={styles.realmsList}>
                  {gate.realms.map((realm, rIdx) => {
                    const globalNum = gate.id * 12 + rIdx + 1;
                    const isSelected = selectedRealm?.gateId === gate.id && selectedRealm?.realmIdx === rIdx;
                    return (
                      <TouchableOpacity
                        key={rIdx}
                        onPress={() => setSelectedRealm(isSelected ? null : { gateId: gate.id, realmIdx: rIdx })}
                        activeOpacity={0.7}
                        style={[
                          styles.realmItem,
                          {
                            backgroundColor: isSelected ? gate.color + "20" : "rgba(212,175,55,0.03)",
                            borderColor: isSelected ? gate.color + "40" : "rgba(212,175,55,0.08)",
                          },
                        ]}
                      >
                        <Text style={[styles.realmItemNum, { color: gate.color + "aa" }]}>{globalNum}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.realmItemName}>{realm.name}</Text>
                          {isSelected && (
                            <Text style={styles.realmItemDesc}>{realm.description}</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* ── SIGNIFICANCE OF 144 ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THE SIGNIFICANCE OF 144</Text>
          {SIGNIFICANCE.map((item, i) => (
            <View key={i} style={styles.sigCard}>
              <Text style={styles.sigTitle}>{item.title}</Text>
              <Text style={styles.sigText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <SectionDivider />

        {/* ── NAVIGATION ── */}
        <View style={[styles.section, { alignItems: "center", gap: 12 }]}>
          <TouchableOpacity
            onPress={() => router.push("/beyond-duality" as any)}
            activeOpacity={0.7}
            style={[styles.navBtn, { borderColor: "rgba(155,89,182,0.3)" }]}
          >
            <Text style={[styles.navBtnText, { color: "#bb86fc" }]}>Beyond Duality {"\u2192"}</Text>
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
    alignItems: "center",
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
    color: "#F0E6D3",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 16,
  },
  headerSub: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    color: "#B8A88A",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  stat: {
    fontSize: 12,
    color: "#8a8a8a",
    fontWeight: "300",
  },
  statNum: {
    color: "#D4AF37",
    fontWeight: "700",
  },
  statDivider: {
    color: "#333",
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 4,
    color: "#D4AF37",
    marginBottom: 20,
  },
  currentCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  currentName: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 6,
  },
  currentDesc: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
    color: "#B8A88A",
    marginBottom: 6,
  },
  currentGates: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "300",
    backgroundColor: "rgba(212,175,55,0.05)",
    marginBottom: 20,
  },
  realmDetail: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 24,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  realmDetailInner: {
    flexDirection: "row",
    gap: 14,
  },
  realmNumCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  realmNumText: {
    fontSize: 18,
    fontWeight: "700",
  },
  realmGateLabel: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  realmName: {
    fontSize: 20,
    fontWeight: "200",
    letterSpacing: 2,
    color: "#F0E6D3",
    marginBottom: 10,
  },
  realmDesc: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 22,
    color: "#B8A88A",
  },
  realmNav: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  realmNavBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  gateBlock: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  gateHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  gateHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  gateNumCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  gateNum: {
    fontSize: 14,
    fontWeight: "700",
  },
  gateName: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
  },
  gateMeta: {
    fontSize: 11,
    fontWeight: "300",
    color: "#8a8a8a",
    marginTop: 2,
  },
  realmsList: {
    padding: 12,
    gap: 6,
    backgroundColor: "rgba(10,10,26,0.5)",
  },
  realmItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  realmItemNum: {
    fontSize: 11,
    fontWeight: "500",
    width: 28,
    textAlign: "center",
    marginTop: 2,
  },
  realmItemName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#F0E6D3",
    letterSpacing: 0.5,
  },
  realmItemDesc: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
    color: "#B8A88A",
    marginTop: 6,
  },
  sigCard: {
    backgroundColor: "rgba(212,175,55,0.05)",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  sigTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D4AF37",
    letterSpacing: 1,
    marginBottom: 8,
  },
  sigText: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 20,
    color: "#B8A88A",
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
