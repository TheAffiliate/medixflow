import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/public/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | MedixFlow",
  description:
    "How MedixFlow collects, uses, stores and protects personal and health information under POPIA.",
};

const UPDATED = "3 November 2026";

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated={UPDATED}
      intro="This policy explains how MedixFlow collects, uses, stores and protects personal and health information for patients, doctors and practice staff. It applies to everyone who accesses the platform. We process personal information in line with the Protection of Personal Information Act, 2013 (POPIA)."
    >
      <LegalSection title="1. Who is responsible for your information">
        <p>
          The private practice that operates MedixFlow is the responsible party for the personal
          information held in the system. MedixFlow provides the software used by that practice. All
          clinical decisions and the contents of patient records remain the responsibility of the
          treating practice and its healthcare professionals.
        </p>
        <p>
          Each practice designates an Information Officer who is accountable for POPIA compliance.
          Requests about your information should be directed to the practice administrator.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p><strong className="text-foreground">Account information:</strong> your name, email address, role and sign-in credentials.</p>
        <p><strong className="text-foreground">Patient records:</strong> name, identity number, file number, date of birth, gender, contact details, address, medical aid details, blood type, allergies, pre-existing conditions and clinical history.</p>
        <p><strong className="text-foreground">Clinical information:</strong> appointments, consultation notes and diagnoses, prescriptions, dispensing records, follow-up dates and doctor availability.</p>
        <p><strong className="text-foreground">Technical information:</strong> log data relating to access and changes to records, used for security and audit purposes.</p>
        <p>
          Some of this information is <strong className="text-foreground">special personal information</strong> (health
          information) and receives a higher standard of protection under POPIA.
        </p>
      </LegalSection>

      <LegalSection title="3. Why we use your information">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>To register patients and maintain accurate practice records.</li>
          <li>To schedule, confirm and manage appointments with doctors.</li>
          <li>To record consultations and issue, dispense and track prescriptions.</li>
          <li>To manage medicine stock and dispensary alerts.</li>
          <li>To give each role access only to the information relevant to their work.</li>
          <li>To audit access and changes, prevent misuse and secure the system.</li>
          <li>To communicate with you about your appointments and care.</li>
        </ul>
        <p>We do not sell personal information, and we do not use health information for advertising.</p>
      </LegalSection>

      <LegalSection title="4. Legal basis for processing">
        <p>
          We process personal information where it is necessary to provide healthcare and related
          administrative services, to comply with legal obligations (including health-record
          retention requirements), to protect a legitimate interest such as system security, or
          where you have given consent. Where processing relies on consent, you may withdraw it at
          any time, though this may affect our ability to provide care through the platform.
        </p>
      </LegalSection>

      <LegalSection title="5. Who can see your information">
        <p>
          Access is restricted by role. Administrators, receptionists, doctors and dispensary staff
          see only the information needed for their function. Patients see their own records only.
        </p>
        <p>We may disclose information to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Healthcare professionals involved in your care.</li>
          <li>Medical schemes or insurers, where required for a claim you have authorised.</li>
          <li>Service providers who host and operate the platform, bound by confidentiality obligations.</li>
          <li>Regulators, courts or law enforcement where the law requires it.</li>
        </ul>
        <p>We never share your health information for marketing purposes.</p>
      </LegalSection>

      <LegalSection title="6. How we protect your information">
        <p>
          Access is controlled through authenticated accounts and role-based permissions. Data is
          transmitted over encrypted connections and stored on access-controlled infrastructure.
          Administrative actions and record changes are logged for audit purposes.
        </p>
        <p>
          No system is entirely risk-free. If a security compromise affects your personal
          information, we will notify you and the Information Regulator as required by POPIA.
        </p>
      </LegalSection>

      <LegalSection title="7. How long we keep it">
        <p>
          Patient records are kept for the period required by applicable South African health
          legislation and professional record-keeping rules. Account and audit information is kept
          only as long as necessary for the purposes described in this policy or as required by law.
          When information is no longer required, it is securely deleted or de-identified.
        </p>
      </LegalSection>

      <LegalSection title="8. Your rights under POPIA">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>To be told whether we hold personal information about you, and to request a copy of it.</li>
          <li>To request correction or deletion of information that is inaccurate, irrelevant, excessive or unlawfully obtained.</li>
          <li>To object to processing based on legitimate interest.</li>
          <li>To withdraw consent where processing is based on consent.</li>
          <li>To lodge a complaint with the Information Regulator of South Africa.</li>
        </ul>
        <p>
          Requests should be made to the practice administrator. We may need to verify your identity
          before releasing information. Note that clinical records cannot simply be erased where
          retention is required by law.
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>
          Records for minors are created and managed by the practice, and access by a minor or their
          guardian is subject to applicable law and the practice&apos;s own policies. The platform is not
          intended for unsupervised use by children.
        </p>
      </LegalSection>

      <LegalSection title="10. Cookies and local storage">
        <p>
          MedixFlow uses strictly necessary cookies and browser storage to keep you signed in and to
          remember your session. We do not use advertising cookies or third-party tracking pixels.
        </p>
      </LegalSection>

      <LegalSection title="11. Where information is stored">
        <p>
          Information may be stored or processed outside South Africa by our hosting providers.
          Where this happens, we require an adequate level of protection consistent with POPIA,
          including contractual safeguards over the transferred information.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to this policy">
        <p>
          We may update this policy to reflect changes in the law or the service. The current version
          is always available on this page and shows the date it was last updated.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <p>
          For any question about this policy, to exercise your rights, or to report a concern about
          how your information has been handled, contact the practice administrator. You may also
          complain directly to the Information Regulator of South Africa.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}