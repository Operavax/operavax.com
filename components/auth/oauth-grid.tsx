"use client";

import { Loader2 } from "lucide-react";

interface OAuthGridProps {
  onOAuth: (strategy: "oauth_google" | "oauth_microsoft") => void;
  oauthLoading: "google" | "microsoft" | null;
  label?: string;
}

export function OAuthGrid({ onOAuth, oauthLoading, label = "Sign in with" }: OAuthGridProps) {
  const googleLoading = oauthLoading === "google";
  const microsoftLoading = oauthLoading === "microsoft";
  const anyOAuthLoading = oauthLoading !== null;

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        disabled={anyOAuthLoading}
        onClick={() => onOAuth("oauth_google")}
        className="flex h-[50px] items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 text-[13px] font-medium text-[#1C2434] transition-colors hover:bg-[#f7f7f7] disabled:opacity-60 md:h-[46px] md:gap-2.5 md:px-0 md:text-sm"
      >
        {googleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-[#4285F4]" />
        ) : (
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        <span className="md:hidden">Google</span>
        <span className="hidden md:inline">{label} Google</span>
      </button>

      <button
        type="button"
        disabled={anyOAuthLoading}
        onClick={() => onOAuth("oauth_microsoft")}
        className="flex h-[50px] items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 text-[13px] font-medium text-[#1C2434] transition-colors hover:bg-[#f7f7f7] disabled:opacity-60 md:h-[46px] md:gap-2.5 md:px-0 md:text-sm"
      >
        {microsoftLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-[#00A4EF]" />
        ) : (
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
            <path d="M1 1h10v10H1z" fill="#F25022" />
            <path d="M13 1h10v10H13z" fill="#7FBA00" />
            <path d="M1 13h10v10H1z" fill="#00A4EF" />
            <path d="M13 13h10v10H13z" fill="#FFB900" />
          </svg>
        )}
        <span className="md:hidden">Microsoft</span>
        <span className="hidden md:inline">{label} Microsoft</span>
      </button>
    </div>
  );
}
