"use client";

import { useEffect, useRef } from "react";
import { useClerk } from "@clerk/nextjs";
import { AuthSplash } from "@/components/hub/auth-splash";

export default function SSOCallbackPage() {
  const { handleRedirectCallback } = useClerk();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    handleRedirectCallback({
      redirectUrl: "/auth-redirect",
    }).catch(() => {
      window.location.replace("/");
    });
  }, [handleRedirectCallback]);

  return <AuthSplash statusText="Completing sign in…" subText="Securing your session" />;
}
