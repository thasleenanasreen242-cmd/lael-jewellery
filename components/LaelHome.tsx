"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { ShoppingCart } from "./ShoppingCart";
import { editProducts } from "@/data/lael-data";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useWishlist } from "@/lib/store";

const ease = [0.22, 1, 0.36, 1] as const;

export default function LaelHome() {
  const [searchOpen, setSearchOpen] = useState(false);
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(true);
  const { getCount: getWishlistCount, isHydrated: wishlistHydrated } = useWishlist();
  const wishlistCount = wishlistHydrated ? getWishlistCount() : 0;
  const whatsapp = buildWhatsAppLink("Hi LAEL 👋 I would like help choosing a jewellery piece.");

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), reduced ? 150 : 850);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      {intro && <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: reduced ? 0 : 0.45, duration: reduced ? 0.1 : 0.35 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F7F1E8]"><div className="text-center"><div className="font-serif text-7xl tracking-[-0.08em]">LAEL</div><div className="mt-3 text-[0.58rem] uppercase tracking-[0.34em] text-[#75695B]">Everyday jewellery</div></div></motion.div>}

      <header className="sticky top-0 z-50 border-b border-[#29251F]/10 bg-[#F7F1E8]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="text-lg tracking-[0.22em]">LAEL</Link>
          <div className="hidden items-center gap-8 text-[0.62rem] uppercase tracking-[0.25em] md:flex"><Link href="/shop" className="hover:text-[#75695B]">Shop</Link><Link href="/story" className="hover:text-[#75695B]">Story</Link><Link href="/journal" className="hover:text-[#75695B]">Journal</Link><Link href="/care" className="hover:text-[#75695B]">Care</Link></div>
          <div className="flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.2em]"><button type="button" onClick={() => setSearchOpen(true)} className="hidden sm:block hover:text-[#75695B]">Search</button><Link href="/wishlist" className="hidden sm:flex items-center gap-1 hover:text-[#75695B]">Wishlist{wishlistCount > 0 && <span className="inline-flex min-w-4 items-center justify-center rounded-full bg-[#29251F] px-1 text-[9px] text-white">{wishlistCount}</span>}</Link><ShoppingCart /></div>
        </nav>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 lg:px-10 lg:pb-20 lg:pt-16"><div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="max-w-xl"><p className="mb-5 text-[0.62rem] uppercase tracking-[0.32em] text-[#75695B]">Anti-tarnish jewellery · Made for everyday</p><h1 className="font-serif text-[clamp(3.6rem,7vw,6.7rem)] leading-[0.86] tracking-[-0.075em]">BEAUTIFUL<br />PIECES.<br />EVERY DAY.</h1><p className="mt-6 max-w-lg text-base leading-7 text-[#4d443d] sm:text-lg">Thoughtfully designed jewellery with a lasting finish — made to become part of your everyday rituals.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="rounded-full bg-[#29251F] px-6 py-3 text-[0.62rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-[#75695B]">Shop jewellery</Link><Link href="/story" className="rounded-full border border-[#29251F]/15 bg-[#FFFDF8]/70 px-6 py-3 text-[0.62rem] uppercase tracking-[0.22em] transition hover:bg-white">Discover LAEL</Link></div></motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }} className="relative overflow-hidden rounded-[1.7rem] border border-[#29251F]/10 bg-[#EFE5D6] p-2 shadow-[0_25px_70px_rgba(58,47,41,0.09)]"><div className="overflow-hidden rounded-[1.35rem]"><motion.div initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease }}><Image src="/images/hero-showcase.svg" alt="LAEL anti-tarnish jewellery collection" width={1200} height={900} priority className="h-[430px] w-full object-cover sm:h-[540px] lg:h-[600px]" /></motion.div></div><div className="absolute bottom-6 left-6 rounded-full bg-[#FFFDF8]/85 px-4 py-2 text-[0.56rem] uppercase tracking-[0.2em] backdrop-blur-md">Designed for daily wear</div></motion.div>
        </div></section>

        <section className="border-y border-[#29251F]/10 bg-[#FFFDF8]"><div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#29251F]/10 sm:grid-cols-4">{[['ANTI-TARNISH','Lasting finish'],['EVERYDAY','Easy to style'],['TIMELESS','Beyond trends'],['CARE','Simple guidance']].map(([title,text]) => <div key={title} className="px-4 py-7 text-center sm:px-6"><p className="text-[0.56rem] uppercase tracking-[0.2em] text-[#75695B]">{title}</p><p className="mt-2 text-sm text-[#4d443d]">{text}</p></div>)}</div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="mb-9 flex items-end justify-between gap-5"><div><p className="mb-3 text-[0.6rem] uppercase tracking-[0.3em] text-[#75695B]">Start here</p><h2 className="font-serif text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.9] tracking-[-0.06em]">THE LAEL EDIT</h2></div><Link href="/shop" className="hidden text-[0.6rem] uppercase tracking-[0.22em] underline underline-offset-4 sm:block">View all</Link></motion.div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{editProducts.slice(0,4).map((product,index) => <motion.article key={product.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.06, duration: 0.6 }} className="group overflow-hidden rounded-[1.4rem] border border-[#29251F]/10 bg-[#FFFDF8]"><Link href="/shop" className="block"><div className="overflow-hidden bg-[#EFE5D6]"><Image src={product.image} alt={`${product.name} ${product.category} anti-tarnish jewellery`} width={700} height={850} className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.035] sm:h-[370px]" /></div><div className="p-5"><p className="text-[0.56rem] uppercase tracking-[0.22em] text-[#75695B]">{product.category}</p><div className="mt-2 flex justify-between gap-3"><h3 className="text-base font-medium">{product.name}</h3><span className="text-sm text-[#75695B]">{product.price}</span></div><p className="mt-4 text-[0.58rem] uppercase tracking-[0.2em]">View piece →</p></div></Link></motion.article>)}</div><Link href="/shop" className="mt-6 block text-center text-[0.6rem] uppercase tracking-[0.22em] underline underline-offset-4 sm:hidden">View all jewellery</Link></section>

        <section className="bg-[#EFE5D6]"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}><p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#75695B]">Why LAEL</p><h2 className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.88] tracking-[-0.065em]">JEWELLERY<br />FOR REAL LIFE.</h2></motion.div><motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-xl text-[#4d443d]"><p className="text-lg leading-8">Your favourite jewellery should not wait for a special occasion. Choose a piece, put it on, and keep moving.</p><div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#29251F]/15 pt-6 text-sm"><div><strong className="block text-[#29251F]">01</strong>Quiet design</div><div><strong className="block text-[#29251F]">02</strong>Anti-tarnish finish</div><div><strong className="block text-[#29251F]">03</strong>Easy styling</div><div><strong className="block text-[#29251F]">04</strong>Simple care</div></div><Link href="/story" className="mt-8 inline-block rounded-full border border-[#29251F]/20 px-6 py-3 text-[0.6rem] uppercase tracking-[0.22em] hover:bg-white">Read our story</Link></motion.div></div></section>

        <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24"><p className="text-[0.6rem] uppercase tracking-[0.3em] text-[#75695B]">Need help choosing?</p><h2 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.88] tracking-[-0.07em]">LET&apos;S FIND YOUR PIECE.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-[#4d443d]">Ask us about styles, gifting, sizing or your next everyday favourite.</p>{whatsapp !== '#' && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#29251F] px-7 py-3 text-[0.6rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-[#75695B]">WhatsApp LAEL</a>}</section>
      </main>

      {whatsapp !== '#' && <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with LAEL on WhatsApp" title="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#29251F] text-white shadow-[0_12px_30px_rgba(41,37,31,0.22)] transition hover:-translate-y-1"><span aria-hidden="true" className="text-xl">◔</span></a>}
    </div>
  );
}
