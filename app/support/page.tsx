import { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  MessageCircle,
  FileText,
  DollarSign,
  Building2,
  ShieldCheck,
  ArrowRight,
  Mail,
} from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

export const metadata: Metadata = {
  title: "Support Centre",
  description:
    "Find answers, guides, and contact options for Operavax support.",
};

const topics = [
  {
    icon: FileText,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
    title: "Using Operavax products",
    items: [
      "How do I find and access a product?",
      "What products are available on Operavax?",
      "How do I navigate between products?",
      "Where do I find my recent activity?",
      "Can I favourite products for quick access?",
    ],
    answer:
      "Use the hub at operavax.com to discover all available products. Tap the heart icon to favourite any product for quick access. Your recent activity is tracked automatically in the My Products tab.",
  },
  {
    icon: ShieldCheck,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
    title: "Your account and profile",
    items: [
      "How do I update my personal details?",
      "Is my data stored securely?",
      "How do I delete my account?",
      "Can I use Operavax without creating an account?",
    ],
    answer:
      "Your profile is editable from your dashboard. All data is encrypted and used only to enhance your experience — it is never shared without your consent. To delete your account, email privacy@operavax.co.za. You can browse products without an account, but you need to sign in to use them.",
  },
  {
    icon: DollarSign,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
    title: "Payments and costs",
    items: [
      "Is Operavax free to use?",
      "Will I ever be charged?",
      "How does organisation pricing work?",
    ],
    answer:
      "The Operavax hub is free for individuals. You will never be charged to browse or access products. Organisations pay a monthly plan to list on the ecosystem — that cost is not passed on to you.",
    link: { label: "Learn more about how payments work", href: "/about/payments" },
  },
  {
    icon: Building2,
    color: "text-[#F4B400]",
    surface: "bg-[#FEF7E0]",
    title: "For organisations",
    items: [
      "How do I get my organisation on Operavax?",
      "How long does onboarding take?",
      "Can I list multiple products?",
      "How do I receive data from my users?",
    ],
    answer:
      "Organisations apply through our onboarding process. Once approved, the Operavax team sets up your product on the platform. Data delivery depends on your plan — email, webhook, or direct API integration.",
    link: { label: "See the full listing guide", href: "/about/listing-guide" },
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
    title: "WhatsApp support",
    description:
      "The fastest way to get help. Our support team is available on WhatsApp during business hours.",
    action: "Chat on WhatsApp",
    href: "https://wa.me/27000000000",
    external: true,
  },
  {
    icon: Mail,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
    title: "Email support",
    description:
      "For detailed queries, account issues, or anything you prefer in writing. We aim to respond within 1 business day.",
    action: "Email us",
    href: "mailto:support@operavax.co.za",
    external: false,
  },
];

export default function SupportPage() {
  return (
    <PublicPageLayout>
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        <div className="mb-6 md:mb-12 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FE] px-3 py-1.5 text-xs font-semibold text-[#4285F4]">
              <HelpCircle className="h-3.5 w-3.5" />
              Support Centre
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              How can we help?
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              Find answers to common questions, or get in touch with the Operavax
              team directly. We are here to help you get the most out of the
              platform.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <HelpCircle className="h-24 w-24 text-[#4285F4]" />
          </div>
        </div>

        <section className="mb-8 md:mb-14 grid gap-3 md:gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="rounded-xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-8"
            >
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${topic.surface}`}>
                  <topic.icon className={`h-5 w-5 ${topic.color}`} />
                </div>
                <h2 className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                  {topic.title}
                </h2>
              </div>

              <ul className="mb-4 space-y-1.5">
                {topic.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6a6a6a]" />
                    <span className="text-sm font-medium text-[#4A5565]">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm leading-6 text-[#4A5565]">{topic.answer}</p>

              {topic.link && (
                <Link
                  href={topic.link.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4285F4] hover:underline"
                >
                  {topic.link.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
            Still need help?
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            Reach the Operavax team directly.
          </p>

          <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 sm:grid-cols-2">
            {contactOptions.map((option) => (
              <div
                key={option.title}
                className="flex flex-col rounded-xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-6"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${option.surface} mb-3 md:mb-4`}>
                  <option.icon className={`h-5 w-5 ${option.color}`} />
                </div>
                <h3 className="font-display text-base font-bold tracking-tight text-[#222]">
                  {option.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#6a6a6a]">
                  {option.description}
                </p>
                <a
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noopener noreferrer" : undefined}
                  className="mt-4 md:mt-5 inline-flex items-center justify-center rounded-full bg-[#4285F4] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3367D6] min-h-[44px]"
                >
                  {option.action}
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PublicPageLayout>
  );
}
