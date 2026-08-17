"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";

interface SearchResult {
  type: "product" | "category" | "article" | "page";
  title: string;
  href: string;
  description?: string;
}

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    const foundResults: SearchResult[] = [];

    // Search products
    products.forEach((product) => {
      if (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.style.toLowerCase().includes(searchTerm)
      ) {
        foundResults.push({
          type: "product",
          title: product.name,
          href: `/shop/${product.slug}`,
          description: product.shortDescription,
        });
      }
    });

    // Search pages
    const pages: SearchResult[] = [
      { type: "page", title: "Our Story", href: "/story", description: "Learn about LAEL" },
      { type: "page", title: "Journal", href: "/journal", description: "Read articles" },
      { type: "page", title: "Care Guide", href: "/care", description: "How to care for your jewellery" },
      { type: "page", title: "Find Your Style", href: "/find-your-style", description: "Take the style quiz" },
    ];

    pages.forEach((page) => {
      if (
        page.title.toLowerCase().includes(searchTerm) ||
        page.description?.toLowerCase().includes(searchTerm)
      ) {
        foundResults.push(page);
      }
    });

    return foundResults.slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#29251F]/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto max-w-3xl px-5 pt-8"
          >
            <div className="rounded-2xl border border-[#29251F]/20 bg-[#FFFDF8] shadow-2xl">
              <div className="flex items-center gap-4 border-b border-[#29251F]/10 p-6">
                <span className="text-2xl text-[#B79A6A]">🔍</span>
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, articles, pages..."
                  className="flex-1 bg-transparent text-lg outline-none text-[#29251F] placeholder-[#75695B]"
                />
                <button
                  onClick={onClose}
                  className="text-[#75695B] hover:text-[#29251F] text-2xl transition"
                >
                  ✕
                </button>
              </div>

              {results.length > 0 && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {results.map((result, idx) => (
                    <Link
                      key={`${result.type}-${idx}`}
                      href={result.href}
                      onClick={onClose}
                      className="border-b border-[#29251F]/5 px-6 py-4 transition hover:bg-[#F7F1E8] block"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm uppercase tracking-[0.15em] text-[#B79A6A] font-medium mb-1">
                            {result.type}
                          </p>
                          <p className="font-medium text-[#29251F]">{result.title}</p>
                          {result.description && (
                            <p className="mt-1 text-sm text-[#75695B]">{result.description}</p>
                          )}
                        </div>
                        <span className="text-[#75695B] text-lg">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-[#75695B] mb-2">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-sm text-[#75695B]">Try searching for products or articles</p>
                </div>
              )}

              {!query && (
                <div className="p-6 space-y-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#75695B] font-medium">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["Necklaces", "Earrings", "Anti-tarnish", "Care guide", "Style quiz"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-[#29251F]/10 bg-[#F7F1E8] px-4 py-2 text-sm text-[#29251F] transition hover:bg-[#EFE5D6]"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
