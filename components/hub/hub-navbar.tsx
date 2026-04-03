"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  X,
  Heart,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProfileDropdown } from "@/components/hub/profile-dropdown";
import { BrandStripe } from "./brand-stripe";
import { HubIcon } from "@/lib/hub-icons";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/hub-data";

export type HubView = "products" | "favourites" | "recent" | "sectors";

interface HubNavbarProps {
  activeTab: HubView;
  onTabChange: (tab: HubView) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | undefined;
  onCategoryChange: (cat: string | undefined) => void;
  products: Product[];
  onToggleVisibility: (productId: string) => void;
}

export function HubNavbar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  products,
  onToggleVisibility,
}: HubNavbarProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const searchPlaceholder =
    activeTab === "favourites"
      ? "Search favourites..."
      : activeTab === "recent"
        ? "Search recent..."
        : activeTab === "sectors"
          ? "Search sectors..."
          : "Search products...";

  const scrollCategories = (direction: "left" | "right") => {
    const el = categoryScrollRef.current;
    if (el) {
      el.scrollBy({ left: direction === "right" ? 240 : -240, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!categoryScrollRef.current) return;
    const container = categoryScrollRef.current;
    const target = selectedCategory
      ? container.querySelector<HTMLElement>(`[data-cat="${selectedCategory}"]`)
      : container.querySelector<HTMLElement>("[data-cat-all]");
    if (!target) return;
    const containerWidth = container.offsetWidth;
    const scrollTo = target.offsetLeft - containerWidth / 2 + target.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, scrollTo), behavior: "smooth" });
  }, [selectedCategory]);

  const handleFilterSelect = (catId: string | undefined) => {
    onCategoryChange(catId);
    setFilterOpen(false);
  };

  function handleTabClick(view: HubView) {
    onSearchChange("");
    onTabChange(view);
  }

  const TABS: { key: HubView; label: string; underline: string; active: string }[] = [
    { key: "products", label: "Products", underline: "bg-[#4285F4]", active: "text-[#4285F4]" },
    { key: "favourites", label: "Favourites", underline: "bg-[#DB4437]", active: "text-[#DB4437]" },
    { key: "recent", label: "My Products", underline: "bg-[#F4B400]", active: "text-[#F4B400]" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Brand stripe */}
      <BrandStripe />

      {/* Top bar: logo + tabs + search + actions */}
      <div className="w-full border-b border-[#ddd]">
        <div className="relative flex h-[56px] md:h-[80px] items-center justify-between w-full px-4 md:px-10">
          {/* Left — Logo */}
          <div className="flex items-center flex-shrink-0 pl-0 md:pl-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/img/operavax-logo.png"
                alt="Operavax"
                width={144}
                height={40}
                className="h-7 md:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Center — Tabs (desktop only — absolute center) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:flex items-center h-[80px] gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key || (activeTab === "sectors" && tab.key === "products");
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={`relative px-4 py-[10px] font-display text-[15px] tracking-tight cursor-pointer transition-colors ${
                    isActive
                      ? "font-bold text-[#222]"
                      : "font-medium text-[#6a6a6a] hover:text-[#222]"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full ${tab.underline}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setFilterOpen(true)}
              className="group hidden md:flex items-center px-4 py-[10px] text-sm font-semibold text-[#222] border border-transparent hover:border-[#DB4437]/30 hover:shadow-sm rounded-full transition-all"
            >
              <span className="font-display tracking-tight text-[#222] group-hover:text-[#DB4437] transition-colors">Customise</span>
            </button>
            <ProfileDropdown />
          </div>
        </div>

        {/* Search bar — desktop only */}
        <div className="hidden md:flex justify-center pb-4 w-full px-4 md:px-10">
          <div className="flex items-center border border-[#ddd]/50 rounded-full h-16 w-full max-w-3xl shadow-md hover:shadow-lg px-2 gap-2 transition-all duration-200 bg-white hover:scale-[1.01]">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent border-none pl-6 pr-4 py-2 font-display text-sm font-medium tracking-tight text-[#222] focus:outline-none placeholder:text-[#b0b0b0]/70 placeholder:font-normal placeholder:tracking-normal w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button aria-label="Search" className="flex items-center justify-center bg-[#DB4437] hover:bg-[#c53929] rounded-full p-3 transition-transform hover:scale-105 flex-shrink-0 cursor-pointer shadow-sm">
              <Search className="h-5 w-5 text-white stroke-[2.5px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile tabs + search */}
      <div className="md:hidden border-b border-[#ddd] bg-white">
        <div className="flex items-center justify-center gap-1 px-2 pt-1 pb-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key || (activeTab === "sectors" && tab.key === "products");
            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`relative px-4 py-3 font-display text-[13px] font-semibold tracking-tight transition-colors min-h-[44px] ${
                  isActive ? tab.active : "text-[#aaa]"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] w-8 rounded-full ${tab.underline}`} />
                )}
              </button>
            );
          })}
        </div>
        <div className="px-4 pt-2 pb-3">
          <div className="flex h-[52px] items-center gap-2 rounded-full border border-[#ddd]/50 bg-white px-2 shadow-sm">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent pl-4 pr-2 font-display text-base font-medium tracking-tight text-[#222] outline-none placeholder:text-[#b0b0b0]/70 placeholder:font-normal placeholder:tracking-normal"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              type="button"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DB4437] shadow-sm"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-white stroke-[2.5px]" />
            </button>
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e0e0e0]"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5 text-[#666]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="w-full border-b border-[#ddd]">
        <div className="flex items-center h-[64px] md:h-[78px] gap-2 md:gap-4 w-full px-3 md:px-10">
          <div
            ref={categoryScrollRef}
            className="-ml-1 flex-1 overflow-x-auto overflow-y-hidden pl-1 scroll-smooth md:-ml-4 md:pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex h-[64px] min-w-max items-stretch gap-4 md:h-[78px] md:items-center md:gap-8">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const noSelection = selectedCategory === undefined;
                return (
                  <button
                    key={String(cat.id ?? "all")}
                    data-cat={cat.id}
                    {...(!cat.id ? { "data-cat-all": true } : {})}
                    onClick={() =>
                      onCategoryChange(selectedCategory === cat.id ? undefined : cat.id)
                    }
                    className={`relative flex h-full shrink-0 cursor-pointer flex-col items-center justify-center gap-1 pt-0 pb-0 transition-all duration-200 md:h-auto md:justify-start md:gap-2 md:pt-3 md:pb-[10px] ${
                      isActive
                        ? "opacity-100 scale-105"
                        : noSelection
                          ? "opacity-70 hover:opacity-100"
                          : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <HubIcon
                      name={cat.icon}
                      className={`h-5 w-5 md:h-6 md:w-6 transition-colors ${
                        isActive ? "" : "text-[#717171]"
                      }`}
                      style={isActive ? { color: cat.color } : undefined}
                    />
                    <span
                      className={`font-display text-[10px] md:text-xs font-semibold tracking-tight whitespace-nowrap transition-colors ${
                        isActive ? "text-[#222]" : "text-[#6a6a6a]"
                      }`}
                    >
                      {cat.label}
                    </span>
                    {isActive && (
                      <span
                        className="absolute -bottom-px left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full md:w-full"
                        style={{ background: cat.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scroll arrows — desktop only */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollCategories("left")}
              className="flex items-center justify-center size-[28px] border border-[#ddd] rounded-full bg-white hover:bg-[#f7f7f7] hover:border-[#4285F4]/30 transition cursor-pointer"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-3 w-3 text-[#222]" />
            </button>
            <button
              onClick={() => scrollCategories("right")}
              className="flex items-center justify-center size-[28px] border border-[#ddd] rounded-full bg-white hover:bg-[#f7f7f7] hover:border-[#4285F4]/30 transition cursor-pointer"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-3 w-3 text-[#222]" />
            </button>
          </div>

          {/* Filters button */}
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 md:gap-2 h-[44px] md:h-[48px] px-3 md:px-4 border border-[#ddd] rounded-xl hover:bg-[#f7f7f7] hover:border-[#DB4437]/30 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Open filters"
          >
            <Filter className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#222]" />
            <span className="font-display text-[11px] md:text-xs font-semibold tracking-tight text-[#222]">Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[400px] p-0 flex flex-col border-l border-[#ddd] shadow-xl">
          <BrandStripe />

          <div className="px-6 pt-6 pb-4 pr-12 border-b border-[#eee]">
            <SheetTitle className="font-display text-xl font-bold tracking-tight text-[#222]">
              Filters
            </SheetTitle>
            <p className="mt-1.5 text-sm text-[#6a6a6a] font-medium tracking-tight">
              Filter by category or show/hide products.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Section: Status */}
            <p className="px-2 mb-3 font-display text-xs font-bold tracking-tight text-[#6a6a6a] uppercase">
              Status
            </p>
            <div className="space-y-1.5 mb-6">
              <button
                onClick={() => handleFilterSelect("__favourited__")}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border-2 ${
                  selectedCategory === "__favourited__"
                    ? "border-[#EA4335] bg-[#FCE8E6] text-[#EA4335]"
                    : "border-transparent hover:bg-[#f7f7f7] text-[#6a6a6a] hover:border-[#eee]"
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  selectedCategory === "__favourited__" ? "bg-[#EA4335]" : "bg-[#FCE8E6]"
                }`}>
                  <Heart className={`h-4 w-4 ${selectedCategory === "__favourited__" ? "fill-white text-white" : "fill-[#EA4335] text-[#EA4335]"}`} />
                </div>
                <span className="font-display font-semibold text-sm">Favourited</span>
                {selectedCategory === "__favourited__" && (
                  <span className="ml-auto rounded-full bg-[#EA4335] px-2 py-0.5 text-[10px] font-bold text-white">
                    Active
                  </span>
                )}
              </button>

              <button
                onClick={() => handleFilterSelect("__recent__")}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border-2 ${
                  selectedCategory === "__recent__"
                    ? "border-[#F4B400] bg-[#FEF7E0] text-[#F4B400]"
                    : "border-transparent hover:bg-[#f7f7f7] text-[#6a6a6a] hover:border-[#eee]"
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  selectedCategory === "__recent__" ? "bg-[#F4B400]" : "bg-[#FEF7E0]"
                }`}>
                  <Clock className={`h-4 w-4 ${selectedCategory === "__recent__" ? "text-white" : "text-[#F4B400]"}`} />
                </div>
                <span className="font-display font-semibold text-sm">Recent</span>
                {selectedCategory === "__recent__" && (
                  <span className="ml-auto rounded-full bg-[#F4B400] px-2 py-0.5 text-[10px] font-bold text-white">
                    Active
                  </span>
                )}
              </button>
            </div>

            {/* Section: Visibility */}
            <p className="px-2 mb-3 font-display text-xs font-bold tracking-tight text-[#6a6a6a] uppercase">
              Show / Hide Products
            </p>
            <div className="space-y-1.5 mb-6">
              {(products ?? []).map((p) => (
                <button
                  key={p.id}
                  onClick={() => onToggleVisibility(p.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border-2 ${
                    p.visible
                      ? "border-transparent hover:bg-[#f7f7f7] hover:border-[#eee]"
                      : "border-dashed border-[#ddd] bg-[#fafafa] opacity-60"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: p.bg }}>
                    <HubIcon name={p.icon} className="h-4 w-4" style={{ color: p.color }} />
                  </div>
                  <span className="font-display font-semibold text-sm text-[#222] flex-1">{p.name}</span>
                  {p.visible ? (
                    <Eye className="h-4 w-4 text-[#0F9D58]" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-[#aaa]" />
                  )}
                </button>
              ))}
            </div>

            {/* Section: Category */}
            <p className="px-2 mb-3 font-display text-xs font-bold tracking-tight text-[#6a6a6a] uppercase">
              Category
            </p>
            <div className="space-y-1.5 pb-4">
              <button
                onClick={() => handleFilterSelect(undefined)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border-2 ${
                  selectedCategory === undefined
                    ? "border-[#4285F4] bg-[#E8F0FE] text-[#4285F4]"
                    : "border-transparent hover:bg-[#f7f7f7] text-[#6a6a6a] hover:border-[#eee]"
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  selectedCategory === undefined ? "bg-[#4285F4]" : "bg-[#E8F0FE]"
                }`}>
                  <Filter className={`h-4 w-4 ${selectedCategory === undefined ? "text-white" : "text-[#4285F4]"}`} />
                </div>
                <span className="font-display font-semibold text-sm">All products</span>
                {selectedCategory === undefined && (
                  <span className="ml-auto rounded-full bg-[#4285F4] px-2 py-0.5 text-[10px] font-bold text-white">
                    Active
                  </span>
                )}
              </button>
              {CATEGORIES.filter((c) => c.id !== undefined).map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterSelect(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border-2 ${
                      isSelected
                        ? "border-current bg-opacity-10"
                        : "border-transparent hover:bg-[#f7f7f7] hover:border-[#eee] text-[#6a6a6a]"
                    }`}
                    style={isSelected ? { color: cat.color, borderColor: cat.color, backgroundColor: `${cat.color}15` } : undefined}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: isSelected ? `${cat.color}30` : `${cat.color}15` }}
                    >
                      <HubIcon name={cat.icon} className="h-4 w-4" style={{ color: cat.color }} />
                    </div>
                    <span className="font-display font-semibold text-sm">{cat.label}</span>
                    {isSelected && (
                      <span
                        className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                        style={{ background: cat.color }}
                      >
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
