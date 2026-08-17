"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/store";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  const { addItem, isHydrated } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    notFound();
  }

  if (!isHydrated) {
    return null;
  }

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      productName: product.name,
      price: product.price,
      image: product.gallery[0],
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const addToCartMessage = `Hi LAEL, I&apos;m interested in ${product.name}. Can you tell me more?`;

  return (
    <main className="min-h-screen bg-[#F7F1E8] px-5 py-12 text-[#29251F] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/shop" className="mb-8 inline-block text-[0.68rem] uppercase tracking-[0.24em] text-[#75695B]">← Back to shop</Link>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8]">
              <Image src={product.gallery[0]} alt={product.name} width={1000} height={1200} className="h-[640px] w-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((image) => (
                <div key={image} className="overflow-hidden rounded-[1.5rem] border border-[#29251F]/10 bg-[#FFFDF8]">
                  <Image src={image} alt={`${product.name} detail`} width={420} height={520} className="h-[180px] w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#75695B]">{product.category}</p>
              <h1 className="mt-3 font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.9] tracking-[-0.06em]">{product.name}</h1>
            </div>

            <div className="flex items-center justify-between gap-4 border-y border-[#29251F]/10 py-5">
              <p className="text-3xl font-medium">${product.price}</p>
              <span className="rounded-full bg-[#EFE5D6] px-3 py-2 text-[0.58rem] uppercase tracking-[0.22em] text-[#29251F]">{product.badge}</span>
            </div>

            <p className="text-lg leading-8 text-[#4d443d]">{product.description}</p>

            <div className="space-y-5 rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-6">
              <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em] text-[#75695B]">
                <span>Material</span>
                <span className="text-right text-[#29251F]">{product.material}</span>
              </div>
              <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em] text-[#75695B]">
                <span>Size</span>
                <span className="text-right text-[#29251F]">{product.size}</span>
              </div>
              <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em] text-[#75695B]">
                <span>Care</span>
                <span className="text-right text-[#29251F]">{product.care}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={handleAddToCart}
                animate={{
                  backgroundColor: isAdded ? "#25D366" : "#1D1A17",
                }}
                className="rounded-full px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#FFFDF8] transition"
              >
                {isAdded ? "✓ Added to Bag" : "Add to Bag"}
              </motion.button>
              <button className="rounded-full border border-[#29251F]/15 bg-[#FFFDF8] px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#29251F] hover:bg-[#EFE5D6] transition">Buy Now</button>
              <a href={buildWhatsAppLink(addToCartMessage)} target="_blank" rel="noreferrer" className="rounded-full border border-[#1D1A17]/15 bg-[#EFE5D6] px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#29251F] hover:bg-[#E8DCCB] transition">Ask on WhatsApp</a>
            </div>

            <div className="grid gap-5 border-t border-[#29251F]/10 pt-6 text-sm leading-7 text-[#4d443d]">
              <div><strong className="text-[#29251F]">Shipping:</strong> Free delivery on orders over $150.</div>
              <div><strong className="text-[#29251F]">Returns:</strong> Easy 30-day returns on unworn pieces.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
