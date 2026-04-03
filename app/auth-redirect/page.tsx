"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getDashboardPathForRole } from "@/lib/dashboard-routing";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex h-[3px] w-full absolute top-0">
        <div className="flex-1 bg-[#4285F4]" />
        <div className="flex-1 bg-[#DB4437]" />
        <div className="flex-1 bg-[#F4B400]" />
        <div className="flex-1 bg-[#0F9D58]" />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-[#4285F4] [animation-delay:0ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-[#DB4437] [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-[#F4B400] [animation-delay:300ms]" />
        </div>
        <p className="font-display text-sm font-medium tracking-tight text-[#222]">
          {convexUser === null ? "Setting up your account..." : "Signing you in..."}
        </p>
        <p className="mt-1 text-xs text-[#6a6a6a]">
          Just a moment
        </p>
      </div>
    </div>
  );
}
