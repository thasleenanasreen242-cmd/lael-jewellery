import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { JsonLdClient } from "@/components/JsonLdClient";
import { generateArticleSchema } from "@/lib/schema";

interface ArticleBlock { type: "paragraph" | "heading"; text: string; }
interface Article { title: string; date: string; category: string; readTime: string; content: ArticleBlock[]; seo: string; }

const locationIntro = "LAEL Jewellery is an India-focused jewellery brand for women who want elegant, everyday pieces with an anti-tarnish finish. We deliver across India, including Kerala, and design our collections to fit modern Indian wardrobes, workdays, celebrations and everyday moments.";

const articles: Record<string, Article> = {
  "how-to-layer-necklaces": {
    title: "How to Layer Necklaces Without Overdoing It", date: "December 2024", category: "STYLING", readTime: "5 min read",
    seo: "Learn how to layer necklaces for everyday Indian style, including tips for workwear, sarees, casual outfits and Kerala occasions.",
    content: [
      {type:"paragraph",text:locationIntro},
      {type:"paragraph",text:"Layering necklaces is an easy way to add depth to an outfit without making it feel over-styled. For Indian wardrobes, layered necklaces work with shirts, dresses, kurtas, sarees and occasion wear when the lengths and proportions are balanced."},
      {type:"heading",text:"Start With Different Lengths"},
      {type:"paragraph",text:"Begin with two necklaces at clearly different lengths. A shorter chain can sit close to the neckline while a longer pendant creates a second visual layer. Adding a third piece is optional; leave enough space between each necklace so every piece can be seen."},
      {type:"heading",text:"Layer Jewellery for Indian Outfits"},
      {type:"paragraph",text:"For a saree or kurta, keep one necklace delicate and let a second piece provide the focal point. For Western workwear, two fine chains can create a polished everyday look. In Kerala, where traditional and contemporary dressing often mix, understated layers work particularly well for family events, dinners and festive occasions."},
      {type:"heading",text:"Choose a Cohesive Finish"},
      {type:"paragraph",text:"Matching finishes create an especially refined look. You can also mix tones intentionally, but repeat one visual detail—such as a similar chain texture, pendant shape or scale—to make the combination feel connected."},
      {type:"heading",text:"Keep It Comfortable"},
      {type:"paragraph",text:"Your jewellery should move naturally with you. Check that chains do not catch on clothing and store each LAEL piece separately after wear. Explore the LAEL collection for everyday anti-tarnish jewellery delivered across India."}
    ]
  },
  "anti-tarnish-jewellery-care": {
    title: "How to Care for Anti-Tarnish Jewellery", date: "November 2024", category: "CARE", readTime: "4 min read",
    seo: "A practical guide to caring for anti-tarnish jewellery in India, including humidity, monsoon weather, perfume, sweat and storage tips.",
    content: [
      {type:"paragraph",text:locationIntro},
      {type:"paragraph",text:"Anti-tarnish jewellery is designed to make everyday wear easier, but good care still matters. India's heat, humidity and monsoon conditions can expose jewellery to moisture, sweat and cosmetic products, so a simple care routine helps preserve its finish."},
      {type:"heading",text:"Wipe Jewellery After Wearing"},
      {type:"paragraph",text:"Gently wipe your jewellery with a clean, soft cloth after use. This removes moisture, body oils and residue before you store the piece."},
      {type:"heading",text:"Keep Jewellery Away From Water"},
      {type:"paragraph",text:"Remove jewellery before showering, swimming, exercising or doing household tasks involving water. Extra care is useful during Kerala's humid and monsoon seasons, when moisture can remain on jewellery for longer."},
      {type:"heading",text:"Perfume and Skincare"},
      {type:"paragraph",text:"Apply perfume, sunscreen, lotion and hair products before putting on jewellery. Allow products to dry before wearing your pieces. This simple habit helps reduce unnecessary exposure to chemicals."},
      {type:"heading",text:"Store Pieces in a Dry Place"},
      {type:"paragraph",text:"Store each piece in its pouch or a clean jewellery box. Avoid bathrooms and other humid locations. Keep necklaces separated to prevent tangling and scratches."},
      {type:"paragraph",text:"With sensible everyday care, LAEL anti-tarnish jewellery can remain part of your wardrobe for work, travel, celebrations and daily styling across India."}
    ]
  },
  "build-everyday-collection": {
    title: "How to Build an Everyday Jewellery Collection", date: "October 2024", category: "STYLING", readTime: "6 min read",
    seo: "Build a versatile everyday jewellery collection with anti-tarnish rings, earrings, necklaces and bracelets for Indian women.",
    content: [
      {type:"paragraph",text:locationIntro},
      {type:"paragraph",text:"A useful jewellery collection does not need dozens of pieces. Start with versatile designs that work across office outfits, casual days, family gatherings, travel and celebrations."},
      {type:"heading",text:"1. Everyday Earrings"},
      {type:"paragraph",text:"Choose studs, small hoops or understated drop earrings that work with kurtas, shirts, dresses and sarees. A reliable everyday pair can become one of the most-worn pieces in your collection."},
      {type:"heading",text:"2. A Versatile Necklace"},
      {type:"paragraph",text:"Choose a necklace that can be worn alone and layered when you want more impact. Delicate chains are particularly easy to style across Indian and Western outfits."},
      {type:"heading",text:"3. Rings for Easy Styling"},
      {type:"paragraph",text:"A simple ring can add polish without changing your whole look. Choose one comfortable everyday ring first, then add stackable styles as your collection grows."},
      {type:"heading",text:"4. A Bracelet or Cuff"},
      {type:"paragraph",text:"A bracelet adds detail to short sleeves, workwear and occasion outfits. Keep one minimal option for everyday use and introduce a statement style later."},
      {type:"heading",text:"Quality Over Quantity"},
      {type:"paragraph",text:"Build slowly around pieces you genuinely wear. LAEL focuses on timeless anti-tarnish jewellery for everyday styling, with delivery available across India, including Kerala."}
    ]
  },
  "essentials-every-woman": {
    title: "Jewellery Essentials Every Woman Should Own", date: "September 2024", category: "CURATED", readTime: "5 min read",
    seo: "Discover five jewellery essentials for women in India, from everyday earrings and necklaces to rings and bracelets.",
    content: [
      {type:"paragraph",text:locationIntro},
      {type:"heading",text:"1. An Everyday Necklace"},
      {type:"paragraph",text:"Choose a delicate chain or pendant that works with both traditional and contemporary clothing. It can be worn with a kurta for work or layered with a saree blouse for a more styled look."},
      {type:"heading",text:"2. Classic Hoops or Studs"},
      {type:"paragraph",text:"A dependable pair of earrings can take you from office mornings to dinners and celebrations. Choose a proportion that feels comfortable for long days."},
      {type:"heading",text:"3. A Stackable Ring"},
      {type:"paragraph",text:"A simple ring is easy to wear alone and easy to combine with other pieces. Look for a design that complements your existing jewellery."},
      {type:"heading",text:"4. A Delicate Bracelet"},
      {type:"paragraph",text:"A bracelet adds a subtle finishing touch without competing with your outfit. It is especially useful for minimalist everyday styling."},
      {type:"heading",text:"5. One Statement Piece"},
      {type:"paragraph",text:"Keep one bolder piece for celebrations, dinners and festive occasions. The best statement jewellery still feels like you rather than a costume."},
      {type:"paragraph",text:"Explore LAEL anti-tarnish jewellery online and build a collection suited to everyday life in India, from Kerala to cities and towns across the country."}
    ]
  },
  "choose-jewellery-for-style": {
    title: "How to Choose Jewellery for Your Style", date: "August 2024", category: "GUIDE", readTime: "7 min read",
    seo: "Learn how to choose jewellery based on personal style, lifestyle, outfits and everyday needs in India.",
    content: [
      {type:"paragraph",text:locationIntro},
      {type:"heading",text:"Define Your Jewellery Style"},
      {type:"paragraph",text:"Minimalist, classic, romantic and bold are useful starting points. If your wardrobe is simple, delicate jewellery can add interest. If you love statement clothing, choose jewellery that complements rather than competes."},
      {type:"heading",text:"Think About Your Lifestyle"},
      {type:"paragraph",text:"Consider how you spend your day. Office wear may call for understated pieces, while weddings, festivals and celebrations give you room for more expressive designs. If you travel frequently, prioritize lightweight, versatile jewellery."},
      {type:"heading",text:"Style Jewellery With Indian Clothing"},
      {type:"paragraph",text:"Jewellery can be adapted to sarees, salwar suits, kurtas, abayas, dresses and Western workwear. Match the scale of the jewellery to the neckline, fabric and overall silhouette rather than following a fixed rule."},
      {type:"heading",text:"Choose Pieces You Will Actually Wear"},
      {type:"paragraph",text:"The best jewellery is jewellery that fits naturally into your routine. Choose comfortable pieces, easy-to-style finishes and designs you can imagine wearing repeatedly."},
      {type:"paragraph",text:"LAEL's anti-tarnish jewellery collection is designed around everyday elegance and is available for delivery across India, including Kerala."}
    ]
  },
  "jewellery-gift-guide": {
    title: "The Complete Jewellery Gift Guide", date: "July 2024", category: "GUIDE", readTime: "6 min read",
    seo: "A jewellery gift guide for birthdays, anniversaries, weddings and celebrations in India, with ideas for different personal styles.",
    content: [
      {type:"paragraph",text:locationIntro},
      {type:"paragraph",text:"Jewellery makes a meaningful gift because it can become part of someone's everyday routine. When choosing a gift, think about her personal style, the jewellery she already wears and the occasions she enjoys."},
      {type:"heading",text:"For the Minimalist"},
      {type:"paragraph",text:"Choose a delicate necklace, simple studs, small hoops or a clean ring. These styles are easy to wear with workwear and everyday outfits."},
      {type:"heading",text:"For Someone Who Loves Indian Fashion"},
      {type:"paragraph",text:"Consider jewellery that can move between sarees, kurtas, festive outfits and contemporary clothing. A versatile necklace or elegant earrings can work across several occasions."},
      {type:"heading",text:"For Birthdays and Anniversaries"},
      {type:"paragraph",text:"Choose something connected to her style rather than simply choosing the biggest piece. A timeless ring, necklace or bracelet can become a personal everyday favourite."},
      {type:"heading",text:"For Weddings and Festive Gifting"},
      {type:"paragraph",text:"Look for pieces that feel special while remaining wearable after the event. This is especially useful for gifts during Indian wedding seasons, Eid, Onam, Diwali and other celebrations."},
      {type:"heading",text:"Gift With Confidence Across India"},
      {type:"paragraph",text:"LAEL jewellery is available online with delivery across India, including Kerala. Before ordering, check the current product details, delivery information and care guidance on the website."}
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article) return { title: "Article Not Found | LAEL Jewellery" };
  return { title: `${article.title} | LAEL Jewellery`, description: article.seo, keywords: ["LAEL Jewellery", "anti-tarnish jewellery", "jewellery India", "jewellery Kerala", "online jewellery India", "everyday jewellery"], alternates: { canonical: `https://lael-jewellery.vercel.app/journal/${params.slug}` }, openGraph: { title: `${article.title} | LAEL Jewellery`, description: article.seo, type: "article", url: `https://lael-jewellery.vercel.app/journal/${params.slug}` } };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) notFound();
  return <>
    <JsonLdClient schema={generateArticleSchema({title: article.title,date: article.date,slug: params.slug})} />
    <main className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      <header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10"><Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link><Link href="/journal" className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 transition hover:text-[#75695B]">← Back to Journal</Link></nav></header>
      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-10"><header className="mb-12"><div className="mb-6 flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.24em] text-[#75695B]"><span>{article.category}</span><span>{article.readTime}</span></div><h1 className="mb-6 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.05em]">{article.title}</h1><p className="text-[0.7rem] uppercase tracking-[0.24em] text-[#75695B]">{article.date}</p></header>
        <div className="prose-custom space-y-6">{article.content.map((block,idx)=>block.type==="paragraph"?<p key={idx} className="text-lg leading-8 text-[#4d443d]">{block.text}</p>:<h2 key={idx} className="mt-8 mb-4 font-serif text-2xl leading-tight tracking-[-0.03em]">{block.text}</h2>)}</div>
        <div className="mt-16 rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-8 text-center"><p className="mb-6 text-lg text-[#4d443d]">Discover LAEL anti-tarnish jewellery, delivered across India.</p><Link href="/shop" className="inline-block rounded-full border border-[#29251F] px-10 py-4 font-medium uppercase tracking-[0.2em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]">Shop LAEL</Link></div>
      </article>
    </main>
  </>;
}
