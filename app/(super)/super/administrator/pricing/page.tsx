"use client";

import { CreditCard, Check, Sparkles, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For individuals exploring the platform",
    color: "#4285F4",
    bg: "#E8F0FE",
    icon: Sparkles,
    current: false,
    features: [
      "1 product access",
      "5 sectors",
      "Community support",
      "Basic analytics",
    ],
  },
  {
    name: "Professional",
    price: "R299",
    period: "/month",
    description: "For teams and growing organizations",
    color: "#0F9D58",
    bg: "#E6F4EA",
    icon: CreditCard,
    current: true,
    features: [
      "All products",
      "All 31 sectors",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom needs",
    color: "#7C3AED",
    bg: "#F3E8FF",
    icon: Building2,
    current: false,
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
      "Audit logs",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F4EA]">
            <CreditCard className="h-5 w-5 text-[#0F9D58]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              Pricing
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Manage subscription plans and billing
            </p>
          </div>
        </div>
      </div>

      {/* Plans grid */}
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl md:rounded-2xl border bg-white p-5 md:p-6 transition-all hover:shadow-md ${
              plan.current
                ? "border-[#0F9D58] ring-1 ring-[#0F9D58]/20"
                : "border-[#E2E8F0] hover:border-[#ddd]"
            }`}
          >
            {plan.current && (
              <span className="absolute -top-2.5 left-4 inline-flex rounded-full bg-[#0F9D58] px-2.5 py-0.5 text-[10px] font-bold text-white">
                Current Plan
              </span>
            )}

            {/* Plan icon + name */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: plan.bg }}
              >
                <plan.icon className="h-5 w-5" style={{ color: plan.color }} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold tracking-tight text-[#222]">
                  {plan.name}
                </h3>
                <p className="text-xs text-[#6a6a6a]">{plan.description}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-5">
              <span className="font-display text-3xl font-bold tracking-tight text-[#222]">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm text-[#6a6a6a]">{plan.period}</span>
              )}
            </div>

            {/* Features */}
            <div className="space-y-2.5 mb-5">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check
                    className="h-4 w-4 shrink-0"
                    style={{ color: plan.color }}
                  />
                  <span className="text-sm text-[#444]">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              disabled
              className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
                plan.current
                  ? "border border-[#E2E8F0] bg-[#FAFAFA] text-[#6a6a6a]"
                  : "bg-[#4285F4] text-white disabled:opacity-50"
              }`}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>

      {/* Billing note */}
      <p className="mt-6 text-center text-xs text-[#6a6a6a]">
        All plans include SSL encryption and GDPR compliance. Prices shown in
        South African Rand (ZAR).
      </p>
    </div>
  );
}
