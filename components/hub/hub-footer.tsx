"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle, DollarSign, Building2, MessageCircle, Activity, Sparkles, X } from "lucide-react";
import { BrandStripe } from "./brand-stripe";

const supportResources = [
  {
    icon: HelpCircle,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
    label: "Support Centre",
    description: "Answers, guides, and help",
    href: "/support",
  },
  {
    icon: DollarSign,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
    label: "About payments",
    description: "Pricing, costs, and billing",
    href: "/about/payments",
  },
  {
    icon: Building2,
    color: "text-[#F4B400]",
    surface: "bg-[#FEF7E0]",
    label: "Explore platforms",
    description: "Browse all Operavax products",
    href: "/",
  },
  {
    icon: MessageCircle,
    color: "text-[#DB4437]",
    surface: "bg-[#FCEAE9]",
    label: "Contact us",
    description: "WhatsApp, email, and more",
    href: "/contact",
  },
  {
    icon: Activity,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
    label: "System status",
    description: "Uptime and service health",
    href: "/status",
  },
  {
    icon: Sparkles,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
    label: "Changelog",
    description: "Latest updates and releases",
    href: "/status#changelog",
  },
];

function SupportResourcesCarousel() {
  return (
    <div className="-mx-3 px-3">
      <div className="flex gap-1.5 overflow-x-auto px-px pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {supportResources.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="w-[220px] max-w-[68vw] shrink-0 rounded-xl border border-[#f0f0f0] bg-white px-2.5 py-2 transition-transform active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.surface}`}>
                <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[11px] font-semibold leading-tight tracking-tight text-[#222] line-clamp-1">
                  {item.label}
                </p>
                <p className="text-[10px] leading-tight text-[#6a6a6a] line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SupportResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 font-bold hover:underline cursor-pointer transition-colors"
      >
        Support & resources
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-[280px] rounded-2xl border border-[#E2E8F0] bg-white shadow-xl overflow-hidden">
          <div className="flex h-[4px] w-full">
            <div className="flex-1 bg-[#4285F4] rounded-tl-2xl" />
            <div className="flex-1 bg-[#DB4437]" />
            <div className="flex-1 bg-[#F4B400]" />
            <div className="flex-1 bg-[#0F9D58] rounded-tr-2xl" />
          </div>

          <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-[#f0f0f0]">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#6a6a6a]">
              Support & resources
            </p>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-full p-1 hover:bg-[#f7f7f7] transition-colors"
              aria-label="Close menu"
            >
              <X className="h-3.5 w-3.5 text-[#6a6a6a]" />
            </button>
          </div>

          <div className="p-2">
            {supportResources.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#f7f7f7]"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.surface}`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold tracking-tight text-[#222]">
                    {item.label}
                  </p>
                  <p className="text-xs text-[#6a6a6a]">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HubFooter() {
  return (
    <footer className="bg-white">
      <BrandStripe />

      {/* Mobile footer */}
      <div className="md:hidden px-4 py-5 space-y-2">
        <SupportResourcesCarousel />
        <div className="-mx-4 border-t border-[#f0f0f0]" />
        <div className="pt-0.5 text-center">
          <div className="flex items-center justify-center flex-wrap gap-x-1.5 gap-y-0.5 font-display text-[11px] font-medium text-[#6a6a6a]">
            <span>&copy; {new Date().getFullYear()} Operavax, Inc.</span>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:text-[#222]">Privacy</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-[#222]">Terms</Link>
            <span>&middot;</span>
            <Link href="/contact" className="hover:text-[#222]">Contact</Link>
          </div>
        </div>
      </div>

      {/* Desktop footer */}
      <div className="hidden md:block w-full px-10 py-4">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1 font-display text-sm tracking-tight text-[#222]">
            <span className="font-medium">
              &copy; {new Date().getFullYear()} Operavax, Inc.
            </span>
            <span className="text-[#6a6a6a]">&middot;</span>
            <Link href="/privacy" className="font-medium text-[#222] hover:underline">Privacy</Link>
            <span className="text-[#6a6a6a]">&middot;</span>
            <Link href="/terms" className="font-medium text-[#222] hover:underline">Terms</Link>
            <span className="text-[#6a6a6a]">&middot;</span>
            <Link href="/contact" className="font-medium text-[#222] hover:underline">Contact</Link>
          </div>
          <div className="flex items-center gap-4 font-display text-sm font-bold tracking-tight text-[#222]">
            <SupportResourcesDropdown />
          </div>
        </div>
      </div>
    </footer>
  );
}
