import { Metadata } from "next";
import { FileText, ScrollText } from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Operavax platform.",
};

const sections = [
  {
    heading: "Acceptance of terms",
    body: [
      "By accessing or using the Operavax platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use the platform.",
      "Operavax reserves the right to update these terms at any time. We will notify you of material changes by email. Your continued use of the platform after the effective date of any change constitutes acceptance of the revised terms.",
    ],
  },
  {
    heading: "Who may use Operavax",
    body: [
      "Operavax is available to individuals aged 18 and older. If you are under 18, you may only use the platform with the involvement and consent of a parent or legal guardian.",
      "You must provide accurate and truthful information when creating your account. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.",
      "Operavax reserves the right to suspend or terminate accounts that provide false information, violate these terms, or engage in activity harmful to the platform or other users.",
    ],
  },
  {
    heading: "What Operavax provides",
    body: [
      "Operavax is a multi-platform ecosystem that connects individuals with organisations across every sector. Operavax hosts and operates various products including forms, reporting, management dashboards, and more — but is not a party to any legal relationship between you and those organisations.",
      "The products available on Operavax belong to the Operavax ecosystem. Each product operates independently under its own subdomain but shares a unified identity, authentication, and design system.",
      "Operavax provides submission delivery, profile pre-fill, and submission history features. These features are provided as-is and are subject to service availability.",
    ],
  },
  {
    heading: "Your responsibilities",
    body: [
      "You are responsible for the accuracy of the information you enter into any form or report on Operavax. Submitting false, misleading, or fraudulent information may constitute a legal offence under South African law.",
      "You may not use Operavax to engage in any unlawful activity, to submit spam or malicious data, to attempt to access systems you are not authorised to access, or to interfere with the operation of the platform.",
      "You may not use automated tools or bots to interact with Operavax without prior written permission.",
    ],
  },
  {
    heading: "Organisation responsibilities",
    body: [
      "Organisations that use Operavax products are responsible for the legal accuracy and completeness of their data, for handling submission data in accordance with POPIA, and for their onboarding arrangements with the Operavax team.",
      "Organisations must not use Operavax products to collect information for unlawful purposes. Operavax reserves the right to suspend any organisation from the platform without notice if it believes the organisation violates applicable law or these terms.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The Operavax brand, platform design, and technology are the intellectual property of Operavax, Inc. You may not reproduce, modify, or distribute any part of the platform without written permission.",
      "Content hosted on Operavax remains the intellectual property of the originating organisations. Operavax has a limited licence to host and display that content on behalf of the organisation.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "Operavax is provided on an as-is basis. To the extent permitted by South African law, Operavax disclaims all warranties, express or implied, including warranties of merchantability and fitness for a particular purpose.",
      "Operavax is not liable for any loss or damage arising from your use of the platform, from the content hosted on the platform, or from the actions of organisations that receive your submissions.",
      "Our total liability to you for any claim arising from your use of the platform will not exceed the amount you paid to Operavax in the 12 months preceding the claim, or R500, whichever is greater.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the Republic of South Africa. Any disputes arising from these terms or your use of the platform will be subject to the exclusive jurisdiction of the courts of South Africa.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "If you have questions about these terms, please contact us at legal@operavax.co.za. We aim to respond within 5 business days.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PublicPageLayout>
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        <div className="mb-6 md:mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FEF7E0] px-3 py-1.5 text-xs font-semibold text-[#F4B400]">
              <FileText className="h-3.5 w-3.5" />
              Terms of Service
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              Terms of Service
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              These terms govern your use of the Operavax platform. Please read
              them carefully before using the service. They explain your rights,
              your responsibilities, and ours.
            </p>
            <p className="mt-3 md:mt-4 text-xs text-[#6a6a6a]">
              Effective date: 1 March 2025 &middot; Last updated: 1 March 2026
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <ScrollText className="h-24 w-24 text-[#F4B400]" />
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <section
              key={section.heading}
              className="rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-[#FBFCFE] p-5 md:p-8"
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
            Questions about these terms?
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Email our legal team at{" "}
            <a
              href="mailto:legal@operavax.co.za"
              className="font-semibold text-[#4285F4] hover:underline"
            >
              legal@operavax.co.za
            </a>
            . We aim to respond within 5 business days.
          </p>
        </div>
      </main>
    </PublicPageLayout>
  );
}
