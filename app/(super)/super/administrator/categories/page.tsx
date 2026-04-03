"use client";

import {
  Layers,
  Search,
  Building,
  Briefcase,
  Shield,
  Heart,
  FileText,
  Scale,
  Home,
  Zap,
  Truck,
  Globe,
  GraduationCap,
  ShoppingBag,
  Leaf,
  UsersIcon,
  Grid3X3,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/hub-data";

const iconMap: Record<string, LucideIcon> = {
  all: Grid3X3,
  building: Building,
  briefcase: Briefcase,
  shield: Shield,
  heart: Heart,
  document: FileText,
  scale: Scale,
  home: Home,
  zap: Zap,
  truck: Truck,
  globe: Globe,
  graduation: GraduationCap,
  shopping: ShoppingBag,
  leaf: Leaf,
  users: UsersIcon,
};

export default function CategoriesPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3E8FF]">
            <Layers className="h-5 w-5 text-[#7C3AED]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Categories
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Manage the category catalog across the platform
            </p>
          </div>
        </div>
      </div>

      {/* Summary + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F3E8FF] px-3 py-1.5">
          <Layers className="h-3.5 w-3.5 text-[#7C3AED]" />
          <span className="text-xs font-semibold text-[#7C3AED]">
            {CATEGORIES.length} categories
          </span>
        </div>
        <div className="relative sm:ml-auto max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6a6a6a]" />
          <input
            type="text"
            placeholder="Search categories..."
            disabled
            className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 pl-10 pr-4 text-sm text-[#222] placeholder:text-[#aaa] focus:outline-none focus:border-[#4285F4] disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Categories table */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[1fr_120px_80px_80px] gap-4 px-5 py-3 border-b border-[#f0f0f0] bg-[#FAFAFA]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6a6a6a]">
            Category
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6a6a6a]">
            Icon
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6a6a6a]">
            Color
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6a6a6a] text-right">
            Active
          </span>
        </div>

        {/* Table rows */}
        {CATEGORIES.map((category, i) => {
          const IconComponent = iconMap[category.icon] || Grid3X3;
          return (
            <div
              key={category.id ?? "all"}
              className={`flex items-center gap-3 md:grid md:grid-cols-[1fr_120px_80px_80px] md:gap-4 px-4 py-3 md:px-5 md:py-3.5 ${
                i < CATEGORIES.length - 1 ? "border-b border-[#f0f0f0]" : ""
              } transition-colors hover:bg-[#FAFAFA]`}
            >
              {/* Label + Icon preview */}
              <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${category.color}18`,
                  }}
                >
                  <IconComponent
                    className="h-4 w-4"
                    style={{ color: category.color }}
                  />
                </div>
                <span className="font-display text-sm font-semibold tracking-tight text-[#222] truncate">
                  {category.label}
                </span>
              </div>

              {/* Icon name */}
              <div className="hidden md:block">
                <span className="inline-flex items-center rounded-md bg-[#F5F5F5] px-2 py-0.5 text-[11px] font-mono text-[#6a6a6a]">
                  {category.icon}
                </span>
              </div>

              {/* Color swatch */}
              <div className="hidden md:flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full border border-[#E2E8F0]"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-[11px] font-mono text-[#6a6a6a]">
                  {category.color}
                </span>
              </div>

              {/* Active toggle */}
              <div className="flex justify-end shrink-0">
                <div className="relative h-5 w-9 rounded-full bg-[#0F9D58] cursor-not-allowed">
                  <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
