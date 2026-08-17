"use client";

import { useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/lib/store";

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCount, isHydrated } = useCart();
  const count = getCount();

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#29251F]/20 hover:bg-[#EFE5D6] transition"
        aria-label="Open shopping cart"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#29251F] rounded-full">
            {count}
          </span>
        )}
      </button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
