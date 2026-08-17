import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lael-jewellery.vercel.app";
  const now = new Date();

  const staticRoutes = [
    ["/", 1],
    ["/shop", 0.9],
    ["/story", 0.8],
    ["/journal", 0.8],
    ["/care", 0.7],
    ["/find-your-style", 0.7],
    ["/contact", 0.6],
    ["/faq", 0.6],
    ["/shipping", 0.6],
  ] as const;

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map(([route, priority]) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" || route === "/shop" ? "weekly" : "monthly",
    priority,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleSlugs = [
    "how-to-layer-necklaces",
    "anti-tarnish-jewellery-care",
    "build-everyday-collection",
    "essentials-every-woman",
    "choose-jewellery-for-style",
    "jewellery-gift-guide",
  ];

  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${baseUrl}/journal/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...articlePages];
}
