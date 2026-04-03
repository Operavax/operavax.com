"use client";

import { User, Mail, Shield, Key, Camera } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F0FE]">
            <User className="h-5 w-5 text-[#4285F4]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Profile
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Manage your account settings
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Avatar & Role card */}
        <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F0FE]">
                <User className="h-10 w-10 text-[#4285F4]" />
              </div>
              <button
                disabled
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-[#E2E8F0] text-[#6a6a6a] cursor-not-allowed"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <h3 className="font-display text-base font-bold tracking-tight text-[#222]">
              Super Admin
            </h3>
            <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-[#FDE8E7] px-2.5 py-0.5 text-[11px] font-semibold text-[#DB4437]">
              <Shield className="h-3 w-3" />
              Administrator
            </span>
            <p className="text-xs text-[#6a6a6a] mt-3">
              Member since April 2026
            </p>
          </div>
        </div>

        {/* Profile form */}
        <div className="md:col-span-2 space-y-4">
          {/* Personal info */}
          <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
            <h3 className="font-display text-base font-bold tracking-tight text-[#222] mb-4">
              Personal Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#6a6a6a] mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  disabled
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#FAFAFA] px-3 py-2.5 text-sm text-[#222] placeholder:text-[#bbb] disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6a6a6a] mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  disabled
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#FAFAFA] px-3 py-2.5 text-sm text-[#222] placeholder:text-[#bbb] disabled:cursor-not-allowed"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#6a6a6a] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6a6a6a]" />
                  <input
                    type="email"
                    placeholder="admin@operavax.com"
                    disabled
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#FAFAFA] pl-10 pr-3 py-2.5 text-sm text-[#222] placeholder:text-[#bbb] disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            <button
              disabled
              className="mt-4 rounded-lg bg-[#4285F4] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3367D6] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>

          {/* Security */}
          <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
            <h3 className="font-display text-base font-bold tracking-tight text-[#222] mb-4">
              Security
            </h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0]">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEF7E0]">
                <Key className="h-4 w-4 text-[#F4B400]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#222]">Password</p>
                <p className="text-xs text-[#6a6a6a]">
                  Last changed: Never
                </p>
              </div>
              <button
                disabled
                className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#222] transition-colors hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
