"use client";

import { Users, UserPlus, Search } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEF7E0]">
            <Users className="h-5 w-5 text-[#F4B400]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Users
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              View and manage all platform users
            </p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6a6a6a]" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            disabled
            className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#222] placeholder:text-[#aaa] focus:outline-none focus:border-[#4285F4] disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Empty state */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF7E0] mb-4">
            <Users className="h-7 w-7 text-[#F4B400]" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-[#222] mb-1">
            No users yet
          </h3>
          <p className="text-sm text-[#6a6a6a] max-w-sm mb-6">
            Users will appear here once they sign up to the platform. You can
            also invite users manually.
          </p>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-[#4285F4] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3367D6] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="h-4 w-4" />
            Invite User
          </button>
        </div>
      </div>
    </div>
  );
}
