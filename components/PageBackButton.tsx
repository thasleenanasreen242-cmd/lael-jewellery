"use client";

import { usePathname, useRouter } from "next/navigation";

export function PageBackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back to previous page"
      className="group fixed left-4 top-24 z-[99999] inline-flex items-center gap-2 rounded-full border border-[#29251F]/20 bg-[#FFFDF8] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#29251F] shadow-[0_8px_30px_rgba(41,37,31,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:shadow-[0_12px_35px_rgba(41,37,31,0.2)] sm:left-6 sm:top-28"
    >
      <span className="text-lg leading-none transition-transform duration-300 group-hover:-translate-x-1">←</span>
      <span>Back</span>
    </button>
  );
}
