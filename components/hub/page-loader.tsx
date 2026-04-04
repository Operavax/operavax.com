"use client";

import Image from "next/image";

const BRAND = {
  blue: "#4285F4",
  red: "#DB4437",
  green: "#0F9D58",
  yellow: "#F4B400",
};

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-white">
      <style>{`
        @keyframes loader-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes loader-icon-in {
          from { opacity: 0; transform: scale(0.65) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes loader-rise-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loader-bar {
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

      {/* Orbit rings */}
      <div
        className="absolute rounded-full"
        style={{ width: 620, height: 620, border: "1.5px solid #E8F0FE", top: "50%", left: "50%", animation: "loader-spin 18s linear infinite" }}
      />
      <div
        className="absolute rounded-full"
        style={{ width: 460, height: 460, border: "1.5px solid #E6F4EA", top: "50%", left: "50%", animation: "loader-spin 12s linear infinite reverse" }}
      />
      <div
        className="absolute rounded-full"
        style={{ width: 320, height: 320, border: "1.5px solid #FEF7E0", top: "50%", left: "50%", animation: "loader-spin 8s linear infinite" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div style={{ animation: "loader-icon-in 0.7s cubic-bezier(0.34,1.56,0.64,1) both" }}>
          <Image
            src="/img/operavax-logo.png"
            alt="Operavax"
            width={280}
            height={98}
            className="h-auto w-[200px] md:w-[260px]"
            priority
          />
        </div>

        {/* Progress bar */}
        <div
          className="relative h-[3px] w-[160px] overflow-hidden rounded-full bg-[#f1f3f4]"
          style={{ animation: "loader-rise-in 0.6s ease 0.3s both" }}
        >
          <div
            className="absolute h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${BRAND.blue} 0%, ${BRAND.green} 50%, ${BRAND.yellow} 80%, ${BRAND.red} 100%)`,
              animation: "loader-bar 2s cubic-bezier(0.4,0,0.2,1) infinite",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-6 z-10 text-[11px] uppercase tracking-[2px] text-[#dadce0]"
        style={{ animation: "loader-rise-in 0.6s ease 0.6s both" }}
      >
        operavax
      </div>
    </div>
  );
}
