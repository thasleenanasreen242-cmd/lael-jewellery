"use client";

import { useEffect } from "react";

const visuals = [
  { src: "/images/editorial-timeless.svg", alt: "Timeless LAEL jewellery editorial", label: "TIMELESS" },
  { src: "/images/life-coffee.svg", alt: "LAEL jewellery in an everyday ritual", label: "EVERYDAY" },
  { src: "/images/product-set.svg", alt: "LAEL jewellery set", label: "THE EDIT" },
  { src: "/images/life-ready.svg", alt: "Getting ready with LAEL jewellery", label: "YOUR RITUAL" },
  { src: "/images/editorial-anti-tarnish.svg", alt: "LAEL anti-tarnish jewellery editorial", label: "ANTI-TARNISH" },
];

const frameClass =
  "lael-section-visual mx-auto mb-12 max-w-7xl rounded-[2rem] border border-[#29251F]/10 bg-[#EFE5D6] p-2 shadow-[0_24px_70px_rgba(58,47,41,0.08)]";

export default function SectionImageEnhancer() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    const withoutImages = sections.filter((section) => !section.querySelector("img"));

    withoutImages.forEach((section, index) => {
      if (section.dataset.visualEnhanced === "true") return;
      const visual = visuals[index % visuals.length];

      const shell = document.createElement("div");
      shell.className = frameClass;
      shell.setAttribute("aria-hidden", "true");

      const media = document.createElement("div");
      media.className =
        "group relative aspect-[16/7] overflow-hidden rounded-[1.5rem] bg-[#E5D8C8] sm:aspect-[16/6]";

      const image = document.createElement("img");
      image.src = visual.src;
      image.alt = visual.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.className =
        "absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.025]";

      const veil = document.createElement("div");
      veil.className =
        "absolute inset-0 bg-gradient-to-t from-[#29251F]/25 via-transparent to-transparent";

      const label = document.createElement("span");
      label.className =
        "absolute bottom-5 left-5 rounded-full border border-[#FFFDF8]/40 bg-[#FFFDF8]/80 px-4 py-2 text-[0.55rem] uppercase tracking-[0.28em] text-[#29251F] backdrop-blur-md";
      label.textContent = visual.label;

      media.append(image, veil, label);
      shell.appendChild(media);
      section.insertBefore(shell, section.firstChild);
      section.dataset.visualEnhanced = "true";
    });
  }, []);

  return null;
}
