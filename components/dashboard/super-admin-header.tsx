"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, Globe, ChevronDown } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/super/administrator":                            { title: "Overview",     description: "Platform-wide summary across all products and sectors." },
  "/super/administrator/products":                   { title: "Products",     description: "Manage all products in the Operavax ecosystem." },
  "/super/administrator/users":                      { title: "Users",        description: "View and manage all platform users." },
  "/super/administrator/sectors":                    { title: "Sectors",      description: "Manage all 31 sectors and their configurations." },
  "/super/administrator/categories":                 { title: "Categories",   description: "Manage the live category catalog, icons, colors, and order." },
  "/super/administrator/pricing":                    { title: "Pricing",      description: "Business model, plan calculator and revenue projections." },
  "/super/administrator/issues":                     { title: "Issues",       description: "Manage issues reported across the platform." },
  "/super/administrator/status":                     { title: "System Status", description: "Monitor service health and uptime across all products." },
  "/super/administrator/changelog":                  { title: "Changelog",    description: "Manage platform release notes and updates." },
  "/super/administrator/insights/analytics":         { title: "Analytics",    description: "Platform-wide usage and engagement visualisations." },
  "/super/administrator/insights/reports":           { title: "Reports",      description: "Generate and download platform reports as CSV files." },
  "/super/administrator/profile":                    { title: "Profile",      description: "Manage your super administrator account details." },
  "/super/administrator/members":                    { title: "Members",      description: "Manage super administrator members and pending invites." },
  "/super/administrator/inbox":                      { title: "Inbox",        description: "Reply to support messages from users." },
  "/super/administrator/help-center":                { title: "Help Center",  description: "Internal support operations and escalation guidance." },
};

function getInitials(fullName?: string | null): string {
  return (fullName ?? "")
    .split(" ")
    .map((s) => s.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "SA";
}

export function SuperAdminHeader() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { state } = useSidebar();

  const meta = PAGE_META[pathname] ?? { title: "Dashboard", description: "" };

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[#E2E8F0] px-3 md:px-4">
      {/* Sidebar trigger (desktop only, visible when collapsed) */}
      <SidebarTrigger className="hidden md:flex h-8 w-8 shrink-0 rounded-lg border-0 bg-transparent text-[#475569] shadow-none hover:bg-[#f7f7f7]" />

      {/* Page meta */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-sm font-bold tracking-tight text-[#222] truncate">
          {meta.title}
        </h1>
        <p className="hidden md:block text-[11px] text-[#6a6a6a] truncate">
          {meta.description}
        </p>
      </div>

      {/* Right: public site + avatar */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] px-3 py-1.5 text-xs font-semibold text-[#222] transition-all hover:bg-[#f7f7f7]"
        >
          <Globe className="h-3.5 w-3.5 text-[#4285F4]" />
          View Public Site
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 rounded-full p-1 transition-colors hover:bg-[#f7f7f7]">
              <Avatar className="size-7">
                <AvatarImage src={user?.imageUrl ?? undefined} alt={user?.fullName ?? "Admin"} />
                <AvatarFallback className="rounded-full bg-[#4285F4] text-[10px] font-bold text-white">
                  {getInitials(user?.fullName)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-3 w-3 text-[#6a6a6a]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-1 w-48 rounded-xl border-[#ddd] shadow-xl">
            <DropdownMenuItem asChild className="cursor-pointer py-2">
              <Link href="/" className="flex items-center gap-2">
                <Globe className="size-4 text-[#4285F4]" />
                View Public Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer py-2 text-[#DB4437]"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
