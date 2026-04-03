"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { type DashboardRole } from "@/lib/dashboard-routing";

interface RoleGuardProps {
  allowedRoles: DashboardRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { isLoaded } = useUser();
  const convexUser = useQuery(api.users.getCurrentUser);

  // Still loading — render children (RoleBasedRedirect handles redirects)
  if (!isLoaded || convexUser === undefined) {
    return <>{children}</>;
  }

  const role = convexUser?.role ?? "user";

  if (allowedRoles.includes(role as DashboardRole)) {
    return <>{children}</>;
  }

  // Role mismatch — RoleBasedRedirect will handle
  return <>{children}</>;
}
