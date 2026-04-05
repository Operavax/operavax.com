"use client";

import { Map, Search } from "lucide-react";
import { SECTORS } from "@/lib/hub-data";

const groupLabels: Record<string, string> = {
  public: "Public",
  finance: "Finance",
  industry: "Industry",
  services: "Services",
  infra: "Infrastructure",
};

const groupColors: Record<string, { text: string; bg: string }> = {
  public: { text: "text-[#4285F4]", bg: "bg-[#E8F0FE]" },
  finance: { text: "text-[#F4B400]", bg: "bg-[#FEF7E0]" },
  industry: { text: "text-[#DB4437]", bg: "bg-[#FDE8E7]" },
  services: { text: "text-[#0F9D58]", bg: "bg-[#E6F4EA]" },
  infra: { text: "text-[#7C3AED]", bg: "bg-[#F3E8FF]" },
};

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const grouped = Object.entries(groupLabels).map(([key, label]) => ({
  key,
  label,
  sectors: SECTORS.filter((s) => s.group === key),
}));

export default function SectorsPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F4EA]">
            <Map className="h-5 w-5 text-[#0F9D58]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Sectors
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Manage all {SECTORS.length} sectors across the platform
            </p>
          </div>
        </div>
      </div>

      {/* Summary + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EA] px-3 py-1.5">
          <Map className="h-3.5 w-3.5 text-[#0F9D58]" />
          <span className="text-xs font-semibold text-[#0F9D58]">
            {SECTORS.length} sectors in {Object.keys(groupLabels).length} groups
          </span>
        </div>
        <div className="relative sm:ml-auto max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6a6a6a]" />
          <input
            type="text"
            placeholder="Search sectors..."
            disabled
            className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 pl-10 pr-4 text-sm text-[#222] placeholder:text-[#aaa] focus:outline-none focus:border-[#4285F4] disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Grouped sectors */}
      <div className="space-y-6 md:space-y-8">
        {grouped.map((group) => (
          <div key={group.key}>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  groupColors[group.key].bg
                } ${groupColors[group.key].text}`}
              >
                {group.label}
              </span>
              <span className="text-xs text-[#6a6a6a]">
                {group.sectors.length} sector
                {group.sectors.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-2 md:space-y-3">
              {chunk(group.sectors, 10).map((row, i) => (
                <div key={i} className="-mx-3 md:-mx-6 flex gap-3 overflow-x-auto px-3 md:px-6 pb-1 md:pb-2">
                  {row.map((sector) => (
                    <div
                      key={sector.id}
                      className="w-[200px] flex-shrink-0 rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-3.5 md:p-4 transition-all hover:shadow-md hover:border-[#ddd]"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="font-display text-sm font-bold tracking-tight text-[#222] leading-tight truncate">
                          {sector.name}
                        </span>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          groupColors[sector.group].bg
                        } ${groupColors[sector.group].text}`}
                      >
                        {groupLabels[sector.group]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
