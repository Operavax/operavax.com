"use client";

import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  ExternalLink,
  FileText,
  Video,
  Zap,
} from "lucide-react";

const resources = [
  {
    title: "Documentation",
    description: "Browse guides, API references, and tutorials",
    icon: BookOpen,
    color: "#0F9D58",
    bg: "#E6F4EA",
    href: "https://docs.operavax.com",
  },
  {
    title: "Getting Started",
    description: "Quick start guide for new administrators",
    icon: Zap,
    color: "#4285F4",
    bg: "#E8F0FE",
    href: "#",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    icon: Video,
    color: "#DB4437",
    bg: "#FDE8E7",
    href: "#",
  },
  {
    title: "Release Notes",
    description: "Latest platform updates and changes",
    icon: FileText,
    color: "#F4B400",
    bg: "#FEF7E0",
    href: "/super/administrator/changelog",
  },
];

const contactChannels = [
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    icon: MessageCircle,
    color: "#4285F4",
    bg: "#E8F0FE",
    action: "Start Chat",
  },
  {
    title: "Email Support",
    description: "support@operavax.com",
    icon: Mail,
    color: "#0F9D58",
    bg: "#E6F4EA",
    action: "Send Email",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3E8FF]">
            <HelpCircle className="h-5 w-5 text-[#7C3AED]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Help Center
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Find answers and get support
            </p>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-display text-lg font-bold tracking-tight text-[#222] mb-3 md:mb-4">
          Resources
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              className="group flex items-center gap-3 rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-4 md:p-5 transition-all hover:shadow-md hover:border-[#ddd]"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: resource.bg }}
              >
                <resource.icon
                  className="h-5 w-5"
                  style={{ color: resource.color }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold tracking-tight text-[#222] group-hover:text-[#4285F4] transition-colors">
                  {resource.title}
                </p>
                <p className="text-xs text-[#6a6a6a]">
                  {resource.description}
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#ccc] transition-all group-hover:text-[#4285F4]" />
            </a>
          ))}
        </div>
      </div>

      {/* Contact support */}
      <div>
        <h2 className="font-display text-lg font-bold tracking-tight text-[#222] mb-3 md:mb-4">
          Contact Support
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {contactChannels.map((channel) => (
            <div
              key={channel.title}
              className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-4 md:p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: channel.bg }}
                >
                  <channel.icon
                    className="h-5 w-5"
                    style={{ color: channel.color }}
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-bold tracking-tight text-[#222]">
                    {channel.title}
                  </p>
                  <p className="text-xs text-[#6a6a6a]">
                    {channel.description}
                  </p>
                </div>
              </div>
              <button
                disabled
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#FAFAFA] px-3 py-2 text-xs font-semibold text-[#6a6a6a] transition-colors hover:bg-[#F0F0F0] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {channel.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
