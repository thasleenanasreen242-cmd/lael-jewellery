// LAEL Brand Constants
export const BRAND = {
  name: "LAEL",
  tagline: "JEWELLERY THAT STAYS BEAUTIFUL.",
  description: "Timeless anti-tarnish jewellery for everyday elegance.",
  mission: "Everyday elegance. Quiet confidence. Timeless beauty.",
};

// Colors
export const COLORS = {
  primary: "#F7F1E8", // Primary beige
  cream: "#FFFDF8", // Cream
  secondary: "#EFE5D6", // Secondary beige
  taupe: "#B9AA97", // Warm taupe
  brown: "#75695B", // Brown
  text: "#29251F", // Text
  gold: "#B79A6A", // Subtle gold
};

// Navigation
export const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "EDIT", href: "/shop" }, // Points to shop for now
  { label: "STORY", href: "/story" },
  { label: "JOURNAL", href: "/journal" },
  { label: "CARE", href: "/care" },
];

// WhatsApp Configuration
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+1234567890";
export const WHATSAPP_MESSAGES = {
  homepage: "Hi LAEL 👋 I'd like to know more about your jewellery.",
  product: (productName: string) => `Hi LAEL 👋 I'm interested in ${productName}. Can you tell me more?`,
  cart: () => `Hi LAEL 👋 I'd like to order. Can you help me?`,
};

// Animation timings
export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
  },
  easing: [0.22, 1, 0.36, 1] as const,
};
