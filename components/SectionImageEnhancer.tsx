"use client";

import { useEffect } from "react";

const visuals = [
  { src: "/images/editorial-timeless.svg", alt: "Timeless LAEL jewellery editorial" },
  { src: "/images/life-coffee.svg", alt: "LAEL jewellery in an everyday ritual" },
  { src: "/images/product-set.svg", alt: "LAEL jewellery set" },
  { src: "/images/life-ready.svg", alt: "Getting ready with LAEL jewellery" },
  { src: "/images/editorial-anti-tarnish.svg", alt: "LAEL anti-tarnish jewellery editorial" },
];

export default function SectionImageEnhancer() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    const withoutImages = sections.filter((section) => !section.querySelector("img"));

    withoutImages.forEach((section, index) => {
      if (section.dataset.visualEnhanced === "true") return;
      const visual = visuals[index % visuals.length];

      const shell = document.createElement("div");
      shell.className =
        "lael-section-visual mx-auto mb-10 max-w-7xl overflow-hidden rounded-[2rem] border border-[#29251F]/10 bg-[#EFE5D6] p-2 shadow-[0_24px_70px_rgba(58,47,41,0.07)]";
      shell.setAttribute("aria-hidden", "true");

      const image = document.createElement("img");
      image.src = visual.src;
      image.alt = visual.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.className = "h-[180px] w-full rounded-[1.5rem] object-cover sm:h-[220px] lg:h-[260px]";

      shell.appendChild(image);
      section.insertBefore(shell, section.firstChild);
      section.dataset.visualEnhanced = "true";
    });
  }, []);

  return null;
}
