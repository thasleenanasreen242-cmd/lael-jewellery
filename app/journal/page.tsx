import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jewellery Journal India | LAEL Jewellery",
  description: "LAEL Journal: jewellery styling, anti-tarnish jewellery care, gifting and everyday jewellery guides for women in India, including Kerala.",
  keywords: ["jewellery India", "jewellery Kerala", "anti-tarnish jewellery India", "jewellery styling", "everyday jewellery"],
  alternates: { canonical: "https://lael-jewellery.vercel.app/journal" },
  openGraph: { title: "Jewellery Journal India | LAEL Jewellery", description: "Jewellery styling, care and gifting guides for women across India and Kerala.", url: "https://lael-jewellery.vercel.app/journal", type: "website" },
};

const journalArticles = [
  {slug:"how-to-layer-necklaces",title:"How to Layer Necklaces Without Overdoing It",excerpt:"Learn how to layer necklaces for workwear, casual outfits, sarees, kurtas and everyday Indian style.",date:"December 2024",readTime:"5 min read",category:"STYLING"},
  {slug:"anti-tarnish-jewellery-care",title:"How to Care for Anti-Tarnish Jewellery",excerpt:"Simple jewellery care tips for India's heat, humidity and monsoon weather, including Kerala.",date:"November 2024",readTime:"4 min read",category:"CARE"},
  {slug:"build-everyday-collection",title:"How to Build an Everyday Jewellery Collection",excerpt:"Build a versatile collection of rings, earrings, necklaces and bracelets for modern Indian wardrobes.",date:"October 2024",readTime:"6 min read",category:"STYLING"},
  {slug:"essentials-every-woman",title:"Jewellery Essentials Every Woman Should Own",excerpt:"Five timeless jewellery essentials for everyday wear, work, celebrations and Indian occasions.",date:"September 2024",readTime:"5 min read",category:"CURATED"},
  {slug:"choose-jewellery-for-style",title:"How to Choose Jewellery for Your Style",excerpt:"Find jewellery that suits your personal style, lifestyle, wardrobe and everyday needs in India.",date:"August 2024",readTime:"7 min read",category:"GUIDE"},
  {slug:"jewellery-gift-guide",title:"The Complete Jewellery Gift Guide",excerpt:"Jewellery gift ideas for birthdays, anniversaries, weddings, festivals and celebrations across India.",date:"July 2024",readTime:"6 min read",category:"GUIDE"},
];

export default function JournalPage() {
  return <main className="min-h-screen bg-[#F7F1E8] text-[#29251F]"><header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10"><Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link><Link href="/shop" className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 transition hover:text-[#75695B]">SHOP</Link></nav></header>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10"><div className="mb-16 max-w-3xl"><p className="mb-6 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">The LAEL Journal</p><h1 className="mb-8 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.06em]">Stories and insights.</h1><p className="text-lg leading-8 text-[#4d443d]">Jewellery styling, anti-tarnish care, gifting and everyday inspiration for women across India, with guidance especially useful for Kerala's climate and modern Indian wardrobes.</p></div>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-12">{journalArticles.map(article=><Link key={article.slug} href={`/journal/${article.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] shadow-sm transition hover:shadow-md"><div className="space-y-6 p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[#75695B]">{article.category}</span><span className="text-[0.62rem] uppercase tracking-[0.24em] text-[#75695B]">{article.readTime}</span></div><div><h2 className="mb-3 font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-tight tracking-[-0.03em] transition group-hover:text-[#75695B]">{article.title}</h2><p className="leading-7 text-[#4d443d]">{article.excerpt}</p></div><div className="flex items-center justify-between border-t border-[#29251F]/10 pt-4"><span className="text-[0.62rem] uppercase tracking-[0.24em] text-[#75695B]">{article.date}</span><span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#29251F] group-hover:text-[#B79A6A]">Read →</span></div></div></Link>)}</div>
    </section><section className="mt-20 bg-[#EFE5D6] py-20"><div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10"><p className="mb-4 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">LAEL Jewellery — India</p><p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[#4d443d]">Shop anti-tarnish jewellery online with delivery across India, including Kerala. Discover rings, earrings, necklaces and bracelets designed for everyday elegance.</p><Link href="/shop" className="inline-block rounded-full border border-[#29251F] px-10 py-4 font-medium uppercase tracking-[0.2em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]">Shop now</Link></div></section>
  </main>;
}
