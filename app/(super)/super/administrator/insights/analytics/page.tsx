"use client";

import { BarChart3, TrendingUp, Eye, MousePointerClick } from "lucide-react";

const placeholderStats = [
  {
    label: "Page Views",
    value: "--",
    icon: Eye,
    color: "text-[#4285F4]",
    surface: "bg-[#E8F0FE]",
  },
  {
    label: "Unique Visitors",
    value: "--",
    icon: MousePointerClick,
    color: "text-[#0F9D58]",
    surface: "bg-[#E6F4EA]",
  },
  {
    label: "Engagement Rate",
    value: "--",
    icon: TrendingUp,
    color: "text-[#F4B400]",
    surface: "bg-[#FEF7E0]",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F0FE]">
            <BarChart3 className="h-5 w-5 text-[#4285F4]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Analytics
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Platform usage and engagement metrics
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
        {placeholderStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-4 md:p-5"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.surface}`}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="font-display text-2xl font-bold tracking-tight text-[#ccc]">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs font-medium text-[#6a6a6a]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Coming soon chart area */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F0FE] mb-4">
            <BarChart3 className="h-7 w-7 text-[#4285F4]" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-[#222] mb-1">
            Analytics coming soon
          </h3>
          <p className="text-sm text-[#6a6a6a] max-w-sm">
            Detailed analytics dashboards with traffic, engagement, and product
            usage metrics are being developed.
          </p>
        </div>
      </div>
    </div>
  );
}
