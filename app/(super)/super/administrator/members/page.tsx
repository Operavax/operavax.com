"use client";

import { Users, UserPlus, Shield } from "lucide-react";

export default function MembersPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F0FE]">
            <Users className="h-5 w-5 text-[#4285F4]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Members
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Manage team members and their roles
            </p>
          </div>
        </div>
      </div>

      {/* Role badges */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {[
          { label: "Admins", count: 0, color: "text-[#DB4437]", bg: "bg-[#FDE8E7]" },
          { label: "Editors", count: 0, color: "text-[#F4B400]", bg: "bg-[#FEF7E0]" },
          { label: "Viewers", count: 0, color: "text-[#4285F4]", bg: "bg-[#E8F0FE]" },
        ].map((role) => (
          <span
            key={role.label}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${role.bg} ${role.color}`}
          >
            {role.label}: {role.count}
          </span>
        ))}
      </div>

      {/* Empty state */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F0FE] mb-4">
            <Shield className="h-7 w-7 text-[#4285F4]" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-[#222] mb-1">
            No team members
          </h3>
          <p className="text-sm text-[#6a6a6a] max-w-sm mb-6">
            You are currently the only administrator. Invite team members to
            collaborate on managing the platform.
          </p>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-[#4285F4] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3367D6] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="h-4 w-4" />
            Invite Member
          </button>
        </div>
      </div>
    </div>
  );
}
