"use client";

import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  productSlug: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  productSlug: string;
  productName: string;
  price: number;
  image: string;
}

const CART_STORAGE_KEY = "lael-cart";
const WISHLIST_STORAGE_KEY = "lael-wishlist";

// Cart Management
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        setItems(stored ? JSON.parse(stored) : []);
      } finally {
        setIsHydrated(true);
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productSlug === item.productSlug);
        if (existing) {
          return prev.map((i) =>
            i.productSlug === item.productSlug ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
          );
        }
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      });
    },
    []
  );

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.productSlug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug);
    } else {
      setItems((prev) => prev.map((i) => (i.productSlug === slug ? { ...i, quantity } : i)));
    }
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return { items, addItem, removeItem, updateQuantity, clearCart, getTotal, getCount, isHydrated };
}

// Wishlist Management
export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        setItems(stored ? JSON.parse(stored) : []);
      } finally {
        setIsHydrated(true);
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (!prev.some((i) => i.productSlug === item.productSlug)) {
        return [...prev, item];
      }
      return prev;
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.productSlug !== slug));
  }, []);

  const toggleItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.productSlug === item.productSlug)) {
        return prev.filter((i) => i.productSlug !== item.productSlug);
      }
      return [...prev, item];
    });
  }, []);

  const contains = (slug: string) => {
    return items.some((i) => i.productSlug === slug);
  };

  const getCount = () => {
    return items.length;
  };

  return { items, addItem, removeItem, toggleItem, contains, getCount, isHydrated };
}
