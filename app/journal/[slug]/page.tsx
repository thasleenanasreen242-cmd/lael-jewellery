import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { JsonLdClient } from "@/components/JsonLdClient";
import { generateArticleSchema } from "@/lib/schema";

interface ArticleBlock {
  type: "paragraph" | "heading";
  text: string;
}

interface Article {
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: ArticleBlock[];
}

const articles: Record<string, Article> = {
  "how-to-layer-necklaces": {
    title: "How to Layer Necklaces Without Overdoing It",
    date: "December 2024",
    category: "STYLING",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Layering necklaces is an art form that can elevate your everyday style. When done right, a layered necklace look feels effortless and intentional. When done wrong, it can feel chaotic.",
      },
      {
        type: "heading",
        text: "The Principle of Proportions",
      },
      {
        type: "paragraph",
        text: "The first rule of layering is balance. Pair delicate, shorter necklaces with longer statement pieces. A choker or 16-inch pendant works beautifully with an 20-24 inch chain. This creates visual interest without overwhelming your neckline.",
      },
      {
        type: "paragraph",
        text: "Avoid layering necklaces of similar lengths. Three pieces at different heights—say 14, 18, and 22 inches—create movement and depth.",
      },
      {
        type: "heading",
        text: "Metal Harmony",
      },
      {
        type: "paragraph",
        text: "Mixing metals is not only acceptable—it's encouraged. Gold, silver, and champagne finishes work beautifully together when intentional. The key is to let one metal be the star. If you're featuring a gold pendant, keep the other layers in complementary tones or silver.",
      },
      {
        type: "heading",
        text: "Finding Your Balance",
      },
      {
        type: "paragraph",
        text: "Start with two necklaces if you're new to layering. Once you're comfortable, add a third. More than three can feel busy, but there's no hard rule—let your personal style guide you.",
      },
      {
        type: "paragraph",
        text: "The LAEL collection is specifically designed for layering. Pieces like The Aurelia Necklace pair beautifully with delicate layering chains and statement pendants. Mix and match to create combinations that feel like you.",
      },
    ],
  },
  "anti-tarnish-jewellery-care": {
    title: "How to Care for Anti-Tarnish Jewellery",
    date: "November 2024",
    category: "CARE",
    readTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "Anti-tarnish jewellery is designed to stay beautiful with minimal effort. But 'minimal' doesn't mean 'no' effort. Here's what you need to know to keep your LAEL pieces glowing.",
      },
      {
        type: "heading",
        text: "Daily Care is Simple",
      },
      {
        type: "paragraph",
        text: "After wearing, wipe your jewellery gently with the soft cloth included in your LAEL pouch. This removes oils and moisture and keeps the shine fresh. It takes 10 seconds.",
      },
      {
        type: "heading",
        text: "Storage Matters",
      },
      {
        type: "paragraph",
        text: "Keep each piece in its pouch in a dry, cool place. Humidity is the enemy of shine, so avoid storing jewellery in bathrooms. A bedroom drawer or jewellery box works perfectly.",
      },
      {
        type: "heading",
        text: "What to Avoid",
      },
      {
        type: "paragraph",
        text: "Remove jewellery before showering, swimming, or exercising. Avoid perfume, lotions, and hairspray. These everyday products accelerate tarnishing and can damage finishes.",
      },
      {
        type: "paragraph",
        text: "Our anti-tarnish finishes minimize the need for heavy polishing, but occasional gentle polishing with a soft cloth keeps pieces looking new. Harsh chemicals or aggressive scrubbing can damage the finish.",
      },
    ],
  },
  "build-everyday-collection": {
    title: "How to Build an Everyday Jewellery Collection",
    date: "October 2024",
    category: "STYLING",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "An everyday jewellery collection doesn't need to be large. It needs to be intentional. Here's how to build a versatile collection that works for every moment of your day.",
      },
      {
        type: "heading",
        text: "Start with Basics",
      },
      {
        type: "paragraph",
        text: "Every great collection starts with foundational pieces: simple earrings, a delicate necklace, a stacking ring. These are pieces you'll reach for again and again. Choose timeless designs that won't feel dated in six months.",
      },
      {
        type: "heading",
        text: "Add Layering Pieces",
      },
      {
        type: "paragraph",
        text: "Once you have basics, add pieces designed for layering. Delicate chains, stackable rings, and pendant necklaces that pair beautifully with what you already own.",
      },
      {
        type: "heading",
        text: "One Statement Piece",
      },
      {
        type: "paragraph",
        text: "A statement piece isn't a trend piece. It's a slightly bolder version of everyday elegance. A chunky cuff bracelet, a sculptural ring, or a structured necklace that feels special but still belongs in your everyday rotation.",
      },
      {
        type: "heading",
        text: "Quality Over Quantity",
      },
      {
        type: "paragraph",
        text: "Five well-chosen, well-made pieces will serve you better than twenty trend-driven items. LAEL pieces are designed to last, so investing in quality means investing in pieces you'll reach for for years.",
      },
    ],
  },
  "essentials-every-woman": {
    title: "Jewellery Essentials Every Woman Should Own",
    date: "September 2024",
    category: "CURATED",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "If you're building a jewellery collection from scratch, here are the pieces that should be in your arsenal.",
      },
      {
        type: "heading",
        text: "1. Delicate Everyday Necklace",
      },
      {
        type: "paragraph",
        text: "A versatile chain or pendant in 16–18 inches that you can wear under your shirt or layer over a sweater. This is your workhorse piece.",
      },
      {
        type: "heading",
        text: "2. Classic Hoops",
      },
      {
        type: "paragraph",
        text: "Hoops are effortlessly elegant. Choose a size that feels proportional to your face—typically 1–1.5 inches. They work for work, dinner, weekends.",
      },
      {
        type: "heading",
        text: "3. Drop or Stud Earrings",
      },
      {
        type: "paragraph",
        text: "A slightly dressier option that brings movement and polish. Pair these with a necklace or wear alone for a minimalist look.",
      },
      {
        type: "heading",
        text: "4. Stackable Ring",
      },
      {
        type: "paragraph",
        text: "A simple ring that plays well with others. Wear solo or mix with other rings for a more styled look.",
      },
      {
        type: "heading",
        text: "5. Delicate Bracelet",
      },
      {
        type: "paragraph",
        text: "A cuff or layering bracelet that doesn't demand attention but adds polish. Wear it solo or stack with other bracelets.",
      },
    ],
  },
  "choose-jewellery-for-style": {
    title: "How to Choose Jewellery for Your Style",
    date: "August 2024",
    category: "GUIDE",
    readTime: "7 min read",
    content: [
      {
        type: "paragraph",
        text: "Jewellery should feel like an extension of who you are. Here's how to choose pieces that align with your personal style.",
      },
      {
        type: "heading",
        text: "Define Your Aesthetic",
      },
      {
        type: "paragraph",
        text: "Are you minimalist, romantic, classic, or bold? Your jewellery should reflect this. Minimalist dressers thrive in delicate, understated pieces. Romantic styles prefer soft curves and layering. Classic tastes favor timeless silhouettes.",
      },
      {
        type: "heading",
        text: "Consider Your Lifestyle",
      },
      {
        type: "paragraph",
        text: "Do you exercise regularly? Choose durable, secure pieces. Do you work in a conservative environment? Opt for subtle elegance. Are you always on the go? Select jewellery that doesn't require constant adjustment.",
      },
      {
        type: "heading",
        text: "Color Harmony",
      },
      {
        type: "paragraph",
        text: "Your jewellery should harmonize with your skin tone and wardrobe. Warm skin tones often glow in gold. Cool skin tones shine in silver. And many of us wear both beautifully when they're mixed intentionally.",
      },
      {
        type: "heading",
        text: "The Confidence Factor",
      },
      {
        type: "paragraph",
        text: "The best piece of jewellery is one that makes you feel like yourself. If you reach for it again and again, if it brings you confidence, if it feels right on your body—that's the piece you should own.",
      },
    ],
  },
  "jewellery-gift-guide": {
    title: "The Complete Jewellery Gift Guide",
    date: "July 2024",
    category: "GUIDE",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Jewellery is a deeply personal gift. It says 'I know you' and 'I want you to feel beautiful.' Here's how to choose a piece that lands just right.",
      },
      {
        type: "heading",
        text: "For the Minimalist",
      },
      {
        type: "paragraph",
        text: "Choose delicate, understated pieces. A simple chain, classic hoops, or a sleek bangle. Avoid anything too ornate or statement-making.",
      },
      {
        type: "heading",
        text: "For the Romantic",
      },
      {
        type: "paragraph",
        text: "Look for soft curves, delicate layering pieces, and designs with movement. Drop earrings, layering necklaces, and cuff bracelets feel luxe and intentional.",
      },
      {
        type: "heading",
        text: "For the Bold",
      },
      {
        type: "paragraph",
        text: "A slightly larger-scale piece that still feels elegant. A sculptural ring, a statement cuff, or layered necklaces that make an impression.",
      },
      {
        type: "heading",
        text: "Budget Guidance",
      },
      {
        type: "paragraph",
        text: "Thoughtful doesn't mean expensive. A $100–150 piece from LAEL is more meaningful and lasting than a $400 trend piece. Choose quality, timelessness, and relevance to the person.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articles[params.slug];

  if (!article) {
    return {
      title: "Article Not Found | LAEL",
    };
  }

  return {
    title: `${article.title} | LAEL Jewellery`,
    description: `Read about ${article.title.toLowerCase()} on the LAEL Journal.`,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLdClient schema={generateArticleSchema({
        title: article.title,
        date: article.date,
        slug: params.slug,
      })} />
      <main className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      <header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link>
          <Link href="/journal" className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 transition hover:text-[#75695B]">← Back to Journal</Link>
        </nav>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-10">
        <header className="mb-12">
          <div className="mb-6 flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.24em] text-[#75695B]">
            <span>{article.category}</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="mb-6 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.05em]">
            {article.title}
          </h1>
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[#75695B]">{article.date}</p>
        </header>

        <div className="prose-custom space-y-6">
          {article.content.map((block: ArticleBlock, idx: number) => {
            if (block.type === "paragraph") {
              return (
                <p key={idx} className="text-lg leading-8 text-[#4d443d]">
                  {block.text}
                </p>
              );
            }
            if (block.type === "heading") {
              return (
                <h2 key={idx} className="mt-8 mb-4 font-serif text-2xl leading-tight tracking-[-0.03em]">
                  {block.text}
                </h2>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-16 rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-8 text-center">
          <p className="mb-6 text-lg text-[#4d443d]">Ready to find your perfect piece?</p>
          <Link
            href="/shop"
            className="inline-block rounded-full border border-[#29251F] px-10 py-4 font-medium uppercase tracking-[0.2em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]"
          >
            Shop LAEL
          </Link>
        </div>
      </article>
    </main>
    </>
  );
}
