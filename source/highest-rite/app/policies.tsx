import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { AppShell } from "@/components/app-shell";
import { SectionDivider } from "@/components/section-divider";
import { BRAND } from "@/lib/content";

interface PolicySectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function PolicySection({ title, subtitle, children, defaultOpen = false }: PolicySectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const colors = useColors();

  return (
    <View style={styles.policyBlock}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
        style={[styles.policyHeader, { borderBottomColor: colors.border }]}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.policyLabel, { color: colors.muted }]}>{subtitle}</Text>
          <Text style={[styles.policyTitle, { color: colors.foreground }]}>{title}</Text>
        </View>
        <Text style={[styles.chevron, { color: colors.muted }]}>
          {open ? "−" : "+"}
        </Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.policyBody}>
          {children}
        </View>
      )}
    </View>
  );
}

function P({ children }: { children: React.ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.body, { color: colors.muted }]}>{children}</Text>;
}

function H({ children }: { children: React.ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.subhead, { color: colors.foreground }]}>{children}</Text>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  const colors = useColors();
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletDot, { color: colors.primary }]}>·</Text>
      <Text style={[styles.bulletText, { color: colors.muted }]}>{children}</Text>
    </View>
  );
}

export default function PoliciesScreen() {
  const colors = useColors();

  return (
    <AppShell showBack title="Policies">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerLabel, { color: colors.primary }]}>GOVERNANCE</Text>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            TERMS &{"\n"}POLICIES
          </Text>
          <Text style={[styles.headerSub, { color: colors.muted }]}>
            The following terms govern all private engagements with Daniel Cruze. By making an enquiry or booking, you acknowledge and accept these conditions in full.
          </Text>
        </View>

        <SectionDivider />

        {/* ── DEPOSIT POLICY ── */}
        <PolicySection title="Deposit Policy" subtitle="FINANCIAL" defaultOpen={true}>
          <P>
            A non-refundable deposit is required to confirm all bookings. The deposit secures your time and ensures mutual commitment to the engagement.
          </P>

          <H>Deposit Structure</H>
          <Bullet>Standard sessions: 30% of the agreed fee, payable at the time of booking confirmation.</Bullet>
          <Bullet>Extended engagements (half-day, full-day, overnight, travel): 50% of the agreed fee, payable at booking confirmation.</Bullet>
          <Bullet>Retreat and touring engagements: a bespoke deposit structure will be discussed and agreed upon prior to confirmation.</Bullet>

          <H>Payment</H>
          <P>
            Deposits are accepted via direct bank transfer or other methods communicated during the enquiry process. Full payment details are provided upon booking confirmation. The remaining balance is due prior to or at the commencement of the session, as agreed.
          </P>

          <H>Deposit as Commitment</H>
          <P>
            The deposit is not a fee for service — it is a commitment to the process. It holds your time in Daniel's schedule and reflects the seriousness of your intention. Deposits are non-refundable under all circumstances, including cancellation, no-show, or change of mind.
          </P>
        </PolicySection>

        <SectionDivider />

        {/* ── CANCELLATION POLICY ── */}
        <PolicySection title="Cancellation Policy" subtitle="SCHEDULING">
          <P>
            Daniel's time is limited and carefully allocated. Cancellations affect not only the schedule but the space held for your engagement. The following terms apply to all bookings.
          </P>

          <H>Cancellation Windows</H>
          <Bullet>More than 48 hours before the scheduled time: the deposit may be applied to a future booking within 90 days, at Daniel's discretion. No refund is issued.</Bullet>
          <Bullet>24–48 hours before the scheduled time: the deposit is forfeited in full. No transfer to a future booking.</Bullet>
          <Bullet>Less than 24 hours before the scheduled time: the full session fee is payable. No exceptions.</Bullet>

          <H>No-Show</H>
          <P>
            Failure to attend a confirmed booking without prior notice constitutes a no-show. The full session fee is payable immediately. Future bookings may be declined at Daniel's discretion.
          </P>

          <H>Rescheduling</H>
          <P>
            Rescheduling requests made more than 48 hours in advance will be accommodated where possible, subject to availability. Repeated rescheduling may result in the forfeiture of the deposit and the requirement of full prepayment for future bookings.
          </P>

          <H>Daniel's Right to Cancel</H>
          <P>
            Daniel reserves the right to cancel or decline any booking at any time, for any reason, without explanation. In such cases, any deposit paid will be refunded in full within 7 business days.
          </P>
        </PolicySection>

        <SectionDivider />

        {/* ── CONFIDENTIALITY / NDA ── */}
        <PolicySection title="Confidentiality Agreement" subtitle="NON-DISCLOSURE">
          <P>
            All engagements with Daniel Cruze are conducted under an absolute expectation of mutual confidentiality. This applies to both parties without exception.
          </P>

          <H>Scope of Confidentiality</H>
          <P>
            The following are considered strictly confidential and may not be disclosed, shared, published, or referenced in any form — publicly or privately — without express written consent:
          </P>
          <Bullet>The identity of any client or participant.</Bullet>
          <Bullet>The content, nature, or details of any session, conversation, or engagement.</Bullet>
          <Bullet>Any personal information shared during the course of the engagement.</Bullet>
          <Bullet>Any photographs, recordings, messages, or correspondence exchanged before, during, or after the engagement.</Bullet>
          <Bullet>The location, timing, or logistics of any meeting.</Bullet>

          <H>No Recording</H>
          <P>
            Audio recording, video recording, photography, or screen capture of any kind during sessions is strictly prohibited unless explicitly agreed in writing beforehand. Violation of this term constitutes an immediate breach and will result in termination of the session without refund.
          </P>

          <H>Digital Communication</H>
          <P>
            All digital communications — including text messages, emails, and voice notes — are considered confidential. Screenshots, forwarding, or sharing of any communication with third parties is prohibited.
          </P>

          <H>Duration</H>
          <P>
            Confidentiality obligations are perpetual. They do not expire upon completion of the engagement, cessation of contact, or any other event. This applies indefinitely to both parties.
          </P>

          <H>Daniel's Commitment</H>
          <P>
            Daniel holds the same standard for himself. Your identity, your story, and your experience are sacred. Nothing shared in session will ever be disclosed, used in marketing, or referenced in any identifiable way — without your explicit, written consent.
          </P>
        </PolicySection>

        <SectionDivider />

        {/* ── TERMS & CONDITIONS ── */}
        <PolicySection title="Terms & Conditions" subtitle="GENERAL">
          <H>Nature of Services</H>
          <P>
            Daniel Cruze offers private mentoring, coaching, and experiential guidance in the domains of sacred masculinity, intimacy, embodiment, and personal transformation. These services are not therapy, counselling, medical treatment, or psychological intervention. No therapeutic relationship is formed or implied.
          </P>

          <H>Eligibility</H>
          <P>
            All clients must be 18 years of age or older. By making an enquiry or booking, you confirm that you are of legal age and are engaging of your own free will and volition.
          </P>

          <H>Consent & Boundaries</H>
          <P>
            All engagements are built on a foundation of mutual consent and clearly communicated boundaries. Either party may pause, adjust, or end a session at any time, for any reason. Consent is ongoing and may be withdrawn at any point without consequence.
          </P>

          <H>Health & Safety</H>
          <P>
            Clients are responsible for disclosing any relevant health conditions, physical limitations, or emotional considerations that may affect the engagement. Daniel is not liable for any adverse outcomes resulting from undisclosed conditions.
          </P>

          <H>Conduct</H>
          <P>
            Clients are expected to conduct themselves with respect, honesty, and integrity at all times. Aggressive, threatening, or disrespectful behaviour will result in immediate termination of the session without refund. Daniel reserves the right to decline future bookings.
          </P>

          <H>Intellectual Property</H>
          <P>
            All teachings, frameworks, written materials, and methodologies shared during sessions — including references to The 33rd House system, the 12-Gate architecture, Chartography, and published works — remain the intellectual property of Daniel Cruze. They may not be reproduced, taught, distributed, or commercialised without written permission.
          </P>

          <H>Liability</H>
          <P>
            Daniel Cruze is not liable for any direct, indirect, incidental, or consequential damages arising from or related to any engagement. Participation in all sessions and experiences is at the client's own risk and responsibility.
          </P>

          <H>Governing Law</H>
          <P>
            These terms are governed by the laws of Western Australia. Any disputes arising from these terms or any engagement shall be subject to the exclusive jurisdiction of the courts of Western Australia.
          </P>

          <H>Amendments</H>
          <P>
            Daniel reserves the right to amend these terms at any time. Updated terms will be reflected on this page. Continued engagement following any amendment constitutes acceptance of the revised terms.
          </P>
        </PolicySection>

        <SectionDivider />

        {/* Footer note */}
        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            These policies are effective as of March 2026 and apply to all engagements with Daniel Cruze, whether arranged through this application, email, or any other channel.
          </Text>
          <View style={{ height: 24 }} />
          <Text style={[styles.footerText, { color: colors.muted }]}>
            For questions regarding these policies, contact{" "}
            <Text style={{ color: colors.primary }}>{BRAND.email}</Text>
          </Text>
          <View style={{ height: 32 }} />
          <Text style={[styles.seal, { color: colors.primary }]}>{BRAND.seal}</Text>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 8,
    alignItems: "center",
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 4,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "200",
    letterSpacing: 8,
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 20,
  },
  headerSub: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 22,
    letterSpacing: 0.3,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  policyBlock: {
    paddingHorizontal: 32,
  },
  policyHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  policyLabel: {
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 4,
    marginBottom: 6,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "200",
    letterSpacing: 3,
  },
  chevron: {
    fontSize: 22,
    fontWeight: "200",
    marginLeft: 16,
  },
  policyBody: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  body: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 22,
    letterSpacing: 0.3,
    marginBottom: 16,
  },
  subhead: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 12,
    marginTop: 8,
  },
  bulletRow: {
    flexDirection: "row",
    paddingLeft: 4,
    marginBottom: 10,
  },
  bulletDot: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 10,
    fontWeight: "700",
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  footerNote: {
    paddingHorizontal: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 20,
    letterSpacing: 0.3,
    textAlign: "center",
  },
  seal: {
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: "500",
    fontStyle: "italic",
  },
});
