"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist, useCart } from "@/lib/store";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { items, removeItem, isHydrated } = useWishlist();
  const { addItem } = useCart();

  if (!isHydrated) return null;

  return (
    <main className="min-h-screen bg-[#F7F1E8] px-5 py-20 text-[#29251F] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-[#75695B]">Saved pieces</p>
            <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.88] tracking-[-0.06em]">YOUR WISHLIST</h1>
          </div>
          <span className="text-sm text-[#75695B]">{items.length} {items.length === 1 ? "piece" : "pieces"}</span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] px-6 py-20 text-center">
            <p className="font-serif text-3xl">Nothing saved yet.</p>
            <p className="mx-auto mt-3 max-w-md text-[#75695B]">Save pieces you love and come back to them whenever you are ready.</p>
            <Link href="/shop" className="mt-7 inline-flex rounded-full bg-[#29251F] px-7 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white">Explore jewellery</Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const product = products.find((p) => p.slug === item.productSlug);
              const image = product?.image || item.image;
              return (
                <article key={item.productSlug} className="overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8]">
                  <Link href={`/shop/${item.productSlug}`} className="block overflow-hidden bg-[#EFE5D6]">
                    <Image src={image} alt={item.productName} width={640} height={820} className="h-[420px] w-full object-cover transition duration-700 hover:scale-[1.035]" />
                  </Link>
                  <div className="p-6">
                    <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[#75695B]">{product?.category || "LAEL"}</p>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <Link href={`/shop/${item.productSlug}`} className="text-xl font-medium hover:text-[#75695B]">{item.productName}</Link>
                      <span>${item.price}</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => { addItem({ productSlug: item.productSlug, productName: item.productName, price: item.price, image }); removeItem(item.productSlug); }} className="rounded-full bg-[#29251F] px-4 py-3 text-[0.6rem] uppercase tracking-[0.18em] text-white">Add to bag</button>
                      <button type="button" onClick={() => removeItem(item.productSlug)} className="rounded-full border border-[#29251F]/15 px-4 py-3 text-[0.6rem] uppercase tracking-[0.18em]">Remove</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
