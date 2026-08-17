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
      className="fixed left-4 top-5 z-[2147483647] flex h-11 items-center gap-2 rounded-full border border-[#29251F]/20 bg-[#FFFDF8] px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#29251F] shadow-[0_8px_28px_rgba(41,37,31,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 hover:shadow-[0_12px_34px_rgba(41,37,31,0.24)] sm:left-6 sm:top-6"
    >
      <span className="text-xl leading-none" aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  );
}
