"use client";

import { Inbox, Mail, Bell, MessageSquare } from "lucide-react";

export default function InboxPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEF7E0]">
            <Inbox className="h-5 w-5 text-[#F4B400]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Inbox
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Messages, notifications, and alerts
            </p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-6 rounded-lg bg-[#F5F5F5] p-1 w-fit">
        {[
          { label: "All", icon: Inbox },
          { label: "Messages", icon: MessageSquare },
          { label: "Notifications", icon: Bell },
        ].map((tab, i) => (
          <button
            key={tab.label}
            disabled
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed ${
              i === 0
                ? "bg-white text-[#222] shadow-sm"
                : "text-[#6a6a6a] hover:text-[#222]"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF7E0] mb-4">
            <Mail className="h-7 w-7 text-[#F4B400]" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-[#222] mb-1">
            No messages
          </h3>
          <p className="text-sm text-[#6a6a6a] max-w-sm">
            Your inbox is empty. System notifications, user messages, and
            platform alerts will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
