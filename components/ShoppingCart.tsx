"use client";

import { useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/lib/store";

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCount, isHydrated } = useCart();
  const count = getCount();

  if (!isHydrated) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex h-10 items-center gap-2 rounded-full border border-[#29251F]/15 bg-[#FFFDF8]/60 px-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#29251F]/30 hover:bg-[#EFE5D6]"
        aria-label={`Open shopping bag${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
        title="Shopping bag"
      >
        <svg className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="hidden text-[0.62rem] font-medium uppercase tracking-[0.2em] sm:inline">Bag</span>
        {count > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#29251F] px-1 text-[0.62rem] font-semibold text-white" aria-label={`${count} items in bag`}>
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
