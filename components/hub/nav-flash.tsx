"use client";

import Image from "next/image";
import { HubIcon } from "@/lib/hub-icons";
import type { Product } from "@/lib/hub-data";

const BRAND = {
  blue: "#4285F4",
  red: "#DB4437",
  green: "#0F9D58",
  yellow: "#F4B400",
};

interface NavFlashProps {
  active: boolean;
  product: Product | null;
  label: string;
}

export function NavFlash({ active, product, label }: NavFlashProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[90] overflow-hidden bg-white transition-opacity duration-400 ${
        active ? "pointer-events-auto opacity-100" : "opacity-0"
      }`}
    >
      <style>{`
        @keyframes nf-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes nf-icon-in {
          from { opacity: 0; transform: scale(0.65) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes nf-rise-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nf-load-loop {
          0%   { width: 0%; left: 0; }
          50%  { width: 70%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
      `}</style>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, #e8e8e8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Corner glows */}
      <div className="absolute rounded-full" style={{ width: 420, height: 420, background: "#E8F0FE", top: -180, left: -180, opacity: 0.55 }} />
      <div className="absolute rounded-full" style={{ width: 360, height: 360, background: "#E6F4EA", bottom: -160, right: -160, opacity: 0.45 }} />
      <div className="absolute rounded-full" style={{ width: 240, height: 240, background: "#FCEAE9", top: -100, right: -80, opacity: 0.35 }} />
      <div className="absolute rounded-full" style={{ width: 200, height: 200, background: "#FEF7E0", bottom: -90, left: -70, opacity: 0.35 }} />

      {/* Corner accent circles */}
      <div className="absolute rounded-full opacity-[0.07]" style={{ width: 240, height: 240, background: BRAND.blue, top: -80, left: -80 }} />
      <div className="absolute rounded-full opacity-[0.07]" style={{ width: 240, height: 240, background: BRAND.red, top: -80, right: -80 }} />
      <div className="absolute rounded-full opacity-[0.07]" style={{ width: 240, height: 240, background: BRAND.green, bottom: -80, left: -80 }} />
      <div className="absolute rounded-full opacity-[0.07]" style={{ width: 240, height: 240, background: BRAND.yellow, bottom: -80, right: -80 }} />

      {/* Orbit rings — exact same as splash */}
      <NfOrbit size={620} color="#E8F0FE" duration={18}>
        <NfDot color={BRAND.blue} size={12} style={{ top: -6, left: "calc(50% - 6px)" }} />
        <NfDot color={BRAND.red} size={11} style={{ top: "calc(50% - 5.5px)", right: -5.5, left: "auto" }} />
      </NfOrbit>
      <NfOrbit size={460} color="#E6F4EA" duration={12} reverse>
        <NfDot color={BRAND.green} size={10} style={{ bottom: -5, top: "auto", left: "calc(50% - 5px)" }} />
        <NfDot color={BRAND.yellow} size={11} style={{ top: "calc(50% - 5.5px)", left: -5.5 }} />
      </NfOrbit>
      <NfOrbit size={320} color="#FEF7E0" duration={8} />

      {/* Single clean orbit ring */}
      <NfOrbit size={540} color="#e8eaed" duration={20} borderWidth={1}>
        <NfDot color={BRAND.blue} size={10} style={{ top: -5, left: "calc(50% - 5px)" }} />
        <NfDot color={BRAND.green} size={10} style={{ top: "calc(50% - 5px)", right: -5, left: "auto" }} />
        <NfDot color={BRAND.red} size={10} style={{ bottom: -5, top: "auto", left: "calc(50% - 5px)" }} />
        <NfDot color={BRAND.yellow} size={10} style={{ top: "calc(50% - 5px)", left: -5 }} />
      </NfOrbit>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-7">
        {product && (
          <>
            {/* Product icon — same card style as splash icon mark */}
            <div
              className="flex h-24 w-24 items-center justify-center rounded-[26px] border-[1.5px] border-[#e8eaed] bg-white"
              style={{
                boxShadow: "0 4px 24px rgba(66,133,244,0.10), 0 1px 4px rgba(0,0,0,0.05)",
                animation: "nf-icon-in 0.7s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: product.bg }}
              >
                <HubIcon
                  name={product.icon}
                  className="h-7 w-7"
                  style={{ color: product.color }}
                />
              </div>
            </div>

            {/* Product name + status */}
            <div
              className="flex flex-col items-center gap-2"
              style={{ animation: "nf-rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}
            >
              <div className="text-[46px] font-bold leading-none tracking-tight text-[#222]">
                {product.name.replace("Operavax ", "")}
              </div>
              <div className="text-sm tracking-wide text-[#9aa0a6]">
                Opening {label}…
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="relative h-[3px] w-[200px] overflow-hidden rounded-full bg-[#f1f3f4]"
              style={{ animation: "nf-rise-in 0.6s ease 0.45s both" }}
            >
              <div
                className="absolute h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.blue} 0%, ${BRAND.green} 50%, ${BRAND.yellow} 80%, ${BRAND.red} 100%)`,
                  animation: "nf-load-loop 2s cubic-bezier(0.4,0,0.2,1) infinite",
                }}
              />
            </div>
          </>
        )}

        {/* Footer */}
        <div
          className="absolute bottom-6 text-[11px] uppercase tracking-[2px] text-[#dadce0]"
          style={{ animation: "nf-rise-in 0.6s ease 0.9s both" }}
        >
          operavax
        </div>
      </div>
    </div>
  );
}

function NfOrbit({
  size,
  color,
  duration,
  reverse,
  borderWidth = 1.5,
  children,
}: {
  size: number;
  color: string;
  duration: number;
  reverse?: boolean;
  borderWidth?: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        border: `${borderWidth}px solid ${color}`,
        top: "50%",
        left: "50%",
        animation: `nf-spin ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {children}
    </div>
  );
}

function NfDot({
  color,
  size,
  style,
}: {
  color: string;
  size: number;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{ width: size, height: size, background: color, ...style }}
    />
  );
}
