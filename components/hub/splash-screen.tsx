"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BrandStripe } from "./brand-stripe";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute left-0 right-0 top-0">
            <BrandStripe />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Image
                src="/img/operavax-logo.png"
                alt="Operavax"
                width={160}
                height={56}
                className="h-10 w-auto md:h-14"
                priority
              />
            </motion.div>
            <motion.p
              className="mt-4 text-sm text-[#999]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.9, ease: "easeOut" }}
            >
              One platform. Every sector.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
