"use client";

import { useWishlist } from "@/lib/store";
import { products } from "@/data/products";

export function WishlistButton({
  productSlug,
  productName,
  price,
  image,
}: {
  productSlug: string;
  productName?: string;
  price?: number;
  image?: string;
}) {
  const { contains, toggleItem, isHydrated } = useWishlist();

  if (!isHydrated) return null;

  const product = products.find((item) => item.slug === productSlug);
  const name = productName ?? product?.name ?? productSlug;
  const amount = price ?? product?.price ?? 0;
  const productImage = image ?? product?.image ?? "/images/product-ring.svg";
  const isFavorited = contains(productSlug);

  return (
    <button
      type="button"
      onClick={() => toggleItem({ productSlug, productName: name, price: amount, image: productImage })}
      className="flex w-full items-center justify-center rounded-full border border-[#29251F]/20 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition hover:bg-[#EFE5D6]"
      aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isFavorited}
    >
      <span className="mr-2" aria-hidden="true">{isFavorited ? "♥" : "♡"}</span>
      {isFavorited ? "In Wishlist" : "Add to Wishlist"}
    </button>
  );
}
