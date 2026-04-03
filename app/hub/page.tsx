import { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Sparkles,
  HelpCircle,
  FileText,
  MessageCircle,
  DollarSign,
  BookOpen,
  Camera,
  ShieldCheck,
  ScrollText,
  Mail,
  Building2,
  ArrowRight,
  Users,
  Globe,
  ClipboardList,
} from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

export const metadata: Metadata = {
  title: "Operavax Hub",
  description:
    "The central directory for the Operavax ecosystem. Access all products, resources, and community links.",
};

const featuredLinks = [
  {
    title: "Operavax Hub Launch",
    description: "The central front door to every Operavax product is now live.",
    href: "/status",
    color: "from-[#4285F4] to-[#3367D6]",
  },
  {
    title: "Operavax Report (Beta)",
    description: "Camera-first community reporting. Snap, report, done.",
    href: "https://report.operavax.com",
    color: "from-[#DB4437] to-[#c53929]",
  },
  {
    title: "System Status",
    description: "All systems operational. View uptime and health.",
    href: "/status",
    color: "from-[#0F9D58] to-[#0b8043]",
  },
];

const categories = [
  {
    label: "Products",
    color: "border-l-[#4285F4]",
    items: [
      { icon: BookOpen, color: "text-[#0F9D58]", surface: "bg-[#E6F4EA]", label: "Operavax Docs", description: "Guides, references & documentation", href: "https://docs.operavax.com" },
      { icon: Camera, color: "text-[#DB4437]", surface: "bg-[#FCEAE9]", label: "Operavax Report", description: "Camera-first community reporting", href: "https://report.operavax.com" },
      { icon: FileText, color: "text-[#4285F4]", surface: "bg-[#E8F0FE]", label: "Operavax Forms", description: "Official forms marketplace", href: "https://forms.operavax.com" },
    ],
  },
  {
    label: "Resources",
    color: "border-l-[#0F9D58]",
    items: [
      { icon: HelpCircle, color: "text-[#4285F4]", surface: "bg-[#E8F0FE]", label: "Support Centre", description: "Answers, guides, and help", href: "/support" },
      { icon: DollarSign, color: "text-[#0F9D58]", surface: "bg-[#E6F4EA]", label: "Payments & Pricing", description: "How payments work", href: "/about/payments" },
      { icon: ClipboardList, color: "text-[#4285F4]", surface: "bg-[#E8F0FE]", label: "Listing Guide", description: "How to list on Operavax", href: "/about/listing-guide" },
    ],
  },
  {
    label: "Platform",
    color: "border-l-[#F4B400]",
    items: [
      { icon: Activity, color: "text-[#0F9D58]", surface: "bg-[#E6F4EA]", label: "System Status", description: "Uptime and service health", href: "/status" },
      { icon: Sparkles, color: "text-[#4285F4]", surface: "bg-[#E8F0FE]", label: "Changelog", description: "Latest updates and releases", href: "/status" },
      { icon: Globe, color: "text-[#F4B400]", surface: "bg-[#FEF7E0]", label: "Operavax Hub", description: "Central platform homepage", href: "/" },
    ],
  },
  {
    label: "Legal & Contact",
    color: "border-l-[#DB4437]",
    items: [
      { icon: ShieldCheck, color: "text-[#0F9D58]", surface: "bg-[#E6F4EA]", label: "Privacy Policy", description: "How we protect your data", href: "/privacy" },
      { icon: ScrollText, color: "text-[#F4B400]", surface: "bg-[#FEF7E0]", label: "Terms of Service", description: "Platform usage terms", href: "/terms" },
      { icon: Mail, color: "text-[#DB4437]", surface: "bg-[#FCEAE9]", label: "Contact Us", description: "WhatsApp, email, and more", href: "/contact" },
    ],
  },
];

export default function HubDirectoryPage() {
  return (
    <PublicPageLayout backLabel="Back to home">
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        {/* Page header */}
        <div className="mb-6 md:mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FE] px-3 py-1.5 text-xs font-semibold text-[#4285F4]">
              <Globe className="h-3.5 w-3.5" />
              Operavax Hub
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              Operavax Hub
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              Your central directory to the entire Operavax ecosystem. Access all products,
              resources, documentation, support, community, and platform updates from one place.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <Globe className="h-24 w-24 text-[#4285F4]" />
          </div>
        </div>

        {/* Featured posts — horizontal scroll on mobile, grid on desktop */}
        <section className="mb-8 md:mb-12">
          <h2 className="font-display text-lg md:text-xl font-bold tracking-tight text-[#222] mb-4">
            Featured
          </h2>
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 md:overflow-visible">
            <div className="flex min-w-max gap-4 md:min-w-0 md:grid md:grid-cols-3">
              {featuredLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group w-[82vw] max-w-[340px] md:w-auto md:max-w-none"
                >
                  <div className={`rounded-2xl md:rounded-[24px] bg-gradient-to-br ${item.color} p-5 md:p-6 transition-all hover:shadow-lg hover:scale-[1.01]`}>
                    <h3 className="font-display text-base md:text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">{item.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-white/90">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories — like Cursor forum categories */}
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.label}
                className={`rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white overflow-hidden`}
              >
                {/* Category header */}
                <div className={`border-l-4 ${category.color} px-5 py-4 border-b border-[#E2E8F0]`}>
                  <h3 className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                    {category.label}
                  </h3>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#f0f0f0]">
                  {category.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#f7f7f7]"
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.surface}`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-semibold tracking-tight text-[#222] group-hover:text-[#4285F4] transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-[#6a6a6a]">{item.description}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#ccc] transition-all group-hover:text-[#4285F4] group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PublicPageLayout>
  );
}
