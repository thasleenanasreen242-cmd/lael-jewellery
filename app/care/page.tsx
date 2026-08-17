import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jewellery Care | LAEL",
  description: "Learn how to care for your LAEL anti-tarnish jewellery to keep it beautiful for everyday wear.",
};

export default function CarePage() {
  const careGuides = [
    {
      title: "Daily Care",
      tips: [
        "Wipe gently with the included soft cloth after each wear",
        "Remove jewellery before showering or swimming",
        "Avoid contact with perfume, lotions, and hairspray",
        "Store in a dry, cool place away from direct sunlight",
      ],
    },
    {
      title: "Storage",
      tips: [
        "Keep each piece in its individual pouch",
        "Store in a dry location, away from humidity",
        "Keep away from extreme heat or moisture",
        "A jewelry box or drawer lined with soft fabric works perfectly",
        "Avoid storing pieces together to prevent scratching",
      ],
    },
    {
      title: "Long-term Shine",
      tips: [
        "Polish occasionally with the provided cloth",
        "For stubborn tarnish, gently use a soft-bristle brush",
        "Avoid harsh chemicals or silver polish",
        "Store with a silica gel packet in very humid climates",
        "Our anti-tarnish finish minimizes the need for frequent polishing",
      ],
    },
    {
      title: "What to Avoid",
      tips: [
        "Water and moisture (especially chlorine)",
        "Harsh soaps or cleaning products",
        "Abrasive materials or rough cloths",
        "Extreme temperature changes",
        "Wearing during intense exercise or sports",
        "Contact with salt water or pools",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      <header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link>
          <Link href="/shop" className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 transition hover:text-[#75695B]">SHOP</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">Jewellery Care</p>
          <h1 className="mb-8 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.06em]">
            Keep your LAEL beautiful.
          </h1>
          <p className="text-lg leading-8 text-[#4d443d]">
            LAEL pieces are designed to last. With proper care, your anti-tarnish jewellery will maintain its shine and beauty for years to come.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {careGuides.map((guide) => (
            <div key={guide.title} className="rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-8">
              <h2 className="mb-6 font-serif text-2xl leading-tight tracking-[-0.03em]">{guide.title}</h2>
              <ul className="space-y-3">
                {guide.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-sm leading-6 text-[#4d443d]">
                    <span className="text-[#B79A6A] font-bold flex-shrink-0 mt-0.5">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-[#29251F]/10 bg-[#EFE5D6] p-10">
          <h2 className="mb-4 font-serif text-2xl leading-tight tracking-[-0.03em]">About Anti-Tarnish Finishes</h2>
          <p className="text-lg leading-8 text-[#4d443d]">
            All LAEL pieces feature anti-tarnish finishes designed to resist oxidation and maintain their lustre. Our 18k gold vermeil, champagne gold, and stainless steel selections are specifically chosen for their durability and low-maintenance properties. With simple care, these finishes keep their shine for everyday wear.
          </p>
        </div>

        <div className="mt-12 space-y-4 rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-8">
          <h3 className="font-serif text-xl leading-tight tracking-[-0.02em]">Have questions?</h3>
          <p className="text-lg text-[#4d443d]">
            Our LAEL Concierge team is here to help. Click the chat button in the bottom right corner or reach out on WhatsApp.
          </p>
        </div>
      </section>
    </main>
  );
}
