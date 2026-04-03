"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  Inbox,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

const mobileNavItems = [
  {
    href: "/super/administrator",
    label: "Home",
    icon: LayoutDashboard,
    match: (pathname: string) => pathname === "/super/administrator",
  },
  {
    href: "/super/administrator/products",
    label: "Products",
    icon: Package,
    match: (pathname: string) => pathname.startsWith("/super/administrator/products"),
  },
  {
    href: "/super/administrator/issues",
    label: "Issues",
    icon: AlertTriangle,
    match: (pathname: string) =>
      pathname.startsWith("/super/administrator/issues") ||
      pathname.startsWith("/super/administrator/status") ||
      pathname.startsWith("/super/administrator/changelog"),
  },
  {
    href: "/super/administrator/inbox",
    label: "Inbox",
    icon: Inbox,
    match: (pathname: string) =>
      pathname.startsWith("/super/administrator/inbox") ||
      pathname.startsWith("/super/administrator/help-center"),
  },
];

export function SuperAdminMobileNav() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 md:hidden">
      <div className="overflow-hidden rounded-t-[28px] border border-b-0 border-[#E2E8F0] bg-white/95 shadow-[0_-18px_48px_rgba(15,23,42,0.14)] backdrop-blur-xl">
        <div className="flex h-[2px] w-full">
          <div className="flex-1 bg-[#4285F4]" />
          <div className="flex-1 bg-[#DB4437]" />
          <div className="flex-1 bg-[#F4B400]" />
          <div className="flex-1 bg-[#0F9D58]" />
        </div>
        <div className="grid grid-cols-5 px-1 py-1.5 pb-safe">
          {mobileNavItems.map((item) => {
            const isActive = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[22px] px-2 text-[11px] font-semibold tracking-tight transition-all",
                  "text-[#6A6A6A] active:bg-[#F5F7FA]"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "text-[#4285F4]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          {/* Menu button — opens full sidebar */}
          <button
            onClick={toggleSidebar}
            className="flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[22px] px-2 text-[11px] font-semibold tracking-tight text-[#6A6A6A] active:bg-[#F5F7FA]"
          >
            <Menu className="h-4 w-4" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
