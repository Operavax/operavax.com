import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HubFooter } from "@/components/hub/hub-footer";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function PublicPageLayout({
  children,
  backHref = "/",
  backLabel = "Back to hub",
}: PublicPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Brand stripe */}
      <div className="flex h-[3px] w-full">
        <div className="flex-1 bg-[#4285F4]" />
        <div className="flex-1 bg-[#DB4437]" />
        <div className="flex-1 bg-[#F4B400]" />
        <div className="flex-1 bg-[#0F9D58]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#ddd] bg-white/95 backdrop-blur pt-safe">
        <div className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/operavax-logo.png"
              alt="Operavax"
              width={144}
              height={40}
              className="h-7 md:h-10 w-auto"
              priority
            />
          </Link>
          <Link
            href={backHref}
            className="group inline-flex min-h-[44px] max-w-[160px] items-center justify-end gap-1.5 rounded-full border border-transparent px-3 py-2.5 text-sm font-semibold text-[#222] transition-all hover:border-[#4285F4]/30 hover:shadow-sm md:max-w-none"
          >
            <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#222] transition-all group-hover:-translate-x-0.5 group-hover:text-[#4285F4]" />
            <span className="truncate font-display text-xs tracking-tight text-[#222] transition-colors group-hover:text-[#4285F4] md:text-sm">
              {backLabel}
            </span>
          </Link>
        </div>
      </header>

      {children}

      <HubFooter />
    </div>
  );
}
