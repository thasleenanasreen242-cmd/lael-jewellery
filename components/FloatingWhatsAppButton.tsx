"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/lib/constants";

export function FloatingWhatsAppButton() {
  const message = WHATSAPP_MESSAGES.homepage;
  const whatsappLink = buildWhatsAppLink(message, WHATSAPP_NUMBER);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
    >
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition hover:shadow-xl hover:scale-105"
      >
        <span className="text-xl">💬</span>
        <span className="hidden text-sm font-medium sm:inline">CHAT WITH LAEL</span>
      </Link>
    </motion.div>
  );
}
