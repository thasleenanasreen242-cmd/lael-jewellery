"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

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

type Listener = () => void;

let cartItems: CartItem[] = [];
let wishlistItems: WishlistItem[] = [];
let cartHydrated = false;
let wishlistHydrated = false;
const cartListeners = new Set<Listener>();
const wishlistListeners = new Set<Listener>();
let hydrationStarted = false;

function emit(listeners: Set<Listener>) {
  listeners.forEach((listener) => listener());
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed as T;
  } catch {
    return fallback;
  }
}

function persistCart() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }
}

function persistWishlist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }
}

function startHydration() {
  if (hydrationStarted || typeof window === "undefined") return;
  hydrationStarted = true;
  cartItems = safeParse<CartItem[]>(window.localStorage.getItem(CART_STORAGE_KEY), []);
  wishlistItems = safeParse<WishlistItem[]>(window.localStorage.getItem(WISHLIST_STORAGE_KEY), []);
  cartHydrated = true;
  wishlistHydrated = true;
  emit(cartListeners);
  emit(wishlistListeners);

  window.addEventListener("storage", (event) => {
    if (event.key === CART_STORAGE_KEY) {
      cartItems = safeParse<CartItem[]>(event.newValue, []);
      emit(cartListeners);
    }
    if (event.key === WISHLIST_STORAGE_KEY) {
      wishlistItems = safeParse<WishlistItem[]>(event.newValue, []);
      emit(wishlistListeners);
    }
  });
}

const subscribeCart = (listener: Listener) => {
  cartListeners.add(listener);
  startHydration();
  return () => cartListeners.delete(listener);
};
const subscribeWishlist = (listener: Listener) => {
  wishlistListeners.add(listener);
  startHydration();
  return () => wishlistListeners.delete(listener);
};
const getCartSnapshot = () => cartItems;
const getWishlistSnapshot = () => wishlistItems;
const getServerCartSnapshot = () => [] as CartItem[];
const getServerWishlistSnapshot = () => [] as WishlistItem[];

export function useCart() {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);
  const isHydrated = useSyncExternalStore(
    subscribeCart,
    () => cartHydrated,
    () => false
  );

  const addItem = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const amount = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const existing = cartItems.find((i) => i.productSlug === item.productSlug);
    if (existing) {
      cartItems = cartItems.map((i) =>
        i.productSlug === item.productSlug ? { ...i, quantity: i.quantity + amount } : i
      );
    } else {
      cartItems = [...cartItems, { ...item, quantity: amount }];
    }
    persistCart();
    emit(cartListeners);
  }, []);

  const removeItem = useCallback((slug: string) => {
    cartItems = cartItems.filter((i) => i.productSlug !== slug);
    persistCart();
    emit(cartListeners);
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      cartItems = cartItems.filter((i) => i.productSlug !== slug);
    } else {
      cartItems = cartItems.map((i) => i.productSlug === slug ? { ...i, quantity } : i);
    }
    persistCart();
    emit(cartListeners);
  }, []);

  const clearCart = useCallback(() => {
    cartItems = [];
    persistCart();
    emit(cartListeners);
  }, []);

  const getTotal = useCallback(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
  const getCount = useCallback(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  useEffect(() => {
    startHydration();
  }, []);

  return { items, addItem, removeItem, updateQuantity, clearCart, getTotal, getCount, isHydrated };
}

export function useWishlist() {
  const items = useSyncExternalStore(subscribeWishlist, getWishlistSnapshot, getServerWishlistSnapshot);
  const isHydrated = useSyncExternalStore(
    subscribeWishlist,
    () => wishlistHydrated,
    () => false
  );

  const addItem = useCallback((item: WishlistItem) => {
    if (!wishlistItems.some((i) => i.productSlug === item.productSlug)) {
      wishlistItems = [...wishlistItems, item];
      persistWishlist();
      emit(wishlistListeners);
    }
  }, []);

  const removeItem = useCallback((slug: string) => {
    wishlistItems = wishlistItems.filter((i) => i.productSlug !== slug);
    persistWishlist();
    emit(wishlistListeners);
  }, []);

  const toggleItem = useCallback((item: WishlistItem) => {
    if (wishlistItems.some((i) => i.productSlug === item.productSlug)) {
      wishlistItems = wishlistItems.filter((i) => i.productSlug !== item.productSlug);
    } else {
      wishlistItems = [...wishlistItems, item];
    }
    persistWishlist();
    emit(wishlistListeners);
  }, []);

  const toggleItemBySlug = useCallback((slug: string) => {
    wishlistItems = wishlistItems.filter((i) => i.productSlug !== slug);
    persistWishlist();
    emit(wishlistListeners);
  }, []);

  const contains = useCallback((slug: string) => items.some((i) => i.productSlug === slug), [items]);
  const getCount = useCallback(() => items.length, [items]);

  useEffect(() => {
    startHydration();
  }, []);

  return { items, addItem, removeItem, toggleItem, toggleItemBySlug, contains, getCount, isHydrated };
}
