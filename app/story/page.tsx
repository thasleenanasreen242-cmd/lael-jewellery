import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | LAEL Jewellery",
  description: "Discover the story behind LAEL Jewellery. Timeless anti-tarnish pieces made for the moments that become everyday memories.",
};

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      <header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link>
          <Link href="/shop" className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 transition hover:text-[#75695B]">SHOP</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">THE LAEL STORY</p>
          <h1 className="mb-8 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.06em]">
            Jewellery made for the life you actually live.
          </h1>
          <p className="mb-12 text-lg leading-8 text-[#4d443d]">
            LAEL was born from a simple observation: the jewellery women reach for most is the jewellery that feels effortless. Not the pieces saved for special occasions. Not the ones that require constant care and attention.
          </p>

          <div className="my-16 space-y-10 text-lg leading-8 text-[#4d443d]">
            <p>
              We started by asking the right questions. What makes a piece feel beautiful? What makes it stay beautiful? How do you design something that belongs in everyday life without feeling ordinary?
            </p>

            <p>
              The answer wasn&apos;t in chasing trends. It was in understanding that luxury isn&apos;t about rarity or price. True luxury is simplicity. It&apos;s the piece that makes you feel like yourself.
            </p>

            <p>
              Every LAEL piece is designed with anti-tarnish finishes and mindful materials. We chose gold vermeil, champagne finishes, and stainless steel&mdash;not because they&apos;re trendy, but because they work. They last. They stay beautiful.
            </p>

            <p>
              We believe in quiet confidence. In jewellery that doesn&apos;t demand attention but deserves it. In earrings that feel light enough for a work meeting and polished enough for dinner. In necklaces that layer beautifully and bracelets that slip from day to evening without a second thought.
            </p>
          </div>

          <div className="my-20 rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-8 sm:p-10">
            <p className="text-center font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-[-0.04em]">
              &ldquo;Jewellery that stays beautiful is jewellery that stays with you.&rdquo;
            </p>
            <p className="mt-6 text-center text-[0.7rem] uppercase tracking-[0.26em] text-[#75695B]">&mdash; LAEL Founding Principle</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.04em]">The LAEL Promise</h2>
            <ul className="space-y-3 text-lg text-[#4d443d]">
              <li className="flex gap-4">
                <span className="text-[#B79A6A] font-bold">✦</span>
                <span><strong>Anti-tarnish design:</strong> Crafted to keep its shine through everyday wear.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#B79A6A] font-bold">✦</span>
                <span><strong>Mindful materials:</strong> Premium finishes chosen for durability and beauty.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#B79A6A] font-bold">✦</span>
                <span><strong>Everyday elegance:</strong> Pieces designed to belong in your daily life.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#B79A6A] font-bold">✦</span>
                <span><strong>Timeless style:</strong> Designs that transcend fleeting trends.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#EFE5D6] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 text-center">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">Ready to find your piece?</p>
          <Link
            href="/shop"
            className="inline-block rounded-full border border-[#29251F] px-10 py-4 font-medium uppercase tracking-[0.2em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]"
          >
            Shop the collection
          </Link>
        </div>
      </section>
    </main>
  );
}
