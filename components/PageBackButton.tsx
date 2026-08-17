"use client";

import { useRouter } from "next/navigation";

export function PageBackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className="group inline-flex items-center gap-2 rounded-full border border-[#29251F]/15 bg-[#FFFDF8]/80 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#29251F] backdrop-blur-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-[#29251F]/30 hover:bg-[#FFFDF8]"
    >
      <span className="text-base leading-none transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
      <span>Back</span>
    </button>
  );
}
