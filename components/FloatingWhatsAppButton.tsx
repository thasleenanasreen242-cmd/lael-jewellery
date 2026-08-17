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
        title="Chat with LAEL on WhatsApp"
        className="group flex h-13 w-13 items-center justify-center rounded-full border border-white/80 bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.28)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#20bd5a] sm:h-auto sm:w-auto sm:gap-3 sm:px-5 sm:py-3"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" aria-hidden="true" fill="currentColor">
          <path d="M19.11 17.23c-.27-.14-1.59-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.12-.41-2.14-1.31-.79-.7-1.32-1.56-1.47-1.83-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.93 2.95 4.67 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.59-.65 1.81-1.28.22-.63.22-1.16.16-1.28-.07-.11-.25-.18-.52-.32z" />
          <path d="M16.02 3.2c-7.08 0-12.84 5.76-12.84 12.84 0 2.26.59 4.46 1.72 6.4L3.1 28.8l6.51-1.7a12.8 12.8 0 0 0 6.4 1.7h.01c7.08 0 12.84-5.76 12.84-12.84S23.1 3.2 16.02 3.2zm0 23.43h-.01a10.56 10.56 0 0 1-5.38-1.47l-.39-.23-3.86 1.01 1.03-3.76-.25-.39a10.57 10.57 0 1 1 8.86 4.84z" />
        </svg>
        <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.22em] sm:inline">CHAT WITH LAEL</span>
      </Link>
    </motion.div>
  );
}
