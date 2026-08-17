"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useCart } from "@/lib/store";

export default function CheckoutPage() {
  const { items, getTotal, isHydrated } = useCart();
  const [method, setMethod] = useState("razorpay");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const total = getTotal();

  useEffect(() => {
    if (!isHydrated) return;
    if (items.length === 0) return;
  }, [isHydrated, items.length]);

  async function pay() {
    if (!items.length) return;
    setBusy(true); setMessage("");
    try {
      const create = await fetch("/api/payments/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ total, items }) });
      const data = await create.json();
      if (!create.ok) throw new Error(data.error || "Payment setup is unavailable.");
      setOrderNumber(data.orderNumber || "");
      const Razorpay = (window as Window & { Razorpay?: new (options: Record<string, unknown>) => { open: () => void } }).Razorpay;
      if (!Razorpay) throw new Error("Payment checkout is still loading. Please try again.");
      const checkout = new Razorpay({ key: data.keyId, amount: data.amount, currency: data.currency, name: "LAEL", description: "LAEL Jewellery", order_id: data.paymentOrderId, prefill: {}, theme: { color: "#29251F" }, handler: async (response: Record<string, string>) => {
        const verify = await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...response, orderNumber: data.orderNumber }) });
        const result = await verify.json();
        if (!verify.ok) setMessage(result.error || "Payment verification failed.");
        else setMessage("Payment successful. Your order is confirmed.");
      }});
      checkout.open();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Payment could not be started."); }
    finally { setBusy(false); }
  }

  if (!isHydrated) return <main className="min-h-screen bg-[#F7F1E8]" />;
  if (!items.length) return <main className="min-h-screen bg-[#F7F1E8] px-6 py-32 text-center text-[#29251F]"><h1 className="font-serif text-5xl">Your bag is empty.</h1><Link href="/shop" className="mt-8 inline-block rounded-full bg-[#29251F] px-8 py-4 text-sm uppercase tracking-[.16em] text-[#F7F1E8]">Shop LAEL</Link></main>;

  return <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    <main className="min-h-screen bg-[#F7F1E8] px-5 py-28 text-[#29251F] sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <section><Link href="/shop" className="text-xs uppercase tracking-[.2em] text-[#75695B]">← Back to shop</Link><p className="mt-8 text-xs uppercase tracking-[.3em] text-[#75695B]">LAEL checkout</p><h1 className="mt-3 font-serif text-5xl sm:text-6xl">Complete your order.</h1><div className="mt-10 space-y-4 rounded-3xl border border-[#29251F]/10 bg-[#FFFDF8] p-6 sm:p-8"><h2 className="font-serif text-2xl">Payment</h2><button type="button" onClick={() => setMethod("razorpay")} className={`w-full rounded-2xl border p-5 text-left ${method === "razorpay" ? "border-[#29251F] bg-[#F7F1E8]" : "border-[#29251F]/10"}`}><span className="font-medium">Pay securely online</span><span className="mt-1 block text-sm text-[#75695B]">UPI · Cards · Net banking · Wallets</span></button><button type="button" onClick={() => setMethod("cod")} className={`w-full rounded-2xl border p-5 text-left ${method === "cod" ? "border-[#29251F] bg-[#F7F1E8]" : "border-[#29251F]/10"}`}><span className="font-medium">Cash on delivery</span><span className="mt-1 block text-sm text-[#75695B]">Pay when your order arrives, where available.</span></button>{message && <div className="rounded-xl bg-[#F0E7DA] p-4 text-sm">{message}</div>}</div></section>
        <aside className="h-fit rounded-3xl border border-[#29251F]/10 bg-[#FFFDF8] p-6 sm:p-8"><p className="text-xs uppercase tracking-[.2em] text-[#75695B]">Order summary</p><div className="mt-6 space-y-4">{items.map(item => <div key={item.productSlug} className="flex justify-between gap-4 text-sm"><span>{item.productName} × {item.quantity}</span><span>${(item.price * item.quantity).toFixed(2)}</span></div>)}</div><div className="my-6 border-t border-[#29251F]/10" /><div className="flex justify-between font-serif text-2xl"><span>Total</span><span>${total.toFixed(2)}</span></div>{method === "razorpay" ? <button disabled={busy} onClick={pay} className="mt-7 w-full rounded-xl bg-[#29251F] py-4 text-sm font-medium uppercase tracking-[.15em] text-[#F7F1E8] disabled:opacity-50">{busy ? "Preparing payment…" : `Pay $${total.toFixed(2)}`}</button> : <button onClick={() => setMessage("Cash on delivery will be confirmed with LAEL after checkout.")} className="mt-7 w-full rounded-xl bg-[#29251F] py-4 text-sm font-medium uppercase tracking-[.15em] text-[#F7F1E8]">Place COD request</button>}{orderNumber && <Link href={`/track-order?order=${encodeURIComponent(orderNumber)}`} className="mt-4 block text-center text-sm underline">Track {orderNumber}</Link>}</aside>
      </div>
    </main>
  </>;
}
