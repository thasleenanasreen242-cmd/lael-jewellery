"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/store";
import { JsonLdClient } from "@/components/JsonLdClient";
import { generateProductSchema } from "@/lib/schema";

type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  badge?: string;
  description: string;
  material: string;
  size: string;
  care: string;
  gallery: string[];
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, isHydrated } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!isHydrated) return null;

  const handleAddToCart = () => {
    addItem({ productSlug: product.slug, productName: product.name, price: product.price, image: product.gallery[0] });
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappLink = buildWhatsAppLink(`Hi LAEL 👋 I'm interested in ${product.name}. Can you tell me more?`);

  return (
    <>
      <JsonLdClient schema={generateProductSchema(product)} />
      <main className="min-h-screen bg-[#F7F1E8] px-5 py-12 text-[#29251F] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/shop" className="mb-8 inline-block text-[0.68rem] uppercase tracking-[0.24em] text-[#75695B] hover:text-[#29251F]">← Back to shop</Link>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8]">
                <Image src={product.gallery[0]} alt={product.name} width={1000} height={1200} priority className="h-[520px] w-full object-cover transition duration-700 hover:scale-[1.025] sm:h-[640px]" />
              </motion.div>
              <div className="grid grid-cols-3 gap-3">
                {product.gallery.slice(0, 3).map((image) => (
                  <div key={image} className="overflow-hidden rounded-[1.25rem] border border-[#29251F]/10 bg-[#FFFDF8]">
                    <Image src={image} alt={`${product.name} detail`} width={420} height={520} className="h-32 w-full object-cover sm:h-44" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 lg:sticky lg:top-24">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#75695B]">{product.category}</p>
                <h1 className="mt-3 font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.9] tracking-[-0.06em]">{product.name}</h1>
              </div>
              <div className="flex items-center justify-between gap-4 border-y border-[#29251F]/10 py-5">
                <p className="text-3xl font-medium">₹{product.price.toLocaleString("en-IN")}</p>
                {product.badge && <span className="rounded-full bg-[#EFE5D6] px-3 py-2 text-[0.58rem] uppercase tracking-[0.22em]">{product.badge}</span>}
              </div>
              <p className="text-lg leading-8 text-[#4d443d]">{product.description}</p>
              <div className="space-y-5 rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-6">
                <Info label="Material" value={product.material} />
                <Info label="Size" value={product.size} />
                <Info label="Care" value={product.care} />
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.button onClick={handleAddToCart} whileTap={{ scale: 0.97 }} className="rounded-full bg-[#29251F] px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#FFFDF8]">
                  {isAdded ? "✓ Added to Bag" : "Add to Bag"}
                </motion.button>
                <a href={whatsappLink === "#" ? undefined : whatsappLink} target="_blank" rel="noopener noreferrer" aria-disabled={whatsappLink === "#"} className="rounded-full border border-[#29251F]/15 bg-[#EFE5D6] px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] hover:bg-[#E8DCCB]">Ask on WhatsApp</a>
              </div>
              <div className="grid gap-5 border-t border-[#29251F]/10 pt-6 text-sm leading-7 text-[#4d443d]">
                <div><strong className="text-[#29251F]">Shipping:</strong> See our shipping policy for current delivery details.</div>
                <div><strong className="text-[#29251F]">Returns:</strong> See our returns policy for current eligibility.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 text-[0.6rem] uppercase tracking-[0.22em] text-[#75695B]"><span>{label}</span><span className="text-right text-[#29251F]">{value}</span></div>;
}
