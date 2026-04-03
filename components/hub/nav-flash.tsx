"use client";

import { BrandStripe } from "./brand-stripe";
import { HubIcon } from "@/lib/hub-icons";
import type { Product } from "@/lib/hub-data";

interface NavFlashProps {
  active: boolean;
  product: Product | null;
  label: string;
}

export function NavFlash({ active, product, label }: NavFlashProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[90] bg-white transition-opacity duration-400 ${
        active ? "pointer-events-auto opacity-100" : "opacity-0"
      }`}
    >
      <BrandStripe />
      <div className="flex flex-1 flex-col items-center justify-center" style={{ height: "calc(100vh - 3px)" }}>
        {product && (
          <>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: product.bg }}
            >
              <HubIcon
                name={product.icon}
                className="h-6 w-6"
                style={{ color: product.color }}
              />
            </div>
            <p className="mt-3 font-display text-sm font-bold text-[#222]">
              {label}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
