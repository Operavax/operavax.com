export const dynamic = "force-dynamic";

import { SuperAdminSidebarDashboard } from "@/components/dashboard/super-admin-sidebar";
import { SuperAdminHeader } from "@/components/dashboard/super-admin-header";
import { SuperAdminMobileNav } from "@/components/dashboard/super-admin-mobile-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RoleBasedRedirect } from "@/components/shared/role-based-redirect";
import { RoleGuard } from "@/components/shared/role-guard";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RoleBasedRedirect expectedRole="superAdmin" />
      <RoleGuard allowedRoles={["superAdmin"]}>
        <div className="flex flex-col h-[100dvh] bg-white">
          <div className="relative z-20 flex h-[3px] w-full shrink-0">
            <div className="flex-1 bg-[#4285F4]" />
            <div className="flex-1 bg-[#DB4437]" />
            <div className="flex-1 bg-[#F4B400]" />
            <div className="flex-1 bg-[#0F9D58]" />
          </div>
          <SidebarProvider
            defaultOpen={false}
            className="flex flex-1 min-h-0"
            style={{
              "--sidebar-width": "16rem",
              "--sidebar-width-icon": "3rem",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
          >
            <SuperAdminSidebarDashboard />
            <SidebarInset>
              <SuperAdminHeader />
              <main className="@container/main flex flex-1 flex-col gap-4 overflow-auto pt-3 pb-[6.5rem] md:gap-6 md:py-6 md:pb-6">
                {children}
              </main>
            </SidebarInset>
            <SuperAdminMobileNav />
          </SidebarProvider>
        </div>
      </RoleGuard>
    </>
  );
}
