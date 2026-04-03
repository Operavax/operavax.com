"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  HelpCircle,
  LogOut,
  Menu as MenuIcon,
  UserCircle,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthSheet } from "@/components/auth/auth-sheet";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getDashboardPathForRole } from "@/lib/dashboard-routing";

function getInitials(fullName?: string | null): string {
  const initials = (fullName ?? "")
    .split(" ")
    .map((segment) => segment.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return initials || "OV";
}

const TriggerButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    fullName?: string | null;
    imageUrl?: string | null;
    signedIn: boolean;
  }
>(function TriggerButton(
  { className, disabled = false, fullName, imageUrl, signedIn, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-disabled={disabled}
      className={cn(
        "flex h-[48px] items-center gap-[6px] rounded-full border border-[#ddd] bg-white py-2 pl-[15px] pr-[9px] transition-shadow hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      <MenuIcon className="h-4 w-4 text-[#222]" />
      {signedIn ? (
        <Avatar className="size-[32px] rounded-full">
          <AvatarImage src={imageUrl ?? undefined} alt={fullName ?? "User"} />
          <AvatarFallback className="rounded-full bg-[#4285F4] text-xs font-bold text-white">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex size-[32px] items-center justify-center rounded-full bg-[#222]">
          <UserCircle className="h-6 w-6 text-white" />
        </div>
      )}
    </button>
  );
});

export function ProfileDropdown() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const convexUser = useQuery(api.users.getCurrentUser);
  const dashboardPath = convexUser ? getDashboardPathForRole(convexUser.role) : null;
  const showDashboard = dashboardPath && dashboardPath !== "/";

  if (!isLoaded) {
    return <TriggerButton disabled signedIn={false} />;
  }

  const signedIn = isSignedIn === true;

  const openAuth = (view: "login" | "signup") => {
    setAuthView(view);
    setAuthOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TriggerButton
            fullName={user?.fullName}
            imageUrl={user?.imageUrl}
            signedIn={signedIn}
          />
        </DropdownMenuTrigger>

        {signedIn ? (
          <DropdownMenuContent
            align="end"
            className="mt-2 w-56 rounded-xl border-[#ddd] shadow-xl"
          >
            <DropdownMenuLabel className="py-2">
              <span className="block truncate text-sm font-semibold text-[#222]">
                {user?.fullName ?? "Account"}
              </span>
              <span className="block truncate text-xs font-normal text-[#6a6a6a]">
                {user?.primaryEmailAddress?.emailAddress ?? "Signed in"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {showDashboard && (
              <DropdownMenuItem asChild className="cursor-pointer py-2">
                <Link className="flex items-center gap-2" href={dashboardPath}>
                  <ArrowRight className="size-4 text-[#4285F4]" />
                  Back to Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild className="cursor-pointer py-2">
              <Link className="flex items-center gap-2" href="/hub">
                <Globe className="size-4 text-[#4285F4]" />
                Operavax Hub
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer py-2">
              <a href="https://forms.operavax.com" className="flex items-center gap-2">
                <ExternalLink className="size-4 text-[#4285F4]" />
                Operavax Forms
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer py-2">
              <Link className="flex items-center gap-2" href="/support">
                <HelpCircle className="size-4 text-[#DB4437]" />
                Help Centre
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer py-2 text-[#DB4437]"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent
            align="end"
            className="mt-2 w-56 rounded-xl border-[#ddd] shadow-xl"
          >
            <DropdownMenuItem
              className="cursor-pointer py-2 font-semibold"
              onClick={() => openAuth("signup")}
            >
              Sign up
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => openAuth("login")}
            >
              Log in
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer py-2">
              <Link className="flex items-center gap-2" href="/hub">
                <Globe className="size-4 text-[#4285F4]" />
                Operavax Hub
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer py-2">
              <Link className="flex items-center gap-2" href="/support">
                <HelpCircle className="size-4 text-[#DB4437]" />
                Help Centre
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>

      {/* Auth sheet — slides from right */}
      <AuthSheet open={authOpen} onOpenChange={setAuthOpen} initialView={authView} />
    </>
  );
}
