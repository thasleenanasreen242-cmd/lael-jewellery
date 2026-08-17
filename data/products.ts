export type Product = {
  slug: string;
  name: string;
  price: number;
  category: "Necklaces" | "Earrings" | "Bracelets" | "Rings" | "Sets";
  material: string;
  style: string;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  badge: string;
  size: string;
  care: string;
};

export const categories = ["ALL", "NECKLACES", "EARRINGS", "BRACELETS", "RINGS", "SETS"] as const;

export const products: Product[] = [
  {
    slug: "aurelia-necklace",
    name: "The Aurelia Necklace",
    price: 168,
    category: "Necklaces",
    material: "18k gold vermeil over stainless steel",
    style: "Everyday elegance",
    image: "/images/product-necklace.svg",
    gallery: ["/images/product-necklace.svg", "/images/editorial-everyday.svg", "/images/editorial-timeless.svg"],
    description:
      "A softly sculpted silhouette designed to layer beautifully with your daily essentials and keep its warm glow from morning to evening.",
    shortDescription: "Softly sculpted necklace for daily layering.",
    badge: "Anti-tarnish",
    size: "Adjustable 16–18 in.",
    care: "Store flat in its pouch and wipe gently after wear.",
  },
  {
    slug: "solis-hoops",
    name: "The Solis Hoops",
    price: 124,
    category: "Earrings",
    material: "Champagne gold finish",
    style: "Modern classic",
    image: "/images/product-earrings.svg",
    gallery: ["/images/product-earrings.svg", "/images/editorial-everyday.svg", "/images/look-minimalist.svg"],
    description:
      "A refined statement hoop that feels light enough for everyday wear and polished enough for a dinner moment.",
    shortDescription: "Polished hoops made for easy everyday shine.",
    badge: "Lightweight",
    size: "Standard hoop size",
    care: "Keep dry and polished with the included cloth.",
  },
  {
    slug: "elara-bracelet",
    name: "The Elara Bracelet",
    price: 142,
    category: "Bracelets",
    material: "Gold-tone stainless steel",
    style: "Quiet statement",
    image: "/images/product-bracelet.svg",
    gallery: ["/images/product-bracelet.svg", "/images/look-stack.svg", "/images/masonry-2.svg"],
    description:
      "A balanced cuff with a softly curved profile that slips from a weekday routine to a special evening look in one graceful move.",
    shortDescription: "Curved cuff with a polished, effortless finish.",
    badge: "Everyday ready",
    size: "One size fits most",
    care: "Avoid harsh fragrances and moisture for lasting shine.",
  },
  {
    slug: "celeste-ring",
    name: "The Celeste Ring",
    price: 118,
    category: "Rings",
    material: "Champagne finish stainless steel",
    style: "Minimal stack",
    image: "/images/product-ring.svg",
    gallery: ["/images/product-ring.svg", "/images/look-statement.svg", "/images/life-ready.svg"],
    description:
      "Clean lines, sculptural balance and easy wear make this ring a favorite for layered styling and understated luxury.",
    shortDescription: "Stackable ring with refined, sculptural lines.",
    badge: "Stackable",
    size: "Available in sizes 5–9",
    care: "Store in a dry pouch and avoid friction with harder metals.",
  },
  {
    slug: "noor-set",
    name: "The Noor Set",
    price: 236,
    category: "Sets",
    material: "Gold vermeil finish",
    style: "Gift-worthy edit",
    image: "/images/product-set.svg",
    gallery: ["/images/product-set.svg", "/images/product-earrings.svg", "/images/product-necklace.svg"],
    description:
      "A coordinated set with a refined finish for gifting, getting ready, or creating a signature daily moment.",
    shortDescription: "A coordinated set for polished everyday styling.",
    badge: "Gift-ready",
    size: "Includes necklace and earrings",
    care: "Keep each piece together in its presentation pouch.",
  },
  {
    slug: "luna-chain",
    name: "The Luna Chain",
    price: 154,
    category: "Necklaces",
    material: "Anti-tarnish gold-tone steel",
    style: "Day to night",
    image: "/images/product-necklace.svg",
    gallery: ["/images/product-necklace.svg", "/images/masonry-1.svg", "/images/insta-6.svg"],
    description:
      "A fluid chain made to sit effortlessly against the skin and transform from daily wear to evening styling.",
    shortDescription: "Fluid chain designed for daily layering.",
    badge: "Anti-tarnish",
    size: "Adjustable 16–20 in.",
    care: "Remove before swimming or contact with perfume.",
  },
];
