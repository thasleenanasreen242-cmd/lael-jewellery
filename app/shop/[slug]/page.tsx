import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#29251F] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/shop" className="text-[0.68rem] uppercase tracking-[0.28em] text-[#75695B]">← Back to collection</Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#EFE5D6]">
            <img src={product.image} alt={product.name} className="min-h-[520px] w-full object-cover lg:min-h-[700px]" />
          </div>

          <div className="lg:sticky lg:top-10">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#75695B]">{product.category}</p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.07em]">{product.name}</h1>
            <p className="mt-6 text-xl text-[#75695B]">{formatPrice(product.price)}</p>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#4d443d]">{product.description}</p>

            <button className="mt-8 w-full rounded-full bg-[#1D1A17] px-7 py-4 text-[0.7rem] uppercase tracking-[0.26em] text-[#FFFDF8] transition hover:bg-[#75695B]">
              ADD TO BAG
            </button>
            <button className="mt-3 w-full rounded-full border border-[#29251F]/15 bg-[#FFFDF8]/60 px-7 py-4 text-[0.7rem] uppercase tracking-[0.26em] transition hover:bg-[#FFFDF8]">
              ♡ ADD TO WISHLIST
            </button>

            <div className="mt-10 divide-y divide-[#29251F]/10 border-y border-[#29251F]/10">
              <div className="py-5"><p className="text-[0.65rem] uppercase tracking-[0.26em] text-[#75695B]">Material</p><p className="mt-2 text-sm">{product.material}</p></div>
              <div className="py-5"><p className="text-[0.65rem] uppercase tracking-[0.26em] text-[#75695B]">Finish</p><p className="mt-2 text-sm">{product.finish}</p></div>
              <div className="py-5"><p className="text-[0.65rem] uppercase tracking-[0.26em] text-[#75695B]">Care</p><p className="mt-2 text-sm leading-6">{product.care}</p></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
