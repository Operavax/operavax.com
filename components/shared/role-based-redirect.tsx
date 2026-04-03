"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { getDashboardPathForRole, type DashboardRole } from "@/lib/dashboard-routing";

interface RoleBasedRedirectProps {
  expectedRole: DashboardRole;
}

export function RoleBasedRedirect({ expectedRole }: RoleBasedRedirectProps) {
  const { user: clerkUser, isLoaded } = useUser();
  const convexUser = useQuery(api.users.getCurrentUser);
  const prevRole = useRef<string | null>(null);
  const redirectingTo = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !clerkUser) return;
    if (convexUser === undefined) return; // still loading
    if (convexUser === null) return; // not synced yet

    const currentRole = convexUser.role ?? "user";

    const redirect = (path: string, message?: string) => {
      if (redirectingTo.current === path) return;
      redirectingTo.current = path;
      if (message) toast.info(message);
      window.location.replace(path);
    };

    if (prevRole.current === null) {
      prevRole.current = currentRole;
      if (currentRole !== expectedRole) {
        redirect(getDashboardPathForRole(currentRole), "Redirecting to your dashboard...");
      }
      return;
    }

    if (currentRole !== prevRole.current) {
      prevRole.current = currentRole;
      const path = getDashboardPathForRole(currentRole);

      if (currentRole === "superAdmin") {
        redirect(path, "You are now a Super Admin. Redirecting...");
      } else {
        redirect(path, "Your role changed. Redirecting...");
      }
    }
  }, [isLoaded, clerkUser, convexUser, expectedRole]);

  return null;
}
