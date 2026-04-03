import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Operavax collects, uses, and protects your personal information in compliance with POPIA.",
};

const sections = [
  {
    heading: "What information we collect",
    body: [
      "When you create an account on Operavax, we collect your name, email address, and South African ID number. Your ID number is used solely to pre-fill forms and is never shared with third parties without your explicit consent.",
      "When you fill in or submit a form, we collect the data you enter into that form and route it to the relevant organisation. We also store a copy in your submission history so you can reference it later.",
      "When you use the Operavax platform, we automatically collect standard usage data including your device type, browser, and anonymised interaction patterns. This helps us improve the platform experience.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "Your profile information is used to pre-fill forms on your behalf so you do not need to re-enter your details every time you use a new form. You control what is stored in your profile and can edit or delete it at any time.",
      "Submission data is forwarded to the organisation whose form you completed. Operavax acts as a processor on your behalf; the organisation that owns the form is the responsible party for how they use that data.",
      "We use anonymised usage analytics to understand how users interact with the platform, identify problems, and prioritise improvements. This data cannot be used to identify you personally.",
    ],
  },
  {
    heading: "POPIA compliance",
    body: [
      "Operavax processes personal information in accordance with the Protection of Personal Information Act (POPIA), Act 4 of 2013. Every form submission includes a POPIA consent checkbox that you must acknowledge before your data is processed.",
      "You have the right to access, correct, or delete your personal information at any time. To submit a data access or deletion request, contact us at privacy@operavax.co.za.",
      "We retain submission records for 24 months from the date of submission unless you request earlier deletion or unless legal obligations require a different retention period.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "All data transmitted between your device and Operavax is encrypted in transit using TLS 1.3. Data stored on our platform is encrypted at rest using industry-standard AES-256 encryption.",
      "We use Convex as our backend infrastructure provider, which maintains SOC 2 Type II compliance. Authentication is managed by Clerk, which is ISO 27001 certified.",
      "No authentication credentials are ever stored by Operavax directly. We never store plain-text passwords.",
    ],
  },
  {
    heading: "Sharing your data",
    body: [
      "We do not sell your personal information to any third party, ever.",
      "We share form submission data with the specific organisation whose form you completed, as required to fulfil the purpose of the form. This sharing is disclosed to you at the point of submission.",
      "We may share data with service providers who help us operate the platform (such as cloud infrastructure, authentication, and email delivery). These providers are contractually bound to protect your data and may not use it for their own purposes.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Operavax uses strictly necessary cookies to maintain your session after you sign in. We do not use advertising cookies or cross-site tracking cookies.",
      "We use anonymised analytics data to understand aggregate usage patterns. No personally identifiable information is included in this data.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You have the right to know what personal information we hold about you, to request a copy of it, to correct inaccurate information, and to request deletion of your data where legally permissible.",
      "To exercise any of these rights, contact our Information Officer at privacy@operavax.co.za. We will respond to verified requests within 30 days.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will notify you via email and update the effective date at the top of this page. Continued use of the platform after a change constitutes your acceptance of the updated policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PublicPageLayout>
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        <div className="mb-6 md:mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EA] px-3 py-1.5 text-xs font-semibold text-[#0F9D58]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy Policy
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              Your privacy matters
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              Operavax is built on the principle that your personal information is
              yours. This policy explains what we collect, why we collect it, and
              how we keep it safe — in plain language.
            </p>
            <p className="mt-3 md:mt-4 text-xs text-[#6a6a6a]">
              Effective date: 1 March 2025 &middot; Last updated: 1 March 2026
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <ShieldCheck className="h-24 w-24 text-[#0F9D58]" />
          </div>
        </div>

        <div className="grid gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <section
              key={section.heading}
              className="rounded-xl md:rounded-[24px] border border-[#E2E8F0] bg-[#FBFCFE] p-4 md:p-8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6a6a]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-lg md:text-xl font-bold tracking-tight text-[#222]">
                {section.heading}
              </h2>
              <div className="mt-3 md:mt-4 space-y-3">
                {section.body.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm leading-7 text-[#4A5565]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 md:mt-10 rounded-2xl md:rounded-[24px] border border-[#BFD3FF] bg-[#F8FBFF] p-5 md:p-8">
          <h2 className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
            Questions about your privacy?
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Reach our Information Officer directly at{" "}
            <a
              href="mailto:privacy@operavax.co.za"
              className="font-semibold text-[#4285F4] hover:underline"
            >
              privacy@operavax.co.za
            </a>
            . We aim to respond to all verified requests within 30 days.
          </p>
        </div>
      </main>
    </PublicPageLayout>
  );
}
