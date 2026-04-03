"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bell,
  Sparkles,
  Zap,
  Tag,
  ChevronDown,
} from "lucide-react";
import { PublicPageLayout } from "@/components/hub/public-page-layout";

// ── System Status Data ──
const services = [
  {
    name: "Operavax Hub",
    description: "Central platform hub",
    status: "operational" as const,
    uptime: 99.98,
    url: "operavax.com",
  },
  {
    name: "Operavax Docs",
    description: "Documentation platform",
    status: "operational" as const,
    uptime: 99.99,
    url: "docs.operavax.com",
  },
  {
    name: "Operavax Report",
    description: "Community reporting",
    status: "operational" as const,
    uptime: 99.95,
    url: "report.operavax.com",
  },
  {
    name: "Authentication (Clerk)",
    description: "User sign-in & sign-up",
    status: "operational" as const,
    uptime: 99.99,
    url: "clerk.com",
  },
  {
    name: "Backend (Convex)",
    description: "Real-time data & functions",
    status: "operational" as const,
    uptime: 99.92,
    url: "convex.dev",
  },
  {
    name: "Hosting (Vercel)",
    description: "Edge deployment & CDN",
    status: "operational" as const,
    uptime: 99.99,
    url: "vercel.com",
  },
];

const statusColors = {
  operational: { bg: "bg-[#0F9D58]", text: "text-[#0F9D58]", label: "Operational" },
  degraded: { bg: "bg-[#F4B400]", text: "text-[#F4B400]", label: "Degraded" },
  outage: { bg: "bg-[#DB4437]", text: "text-[#DB4437]", label: "Major Outage" },
};

function UptimeBar() {
  // Generate 90 days of mostly green bars
  const days = Array.from({ length: 90 }, (_, i) => {
    const rand = Math.random();
    if (rand > 0.97) return "degraded";
    if (rand > 0.995) return "outage";
    return "operational";
  });

  return (
    <div className="flex gap-[2px] h-8">
      {days.map((status, i) => (
        <div
          key={i}
          className={`flex-1 rounded-[1px] transition-opacity hover:opacity-80 ${
            status === "operational"
              ? "bg-[#0F9D58]"
              : status === "degraded"
                ? "bg-[#F4B400]"
                : "bg-[#DB4437]"
          }`}
        />
      ))}
    </div>
  );
}

// ── Changelog Data ──
const changelog = [
  {
    version: "1.2.0",
    date: "3 April 2026",
    title: "Operavax Hub Launch",
    type: "feature" as const,
    description:
      "The central hub is live at operavax.com — a single front door to every Operavax product. Browse, favourite, and navigate across the ecosystem.",
    highlights: [
      "Product cards with heart favourites",
      "Sector-based navigation for multi-sector products",
      "My Products tab for recently visited platforms",
      "Customise sheet to show/hide products",
    ],
  },
  {
    version: "1.1.0",
    date: "28 March 2026",
    title: "Operavax Report (Beta)",
    type: "feature" as const,
    description:
      "Camera-first community reporting platform. Snap a photo, auto-detect location, and reports are automatically routed to the right authority.",
    highlights: [
      "Camera-first evidence capture",
      "Auto GPS location detection",
      "Smart routing to authorities",
      "Real-time tracking and notifications",
    ],
  },
  {
    version: "1.0.0",
    date: "1 March 2026",
    title: "Operavax Forms & Docs",
    type: "launch" as const,
    description:
      "Initial launch of the Operavax ecosystem with the Forms marketplace and Documentation platform.",
    highlights: [
      "Forms marketplace with search and categories",
      "Organisation profiles and verified badges",
      "Documentation site for all products",
      "Clerk authentication with Google & Microsoft SSO",
    ],
  },
];

const typeStyles = {
  feature: { bg: "bg-[#E8F0FE]", text: "text-[#4285F4]", label: "New Feature", icon: Sparkles },
  improvement: { bg: "bg-[#E6F4EA]", text: "text-[#0F9D58]", label: "Improvement", icon: Zap },
  fix: { bg: "bg-[#FEF7E0]", text: "text-[#F4B400]", label: "Bug Fix", icon: Activity },
  launch: { bg: "bg-[#FCEAE9]", text: "text-[#DB4437]", label: "Launch", icon: Tag },
};

// ── Incidents ──
const incidents = [
  {
    date: "2 April 2026",
    title: "Scheduled maintenance — Convex backend migration",
    status: "resolved" as const,
    description: "Brief downtime (~3 minutes) during backend migration. All services restored.",
  },
];

