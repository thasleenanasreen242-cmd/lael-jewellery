import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function LaelFooter() {
  const whatsapp = buildWhatsAppLink("Hi LAEL 👋 I would like help choosing a jewellery piece.");

  return (
    <footer className="border-t border-[#29251F]/10 bg-[#F7F1E8] text-[#29251F]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-2xl font-medium tracking-[0.18em]">LAEL</Link>
            <p className="mt-5 max-w-sm font-serif text-2xl leading-tight tracking-[-0.03em]">
              Jewellery that stays beautiful.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#75695B]">
              Anti-tarnish jewellery designed for everyday rituals, quiet moments and everything in between.
            </p>
            {whatsapp !== "#" && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#29251F] px-5 py-3 text-[0.62rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-[#75695B]">
                Chat with LAEL
              </a>
            )}
          </div>

          <div>
            <p className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#75695B]">Shop</p>
            <div className="grid gap-3 text-sm">
              <Link href="/shop" className="hover:text-[#75695B]">All jewellery</Link>
              <Link href="/shop" className="hover:text-[#75695B]">Earrings</Link>
              <Link href="/shop" className="hover:text-[#75695B]">Necklaces</Link>
              <Link href="/shop" className="hover:text-[#75695B]">Rings</Link>
              <Link href="/shop" className="hover:text-[#75695B]">Bracelets</Link>
              <Link href="/shop" className="hover:text-[#75695B]">Sets</Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#75695B]">Discover</p>
            <div className="grid gap-3 text-sm">
              <Link href="/story" className="hover:text-[#75695B]">Our story</Link>
              <Link href="/journal" className="hover:text-[#75695B]">Journal</Link>
              <Link href="/care" className="hover:text-[#75695B]">Jewellery care</Link>
              <Link href="/find-your-style" className="hover:text-[#75695B]">Find your style</Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#75695B]">Help</p>
            <div className="grid gap-3 text-sm">
              <Link href="/care" className="hover:text-[#75695B]">Care guide</Link>
              <Link href="/shop" className="hover:text-[#75695B]">Shipping</Link>
              <Link href="/shop" className="hover:text-[#75695B]">Returns</Link>
              <Link href="/journal" className="hover:text-[#75695B]">FAQs & Journal</Link>
              {whatsapp !== "#" && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#75695B]">WhatsApp</a>}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#29251F]/10 pt-6 text-[0.58rem] uppercase tracking-[0.2em] text-[#75695B] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LAEL. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-[#29251F]">Privacy</Link>
            <Link href="/" className="hover:text-[#29251F]">Terms</Link>
            <Link href="/shop" className="hover:text-[#29251F]">Shipping</Link>
            <Link href="/shop" className="hover:text-[#29251F]">Returns</Link>
          </div>
        </div>

        <div className="mt-8 text-center font-serif text-lg tracking-[-0.02em] text-[#29251F]/70">
          MADE FOR EVERY DAY. MADE TO STAY BEAUTIFUL.
        </div>
      </div>
    </footer>
  );
}
