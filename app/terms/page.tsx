import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/public/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use | MedixFlow",
  description:
    "The rules for using MedixFlow, including the medical disclaimer, account responsibilities and limits of liability.",
};

const UPDATED = "3 November 2026";

export default function TermsOfUse() {
  return (
    <LegalLayout
      title="Terms of Use"
      updated={UPDATED}
      intro="These terms govern your use of MedixFlow. By signing in or using the platform in any way, you agree to them. If you do not agree, you must not use the platform."
    >
      <LegalSection title="1. Acceptance of these terms">
        <p>
          These Terms of Use form a binding agreement between you and the private practice that
          operates this MedixFlow instance. They apply to all users, including administrators,
          receptionists, doctors, dispensary staff and patients.
        </p>
        <p>
          By accessing or using the platform you confirm that you have read and accepted these terms
          and the Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection title="2. Important medical disclaimer">
        <p className="font-medium text-foreground">
          MedixFlow is a practice management tool. It does not provide medical advice, diagnosis or
          treatment, and it does not replace consultation with a qualified healthcare professional.
        </p>
        <p>
          Information shown in the platform is recorded by practice staff and healthcare
          professionals. Always seek the advice of your doctor or another qualified healthcare
          provider with any question you have about a medical condition, medication or treatment.
          Never disregard professional medical advice, or delay seeking it, because of something you
          read in this app.
        </p>
        <p className="font-medium text-foreground">
          In a medical emergency, contact emergency services immediately. Do not use this platform to
          obtain urgent care.
        </p>
      </LegalSection>

      <LegalSection title="3. Eligibility and accounts">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Access is by personal account. Accounts for staff are created by the practice administrator.</li>
          <li>You must provide accurate information and keep it up to date.</li>
          <li>You are responsible for keeping your sign-in credentials confidential.</li>
          <li>You must not share your account or allow anyone else to use it.</li>
          <li>You must notify the administrator immediately if you suspect unauthorised access.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Responsibilities of practice staff and doctors">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Enter information accurately, completely and without delay.</li>
          <li>Access only the records you are authorised to view, and only for a legitimate purpose.</li>
          <li>Ensure prescriptions, dosages and clinical notes are correct and clinically appropriate.</li>
          <li>Comply with HPCSA rules, applicable health legislation and the practice&apos;s own policies.</li>
          <li>Never disclose patient information to anyone who is not entitled to receive it.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Responsibilities of patients">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Use your own records and do not attempt to access anyone else&apos;s information.</li>
          <li>Make sure the details you supply, including identity and file numbers, are correct.</li>
          <li>Attend appointments or cancel in reasonable time so the slot can be released.</li>
          <li>Follow the dosage and duration instructions given by your doctor.</li>
          <li>Raise any correction to your record with the practice rather than attempting to alter clinical entries.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Attempt to gain unauthorised access to any part of the platform or another user&apos;s account.</li>
          <li>Interfere with the operation, security or integrity of the system.</li>
          <li>Upload malicious code or use automated tools to scrape or overload the service.</li>
          <li>Use the platform for any unlawful purpose, or in a way that harms patients or the practice.</li>
          <li>Copy, reproduce or distribute patient information except as part of your authorised duties.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Appointments and prescriptions">
        <p>
          Appointments are subject to doctor availability and practice approval. A booking made
          through the platform is a request until it is confirmed by the practice.
        </p>
        <p>
          Prescriptions recorded in the platform must be dispensed by the practice&apos;s dispensary or a
          pharmacy. A prescription entry in the app is not a guarantee that medicine is in stock. The
          treating doctor remains responsible for the clinical appropriateness of any prescription.
        </p>
      </LegalSection>

      <LegalSection title="8. Intellectual property">
        <p>
          The platform, its design and its software are protected by intellectual property law. You
          receive a limited, non-exclusive, non-transferable right to use the platform for its
          intended purpose. Patient records remain the property of the practice and are subject to
          the rights of patients under POPIA.
        </p>
      </LegalSection>

      <LegalSection title="9. Availability and changes">
        <p>
          We aim to keep the platform available, but we do not guarantee uninterrupted or error-free
          operation. We may perform maintenance, change features or suspend access where necessary
          for security, legal or operational reasons. Where reasonably possible, planned downtime will
          be communicated in advance.
        </p>
      </LegalSection>

      <LegalSection title="10. Disclaimers and limitation of liability">
        <p>
          The platform is provided on an &quot;as is&quot; basis to the extent permitted by law. We do not
          warrant that records entered by users are accurate, or that the platform will meet every
          clinical or administrative requirement.
        </p>
        <p>
          To the maximum extent permitted by South African law, the practice and its software
          providers are not liable for indirect, incidental or consequential loss, or for loss of
          data, profits or goodwill, arising from your use of the platform. Nothing in these terms
          excludes liability that cannot lawfully be excluded — including liability for death or
          personal injury caused by negligence, or for fraud.
        </p>
      </LegalSection>

      <LegalSection title="11. Indemnity">
        <p>
          You indemnify the practice against claims, losses or costs arising from your misuse of the
          platform, your breach of these terms, or your unauthorised disclosure of patient
          information, to the extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="12. Suspension and termination">
        <p>
          Accounts may be suspended or terminated if these terms are breached, if access is no longer
          required for your role, or if the law requires it. Clinical records are retained after
          termination in line with the retention obligations described in the Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection title="13. Governing law">
        <p>
          These terms are governed by the laws of the Republic of South Africa. Disputes are subject
          to the jurisdiction of the South African courts. POPIA and applicable health legislation
          apply alongside these terms.
        </p>
      </LegalSection>

      <LegalSection title="14. Changes to these terms">
        <p>
          We may update these terms from time to time. The version published on this page applies
          from the date shown at the top. Continued use of the platform after an update means you
          accept the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="15. Contact">
        <p>
          Questions about these terms should be directed to the practice administrator. For privacy
          matters, please see our Privacy Policy.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}