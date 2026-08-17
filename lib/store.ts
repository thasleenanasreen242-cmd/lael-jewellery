"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { deleteCartItem, deleteWishlistItem, loadCart, loadWishlist, saveCartItem, saveWishlistItem, clearBackendCart } from "@/lib/backend";

export interface CartItem { productSlug:string; productName:string; price:number; quantity:number; image:string; }
export interface WishlistItem { productSlug:string; productName:string; price:number; image:string; }
type Listener=()=>void;
let cartItems:CartItem[]=[]; let wishlistItems:WishlistItem[]=[]; let cartHydrated=false; let wishlistHydrated=false; let hydrationStarted=false;
const cartListeners=new Set<Listener>(); const wishlistListeners=new Set<Listener>();
const emit=(set:Set<Listener>)=>set.forEach(fn=>fn());
const subscribeCart=(fn:Listener)=>{cartListeners.add(fn); return()=>cartListeners.delete(fn)};
const subscribeWishlist=(fn:Listener)=>{wishlistListeners.add(fn); return()=>wishlistListeners.delete(fn)};
const getCartSnapshot=()=>cartItems; const getWishlistSnapshot=()=>wishlistItems;
const getServerCartSnapshot=()=>[] as CartItem[]; const getServerWishlistSnapshot=()=>[] as WishlistItem[];
function backendCart(item:CartItem){saveCartItem(item).catch(()=>{});} function backendWishlist(item:WishlistItem){saveWishlistItem(item).catch(()=>{});}
function startHydration(){
  if(hydrationStarted||typeof window==="undefined") return; hydrationStarted=true;
  Promise.allSettled([loadCart(),loadWishlist()]).then(([cart,wish])=>{
    if(cart.status==="fulfilled"&&Array.isArray(cart.value)) cartItems=cart.value.map((x:any)=>({productSlug:x.product_slug,productName:x.product_name,price:Number(x.price),quantity:Number(x.quantity),image:x.image}));
    if(wish.status==="fulfilled"&&Array.isArray(wish.value)) wishlistItems=wish.value.map((x:any)=>({productSlug:x.product_slug,productName:x.product_name,price:Number(x.price),image:x.image}));
    cartHydrated=true; wishlistHydrated=true; emit(cartListeners); emit(wishlistListeners);
  }).catch(()=>{cartHydrated=true;wishlistHydrated=true;emit(cartListeners);emit(wishlistListeners)});
}
export function useCart(){
  const items=useSyncExternalStore(subscribeCart,getCartSnapshot,getServerCartSnapshot); const isHydrated=useSyncExternalStore(subscribeCart,()=>cartHydrated,()=>false);
  const addItem=useCallback((item:Omit<CartItem,"quantity">&{quantity?:number})=>{const amount=item.quantity&&item.quantity>0?item.quantity:1;const existing=cartItems.find(i=>i.productSlug===item.productSlug);cartItems=existing?cartItems.map(i=>i.productSlug===item.productSlug?{...i,quantity:i.quantity+amount}:i):[...cartItems,{...item,quantity:amount}];const saved=cartItems.find(i=>i.productSlug===item.productSlug)!;backendCart(saved);emit(cartListeners)},[]);
  const removeItem=useCallback((slug:string)=>{cartItems=cartItems.filter(i=>i.productSlug!==slug);deleteCartItem(slug).catch(()=>{});emit(cartListeners)},[]);
  const updateQuantity=useCallback((slug:string,quantity:number)=>{if(quantity<=0){cartItems=cartItems.filter(i=>i.productSlug!==slug);deleteCartItem(slug).catch(()=>{});}else{cartItems=cartItems.map(i=>i.productSlug===slug?{...i,quantity}:i);const saved=cartItems.find(i=>i.productSlug===slug);if(saved)backendCart(saved);}emit(cartListeners)},[]);
  const clearCart=useCallback(()=>{cartItems=[];clearBackendCart().catch(()=>{});emit(cartListeners)},[]);
  const getTotal=useCallback(()=>items.reduce((t,i)=>t+i.price*i.quantity,0),[items]); const getCount=useCallback(()=>items.reduce((t,i)=>t+i.quantity,0),[items]); useEffect(()=>{startHydration()},[]);
  return {items,addItem,removeItem,updateQuantity,clearCart,getTotal,getCount,isHydrated};
}
export function useWishlist(){
  const items=useSyncExternalStore(subscribeWishlist,getWishlistSnapshot,getServerWishlistSnapshot); const isHydrated=useSyncExternalStore(subscribeWishlist,()=>wishlistHydrated,()=>false);
  const addItem=useCallback((item:WishlistItem)=>{if(!wishlistItems.some(i=>i.productSlug===item.productSlug)){wishlistItems=[...wishlistItems,item];backendWishlist(item);emit(wishlistListeners)}},[]);
  const removeItem=useCallback((slug:string)=>{wishlistItems=wishlistItems.filter(i=>i.productSlug!==slug);deleteWishlistItem(slug).catch(()=>{});emit(wishlistListeners)},[]);
  const toggleItem=useCallback((item:WishlistItem)=>{if(wishlistItems.some(i=>i.productSlug===item.productSlug)){wishlistItems=wishlistItems.filter(i=>i.productSlug!==item.productSlug);deleteWishlistItem(item.productSlug).catch(()=>{});}else{wishlistItems=[...wishlistItems,item];backendWishlist(item);}emit(wishlistListeners)},[]);
  const toggleItemBySlug=useCallback((slug:string)=>{wishlistItems=wishlistItems.filter(i=>i.productSlug!==slug);deleteWishlistItem(slug).catch(()=>{});emit(wishlistListeners)},[]);
  const contains=useCallback((slug:string)=>items.some(i=>i.productSlug===slug),[items]); const getCount=useCallback(()=>items.length,[items]); useEffect(()=>{startHydration()},[]);
  return {items,addItem,removeItem,toggleItem,toggleItemBySlug,contains,getCount,isHydrated};
}
