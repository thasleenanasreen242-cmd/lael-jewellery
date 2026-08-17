import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | LAEL Jewellery",
  description: "Read our journal for insights on jewellery styling, care, and the LAEL philosophy.",
};

const journalArticles = [
  {
    slug: "how-to-layer-necklaces",
    title: "How to Layer Necklaces Without Overdoing It",
    excerpt: "Layering is an art. Learn the principles of proportions, metals, and style to create effortless, elegant combinations.",
    date: "December 2024",
    readTime: "5 min read",
    category: "STYLING",
  },
  {
    slug: "anti-tarnish-jewellery-care",
    title: "How to Care for Anti-Tarnish Jewellery",
    excerpt: "Our guide to keeping your LAEL pieces beautiful through everyday wear. Simple steps for lasting shine.",
    date: "November 2024",
    readTime: "4 min read",
    category: "CARE",
  },
  {
    slug: "build-everyday-collection",
    title: "How to Build an Everyday Jewellery Collection",
    excerpt: "Start with these essential pieces and build a versatile collection that works for every moment of your day.",
    date: "October 2024",
    readTime: "6 min read",
    category: "STYLING",
  },
  {
    slug: "essentials-every-woman",
    title: "Jewellery Essentials Every Woman Should Own",
    excerpt: "Timeless pieces that transcend trends. The foundation of a beautiful, functional everyday jewellery wardrobe.",
    date: "September 2024",
    readTime: "5 min read",
    category: "CURATED",
  },
  {
    slug: "choose-jewellery-for-style",
    title: "How to Choose Jewellery for Your Style",
    excerpt: "Discover your personal jewellery personality and choose pieces that reflect who you are.",
    date: "August 2024",
    readTime: "7 min read",
    category: "GUIDE",
  },
  {
    slug: "jewellery-gift-guide",
    title: "The Complete Jewellery Gift Guide",
    excerpt: "Find the perfect piece for any occasion. Our guide to thoughtful, timeless gifts.",
    date: "July 2024",
    readTime: "6 min read",
    category: "GUIDE",
  },
];

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      <header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link>
          <Link href="/shop" className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 transition hover:text-[#75695B]">SHOP</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">The LAEL Journal</p>
          <h1 className="mb-8 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.06em]">
            Stories and insights.
          </h1>
          <p className="text-lg leading-8 text-[#4d443d]">
            Thoughts on jewellery, style, and the everyday moments worth celebrating.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
          {journalArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[#75695B]">{article.category}</span>
                  <span className="text-[0.62rem] uppercase tracking-[0.24em] text-[#75695B]">{article.readTime}</span>
                </div>

                <div>
                  <h2 className="mb-3 font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-tight tracking-[-0.03em] transition group-hover:text-[#75695B]">
                    {article.title}
                  </h2>
                  <p className="leading-7 text-[#4d443d]">{article.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#29251F]/10">
                  <span className="text-[0.62rem] uppercase tracking-[0.24em] text-[#75695B]">{article.date}</span>
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#29251F] group-hover:text-[#B79A6A]">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#EFE5D6] py-20 mt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 text-center">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">Discover our collection</p>
          <Link
            href="/shop"
            className="inline-block rounded-full border border-[#29251F] px-10 py-4 font-medium uppercase tracking-[0.2em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]"
          >
            Shop now
          </Link>
        </div>
      </section>
    </main>
  );
}
