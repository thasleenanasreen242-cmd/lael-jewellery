"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/lib/store";
import { WishlistButton } from "@/components/WishlistButton";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const { addItem, isHydrated } = useCart();

  const categories = ["ALL", "NECKLACES", "EARRINGS", "BRACELETS", "RINGS", "SETS"] as const;

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory !== "ALL") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    const sorted = [...result];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [selectedCategory, sortBy]);

  if (!isHydrated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F7F1E8] px-5 py-20 text-[#29251F] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#75695B]">Shop</p>
              <h1 className="font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.9] tracking-[-0.06em]">Curated for daily elegance.</h1>
            </div>
            <div className="text-sm text-[#75695B]">{filtered.length} pieces</div>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#75695B]">Category</p>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em] transition ${
                      selectedCategory === category
                        ? "border-[#29251F] bg-[#29251F] text-[#F7F1E8]"
                        : "border border-[#29251F]/20 bg-[#FFFDF8] text-[#75695B] hover:border-[#29251F]/40"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#75695B]">Sort by</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as SortOption)}
                    className={`rounded-full px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em] transition ${
                      sortBy === option.value
                        ? "border-[#29251F] bg-[#29251F] text-[#F7F1E8]"
                        : "border border-[#29251F]/20 bg-[#FFFDF8] text-[#75695B] hover:border-[#29251F]/40"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] shadow-[0_18px_40px_rgba(58,47,41,0.04)]"
            >
              <Link href={`/shop/${product.slug}`} className="block overflow-hidden">
                <div className="overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={640}
                    height={820}
                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </Link>

              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[0.62rem] uppercase tracking-[0.26em] text-[#75695B]">{product.category}</span>
                  <span className="rounded-full bg-[#EFE5D6] px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.18em] text-[#29251F]">{product.badge}</span>
                </div>

                <Link href={`/shop/${product.slug}`}>
                  <h2 className="text-2xl font-medium leading-tight transition hover:text-[#75695B]">{product.name}</h2>
                  <p className="mt-2 text-base leading-7 text-[#4d443d]">{product.shortDescription}</p>
                </Link>

                <div className="flex items-center justify-between gap-4 border-t border-[#29251F]/10 pt-4">
                  <p className="text-xl font-medium">${product.price}</p>
                  <button
                    onClick={() =>
                      addItem({
                        productSlug: product.slug,
                        productName: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    className="rounded-full bg-[#29251F] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#F7F1E8] transition hover:bg-[#3d3530]"
                  >
                    + Add
                  </button>
                </div>

                <WishlistButton productSlug={product.slug} />
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#75695B]">No pieces found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
