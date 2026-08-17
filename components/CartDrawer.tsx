"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { useEffect } from "react";
import { buildWhatsAppLink, buildCartWhatsAppMessage } from "@/lib/whatsapp";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, getTotal, isHydrated } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isHydrated) {
    return null;
  }

  const total = getTotal();
  const whatsappMessage = buildCartWhatsAppMessage(
    items.map((item) => ({
      name: item.productName,
      qty: item.quantity,
      price: item.price,
    }))
  );
  const whatsappLink = buildWhatsAppLink(whatsappMessage);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#29251F]/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full max-w-md w-full bg-[#FFFDF8] border-l border-[#29251F]/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#29251F]/10 p-6">
              <p className="font-serif text-2xl tracking-[-0.02em]">Your Bag</p>
              <button onClick={onClose} className="text-[#75695B] hover:text-[#29251F] text-2xl">
                ✕
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-6 text-center">
                <div>
                  <p className="text-[#75695B] mb-4">Your bag is empty</p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="inline-block rounded-full border border-[#29251F] px-8 py-3 font-medium uppercase tracking-[0.18em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 p-6">
                {items.map((item) => (
                  <div key={item.productSlug} className="flex gap-4 rounded-lg border border-[#29251F]/10 bg-[#F7F1E8] p-4">
                    <div className="w-24 h-24 rounded-lg bg-[#EFE5D6] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-[#29251F]">{item.productName}</p>
                      <p className="text-sm text-[#75695B] mt-1">${item.price}</p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.productSlug, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded border border-[#29251F]/20 text-[#75695B] hover:bg-[#F7F1E8] transition"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productSlug, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded border border-[#29251F]/20 text-[#75695B] hover:bg-[#F7F1E8] transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.productSlug)}
                          className="ml-auto text-xs text-[#75695B] hover:text-[#29251F] transition uppercase tracking-[0.15em]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#29251F]/10 p-6 space-y-4">
                <div className="space-y-2 py-4 border-y border-[#29251F]/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#75695B]">Subtotal</span>
                    <span className="text-[#29251F] font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#75695B]">Shipping</span>
                    <span className="text-[#29251F] font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#75695B]">Total</p>
                  <p className="font-serif text-2xl tracking-[-0.02em]">${total.toFixed(2)}</p>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center rounded-lg bg-[#25D366] text-white font-medium py-3 transition hover:bg-[#20ba58] uppercase tracking-[0.15em] text-sm"
                >
                  Order via WhatsApp
                </a>

                <button
                  onClick={onClose}
                  className="w-full rounded-lg border border-[#29251F]/20 bg-transparent py-3 font-medium text-[#29251F] transition hover:bg-[#F7F1E8] uppercase tracking-[0.15em] text-sm"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
