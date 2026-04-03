"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const syncUser = useMutation(api.users.syncUser);
  const syncedUserId = useRef<string | null>(null);

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

  return <>{children}</>;
}
