"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingBagButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("lael-cart");
        const cart = raw ? JSON.parse(raw) : [];
        setCount(Array.isArray(cart) ? cart.reduce((sum: number, item: any) => sum + Number(item.quantity || 1), 0) : 0);
      } catch { setCount(0); }
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("lael-cart-updated", read);
    return () => { window.removeEventListener("storage", read); window.removeEventListener("lael-cart-updated", read); };
  }, []);

  return (
    <Link href="/cart" aria-label={`Shopping bag${count ? `, ${count} items` : ""}`} className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-[#29251F]/15 bg-[#29251F] text-[#FFFDF8] shadow-[0_12px_32px_rgba(41,37,31,.20)] transition duration-300 hover:-translate-y-1 hover:bg-[#B79A6A] hover:shadow-[0_16px_36px_rgba(183,154,106,.28)] sm:bottom-7 sm:right-7">
      <ShoppingBag size={21} strokeWidth={1.6} />
      {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B79A6A] px-1 text-[10px] font-bold text-white ring-2 ring-[#F7F1E8]">{count > 99 ? "99+" : count}</span>}
    </Link>
  );
}
