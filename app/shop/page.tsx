import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] px-5 py-20 text-[#29251F] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#75695B]">Shop</p>
            <h1 className="font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.9] tracking-[-0.06em]">Curated for daily elegance.</h1>
          </div>
          <div className="flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#75695B]">
            {['ALL', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'RINGS', 'SETS'].map((item) => (
              <span key={item} className="rounded-full border border-[#29251F]/10 bg-[#FFFDF8] px-4 py-2">{item}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link key={product.slug} href={`/shop/${product.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] shadow-[0_18px_40px_rgba(58,47,41,0.04)] transition hover:-translate-y-1">
              <div className="overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={820}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[0.62rem] uppercase tracking-[0.26em] text-[#75695B]">{product.category}</span>
                  <span className="rounded-full bg-[#EFE5D6] px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.18em] text-[#29251F]">{product.badge}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-medium leading-tight">{product.name}</h2>
                  <p className="mt-2 text-base leading-7 text-[#4d443d]">{product.shortDescription}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xl font-medium">${product.price}</p>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#29251F]">View piece →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
