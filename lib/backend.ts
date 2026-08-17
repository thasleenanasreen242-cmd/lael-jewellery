"use client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const SESSION_KEY = "lael-session-key";

function getSessionKey() {
  if (typeof window === "undefined") return "server";
  let key = window.localStorage.getItem(SESSION_KEY);
  if (!key) {
    key = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, key);
  }
  return key;
}

async function request(path: string, init: RequestInit = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Supabase environment variables are missing");
  const headers = new Headers(init.headers);
  headers.set("apikey", SUPABASE_KEY);
  headers.set("Authorization", `Bearer ${SUPABASE_KEY}`);
  headers.set("x-lael-session", getSessionKey());
  headers.set("Content-Type", "application/json");
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { ...init, headers, cache: "no-store" });
  if (!response.ok) throw new Error(`Backend request failed: ${response.status}`);
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function loadCart() { return request("cart_items?select=product_slug,product_name,price,quantity,image&order=created_at.asc"); }
export async function saveCartItem(item: { productSlug: string; productName: string; price: number; quantity: number; image: string }) {
  return request("cart_items?on_conflict=session_key,product_slug", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ session_key: getSessionKey(), product_slug: item.productSlug, product_name: item.productName, price: item.price, quantity: item.quantity, image: item.image }) });
}
export async function deleteCartItem(slug: string) { return request(`cart_items?product_slug=eq.${encodeURIComponent(slug)}`, { method: "DELETE" }); }
export async function clearBackendCart() { return request("cart_items?session_key=not.is.null", { method: "DELETE" }); }
export async function loadWishlist() { return request("wishlist_items?select=product_slug,product_name,price,image&order=created_at.asc"); }
export async function saveWishlistItem(item: { productSlug: string; productName: string; price: number; image: string }) {
  return request("wishlist_items?on_conflict=session_key,product_slug", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ session_key: getSessionKey(), product_slug: item.productSlug, product_name: item.productName, price: item.price, image: item.image }) });
}
export async function deleteWishlistItem(slug: string) { return request(`wishlist_items?product_slug=eq.${encodeURIComponent(slug)}`, { method: "DELETE" }); }
export async function createBackendOrder(order: { total: number; items: { productSlug: string; productName: string; price: number; quantity: number; image: string }[] }) {
  const orderNumber = `LAEL-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
  const created = await request("orders?select=id,order_number,status,total,created_at", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ order_number: orderNumber, session_key: getSessionKey(), total: order.total, currency: "USD", status: "inquiry" }) });
  const row = created?.[0];
  if (!row) throw new Error("Order was not created");
  await request("order_items", { method: "POST", body: JSON.stringify(order.items.map((item) => ({ order_id: row.id, product_slug: item.productSlug, product_name: item.productName, price: item.price, quantity: item.quantity, image: item.image }))) });
  return row;
}
export async function findBackendOrder(orderNumber: string) {
  const rows = await request(`orders?order_number=eq.${encodeURIComponent(orderNumber.trim().toUpperCase())}&select=id,order_number,status,total,currency,created_at,order_items(product_slug,product_name,price,quantity,image)`);
  return rows?.[0] ?? null;
}
