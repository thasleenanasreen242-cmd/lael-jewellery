"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { ShoppingCart } from "./ShoppingCart";
import {
  bestsellerProducts,
  careSteps,
  discoverCards,
  editProducts,
  instagramImages,
  journalArticles,
  lookCards,
  masonryTiles,
  lifestyleMoments,
  ritualMoments,
} from "@/data/lael-data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-[#75695B]">{children}</p>;
}

function BrandReveal() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), prefersReducedMotion ? 250 : 1250);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: prefersReducedMotion ? 0 : 0.9, duration: prefersReducedMotion ? 0.1 : 0.8 } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F7F1E8] text-[#29251F]"
    >
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-[-0.08em]"
        >
          LAEL
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-4 text-[0.72rem] uppercase tracking-[0.36em] text-[#75695B]"
        >
          JEWELLERY THAT STAYS BEAUTIFUL.
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function LaelPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      <BrandReveal />

      <header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link>

          <div className="hidden items-center gap-8 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 md:flex">
            <Link href="/shop" className="transition hover:text-[#75695B]">SHOP</Link>
            <Link href="/shop" className="transition hover:text-[#75695B]">EDIT</Link>
            <Link href="/story" className="transition hover:text-[#75695B]">STORY</Link>
            <Link href="/journal" className="transition hover:text-[#75695B]">JOURNAL</Link>
            <Link href="/care" className="transition hover:text-[#75695B]">CARE</Link>
          </div>

          <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#29251F]/80">
            <button onClick={() => setIsSearchOpen(true)} className="hidden sm:inline transition hover:text-[#75695B]">Search</button>
            <button className="transition hover:text-[#75695B]">Wishlist</button>
            <ShoppingCart />
          </div>
        </nav>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main>
        <section className="relative mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 lg:px-10 lg:pb-16 lg:pt-12">
          <div className="grid items-center gap-10 lg:grid-cols-[0.96fr_1.04fr]">
            <motion.div {...fadeUp} className="max-w-xl">
              <p className="mb-4 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">Fine jewellery for everyday rituals</p>
              <h1 className="font-serif text-[clamp(3.7rem,8vw,7rem)] leading-[0.9] tracking-[-0.08em] text-[#29251F]">
                JEWELLERY
                <br />
                THAT STAYS
                <br />
                BEAUTIFUL.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-[#4d443d]">
                Timeless anti-tarnish pieces made for the moments that become everyday memories.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#edit" className="rounded-full bg-[#1D1A17] px-6 py-3 text-[0.7rem] uppercase tracking-[0.26em] text-[#FFFDF8] transition hover:bg-[#75695B]">
                  ENTER THE LAEL EDIT
                </a>
                <a href="#shop" className="rounded-full border border-[#29251F]/15 bg-[#FFFDF8]/60 px-6 py-3 text-[0.7rem] uppercase tracking-[0.26em] text-[#29251F] transition hover:border-[#29251F]/30 hover:bg-[#FFFDF8]">
                  SHOP JEWELLERY
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#EFE5D6] p-3 shadow-[0_30px_80px_rgba(58,47,41,0.08)]">
              <div className="overflow-hidden rounded-[1.5rem]">
                <motion.img
                  src="/images/hero-showcase.svg"
                  alt="Editorial LAEL jewellery styling"
                  className="h-[620px] w-full object-cover"
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
                />
              </div>
              <div className="absolute bottom-7 left-7 max-w-[200px] rounded-full border border-white/70 bg-[#fffdf8]/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#29251F] backdrop-blur-sm">
                The world of LAEL
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-[#29251F]/10 bg-[#FFFDF8]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:px-10">
            <motion.p {...fadeUp} className="font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-[-0.06em] text-[#29251F]">
              NOT MADE FOR ONE OCCASION.
            </motion.p>
            <motion.p {...fadeUp} transition={{ delay: 0.12, duration: 0.7 }} className="mt-4 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-[-0.06em] text-[#29251F]">
              MADE FOR EVERY DAY.
            </motion.p>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-10 max-w-2xl">
            <SectionLabel>Discover LAEL</SectionLabel>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {discoverCards.map((card, index) => (
              <motion.article
                key={card.id}
                {...fadeUp}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="group relative overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8]"
              >
                <div className="overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={900}
                    height={1200}
                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#75695B]">{card.title}</p>
                  <p className="max-w-xs text-base leading-7 text-[#29251F]">{card.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="edit" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel>The LAEL Edit</SectionLabel>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.06em]">THE LAEL EDIT</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#4d443d]">Pieces you&apos;ll reach for again and again.</p>
          </motion.div>

          <div className="mb-8 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-[#75695B]">
            {['EARRINGS', 'NECKLACES', 'RINGS', 'BRACELETS', 'SETS'].map((category) => (
              <span key={category} className="rounded-full border border-[#29251F]/10 bg-[#FFFDF8] px-4 py-2">
                {category}
              </span>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {editProducts.map((product, index) => (
              <motion.article
                key={product.name}
                {...fadeUp}
                transition={{ delay: index * 0.08, duration: 0.7 }}
                className={`group overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] ${index === 0 || index === 2 ? 'xl:col-span-2' : ''}`}
              >
                <div className="overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={1200}
                    className={`w-full object-cover transition duration-700 group-hover:scale-[1.04] ${index === 0 || index === 2 ? 'h-[400px]' : 'h-[300px]'}`}
                  />
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#75695B]">{product.category}</p>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-medium text-[#29251F]">{product.name}</h3>
                    <span className="text-sm text-[#75695B]">{product.price}</span>
                  </div>
                  <button className="text-[0.68rem] uppercase tracking-[0.22em] text-[#29251F] transition group-hover:text-[#75695B]">
                    DISCOVER PIECE →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="overflow-hidden bg-[#EFE5D6] py-20">
          <motion.div {...fadeUp} className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <h2 className="font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[0.9] tracking-[-0.06em] text-[#29251F]">
              BEAUTY, MADE FOR REAL LIFE.
            </h2>
            <div className="mt-10 flex flex-col gap-5 text-[clamp(2.2rem,6vw,5rem)] font-serif uppercase leading-none tracking-[-0.06em] text-[#29251F]/85">
              {ritualMoments.map((phrase, index) => (
                <motion.div
                  key={phrase}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.12, duration: 0.7 }}
                  className="border-t border-[#29251F]/15 pt-5"
                >
                  {phrase}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-10 max-w-2xl">
            <SectionLabel>Style your LAEL</SectionLabel>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.06em]">HOW WILL YOU WEAR YOURS?</h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {lookCards.map((look, index) => (
              <motion.article
                key={look.title}
                {...fadeUp}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="group overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8]"
              >
                <div className="overflow-hidden">
                  <Image src={look.image} alt={look.title} width={900} height={1200} className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="font-serif text-3xl tracking-[-0.04em]">{look.title}</h3>
                  <p className="text-base leading-7 text-[#4d443d]">{look.caption}</p>
                  <button className="text-[0.68rem] uppercase tracking-[0.24em] text-[#29251F] transition group-hover:text-[#75695B]">
                    SHOP THE LOOK
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <motion.div {...fadeUp} className="mb-10 max-w-xl">
              <SectionLabel>Pinterest world</SectionLabel>
              <h2 className="font-serif text-[clamp(2.4rem,4.7vw,4.4rem)] leading-[0.9] tracking-[-0.06em]">THE WORLD OF LAEL</h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {masonryTiles.map((tile, index) => (
                <motion.figure
                  key={tile.title}
                  {...fadeUp}
                  transition={{ delay: index * 0.08, duration: 0.7 }}
                  className={`group overflow-hidden rounded-[1.8rem] border border-[#29251F]/10 bg-[#EFE5D6] ${tile.className}`}
                >
                  <Image src={tile.image} alt={tile.title} width={900} height={1200} className="h-full min-h-[220px] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <figcaption className="px-4 py-3 text-[0.62rem] uppercase tracking-[0.26em] text-[#75695B]">{tile.title}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-10 max-w-2xl">
            <SectionLabel>The LAEL girl</SectionLabel>
            <h2 className="font-serif text-[clamp(2.3rem,4.8vw,4.4rem)] leading-[0.9] tracking-[-0.06em]">FOR EVERY VERSION OF YOU.</h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {lifestyleMoments.map((moment, index) => (
              <motion.figure
                key={moment.title}
                {...fadeUp}
                transition={{ delay: index * 0.08, duration: 0.7 }}
                className="overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8]"
              >
                <Image src={moment.image} alt={moment.title} width={900} height={1200} className="h-[360px] w-full object-cover" />
                <figcaption className="px-4 py-4 text-[0.62rem] uppercase tracking-[0.26em] text-[#75695B]">{moment.title}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section id="shop" className="bg-[#EFE5D6] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <motion.div {...fadeUp} className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionLabel>Bestsellers</SectionLabel>
                <h2 className="font-serif text-[clamp(2.2rem,4.5vw,4.3rem)] leading-[0.9] tracking-[-0.06em]">THE PIECES EVERYONE KEEPS COMING BACK TO.</h2>
              </div>
              <button className="rounded-full border border-[#29251F]/15 bg-[#FFFDF8] px-5 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#29251F]">
                SHOP BESTSELLERS
              </button>
            </motion.div>

            <div className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
              {bestsellerProducts.map((product) => (
                <motion.article
                  key={product.name}
                  whileHover={{ y: -6 }}
                  className="min-w-[260px] rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-4 shadow-[0_18px_40px_rgba(58,47,41,0.04)]"
                >
                  <Image src={product.image} alt={product.name} width={900} height={1100} className="h-[280px] w-full rounded-[1.4rem] object-cover" />
                  <div className="mt-4 flex items-center justify-between text-[#75695B]">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em]">★ {product.rating}</span>
                    <button aria-label={`Save ${product.name}`} className="text-lg">♡</button>
                  </div>
                  <h3 className="mt-3 text-xl font-medium text-[#29251F]">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[#29251F]">{product.price}</p>
                    <button className="rounded-full bg-[#29251F] px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-[#FFFDF8]">Quick add</button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.blockquote {...fadeUp} className="border-l border-[#B79A6A] pl-6 text-[clamp(1.6rem,3vw,3rem)] font-serif leading-[1.1] tracking-[-0.05em] text-[#29251F]">
            &ldquo;The kind of jewellery you forget you&apos;re wearing — until someone asks where it&apos;s from.&rdquo;
          </motion.blockquote>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-8 max-w-2xl">
            <SectionLabel>The LAEL ritual</SectionLabel>
            <h2 className="font-serif text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.9] tracking-[-0.06em]">KEEP YOUR LAEL BEAUTIFUL.</h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {careSteps.map((step, index) => (
              <motion.article
                key={step.title}
                {...fadeUp}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-6"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#75695B]">{step.title}</p>
                <p className="mt-4 text-xl leading-8 text-[#29251F]">{step.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10">
            <button className="rounded-full bg-[#1D1A17] px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#FFFDF8]">
              JEWELLERY CARE GUIDE
            </button>
          </div>
        </section>

        <section className="overflow-hidden bg-[#EFE5D6] py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <motion.div {...fadeUp} className="relative overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8] p-6">
              <Image src="/images/packaging-hero.svg" alt="LAEL packaging moment" width={1200} height={1000} className="h-[500px] w-full rounded-[1.5rem] object-cover" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.7 }} className="flex flex-col justify-center">
              <SectionLabel>Packaging</SectionLabel>
              <h2 className="font-serif text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[0.9] tracking-[-0.06em]">BEAUTIFUL BEFORE YOU EVEN OPEN IT.</h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-[#4d443d]">
                Thoughtful packaging, tactile layers, and a quiet reveal designed to make every delivery feel personal.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div {...fadeUp} className="overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#FFFDF8]">
              <Image src="/images/story-portrait.svg" alt="Our story editorial image" width={1000} height={1300} className="h-[580px] w-full object-cover" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.12, duration: 0.7 }}>
              <SectionLabel>Our story</SectionLabel>
              <h2 className="font-serif text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.9] tracking-[-0.06em]">WHY LAEL?</h2>
              <p className="mt-6 text-lg leading-9 text-[#4d443d]">
                LAEL was created for women who want jewellery that feels effortless, timeless, and easy to wear every day.
              </p>
              <button className="mt-8 rounded-full bg-[#1D1A17] px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#FFFDF8]">
                READ OUR STORY
              </button>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <motion.div {...fadeUp} className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionLabel>Journal</SectionLabel>
                <h2 className="font-serif text-[clamp(2.3rem,4.8vw,4.4rem)] leading-[0.9] tracking-[-0.06em]">OUR JOURNAL</h2>
              </div>
              <button className="rounded-full border border-[#29251F]/15 bg-[#F7F1E8] px-5 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#29251F]">
                READ THE JOURNAL
              </button>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {journalArticles.map((article, index) => (
                <motion.article
                  key={article}
                  {...fadeUp}
                  transition={{ delay: index * 0.08, duration: 0.7 }}
                  className="rounded-[2rem] border border-[#29251F]/10 bg-[#F7F1E8] p-5"
                >
                  <div className="mb-5 overflow-hidden rounded-[1.3rem]">
                    <Image src={`/images/journal-${index + 1}.svg`} alt={article} width={800} height={600} className="h-48 w-full object-cover" />
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-[0.26em] text-[#75695B]">Journal</p>
                  <h3 className="mt-3 text-lg leading-7 text-[#29251F]">{article}</h3>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel>Instagram</SectionLabel>
              <h2 className="font-serif text-[clamp(2.3rem,4.6vw,4.5rem)] leading-[0.9] tracking-[-0.06em]">SEE LAEL IN YOUR WORLD.</h2>
            </div>
            <button className="rounded-full border border-[#29251F]/15 bg-[#FFFDF8] px-5 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#29251F]">
              FOLLOW @LAEL
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {instagramImages.map((image, index) => (
              <motion.img
                key={image}
                {...fadeUp}
                transition={{ delay: index * 0.06, duration: 0.7 }}
                src={image}
                alt="LAEL social editorial"
                className="h-[200px] w-full rounded-[1.4rem] object-cover"
              />
            ))}
          </div>
        </section>

        <section className="overflow-hidden bg-[#F0E4D3] py-24">
          <motion.div {...fadeUp} className="mx-auto max-w-6xl px-5 text-center sm:px-8 lg:px-10">
            <p className="font-serif text-[clamp(2.5rem,5vw,6rem)] leading-[0.9] tracking-[-0.08em] text-[#29251F]">
              KEEP WHAT
              <br />
              MAKES YOU
              <br />
              FEEL BEAUTIFUL.
            </p>
            <p className="mt-6 text-[0.72rem] uppercase tracking-[0.34em] text-[#75695B]">LAEL</p>
            <button className="mt-8 rounded-full bg-[#1D1A17] px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#FFFDF8]">
              SHOP THE COLLECTION
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#29251F]/10 bg-[#F7F1E8]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 text-sm text-[#29251F]/75 sm:px-8 lg:grid-cols-[1fr_1fr_1fr] lg:px-10">
          <div>
            <div className="text-xl font-medium tracking-[0.18em]">LAEL</div>
            <div className="mt-5 space-y-2 text-[0.7rem] uppercase tracking-[0.24em]">
              <p>Instagram</p>
              <p>Email</p>
            </div>
          </div>

          <div className="grid gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-[#29251F]/80 sm:grid-cols-2">
            {['SHOP', 'EDIT', 'STORY', 'JOURNAL', 'CARE'].map((item) => (
              <a key={item} href="#" className="transition hover:text-[#75695B]">{item}</a>
            ))}
          </div>

          <div className="space-y-3 text-[0.7rem] uppercase tracking-[0.24em] text-[#29251F]/80">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
