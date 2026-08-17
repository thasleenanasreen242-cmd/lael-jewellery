"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart, useWishlist } from "@/lib/store";

const HOME_PRODUCTS: Record<string, { slug: string; category: string; price: number; image: string }> = {
  "Rhea Drop": { slug: "rhea-drop", category: "Earrings", price: 98, image: "/images/product-earrings.svg" },
  "Aster Chain": { slug: "aster-chain", category: "Necklaces", price: 152, image: "/images/product-necklace.svg" },
  "Soleil Ring": { slug: "soleil-ring", category: "Rings", price: 118, image: "/images/product-ring.svg" },
  "Alina Cuff": { slug: "alina-cuff", category: "Bracelets", price: 136, image: "/images/product-bracelet.svg" },
  "Dune Set": { slug: "dune-set", category: "Sets", price: 224, image: "/images/product-set.svg" },
  "Mila Hoops": { slug: "mila-hoops", category: "Earrings", price: 88, image: "/images/product-earrings.svg" },
  "Aster Pendant": { slug: "aster-pendant", category: "Necklaces", price: 134, image: "/images/product-necklace.svg" },
  "Etta Cuff": { slug: "etta-cuff", category: "Bracelets", price: 120, image: "/images/product-bracelet.svg" },
  "Iris Stack Ring": { slug: "iris-stack-ring", category: "Rings", price: 102, image: "/images/product-ring.svg" },
  "Luna Set": { slug: "luna-set", category: "Sets", price: 210, image: "/images/product-set.svg" },
};

function getProductFromCard(button: HTMLElement) {
  const card = button.closest("article");
  if (!card) return null;
  const heading = card.querySelector("h3");
  const name = heading?.textContent?.trim();
  if (!name) return null;
  const data = HOME_PRODUCTS[name];
  if (!data) return null;
  return { ...data, name };
}

export function LaelInteractionBridge() {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleItem } = useWishlist();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button") as HTMLButtonElement | null;
      if (!button) return;

      const label = button.getAttribute("aria-label")?.toLowerCase() ?? "";
      const text = button.textContent?.trim().toLowerCase() ?? "";

      if (text === "wishlist") {
        event.preventDefault();
        router.push("/wishlist");
        return;
      }

      if (text === "quick add") {
        const product = getProductFromCard(button);
        if (!product) return;
        event.preventDefault();
        addItem({ productSlug: product.slug, productName: product.name, price: product.price, image: product.image });
        button.textContent = "✓ ADDED";
        window.setTimeout(() => { button.textContent = "Quick add"; }, 1400);
        return;
      }

      if (label.startsWith("save ")) {
        const product = getProductFromCard(button);
        if (!product) return;
        event.preventDefault();
        toggleItem({ productSlug: product.slug, productName: product.name, price: product.price, image: product.image });
        button.textContent = button.textContent?.includes("♥") ? "♡" : "♥";
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [addItem, toggleItem, router]);

  return null;
}
