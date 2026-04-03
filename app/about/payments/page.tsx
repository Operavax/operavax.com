import { Metadata } from "next";
import Link from "next/link";
import { DollarSign, CheckCircle2, ShieldCheck, HelpCircle, Check } from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

export const metadata: Metadata = {
  title: "Payments & Pricing",
  description:
    "How payments work on the Operavax ecosystem. Free for individuals, subscription plans for organisations.",
};

const fillerFaqs = [
  {
    q: "Do I need to pay to use Operavax?",
    a: "No. Browsing products, filling in forms, submitting reports, and using the Operavax hub is completely free for individuals. You will never be charged.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. Operavax does not charge individuals any fees at any point. The platform is funded by the organisations that use Operavax products.",
  },
  {
    q: "Do organisations charge me through Operavax?",
    a: "No. Operavax does not process payments between you and organisations. If an organisation charges fees for a service, that is handled entirely outside of Operavax.",
  },
];

const orgFaqs = [
  {
    q: "What is included in the monthly plan price?",
    a: "Each plan includes access to the Operavax ecosystem products, a monthly usage quota, and support. Going above the quota incurs an overage rate. All plans include onboarding support and a dashboard.",
  },
  {
    q: "Can I change plans?",
    a: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. The Operavax team will contact you to manage plan transitions.",
  },
  {
    q: "How does billing work?",
    a: "Billing is monthly and managed directly between your organisation and the Operavax team. Invoice-based billing is available for all plans. Enterprise organisations can negotiate annual contract pricing.",
  },
  {
    q: "Is there a free trial?",
    a: "The Operavax team reviews all onboarding applications manually. During the review period, there is no charge. Once your plan is active, billing begins.",
  },
];

export default function AboutPaymentsPage() {
  return (
    <PublicPageLayout>
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        <div className="mb-6 md:mb-12 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EA] px-3 py-1.5 text-xs font-semibold text-[#0F9D58]">
              <DollarSign className="h-3.5 w-3.5" />
              Payments & pricing
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              How payments work
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              Operavax is free to use for individuals. Organisations pay a monthly
              plan to access the ecosystem products. Here is everything you need to know.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <DollarSign className="h-24 w-24 text-[#0F9D58]" />
          </div>
        </div>

        <section className="mb-10 md:mb-12">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
            For individuals
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Using Operavax products costs nothing for individuals.
          </p>

          <div className="mt-5 md:mt-6 rounded-2xl md:rounded-[28px] border border-[#BFD3FF] bg-white p-5 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4285F4]/10">
                <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-[#4285F4]" />
              </div>
              <div>
                <p className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                  Always free for individuals
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
                  Creating an account, browsing products, submitting forms and reports,
                  and accessing your history is completely free. Your profile and
                  activity are stored at no cost.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-6 grid gap-4 md:grid-cols-3">
            {fillerFaqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-6"
              >
                <p className="font-display text-sm font-bold tracking-tight text-[#222]">
                  {faq.q}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#4A5565]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-12">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
            For organisations
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Organisations pay a monthly subscription to access Operavax ecosystem products.
          </p>

          <div className="mt-7 md:mt-8 grid gap-4 md:grid-cols-2">
            {orgFaqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-6"
              >
                <p className="font-display text-sm font-bold tracking-tight text-[#222]">
                  {faq.q}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#4A5565]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-5 md:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0F9D58]" />
            <div>
              <p className="font-display text-sm font-bold tracking-tight text-[#222]">
                No payment data is stored on Operavax
              </p>
              <p className="mt-2 text-sm leading-6 text-[#4A5565]">
                Operavax does not store any payment card or banking information.
                Organisation billing is handled through invoicing managed by the
                Operavax team directly. If you have billing questions, contact{" "}
                <a
                  href="mailto:billing@operavax.co.za"
                  className="font-semibold text-[#4285F4] hover:underline"
                >
                  billing@operavax.co.za
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex items-start gap-3">
          <HelpCircle className="h-4 w-4 shrink-0 text-[#6a6a6a] mt-0.5" />
          <p className="text-sm text-[#6a6a6a]">
            Still have questions?{" "}
            <Link href="/support" className="font-semibold text-[#4285F4] hover:underline">
              Visit the Support Centre
            </Link>
            {" "}or{" "}
            <Link href="/contact" className="font-semibold text-[#4285F4] hover:underline">
              contact our team
            </Link>
            .
          </p>
        </div>
      </main>
    </PublicPageLayout>
  );
}
