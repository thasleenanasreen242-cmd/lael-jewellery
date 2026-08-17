"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] flex items-center justify-center px-5 py-20 text-[#29251F]">
      <div className="text-center space-y-8">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.06em]"
        >
          LAEL
        </motion.p>
        
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              className="w-1 h-8 bg-[#75695B] rounded-full"
            />
          ))}
        </div>

        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#75695B]">Loading your collection</p>
      </div>
    </main>
  );
}
