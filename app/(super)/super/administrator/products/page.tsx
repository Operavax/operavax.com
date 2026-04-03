"use client";

import {
  Package,
  BookOpen,
  Camera,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    id: "docs",
    name: "Operavax Docs",
    tagline: "Guides, references & documentation for every product.",
    color: "#0F9D58",
    bg: "#E6F4EA",
    url: "docs.operavax.com",
    badge: null,
    visible: true,
    needsSector: false,
    icon: BookOpen,
  },
  {
    id: "report",
    name: "Operavax Report",
    tagline:
      "Camera-first reporting automatically routed to the right authority or department.",
    color: "#DB4437",
    bg: "#FDE8E7",
    url: "report.operavax.com",
    badge: null,
    visible: true,
    needsSector: true,
    icon: Camera,
  },
];

export default function ProductsPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F0FE]">
            <Package className="h-5 w-5 text-[#4285F4]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Products
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Manage all products in the ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FE] px-3 py-1.5">
          <Package className="h-3.5 w-3.5 text-[#4285F4]" />
          <span className="text-xs font-semibold text-[#4285F4]">
            {products.length} products registered
          </span>
        </div>
      </div>

      {/* Product cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6 transition-all hover:shadow-md hover:border-[#ddd]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: product.bg }}
                >
                  <product.icon
                    className="h-5 w-5"
                    style={{ color: product.color }}
                  />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight text-[#222]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Globe className="h-3 w-3 text-[#6a6a6a]" />
                    <span className="text-xs text-[#6a6a6a]">
                      {product.url}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {product.visible ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-semibold text-[#0F9D58]">
                    <Eye className="h-3 w-3" />
                    Visible
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F1F1] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a6a]">
                    <EyeOff className="h-3 w-3" />
                    Hidden
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-[#6a6a6a] mb-4 leading-relaxed">
              {product.tagline}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0]">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#6a6a6a]">
                  Sector required:{" "}
                  <span className="font-semibold text-[#222]">
                    {product.needsSector ? "Yes" : "No"}
                  </span>
                </span>
              </div>
              <a
                href={`https://${product.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4285F4] hover:underline"
              >
                Visit
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
