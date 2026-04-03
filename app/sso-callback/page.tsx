"use client";

import { useEffect, useRef } from "react";
import { useClerk } from "@clerk/nextjs";

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
          Completing sign in...
        </p>
        <p className="mt-1 text-xs text-[#6a6a6a]">
          Securing your session
        </p>
      </div>
    </div>
  );
}
