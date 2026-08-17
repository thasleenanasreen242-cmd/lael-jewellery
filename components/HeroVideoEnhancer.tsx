"use client";

import { useEffect } from "react";

export default function HeroVideoEnhancer() {
  useEffect(() => {
    const hero = document.querySelector("main section:first-of-type");
    if (!hero || hero.querySelector(".lael-hero-video")) return;

    const image = hero.querySelector<HTMLImageElement>("img[alt*='LAEL jewellery']");
    const wrapper = image?.parentElement;
    if (!image || !wrapper) return;

    const video = document.createElement("video");
    video.className = "lael-hero-video absolute inset-0 h-full w-full object-cover";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", "LAEL jewellery editorial hero video");

    const source = document.createElement("source");
    source.src = "/lael-hero.mp4";
    source.type = "video/mp4";
    video.appendChild(source);

    wrapper.classList.add("relative");
    image.classList.add("transition-opacity", "duration-500");
    wrapper.appendChild(video);
    image.style.opacity = "0";

    video.play().catch(() => {
      image.style.opacity = "1";
      video.style.display = "none";
    });
  }, []);

  return null;
}
