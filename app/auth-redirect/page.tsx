"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

export default function AuthRedirectPage() {
  const { user, isLoaded } = useUser();
  const navigated = useRef(false);

  useEffect(() => {
    if (navigated.current) return;
    if (!isLoaded) return;

    navigated.current = true;

    if (!user) {
      window.location.replace("/");
      return;
    }

    // Signed in — go to hub homepage
    window.location.replace("/");
  }, [isLoaded, user]);

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
          Signing you in...
        </p>
        <p className="mt-1 text-xs text-[#6a6a6a]">
          Just a moment
        </p>
      </div>
    </div>
  );
}