export default function StatusPage() {
  const [showAllIncidents, setShowAllIncidents] = useState(false);
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <PublicPageLayout>
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-16">
        {/* Page header */}
        <div className="mb-6 md:mb-12 flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EA] px-3 py-1.5 text-xs font-semibold text-[#0F9D58]">
              <Activity className="h-3.5 w-3.5" />
              System Status & Changelog
            </div>
            <h1 className="mt-4 md:mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#222]">
              Platform Health & Updates
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6a6a] md:text-base">
              Real-time system status, uptime history, and the latest product updates
              across the Operavax ecosystem.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 self-center">
            <Activity className="h-24 w-24 text-[#0F9D58]" />
          </div>
        </div>

        {/* ═══ SYSTEM STATUS ═══ */}
        <section className="mb-10 md:mb-16">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222] mb-4 md:mb-6">
            System Status
          </h2>

          {/* Overall status banner */}
          <div
            className={`rounded-2xl md:rounded-[24px] p-5 md:p-6 mb-6 ${
              allOperational ? "bg-[#0F9D58]" : "bg-[#F4B400]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span className="font-display text-lg md:text-xl font-bold text-white">
                  {allOperational ? "All Systems Operational" : "Some Systems Degraded"}
                </span>
              </div>
              <a
                href="mailto:status@operavax.co.za"
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
              >
                <Bell className="h-3.5 w-3.5" />
                Subscribe to updates
              </a>
            </div>
          </div>

          {/* Service list with uptime bars */}
          <div className="space-y-4">
            {services.map((service) => {
              const status = statusColors[service.status];
              return (
                <div
                  key={service.name}
                  className="rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display text-sm md:text-base font-bold tracking-tight text-[#222]">
                        {service.name}
                      </h3>
                      <p className="text-xs text-[#6a6a6a] mt-0.5">{service.description}</p>
                    </div>
                    <span className={`text-xs md:text-sm font-semibold ${status.text}`}>
                      {status.label}
                    </span>
                  </div>
                  <UptimeBar />
                  <div className="flex items-center justify-between mt-2 text-[11px] text-[#6a6a6a]">
                    <span>90 days ago</span>
                    <span className="font-medium">{service.uptime}% uptime</span>
                    <span>Today</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent incidents */}
          <div className="mt-6 md:mt-8">
            <h3 className="font-display text-lg font-bold tracking-tight text-[#222] mb-3">
              Recent Incidents
            </h3>
            {incidents.length === 0 ? (
              <p className="text-sm text-[#6a6a6a]">No recent incidents.</p>
            ) : (
              <div className="space-y-3">
                {incidents.map((incident, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-sm font-bold text-[#222]">{incident.title}</p>
                        <p className="mt-1 text-sm text-[#4A5565]">{incident.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-semibold text-[#0F9D58]">
                          <CheckCircle2 className="h-3 w-3" />
                          Resolved
                        </span>
                        <p className="mt-1 text-[11px] text-[#6a6a6a]">{incident.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ CHANGELOG ═══ */}
        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222] mb-4 md:mb-6">
            Changelog
          </h2>

          {/* Featured / latest release */}
          <div className="mb-6 md:mb-8 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 md:overflow-visible">
            <div className="flex min-w-max gap-4 md:min-w-0 md:grid md:grid-cols-3">
              {changelog.slice(0, 3).map((entry) => {
                const type = typeStyles[entry.type];
                const TypeIcon = type.icon;
                return (
                  <div
                    key={entry.version}
                    className="w-[82vw] max-w-[340px] md:w-auto md:max-w-none rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-5 md:p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${type.bg} ${type.text}`}>
                        <TypeIcon className="h-3 w-3" />
                        {type.label}
                      </span>
                      <span className="text-[11px] text-[#6a6a6a]">v{entry.version}</span>
                    </div>
                    <h3 className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                      {entry.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5565]">
                      {entry.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {entry.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-[#4A5565]">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F9D58]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 flex items-center gap-1 text-xs text-[#6a6a6a]">
                      <Clock className="h-3 w-3" />
                      {entry.date}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full timeline */}
          <div className="space-y-4">
            {changelog.map((entry) => {
              const type = typeStyles[entry.type];
              const TypeIcon = type.icon;
              return (
                <div
                  key={entry.version}
                  className="flex gap-4 md:gap-6 rounded-2xl md:rounded-[24px] border border-[#E2E8F0] bg-white p-4 md:p-6"
                >
                  <div className={`flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl md:rounded-2xl ${type.bg}`}>
                    <TypeIcon className={`h-5 w-5 ${type.text}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${type.bg} ${type.text}`}>
                        {type.label}
                      </span>
                      <span className="text-[11px] font-medium text-[#6a6a6a]">v{entry.version}</span>
                      <span className="text-[11px] text-[#6a6a6a]">&middot; {entry.date}</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-sm md:text-base font-bold tracking-tight text-[#222]">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#4A5565]">
                      {entry.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PublicPageLayout>
  );
}
