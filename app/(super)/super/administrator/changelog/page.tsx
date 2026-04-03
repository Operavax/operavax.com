"use client";

import {
  FileText,
  Rocket,
  BookOpen,
  Camera,
  CheckCircle2,
} from "lucide-react";

const entries = [
  {
    version: "1.0.0",
    date: "April 3, 2026",
    title: "Operavax Hub Launched",
    description:
      "The central hub platform is now live. Super admin dashboard, product ecosystem navigation, and sector management are all operational.",
    icon: Rocket,
    iconColor: "#4285F4",
    iconBg: "#E8F0FE",
    changes: [
      "Super admin dashboard with overview stats",
      "Product ecosystem with Docs and Report",
      "31 sectors across 5 groups",
      "25 category filters",
      "System status monitoring",
    ],
  },
  {
    version: "0.2.0",
    date: "April 2, 2026",
    title: "Operavax Docs Connected",
    description:
      "The documentation platform has been integrated into the product ecosystem. Users can now access guides and references directly from the hub.",
    icon: BookOpen,
    iconColor: "#0F9D58",
    iconBg: "#E6F4EA",
    changes: [
      "Docs product page integrated",
      "Documentation navigation",
      "Search functionality planned",
    ],
  },
  {
    version: "0.1.0",
    date: "April 1, 2026",
    title: "Operavax Report Beta",
    description:
      "Camera-first community reporting tool connected to the platform. Reports are automatically routed to the correct sector authority.",
    icon: Camera,
    iconColor: "#DB4437",
    iconBg: "#FDE8E7",
    changes: [
      "Report product registered",
      "Sector-based routing logic",
      "Camera capture integration planned",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F0FE]">
            <FileText className="h-5 w-5 text-[#4285F4]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Changelog
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Recent updates and platform releases
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {entries.map((entry, idx) => (
          <div
            key={entry.version}
            className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6 transition-all hover:shadow-md hover:border-[#ddd]"
          >
            {/* Entry header */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: entry.iconBg }}
              >
                <entry.icon
                  className="h-5 w-5"
                  style={{ color: entry.iconColor }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-base font-bold tracking-tight text-[#222]">
                    {entry.title}
                  </h3>
                  <span className="inline-flex rounded-full bg-[#E8F0FE] px-2 py-0.5 text-[10px] font-bold text-[#4285F4]">
                    v{entry.version}
                  </span>
                  {idx === 0 && (
                    <span className="inline-flex rounded-full bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-bold text-[#0F9D58]">
                      Latest
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6a6a6a] mt-0.5">{entry.date}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#6a6a6a] leading-relaxed mb-4">
              {entry.description}
            </p>

            {/* Changes list */}
            <div className="space-y-2">
              {entry.changes.map((change) => (
                <div key={change} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F9D58] mt-0.5" />
                  <span className="text-sm text-[#444]">{change}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
