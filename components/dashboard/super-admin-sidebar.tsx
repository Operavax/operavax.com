"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Building2,
  Users,
  DollarSign,
  Layers,
  Map,
  Briefcase,
  AlertTriangle,
  BarChart2,
  LineChart,
  ScrollText,
  Settings,
  SlidersHorizontal,
  Inbox,
  HelpCircle,
  ChevronDown,
  Activity,
  Sparkles,
  Package,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ── Navigation schema ──────────────────────────────────────────────────────

const navPlatform = [
  { title: "Products",    url: "/super/administrator/products",    icon: Package,     color: "text-[#4285F4]" },
  { title: "Users",       url: "/super/administrator/users",       icon: Users,       color: "text-[#4285F4]" },
  { title: "Sectors",     url: "/super/administrator/sectors",     icon: Map,         color: "text-[#0F9D58]" },
  { title: "Categories",  url: "/super/administrator/categories",  icon: Layers,      color: "text-[#7C3AED]" },
  { title: "Pricing",     url: "/super/administrator/pricing",     icon: DollarSign,  color: "text-[#0F9D58]" },
];

const navOperations = [
  { title: "Issues",      url: "/super/administrator/issues",      icon: AlertTriangle, color: "text-[#F4B400]" },
  { title: "Status",      url: "/super/administrator/status",      icon: Activity,      color: "text-[#0F9D58]" },
  { title: "Changelog",   url: "/super/administrator/changelog",   icon: Sparkles,      color: "text-[#4285F4]" },
];

const navInsights = [
  { title: "Analytics",   url: "/super/administrator/insights/analytics", icon: LineChart,  color: "text-[#4285F4]" },
  { title: "Reports",     url: "/super/administrator/insights/reports",   icon: ScrollText, color: "text-[#0F9D58]" },
];

