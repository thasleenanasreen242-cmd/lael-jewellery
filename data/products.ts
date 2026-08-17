export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  material: string;
  finish: string;
  care: string;
};

export const products: Product[] = [
  {
    slug: "rhea-drop",
    name: "Rhea Drop",
    category: "Earrings",
    price: 98,
    image: "/images/product-earrings.svg",
    description: "A sculptural drop silhouette designed to bring a quiet statement to everyday dressing.",
    material: "Stainless steel",
    finish: "18k gold-tone anti-tarnish finish",
    care: "Keep dry, avoid direct fragrance, and wipe gently after wear.",
  },
  {
    slug: "aster-chain",
    name: "Aster Chain",
    category: "Necklaces",
    price: 152,
    image: "/images/product-necklace.svg",
    description: "A refined everyday chain with a soft architectural profile that layers beautifully.",
    material: "Stainless steel",
    finish: "18k gold-tone anti-tarnish finish",
    care: "Store separately in a dry pouch and wipe with a soft cloth.",
  },
  {
    slug: "soleil-ring",
    name: "Soleil Ring",
    category: "Rings",
    price: 118,
    image: "/images/product-ring.svg",
    description: "A rounded statement ring made for stacking, styling, and wearing on repeat.",
    material: "Stainless steel",
    finish: "18k gold-tone anti-tarnish finish",
    care: "Avoid prolonged moisture and store away from other jewellery.",
  },
  {
    slug: "alina-cuff",
    name: "Alina Cuff",
    category: "Bracelets",
    price: 136,
    image: "/images/product-bracelet.svg",
    description: "A clean sculptural cuff that adds polished structure to a minimal look.",
    material: "Stainless steel",
    finish: "18k gold-tone anti-tarnish finish",
    care: "Wipe after wear and keep away from perfume and harsh chemicals.",
  },
  {
    slug: "dune-set",
    name: "Dune Set",
    category: "Sets",
    price: 224,
    image: "/images/product-set.svg",
    description: "A coordinated jewellery set designed to make everyday styling effortless.",
    material: "Stainless steel",
    finish: "18k gold-tone anti-tarnish finish",
    care: "Keep each piece dry and stored separately when not in use.",
  },
  {
    slug: "mila-hoops",
    name: "Mila Hoops",
    category: "Earrings",
    price: 88,
    image: "/images/product-earrings.svg",
    description: "An easy hoop silhouette with enough presence for evenings and enough simplicity for every day.",
    material: "Stainless steel",
    finish: "18k gold-tone anti-tarnish finish",
    care: "Wipe gently after use and store in a dry jewellery pouch.",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}
