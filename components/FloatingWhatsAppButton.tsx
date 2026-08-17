"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/lib/constants";

export function FloatingWhatsAppButton() {
  if (!WHATSAPP_NUMBER) return null;

  const whatsappLink = buildWhatsAppLink(WHATSAPP_MESSAGES.homepage, WHATSAPP_NUMBER);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8"
    >
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with LAEL on WhatsApp"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#FFFDF8]/70 bg-[#29251F] text-[#FFFDF8] shadow-[0_12px_35px_rgba(41,37,31,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#75695B] sm:h-auto sm:w-auto sm:gap-3 sm:px-5 sm:py-3"
      >
        <span aria-hidden="true" className="text-base">◉</span>
        <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.22em] sm:inline">
          CHAT WITH LAEL
        </span>
      </Link>
    </motion.div>
  );
}
