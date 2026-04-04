"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getDashboardPathForRole } from "@/lib/dashboard-routing";
import { AuthSplash } from "@/components/hub/auth-splash";

const SYNC_TIMEOUT_MS = 8_000;

export default function AuthRedirectPage() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const convexUser = useQuery(api.users.getCurrentUser);
  const navigated = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (navigated.current) return;

    if (!clerkLoaded) return;

    if (!clerkUser) {
      navigated.current = true;
      window.location.replace("/");
      return;
    }

    // Wait for Convex user to sync
    if (convexUser === undefined) return;

    if (convexUser !== null) {
      navigated.current = true;

      // Blocked users go home
      if (convexUser.status === "blocked") {
        window.location.replace("/");
        return;
      }

      // Route to correct dashboard based on role
      const destination = getDashboardPathForRole(convexUser.role);
      window.location.replace(destination);
      return;
    }

    // Convex user is null — not synced yet. Wait with timeout.
    if (timeoutRef.current === null) {
      timeoutRef.current = setTimeout(() => {
        if (navigated.current) return;
        navigated.current = true;
        // Default to home if sync takes too long
        window.location.replace("/");
      }, SYNC_TIMEOUT_MS);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [clerkLoaded, clerkUser, convexUser]);

  const statusText = convexUser === null ? "Setting up your account…" : "Signing you in…";

  return <AuthSplash statusText={statusText} />;
}
