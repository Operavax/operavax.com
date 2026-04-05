"use client";

import { useState } from "react";
import {
  Heart,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Check,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HubIcon } from "@/lib/hub-icons";
import { cn } from "@/lib/utils";
import type { FavouriteItem } from "@/lib/hub-data";

interface ProductCardProps {
  id: string;
  name: string;
  tagline?: string | null;
  color: string;
  bg: string;
  url: string;
  badge?: string | null;
  categoryLabel?: string;
  icon: string;
  isFavourited?: boolean;
  favouriteItem?: FavouriteItem | null;
  onClick: () => void;
  onToggleFavourite?: () => void;
  compact?: boolean;
}

// ── Heart + Share + Thumbs — matching FormRating exactly ──────────────
function ProductRating({
  liked,
  onToggle,
}: {
  liked: boolean;
  onToggle?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [shared, setShared] = useState(false);
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = window.location.origin;
      if (typeof navigator.share === "function") {
        await navigator.share({ title: "Check out this on Operavax", url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  };

  return (
    <div
      className="relative flex flex-col items-end gap-1"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TooltipProvider>
        {/* Heart row — share slides in from the right on hover */}
        <div className="flex items-center gap-1.5">
          {/* Share button — slides left into view */}
          <div
            className={cn(
              "transition-all duration-200 ease-out",
              hovered
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-3 pointer-events-none"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleShare}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm shadow-sm transition-all duration-200 focus:outline-none",
                    shared ? "bg-[#0F9D58]" : "bg-white/90 hover:bg-[#E8F0FE]"
                  )}
                >
                  {shared ? (
                    <Check className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <Share2 className="h-3.5 w-3.5 text-[#4285F4]" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={6} className="text-xs font-medium bg-[#4285F4] text-white border-[#4285F4]" arrowClassName="bg-[#4285F4] fill-[#4285F4]">
                {shared ? "Link copied!" : "Share this product"}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Heart */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" onClick={onToggle} className="focus:outline-none">
                <Heart
                  className={cn(
                    "h-5 w-5 transition-all duration-200",
                    liked
                      ? "fill-red-500 text-red-500 scale-110"
                      : "fill-gray-300 text-gray-300 hover:fill-red-400 hover:text-red-400"
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={6} className="text-xs font-medium bg-[#4285F4] text-white border-[#4285F4]" arrowClassName="bg-[#4285F4] fill-[#4285F4]">
              {liked ? "Saved to favourites" : "Add to favourites"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Thumbs on hover — below the heart */}
        <div
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-200",
            hovered
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setThumbUp((v) => !v)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 focus:outline-none",
                  thumbUp ? "bg-[#0F9D58] shadow-md scale-110" : "bg-white/90 hover:bg-[#E6F4EA] shadow-sm"
                )}
              >
                <ThumbsUp className={cn("h-3.5 w-3.5 transition-colors duration-200", thumbUp ? "text-white" : "text-[#0F9D58]")} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={6} className="text-xs font-medium bg-[#0F9D58] text-white border-[#0F9D58]" arrowClassName="bg-[#0F9D58] fill-[#0F9D58]">
              {thumbUp ? "You liked this \u00b7 click to undo" : "Like this product"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setThumbDown((v) => !v)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 focus:outline-none",
                  thumbDown ? "bg-[#EA4335] shadow-md scale-110" : "bg-white/90 hover:bg-[#FCE8E6] shadow-sm"
                )}
              >
                <ThumbsDown className={cn("h-3.5 w-3.5 transition-colors duration-200", thumbDown ? "text-white" : "text-[#EA4335]")} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={6} className="text-xs font-medium bg-[#EA4335] text-white border-[#EA4335]" arrowClassName="bg-[#EA4335] fill-[#EA4335]">
              {thumbDown ? "You disliked this \u00b7 click to undo" : "Dislike this product"}
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

// ── Inline rating — star + score (0.0 if none, e.g. 4.9 · 12 ratings) ──
function RatingInline({ compact }: { compact?: boolean }) {
  const averageRating: number = 0;
  const totalRatings: number = 0;
  const hasRatings = averageRating > 0;

  return (
    <div className={cn("flex items-center gap-1", compact && "[&_span]:text-[9px] [&_svg]:h-2.5 [&_svg]:w-2.5")}>
      <Star
        className={cn(
          "shrink-0",
          hasRatings ? "fill-amber-400 text-amber-400" : "text-gray-300",
          compact ? "h-2.5 w-2.5" : "h-3 w-3"
        )}
      />
      <span className={cn("font-medium", hasRatings ? "text-gray-700" : "text-gray-500", compact ? "text-[9px]" : "text-[10px]")}>
        {hasRatings
          ? `${averageRating.toFixed(1)} \u00b7 ${totalRatings} rating${totalRatings === 1 ? "" : "s"}`
          : "No ratings yet"}
      </span>
    </div>
  );
}

// ── ProductCard ──────────────────────────────────────────────────────────
export function ProductCard({
  name,
  tagline,
  color,
  bg,
  url,
  badge,
  categoryLabel,
  icon,
  isFavourited: liked = false,
  onClick,
  onToggleFavourite,
  compact,
}: ProductCardProps) {
  const badgeLabel = badge ?? categoryLabel;
  /* ── Compact card: 235px fixed-width for horizontal scroll rows ── */
  if (compact) {
    return (
      <div className="group block cursor-pointer" onClick={onClick}>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-200 active:scale-[0.97]">
          {/* Image: edge-to-edge, rounded top only */}
          <div className="relative h-[95px] overflow-hidden rounded-t-xl">
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1"
              style={{ background: `linear-gradient(135deg, ${bg}, ${color}22)` }}
            >
              <HubIcon name={icon} className="h-6 w-6" style={{ color }} />
              <span className="font-display text-[8px] font-bold uppercase tracking-wider opacity-70" style={{ color }}>
                {name.replace("Operavax ", "")}
              </span>
            </div>

            {/* Badge */}
            {badgeLabel && (
              <div className="absolute left-1.5 top-0.5">
                <span className="rounded-full px-1.5 py-[2px] font-display text-[8px] font-semibold tracking-tight shadow-sm text-white" style={{ background: color }}>
                  {badgeLabel}
                </span>
              </div>
            )}

            {/* Heart + share + thumbs */}
            <div className="absolute right-1.5 top-0.5">
              <ProductRating liked={liked} onToggle={onToggleFavourite} />
            </div>

            {/* Time pill */}
            <div className="absolute bottom-1.5 left-1.5">
              <span className="flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-[2px] text-[8px] font-semibold text-[#222] shadow-sm backdrop-blur-sm">
                <Clock className="h-2 w-2 text-[#0F9D58]" />
                Platform
              </span>
            </div>
          </div>

          {/* Text content */}
          <div className="px-2.5 pt-2 pb-2">
            <h3 className="line-clamp-2 font-display text-[11.5px] font-bold leading-[1.3] tracking-tight text-gray-900 transition-colors group-hover:text-[#4285F4]">
              {name}
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <span className="truncate text-[10px] font-medium text-gray-700">Operavax</span>
              <CheckCircle className="h-2.5 w-2.5 shrink-0 text-[#4285F4]" />
            </div>
            {tagline && (
              <p className="mt-0.5 line-clamp-1 text-[10px] leading-[1.4] text-gray-500">{tagline}</p>
            )}
            <div className="mt-1 flex items-center justify-between gap-1">
              <RatingInline compact />
              <span className="shrink-0 text-[9px] font-medium text-gray-500">Free</span>
            </div>
            <div className="-mx-2.5 mt-1.5 flex items-center justify-between border-t border-gray-100 px-2.5 pt-1.5">
              <span className="truncate text-[9px] text-gray-500">{url}</span>
              <ArrowRight className="h-3 w-3 shrink-0 text-gray-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#4285F4]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Full card: grid layout ── */
  return (
    <div className="group block cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 transition-all duration-300 hover:border-gray-200 hover:shadow-lg">
        <div className="relative mb-3 h-28 overflow-hidden rounded-xl" style={{ background: `linear-gradient(135deg, ${bg}, ${color}22)` }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <HubIcon name={icon} className="h-9 w-9" style={{ color }} />
            <span className="font-display text-[10px] font-bold uppercase tracking-wider opacity-70" style={{ color }}>
              {name.replace("Operavax ", "")}
            </span>
          </div>

          {/* Badge */}
          {badgeLabel && (
            <div className="absolute left-2 top-1">
              <span className="rounded-full border border-white/50 px-2.5 py-[4px] font-display text-[10px] font-semibold tracking-tight shadow-sm text-white" style={{ background: color }}>
                {badgeLabel}
              </span>
            </div>
          )}

          {/* Heart + share + thumbs */}
          <div className="absolute right-2 top-1">
            <ProductRating liked={liked} onToggle={onToggleFavourite} />
          </div>

          {/* Time pill */}
          <div className="absolute bottom-2 left-2">
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-[3px] text-[10px] font-semibold text-[#222] shadow-sm backdrop-blur-sm">
              <Clock className="h-2.5 w-2.5 text-[#0F9D58]" />
              Platform
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="line-clamp-2 font-display text-sm font-bold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-[#4285F4]">
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="truncate text-xs font-medium text-gray-700">Operavax</span>
            <CheckCircle className="h-3 w-3 shrink-0 text-[#4285F4]" />
          </div>
          {tagline && (
            <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{tagline}</p>
          )}
          <div className="flex items-center justify-between">
            <RatingInline />
            <span className="text-[10px] font-medium text-gray-500">Free to access</span>
          </div>
          <div className="-mx-3 mt-1 flex items-center justify-between border-t border-gray-100 px-3 pt-2">
            <span className="truncate text-[10px] text-gray-500">{url}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gray-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#4285F4]" />
          </div>
        </div>
      </div>
    </div>
  );
}
