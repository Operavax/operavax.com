"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = {
  blue: "#4285F4",
  red: "#DB4437",
  green: "#0F9D58",
  yellow: "#F4B400",
};

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <style>{`
            @keyframes splash-spin {
              from { transform: translate(-50%,-50%) rotate(0deg); }
              to   { transform: translate(-50%,-50%) rotate(360deg); }
            }
            @keyframes splash-icon-in {
              from { opacity: 0; transform: scale(0.65) translateY(8px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes splash-rise-in {
              from { opacity: 0; transform: translateY(18px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes splash-load {
              0%   { width: 0%; }
              55%  { width: 68%; }
              100% { width: 100%; }
            }
            @keyframes splash-pulse {
              0%, 100% { opacity: 0.25; transform: scale(0.8); }
              50%      { opacity: 1; transform: scale(1.25); }
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

          {/* Orbit rings — sizes match HTML exactly */}
          <OrbitRing size={620} color="#E8F0FE" duration={18}>
            <Odot color={BRAND.blue} size={12} style={{ top: -6, left: "calc(50% - 6px)" }} />
            <Odot color={BRAND.red} size={11} style={{ top: "calc(50% - 5.5px)", right: -5.5, left: "auto" }} />
          </OrbitRing>
          <OrbitRing size={460} color="#E6F4EA" duration={12} reverse>
            <Odot color={BRAND.green} size={10} style={{ bottom: -5, top: "auto", left: "calc(50% - 5px)" }} />
            <Odot color={BRAND.yellow} size={11} style={{ top: "calc(50% - 5.5px)", left: -5.5 }} />
          </OrbitRing>
          <OrbitRing size={320} color="#FEF7E0" duration={8} />

          {/* Single clean orbit ring */}
          <OrbitRing size={540} color="#e8eaed" duration={20} borderWidth={1}>
            <Odot color={BRAND.blue} size={10} style={{ top: -5, left: "calc(50% - 5px)" }} />
            <Odot color={BRAND.green} size={10} style={{ top: "calc(50% - 5px)", right: -5, left: "auto" }} />
            <Odot color={BRAND.red} size={10} style={{ bottom: -5, top: "auto", left: "calc(50% - 5px)" }} />
            <Odot color={BRAND.yellow} size={10} style={{ top: "calc(50% - 5px)", left: -5 }} />
          </OrbitRing>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-7">
            {/* Logo */}
            <div style={{ animation: "splash-icon-in 0.7s cubic-bezier(0.34,1.56,0.64,1) both" }}>
              <Image
                src="/img/operavax-logo.png"
                alt="Operavax"
                width={320}
                height={112}
                className="h-auto w-[280px] md:w-[320px]"
                priority
              />
            </div>

            {/* Tagline */}
            <div
              className="flex flex-col items-center gap-2"
              style={{ animation: "splash-rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}
            >
              <div className="text-sm tracking-wide text-[#9aa0a6]">
                Loading your workspace…
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="h-[3px] w-[200px] overflow-hidden rounded-full bg-[#f1f3f4]"
              style={{ animation: "splash-rise-in 0.6s ease 0.45s both" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.blue} 0%, ${BRAND.green} 50%, ${BRAND.yellow} 80%, ${BRAND.red} 100%)`,
                  animation: "splash-load 2.4s cubic-bezier(0.4,0,0.2,1) 0.7s forwards",
                  width: 0,
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className="absolute bottom-6 z-10 text-[11px] uppercase tracking-[2px] text-[#dadce0]"
            style={{ animation: "splash-rise-in 0.6s ease 0.9s both" }}
          >
            operavax
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OrbitRing({
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
        animation: `splash-spin ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {children}
    </div>
  );
}

function Odot({
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
