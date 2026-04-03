"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const syncUser = useMutation(api.users.syncUser);
  const convexUser = useQuery(api.users.getCurrentUser);
  const syncedUserId = useRef<string | null>(null);
  const roleSyncKey = useRef<string | null>(null);

  // Sync Clerk user to Convex on sign-in
  useEffect(() => {
    if (!isLoaded || !clerkUser) return;
    if (syncedUserId.current === clerkUser.id) return;

    syncedUserId.current = clerkUser.id;

    const fullName =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      "User";

    syncUser({
      authUserId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || "",
      fullName,
    }).catch((error) => {
      console.error("User sync failed:", error);
    });
  }, [isLoaded, clerkUser, syncUser]);

  // Sync Convex role back to Clerk metadata when different
  useEffect(() => {
    if (!isLoaded || !clerkUser || !convexUser) return;

    const clerkRole =
      typeof clerkUser.publicMetadata?.role === "string"
        ? clerkUser.publicMetadata.role
        : null;

    if (clerkRole === convexUser.role) {
      roleSyncKey.current = null;
      return;
    }

    const syncKey = `${clerkUser.id}:${convexUser.role}`;
    if (roleSyncKey.current === syncKey) return;

    roleSyncKey.current = syncKey;

    void fetch("/api/clerk/sync-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetUserId: clerkUser.id,
        role: convexUser.role,
      }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Role sync failed.");
      })
      .catch((error) => {
        console.error("Role sync failed:", error);
        roleSyncKey.current = null;
      });
  }, [clerkUser, convexUser, isLoaded]);

  return <>{children}</>;
}
