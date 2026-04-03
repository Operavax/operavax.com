"use client";

import { FileBarChart, Download, Calendar } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FDE8E7]">
            <FileBarChart className="h-5 w-5 text-[#DB4437]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Reports
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Generate and download platform reports
            </p>
          </div>
        </div>
      </div>

      {/* Report type cards (disabled placeholders) */}
      <div className="grid gap-3 md:grid-cols-3 md:gap-4 mb-6">
        {[
          {
            title: "Usage Report",
            description: "Monthly platform usage summary",
            icon: Calendar,
            color: "#4285F4",
            bg: "#E8F0FE",
          },
          {
            title: "Sector Report",
            description: "Sector activity breakdown",
            icon: FileBarChart,
            color: "#0F9D58",
            bg: "#E6F4EA",
          },
          {
            title: "Export Data",
            description: "Download raw data as CSV",
            icon: Download,
            color: "#F4B400",
            bg: "#FEF7E0",
          },
        ].map((report) => (
          <div
            key={report.title}
            className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-4 md:p-5 opacity-60"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: report.bg }}
              >
                <report.icon
                  className="h-4 w-4"
                  style={{ color: report.color }}
                />
              </div>
              <div>
                <p className="font-display text-sm font-bold tracking-tight text-[#222]">
                  {report.title}
                </p>
                <p className="text-xs text-[#6a6a6a]">
                  {report.description}
                </p>
              </div>
            </div>
            <button
              disabled
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#FAFAFA] px-3 py-2 text-xs font-semibold text-[#6a6a6a] cursor-not-allowed"
            >
              Generate
            </button>
          </div>
        ))}
      </div>

      {/* Coming soon */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDE8E7] mb-4">
            <FileBarChart className="h-7 w-7 text-[#DB4437]" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-[#222] mb-1">
            Reports coming soon
          </h3>
          <p className="text-sm text-[#6a6a6a] max-w-sm">
            Automated reporting with scheduled exports, custom date ranges, and
            PDF generation will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}
