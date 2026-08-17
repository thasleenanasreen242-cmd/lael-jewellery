// LAEL Brand Constants
export const BRAND = {
  name: "LAEL",
  tagline: "JEWELLERY THAT STAYS BEAUTIFUL.",
  description: "Timeless anti-tarnish jewellery for everyday elegance.",
  mission: "Everyday elegance. Quiet confidence. Timeless beauty.",
};

export const COLORS = {
  primary: "#F7F1E8",
  cream: "#FFFDF8",
  secondary: "#EFE5D6",
  taupe: "#B9AA97",
  brown: "#75695B",
  text: "#29251F",
  gold: "#B79A6A",
};

export const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "EDIT", href: "/shop" },
  { label: "STORY", href: "/story" },
  { label: "JOURNAL", href: "/journal" },
  { label: "CARE", href: "/care" },
];

// LAEL WhatsApp business number (India).
// Can still be overridden with NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919847641809";

export const WHATSAPP_MESSAGES = {
  homepage: "Hi LAEL 👋 I'd like to know more about your jewellery.",
  product: (productName: string) => `Hi LAEL 👋 I'm interested in ${productName}. Can you tell me more?`,
  cart: (items?: string) => `Hi LAEL 👋 I'd like help with my order.${items ? `\n\n${items}` : ""}`,
};

export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
  },
  easing: [0.22, 1, 0.36, 1] as const,
};
