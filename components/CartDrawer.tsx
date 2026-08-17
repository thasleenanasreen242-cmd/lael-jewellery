"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { buildWhatsAppLink, buildCartWhatsAppMessage } from "@/lib/whatsapp";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, getTotal, isHydrated } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!mounted || !isHydrated) return null;

  const total = getTotal();
  const whatsappMessage = buildCartWhatsAppMessage(
    items.map((item) => ({
      name: item.productName,
      qty: item.quantity,
      price: item.price,
    }))
  );
  const whatsappLink = buildWhatsAppLink(whatsappMessage);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] isolate">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-[#29251F]/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260, mass: 0.8 }}
            className="fixed right-0 top-0 z-[9999] flex h-[100dvh] w-full max-w-[520px] flex-col overflow-hidden border-l border-[#29251F]/10 bg-[#FFFDF8] text-[#29251F] shadow-[-24px_0_70px_rgba(41,37,31,0.16)]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#29251F]/10 bg-[#FFFDF8] px-6 py-7 sm:px-8">
              <p className="font-serif text-3xl tracking-[-0.03em]">Your Bag</p>
              <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#29251F]/15 text-2xl leading-none text-[#29251F] transition hover:bg-[#F7F1E8]" aria-label="Close shopping bag">
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex min-h-0 flex-1 items-center justify-center bg-[#FFFDF8] p-8 text-center">
                <div>
                  <p className="mb-5 text-[#75695B]">Your bag is empty</p>
                  <Link href="/shop" onClick={onClose} className="inline-block rounded-full border border-[#29251F] px-8 py-3 font-medium uppercase tracking-[0.18em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]">Continue shopping</Link>
                </div>
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto bg-[#FFFDF8] px-6 py-5 sm:px-8">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productSlug} className="flex gap-4 rounded-2xl border border-[#29251F]/10 bg-[#F7F1E8] p-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EFE5D6]">
                        <Image src={item.image} alt={item.productName} width={100} height={100} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-[#29251F]">{item.productName}</p>
                        <p className="mt-1 text-sm text-[#75695B]">${item.price.toFixed(2)}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button type="button" onClick={() => updateQuantity(item.productSlug, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#29251F]/20 bg-[#FFFDF8] text-[#75695B] hover:bg-[#EFE5D6]">−</button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.productSlug, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#29251F]/20 bg-[#FFFDF8] text-[#75695B] hover:bg-[#EFE5D6]">+</button>
                          <button type="button" onClick={() => removeItem(item.productSlug)} className="ml-auto text-xs uppercase tracking-[0.15em] text-[#75695B] hover:text-[#29251F]">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {items.length > 0 && (
              <div className="relative z-[10000] shrink-0 border-t border-[#29251F]/10 bg-[#FFFDF8] p-6 shadow-[0_-18px_40px_rgba(41,37,31,0.06)] sm:p-8">
                <div className="space-y-3 border-y border-[#29251F]/10 py-4">
                  <div className="flex justify-between text-sm"><span className="text-[#75695B]">Subtotal</span><span className="font-medium">${total.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#75695B]">Shipping</span><span className="text-right font-medium">Calculated at checkout</span></div>
                </div>
                <div className="mt-4 flex items-center justify-between"><p className="text-[#75695B]">Total</p><p className="font-serif text-2xl tracking-[-0.02em]">${total.toFixed(2)}</p></div>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-xl bg-[#25D366] py-4 text-center text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#20ba58]">Order via WhatsApp</a>
                <button type="button" onClick={onClose} className="mt-3 w-full rounded-xl border border-[#29251F]/20 bg-[#FFFDF8] py-4 text-sm font-medium uppercase tracking-[0.15em] text-[#29251F] transition hover:bg-[#F7F1E8]">Continue shopping</button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
