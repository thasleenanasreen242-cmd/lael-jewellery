"use client";

import { usePathname, useRouter } from "next/navigation";

export function PageBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back to previous page"
      className="fixed left-3 top-4 z-[2147483647] flex h-8 items-center gap-1.5 rounded-full border border-[#29251F]/15 bg-[#FFFDF8]/95 px-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#29251F] shadow-[0_4px_16px_rgba(41,37,31,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 sm:left-5 sm:top-5"
    >
      <span className="text-sm leading-none" aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  );
}
