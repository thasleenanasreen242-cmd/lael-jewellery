import Link from "next/link";
import { formatPrice, products } from "@/data/products";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#29251F] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-end justify-between gap-6 border-b border-[#29251F]/10 pb-8">
          <div>
            <Link href="/" className="text-[0.68rem] uppercase tracking-[0.28em] text-[#75695B]">← LAEL</Link>
            <p className="mt-8 text-[0.7rem] uppercase tracking-[0.34em] text-[#75695B]">The collection</p>
            <h1 className="mt-3 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.07em]">SHOP JEWELLERY.</h1>
          </div>
          <p className="hidden max-w-sm text-sm leading-7 text-[#4d443d] md:block">Anti-tarnish pieces designed for everyday rituals, quiet statements, and everything in between.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#75695B]">
          {['All', 'Earrings', 'Necklaces', 'Rings', 'Bracelets', 'Sets'].map((category) => (
            <span key={category} className="rounded-full border border-[#29251F]/10 bg-[#FFFDF8] px-4 py-2">{category}</span>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.slug} href={`/shop/${product.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] transition hover:-translate-y-1">
              <div className="overflow-hidden bg-[#EFE5D6]">
                <img src={product.image} alt={product.name} className="h-[440px] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="p-6">
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#75695B]">{product.category}</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <h2 className="font-serif text-2xl tracking-[-0.03em]">{product.name}</h2>
                  <span className="text-sm text-[#75695B]">{formatPrice(product.price)}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#4d443d]">{product.description}</p>
                <span className="mt-5 inline-block text-[0.65rem] uppercase tracking-[0.24em]">View piece →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
