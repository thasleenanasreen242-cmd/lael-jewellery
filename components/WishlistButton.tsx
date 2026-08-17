"use client";

import { useWishlist } from "@/lib/store";

export function WishlistButton({ productSlug }: { productSlug: string }) {
  const { contains, toggleItemBySlug, isHydrated } = useWishlist();

  if (!isHydrated) {
    return null;
  }

  const isFavorited = contains(productSlug);

  return (
    <button
      onClick={() => toggleItemBySlug(productSlug)}
      className="flex items-center justify-center w-full rounded-full border border-[#29251F]/20 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition hover:bg-[#EFE5D6]"
      aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
    >
      <span className="mr-2">{isFavorited ? "♥" : "♡"}</span>
      {isFavorited ? "In Wishlist" : "Add to Wishlist"}
    </button>
  );
}
