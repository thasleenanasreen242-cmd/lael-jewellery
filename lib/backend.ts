"use client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ndtgdwuwmuzohhkjjgzr.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_Jgp7VJusCOn3NmiRThgGoA_8vi0OnbT";
const SESSION_KEY = "lael-session-key";

function getSessionKey() {
  if (typeof window === "undefined") return "server";
  let key = window.localStorage.getItem(SESSION_KEY);
  if (!key) { key = crypto.randomUUID(); window.localStorage.setItem(SESSION_KEY, key); }
  return key;
}
async function request(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("apikey", SUPABASE_KEY); headers.set("Authorization", `Bearer ${SUPABASE_KEY}`); headers.set("Content-Type", "application/json");
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { ...init, headers, cache: "no-store" });
  if (!response.ok) throw new Error(`Backend request failed: ${response.status}`);
  const text = await response.text(); return text ? JSON.parse(text) : null;
}
const sessionFilter = () => `session_key=eq.${encodeURIComponent(getSessionKey())}`;
export async function loadCart() { return request(`cart_items?${sessionFilter()}&select=product_slug,product_name,price,quantity,image&order=created_at.asc`); }
export async function saveCartItem(item:{productSlug:string;productName:string;price:number;quantity:number;image:string}) { return request("cart_items?on_conflict=session_key,product_slug",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({session_key:getSessionKey(),product_slug:item.productSlug,product_name:item.productName,price:item.price,quantity:item.quantity,image:item.image})}); }
export async function deleteCartItem(slug:string) { return request(`cart_items?${sessionFilter()}&product_slug=eq.${encodeURIComponent(slug)}`,{method:"DELETE"}); }
export async function clearBackendCart() { return request(`cart_items?${sessionFilter()}`,{method:"DELETE"}); }
export async function loadWishlist() { return request(`wishlist_items?${sessionFilter()}&select=product_slug,product_name,price,image&order=created_at.asc`); }
export async function saveWishlistItem(item:{productSlug:string;productName:string;price:number;image:string}) { return request("wishlist_items?on_conflict=session_key,product_slug",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({session_key:getSessionKey(),product_slug:item.productSlug,product_name:item.productName,price:item.price,image:item.image})}); }
export async function deleteWishlistItem(slug:string) { return request(`wishlist_items?${sessionFilter()}&product_slug=eq.${encodeURIComponent(slug)}`,{method:"DELETE"}); }
export async function createBackendOrder(order:{total:number;items:{productSlug:string;productName:string;price:number;quantity:number;image:string}[]}) { const orderNumber=`LAEL-${crypto.randomUUID().replaceAll("-","").slice(0,8).toUpperCase()}`; const created=await request("orders?select=id,order_number,status,total,created_at",{method:"POST",headers:{Prefer:"return=representation"},body:JSON.stringify({order_number:orderNumber,session_key:getSessionKey(),total:order.total,currency:"USD",status:"inquiry"})}); const row=created?.[0]; if(!row) throw new Error("Order was not created"); await request("order_items",{method:"POST",body:JSON.stringify(order.items.map(i=>({order_id:row.id,product_slug:i.productSlug,product_name:i.productName,price:i.price,quantity:i.quantity,image:i.image})))}); return row; }
export async function findBackendOrder(orderNumber:string) { const rows=await request(`orders?order_number=eq.${encodeURIComponent(orderNumber.trim().toUpperCase())}&${sessionFilter()}&select=id,order_number,status,total,currency,created_at,order_items(product_slug,product_name,price,quantity,image)`); return rows?.[0]??null; }
