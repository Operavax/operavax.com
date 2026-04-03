import { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Building2,
  MapPin,
  Clock,
} from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Operavax team for support, organisation onboarding, or general enquiries.",
};

const contactChannels = [
  {
    icon: MessageCircle,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
    title: "WhatsApp",
    description:
      "The fastest way to reach us. Our support team responds to WhatsApp messages during business hours.",
    detail: "Available Mon\u2013Fri, 8am\u20135pm SAST",
    action: "Open WhatsApp",
    href: "https://wa.me/27000000000",
    external: true,
  },
  {
    icon: Mail,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
    title: "General enquiries",
    description:
      "For general questions about the platform, partnerships, or anything not covered above.",
    detail: "hello@operavax.co.za",
    action: "Send an email",
    href: "mailto:hello@operavax.co.za",
    external: false,
  },
  {
    icon: Building2,
    color: "text-[#F4B400]",
    surface: "bg-[#FEF7E0]",
    title: "Organisation onboarding",
    description:
      "Want to list on the Operavax ecosystem? Get in touch to explore how we can work together.",
    detail: "Review within 1 business day",
    action: "Get in touch",
    href: "mailto:hello@operavax.co.za",
    external: false,
  },
];

const topics = [
  { label: "Support & help", email: "support@operavax.co.za" },
  { label: "Privacy & data requests", email: "privacy@operavax.co.za" },
  { label: "Legal & terms", email: "legal@operavax.co.za" },
  { label: "Organisation billing", email: "billing@operavax.co.za" },
  { label: "Press & media", email: "media@operavax.co.za" },
];

export default function ContactPage() {
  return (
    <PublicPageLayout>
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        <div className="mb-6 md:mb-12 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FE] px-3 py-1.5 text-xs font-semibold text-[#4285F4]">
              <Mail className="h-3.5 w-3.5" />
              Contact us
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              Get in touch
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              We are a small and responsive team. Whether you need support, want to
              explore the Operavax ecosystem, or have a general question — reach us through any of
              the channels below.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <MessageCircle className="h-24 w-24 text-[#DB4437]" />
          </div>
        </div>

        <section className="mb-8 md:mb-14">
          <div className="grid gap-3 md:gap-5 md:grid-cols-3">
            {contactChannels.map((channel) => (
              <div
                key={channel.title}
                className="flex flex-col rounded-xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-6"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${channel.surface} mb-3 md:mb-4`}>
                  <channel.icon className={`h-5 w-5 ${channel.color}`} />
                </div>
                <h2 className="font-display text-base font-bold tracking-tight text-[#222]">
                  {channel.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#6a6a6a]">
                  {channel.description}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#6a6a6a]">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {channel.detail}
                </p>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#4285F4] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3367D6] min-h-[44px]"
                >
                  {channel.action}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-14">
          <h2 className="font-display text-lg md:text-xl font-bold tracking-tight text-[#222]">
            Topic-specific contacts
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
            For specialised queries, reach the right team directly.
          </p>
          <div className="mt-4 md:mt-5 overflow-hidden rounded-2xl md:rounded-[24px] border border-[#E2E8F0]">
            {topics.map((topic, index) => (
              <div
                key={topic.label}
                className={`flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4 px-4 md:px-5 py-3.5 md:py-4 ${
                  index < topics.length - 1 ? "border-b border-[#E2E8F0]" : ""
                } bg-white`}
              >
                <span className="text-sm font-medium text-[#4A5565]">{topic.label}</span>
                <a
                  href={`mailto:${topic.email}`}
                  className="text-sm font-semibold text-[#4285F4] hover:underline"
                >
                  {topic.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-5 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4EA]">
              <MapPin className="h-5 w-5 text-[#0F9D58]" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold tracking-tight text-[#222]">
                Based in South Africa
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
                Operavax is a South African platform built to serve South
                African organisations and individuals. All support is handled
                locally and all data is processed in compliance with POPIA.
              </p>
              <p className="mt-3 text-xs text-[#6a6a6a]">
                Business hours: Monday to Friday, 8am – 5pm SAST.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PublicPageLayout>
  );
}
