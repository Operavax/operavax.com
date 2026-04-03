import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  FileText,
  ArrowRight,
  CheckCircle2,
  Upload,
  Users,
  Clock,
  ClipboardList,
} from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

export const metadata: Metadata = {
  title: "How to List on Operavax",
  description:
    "A step-by-step guide for organisations wanting to list on the Operavax ecosystem.",
};

const steps = [
  {
    step: "01",
    icon: FileText,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
    title: "Choose a plan",
    description:
      "Select the pricing plan that fits your organisation's scale. The Starter plan suits small teams and NGOs. The Professional plan is built for hospitals, insurers, and mid-size organisations. Enterprise is for government, banks, and large networks that need direct API integration and custom delivery.",
  },
  {
    step: "02",
    icon: Building2,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
    title: "Describe your organisation",
    description:
      "Tell us your organisation's name, your primary contact, and what you want to list on the Operavax ecosystem. Describe your use case and what data you need to capture. This helps our team prepare the onboarding correctly from the start.",
  },
  {
    step: "03",
    icon: Upload,
    color: "text-[#F4B400]",
    surface: "bg-[#FEF7E0]",
    title: "Upload source documents",
    description:
      "Send us the official, published versions of your forms or documents as PDF, Word (DOCX), or Excel (XLSX) — maximum 10 MB each. Our team uses these as the single source of truth for digitisation. Do not send drafts, screenshots, or photos.",
  },
  {
    step: "04",
    icon: Clock,
    color: "text-[#DB4437]",
    surface: "bg-[#FCEAE9]",
    title: "Review and onboarding",
    description:
      "The Operavax team reviews your request within 1 business day. We may reach out to clarify requirements. Once everything is confirmed, we begin setup and will let you know when your product is live on the platform.",
  },
  {
    step: "05",
    icon: Users,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
    title: "You go live",
    description:
      "Once setup is complete, your organisation is live on the Operavax ecosystem. Individuals can discover and interact with your products immediately. You will receive data via email or webhook depending on your plan.",
  },
];

const checklist = [
  "The official published source documents (PDF, DOCX, or XLSX)",
  "A named contact person who will handle onboarding communication",
  "The correct sector your organisation belongs to (e.g. Healthcare, Legal, Finance)",
  "A short description of how your team uses the data",
  "Your preferred data delivery method (email or webhook)",
];

const faqs = [
  {
    q: "Can I list multiple products?",
    a: "Yes. Your plan defines how many products you can list at one time. The Starter plan supports up to 10, Professional supports up to 50, and Enterprise has no limit. Submit each product separately through the listing application.",
  },
  {
    q: "How long does onboarding take?",
    a: "Standard onboarding is completed within 3 to 5 business days of your request being approved. Complex setups may take longer. The Operavax team will communicate the timeline when your request is confirmed.",
  },
  {
    q: "What if I need to update after going live?",
    a: "Send updated documents to your account manager or email updates@operavax.co.za. We will review the changes and publish the updated version. The existing version remains live in the meantime.",
  },
  {
    q: "Can I see who has used my product?",
    a: "Yes. Your administrator dashboard shows all incoming data with timestamps and reference numbers. You can export data as CSV at any time. Note that personal information is handled in accordance with POPIA.",
  },
  {
    q: "What file formats are accepted?",
    a: "PDF, Word (DOCX), and Excel (XLSX) are all accepted. The file must be the official published version — not a draft, scan, or photo. Maximum file size is 10 MB.",
  },
];

export default function ListingGuidePage() {
  return (
    <PublicPageLayout>
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        <div className="mb-6 md:mb-12 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4285F4]">
              <Building2 className="h-3.5 w-3.5" />
              For organisations
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              How to list on Operavax
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              Operavax brings your organisation into a unified ecosystem accessible
              across every sector. Here is exactly what to expect from the onboarding
              process — from application to live platform.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <ClipboardList className="h-24 w-24 text-[#4285F4]" />
          </div>
        </div>

        <section className="mb-10 md:mb-14">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
            The listing process
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Five clear steps from application to going live.
          </p>

          <div className="mt-6 md:mt-8 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 md:overflow-visible">
            <div className="flex min-w-max gap-4 md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-3">
              {steps.map((item) => (
                <div key={item.step} className="w-[82vw] max-w-[320px] md:w-auto md:max-w-none">
                  <div className="flex h-full gap-4 md:gap-5 rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-7">
                    <div
                      className={`flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl md:rounded-2xl ${item.surface}`}
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a6a6a]">
                        Step {item.step}
                      </p>
                      <h3 className="mt-1 font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#4A5565]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 md:mb-14 rounded-2xl md:rounded-[28px] border border-[#E2E8F0] bg-white p-5 md:p-6">
          <h2 className="font-display text-lg md:text-xl font-bold tracking-tight text-[#222]">
            What to prepare before you apply
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Having these ready will speed up your review.
          </p>
          <ul className="mt-4 md:mt-5 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F9D58]" />
                <span className="text-sm leading-6 text-[#4A5565]">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 md:mb-14">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
            Frequently asked questions
          </h2>
          <div className="mt-5 md:mt-6 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 md:overflow-visible">
            <div className="flex min-w-max gap-4 md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="w-[82vw] max-w-[320px] md:w-auto md:max-w-none">
                  <div className="h-full rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-6">
                    <p className="font-display text-sm font-bold tracking-tight text-[#222]">
                      {faq.q}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#4A5565]">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="rounded-2xl md:rounded-[28px] border border-[#BFD3FF] bg-white p-5 md:p-8 text-center">
          <h2 className="font-display text-lg md:text-xl font-bold tracking-tight text-[#222]">
            Ready to get started?
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Get in touch and the Operavax team will be in contact within 1 business day.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:hello@operavax.co.za"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4285F4] px-6 py-3 md:py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3367D6]"
            >
              Apply now
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#BFD3FF] px-6 py-3 md:py-2.5 text-sm font-semibold text-[#4285F4] transition-all hover:bg-[#F0F6FF]"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </main>
    </PublicPageLayout>
  );
}