const navSettings = [
  { title: "Profile",     url: "/super/administrator/profile",     icon: SlidersHorizontal, color: "text-[#717171]" },
  { title: "Members",     url: "/super/administrator/members",     icon: Users,             color: "text-[#0B7A43]" },
  { title: "Inbox",       url: "/super/administrator/inbox",       icon: Inbox,             color: "text-[#4285F4]" },
  { title: "Help Center", url: "/super/administrator/help-center", icon: HelpCircle,        color: "text-[#0F9D58]" },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function isGroupActive(items: { url: string }[], pathname: string) {
  return items.some((item) => pathname === item.url || pathname.startsWith(item.url + "/"));
}

interface SubItem {
  title: string;
  url: string;
  icon: React.ElementType;
  color: string;
  badge?: React.ReactNode;
}

// ── Sub-item list with connector lines (expanded sidebar) ──────────────

function ConnectorSubItems({ items, pathname }: { items: SubItem[]; pathname: string }) {
  return (
    <div className="ml-[22px] mt-0.5 relative">
      <div className="absolute left-0 top-0 bottom-2 w-px bg-[#ddd]" />
      {items.map((sub) => {
        const isActive = pathname === sub.url || pathname.startsWith(sub.url + "/");
        return (
          <div key={sub.title} className="relative flex items-center">
            <div className="absolute left-0 top-1/2 w-3 h-px bg-[#ddd]" />
            <Link
              href={sub.url}
              className={`
                w-full flex items-center gap-2 pl-4 pr-2 py-2.5 ml-0.5 rounded-md text-[13px] min-h-[44px]
                transition-colors duration-150
                ${isActive
                  ? "font-semibold text-[#222] bg-[#f0f0f0]"
                  : "font-medium text-[#6a6a6a] hover:text-[#222] hover:bg-[#f7f7f7]"
                }
              `}
            >
              <sub.icon className={`size-3.5 shrink-0 ${sub.color}`} />
              <span className="truncate">{sub.title}</span>
              {sub.badge}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

// ── Collapsed child-icon row ───────────────

function CollapsedChildRow({ items, pathname }: { items: SubItem[]; pathname: string }) {
  if (items.length === 0) return null;
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col items-center gap-0.5 py-0.5">
        {items.map((sub) => {
          const isActive = pathname === sub.url || pathname.startsWith(sub.url + "/");
          return (
            <Tooltip key={sub.title}>
              <TooltipTrigger asChild>
                <Link
                  href={sub.url}
                  aria-label={sub.title}
                  className={`
                    relative flex items-center justify-center size-8 w-full rounded-md transition-colors duration-150
                    ${isActive
                      ? "bg-[#f0f0f0] text-[#222]"
                      : "text-[#6a6a6a] hover:bg-[#f7f7f7] hover:text-[#222]"
                    }
                  `}
                >
                  <sub.icon className={`size-3.5 shrink-0 ${sub.color}`} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs font-medium">
                {sub.title}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

// ── Reusable collapsible group ───────────────────────────────────────────────

interface NavGroup {
  groupKey: string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  items: SubItem[];
  pathname: string;
}

function NavCollapsible({ groupKey, label, icon: Icon, iconColor, items, pathname }: NavGroup) {
  const { state, isMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";
  const isGroupOpen = isGroupActive(items, pathname);

  const [collapsedRowOpen, setCollapsedRowOpen] = useState(isGroupOpen);

  useEffect(() => {
    setCollapsedRowOpen(isGroupOpen);
  }, [isGroupOpen]);

  if (isCollapsed) {
    const hasChildren = items.length > 0;
    return (
      <SidebarMenuItem>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={label}
                aria-expanded={collapsedRowOpen}
                onClick={() => hasChildren && setCollapsedRowOpen((v) => !v)}
                className={`
                  flex w-full items-center justify-center size-8 rounded-md transition-colors duration-150
                  ${isGroupOpen
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-[#6a6a6a] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                `}
              >
                <Icon className={`size-4 shrink-0 ${iconColor}`} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs font-medium">
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {hasChildren && collapsedRowOpen && (
          <CollapsedChildRow items={items} pathname={pathname} />
        )}
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible key={`${groupKey}-${isGroupOpen}`} defaultOpen={isGroupOpen} className={`group/${groupKey}`}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={label}
            isActive={isGroupOpen}
            className="font-medium text-[#222]"
          >
            <Icon className={`size-4 shrink-0 ${iconColor}`} />
            <span>{label}</span>
            <ChevronDown
              className={`ml-auto size-4 text-[#6a6a6a] transition-transform duration-200 group-data-[state=open]/${groupKey}:-rotate-180`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ConnectorSubItems items={items} pathname={pathname} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export function SuperAdminSidebarDashboard() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="font-sans [&_[data-sidebar=sidebar]]:!bg-white [&_[data-sidebar=sidebar]]:!text-[#222]">
      <SidebarHeader className="pt-safe md:pt-2">
        <div className="flex h-14 w-full items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center">
          <Link
            href="/super/administrator"
            className="flex min-w-0 flex-1 items-center justify-start group-data-[collapsible=icon]:hidden"
            aria-label="Operavax Admin"
          >
            <Image
              src="/img/operavax-logo.png"
              alt="Operavax"
              width={192}
              height={44}
              className="h-11 w-auto max-w-[12rem] object-contain"
            />
          </Link>
          <Link
            href="/super/administrator"
            className="hidden items-center justify-center group-data-[collapsible=icon]:flex"
            aria-label="Operavax Admin"
          >
            <Image src="/img/operavax-logo.png" alt="Operavax" width={40} height={40} className="h-10 w-10 object-contain" />
          </Link>
          <SidebarTrigger className="h-10 w-10 shrink-0 rounded-lg border-0 bg-transparent text-[#475569] shadow-none hover:bg-transparent md:size-9 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="pb-24 md:pb-2">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {/* Overview */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Overview"
                  isActive={pathname === "/super/administrator"}
                >
                  <Link href="/super/administrator" className="font-medium text-[#222]">
                    <LayoutDashboard className="size-4 shrink-0 text-[#4285F4]" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Platform */}
              <NavCollapsible
                groupKey="platform"
                label="Platform"
                icon={Globe}
                iconColor="text-[#0F9D58]"
                items={navPlatform}
                pathname={pathname}
              />

              {/* Operations */}
              <NavCollapsible
                groupKey="operations"
                label="Operations"
                icon={Briefcase}
                iconColor="text-[#DB4437]"
                items={navOperations}
                pathname={pathname}
              />

              {/* Insights */}
              <NavCollapsible
                groupKey="insights"
                label="Insights"
                icon={BarChart2}
                iconColor="text-[#3367D6]"
                items={navInsights}
                pathname={pathname}
              />

              {/* Settings */}
              <NavCollapsible
                groupKey="account"
                label="Settings"
                icon={Settings}
                iconColor="text-[#717171]"
                items={navSettings}
                pathname={pathname}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
