"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";

type QuizAnswers = {
  personality?: string;
  finish?: string;
  mood?: string;
};

const questions = [
  {
    id: "personality",
    question: "What's your jewellery personality?",
    options: [
      { value: "minimal", label: "MINIMAL", desc: "Clean lines, understated elegance" },
      { value: "romantic", label: "ROMANTIC", desc: "Soft curves, delicate layering" },
      { value: "bold", label: "BOLD", desc: "Statement pieces, confident presence" },
      { value: "classic", label: "CLASSIC", desc: "Timeless, effortlessly refined" },
    ],
  },
  {
    id: "finish",
    question: "Preferred finish?",
    options: [
      { value: "gold", label: "GOLD", desc: "Warm, luxe, timeless" },
      { value: "silver", label: "SILVER", desc: "Cool, modern, versatile" },
      { value: "mixed", label: "MIXED METALS", desc: "Playful, intentional combinations" },
    ],
  },
  {
    id: "mood",
    question: "Your everyday mood?",
    options: [
      { value: "quiet", label: "QUIET LUXURY", desc: "Confidence without noise" },
      { value: "feminine", label: "FEMININE", desc: "Soft, graceful, romantic" },
      { value: "statement", label: "STATEMENT", desc: "Bold, expressive, intentional" },
      { value: "effortless", label: "EFFORTLESS", desc: "Easy, comfortable, natural" },
    ],
  },
];

const styleRecommendations: Record<string, { title: string; description: string; productSlugs: string[] }> = {
  "minimal-gold-quiet": {
    title: "THE MINIMALIST LUXE",
    description: "You appreciate elegance without excess. Your pieces are carefully chosen, timeless, and speak for themselves.",
    productSlugs: ["aurelia-necklace", "celeste-ring", "solis-hoops"],
  },
  "romantic-gold-feminine": {
    title: "THE ROMANTIC",
    description: "Soft curves and delicate details draw you in. Your style is graceful, intentional, and beautifully layered.",
    productSlugs: ["aurelia-necklace", "solis-hoops", "elara-bracelet"],
  },
  "bold-mixed-statement": {
    title: "THE STATEMENT MAKER",
    description: "You don't hold back. Your jewellery makes an impact, but always with elegance and intention.",
    productSlugs: ["elara-bracelet", "celeste-ring", "solis-hoops"],
  },
  "classic-gold-effortless": {
    title: "THE EFFORTLESS CLASSIC",
    description: "Timeless pieces that work everywhere. Your style is refined without trying, elegant without fuss.",
    productSlugs: ["aurelia-necklace", "solis-hoops", "celeste-ring"],
  },
};

export default function FindYourStylePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const questionId = questions[currentQuestion].id;
    setAnswers({ ...answers, [questionId]: answer });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getStyleKey = (): string => {
    const key = `${answers.personality}-${answers.finish}-${answers.mood}`;
    return styleRecommendations[key] ? key : "classic-gold-effortless";
  };

  const recommendation = styleRecommendations[getStyleKey()];
  const recommendedProducts = recommendation.productSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#29251F]">
      <header className="sticky top-0 z-40 border-b border-[#29251F]/10 bg-[#F7F1E8]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-xl font-medium tracking-[0.18em]">LAEL</Link>
          <Link href="/shop" className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#29251F]/80 transition hover:text-[#75695B]">SHOP</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
        {!showResults ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="text-center">
              <p className="mb-6 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-[-0.05em]">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {questions[currentQuestion].options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-2xl border border-[#29251F]/10 bg-[#FFFDF8] p-6 text-center transition hover:border-[#29251F]/30 hover:shadow-md"
                >
                  <p className="mb-2 font-medium uppercase tracking-[0.2em]">{option.label}</p>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#75695B] group-hover:text-[#29251F]">
                    {option.desc}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {Array.from({ length: questions.length }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-8 rounded-full transition ${
                    i < currentQuestion ? "bg-[#29251F]" : i === currentQuestion ? "bg-[#B79A6A]" : "bg-[#29251F]/10"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            <div className="text-center">
              <p className="mb-4 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">YOUR LAEL STYLE</p>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-[-0.06em]">
                {recommendation.title}
              </h2>
              <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-[#4d443d]">
                {recommendation.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-center font-serif text-2xl tracking-[-0.03em]">Curated for you</h3>
              <div className="grid gap-6 md:grid-cols-3">
                {recommendedProducts.map((product) => (
                  <Link
                    key={product?.slug}
                    href={`/shop/${product?.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#29251F]/10 bg-[#FFFDF8] transition hover:shadow-lg"
                  >
                    <div className="overflow-hidden h-[320px] bg-[#EFE5D6]">
                      <Image
                        src={product?.image || "/images/editorial-everyday.svg"}
                        alt={product?.name || "LAEL piece"}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#75695B]">{product?.category}</p>
                      <h4 className="font-serif text-lg leading-tight tracking-[-0.02em]">{product?.name}</h4>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#29251F]">${product?.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center space-y-4">
              <Link
                href="/shop"
                className="inline-block rounded-full border border-[#29251F] px-10 py-4 font-medium uppercase tracking-[0.2em] text-[#29251F] transition hover:bg-[#29251F] hover:text-[#F7F1E8]"
              >
                Explore collection
              </Link>
              <button
                onClick={reset}
                className="block mx-auto text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#75695B] transition hover:text-[#29251F]"
              >
                Take quiz again
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
