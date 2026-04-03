"use client";

import { AlertTriangle, CheckCircle2, Plus } from "lucide-react";

export default function IssuesPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEF7E0]">
            <AlertTriangle className="h-5 w-5 text-[#F4B400]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Issues
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Track and resolve platform issues
            </p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F4EA] mb-4">
            <CheckCircle2 className="h-7 w-7 text-[#0F9D58]" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-[#222] mb-1">
            No open issues
          </h3>
          <p className="text-sm text-[#6a6a6a] max-w-sm mb-6">
            All systems are running smoothly. Issues reported by users or
            detected by the platform will appear here.
          </p>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-[#4285F4] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3367D6] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
}
