"use client";

import Link from "next/link";
import {
  Package,
  Users,
  Map,
  Activity,
  ArrowRight,
  Globe,
  Layers,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { label: "Products", value: "2", icon: Package, color: "text-[#4285F4]", surface: "bg-[#E8F0FE]", href: "/super/administrator/products" },
  { label: "Sectors", value: "31", icon: Map, color: "text-[#0F9D58]", surface: "bg-[#E6F4EA]", href: "/super/administrator/sectors" },
  { label: "Categories", value: "25", icon: Layers, color: "text-[#7C3AED]", surface: "bg-[#F3E8FF]", href: "/super/administrator/categories" },
  { label: "Users", value: "0", icon: Users, color: "text-[#F4B400]", surface: "bg-[#FEF7E0]", href: "/super/administrator/users" },
];

const quickLinks = [
  { label: "System Status", description: "All systems operational", icon: Activity, color: "text-[#0F9D58]", surface: "bg-[#E6F4EA]", href: "/super/administrator/status" },
  { label: "Open Issues", description: "No open issues", icon: AlertTriangle, color: "text-[#F4B400]", surface: "bg-[#FEF7E0]", href: "/super/administrator/issues" },
  { label: "View Public Site", description: "operavax.com", icon: Globe, color: "text-[#4285F4]", surface: "bg-[#E8F0FE]", href: "/" },
];

const recentActivity = [
  { type: "launch", title: "Operavax Hub deployed", detail: "Central hub platform launched at operavax.com", time: "Just now", status: "Live", statusColor: "bg-[#E6F4EA] text-[#0F9D58]" },
  { type: "product", title: "Operavax Docs added", detail: "Documentation platform connected to ecosystem", time: "1 hour ago", status: "Active", statusColor: "bg-[#E8F0FE] text-[#4285F4]" },
  { type: "product", title: "Operavax Report added", detail: "Community reporting platform connected", time: "2 hours ago", status: "Beta", statusColor: "bg-[#FEF7E0] text-[#F4B400]" },
];

export default function SuperAdminOverview() {
  return (
    <div className="px-3 md:px-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-4 md:p-5 transition-all hover:shadow-md hover:border-[#ddd]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.surface}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-[#ccc] transition-all group-hover:text-[#4285F4] group-hover:translate-x-0.5" />
            </div>
            <p className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#222]">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs font-medium text-[#6a6a6a]">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-6 md:mt-8">
        <h2 className="font-display text-lg font-bold tracking-tight text-[#222] mb-3 md:mb-4">
          Quick Actions
        </h2>
        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group flex items-center gap-3 rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-4 transition-all hover:shadow-md hover:border-[#ddd]"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${link.surface}`}>
                <link.icon className={`h-5 w-5 ${link.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold tracking-tight text-[#222] group-hover:text-[#4285F4] transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-[#6a6a6a]">{link.description}</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#ccc] transition-all group-hover:text-[#4285F4] group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 md:mt-8">
        <h2 className="font-display text-lg font-bold tracking-tight text-[#222] mb-3 md:mb-4">
          Recent Activity
        </h2>
        <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
          {recentActivity.map((activity, i) => (
            <div
              key={activity.title}
              className={`flex items-center gap-3 px-4 py-3.5 md:px-5 md:py-4 ${
                i < recentActivity.length - 1 ? "border-b border-[#f0f0f0]" : ""
              }`}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F9D58]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#222]">{activity.title}</p>
                <p className="text-xs text-[#6a6a6a]">{activity.detail}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${activity.statusColor}`}>
                  {activity.status}
                </span>
                <span className="hidden md:block text-[11px] text-[#6a6a6a]">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
