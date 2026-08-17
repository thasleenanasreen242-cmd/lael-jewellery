"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { findTrackedOrder, TrackedOrder, OrderStatus } from "@/lib/orders";

const steps: { key: OrderStatus; label: string }[] = [
  { key: "inquiry", label: "Order received" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Preparing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default function TrackOrderPage() {
  const [value, setValue] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [searched, setSearched] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setOrder(findTrackedOrder(value));
    setSearched(true);
  }

  const currentIndex = order ? steps.findIndex((step) => step.key === order.status) : -1;

  return (
    <main className="min-h-screen bg-[#F7F1E8] px-5 py-28 text-[#29251F] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-[0.68rem] uppercase tracking-[0.32em] text-[#75695B]">LAEL Care</p>
        <h1 className="font-serif text-5xl tracking-[-0.05em] sm:text-7xl">Track your order.</h1>
        <p className="mt-6 max-w-xl text-[#75695B]">Enter your LAEL order number to see the latest status of your piece.</p>

        <form onSubmit={submit} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="LAEL-XXXXXXXX" className="min-h-14 flex-1 rounded-xl border border-[#29251F]/15 bg-[#FFFDF8] px-5 outline-none placeholder:text-[#75695B]/60 focus:border-[#29251F]/40" aria-label="Order number" />
          <button type="submit" className="min-h-14 rounded-xl bg-[#29251F] px-8 text-sm font-medium uppercase tracking-[0.16em] text-[#F7F1E8] transition hover:bg-[#3d3530]">Track order</button>
        </form>

        {searched && !order && <div className="mt-8 rounded-2xl border border-[#29251F]/10 bg-[#FFFDF8] p-6 text-[#75695B]">We couldn't find that order number on this device. If you ordered through WhatsApp, please use the order number saved after creating the order or contact LAEL with your order details.</div>}

        {order && (
          <section className="mt-10 rounded-3xl border border-[#29251F]/10 bg-[#FFFDF8] p-6 shadow-[0_20px_60px_rgba(58,47,41,.06)] sm:p-8">
            <div className="flex flex-col justify-between gap-3 border-b border-[#29251F]/10 pb-6 sm:flex-row sm:items-center">
              <div><p className="text-xs uppercase tracking-[0.2em] text-[#75695B]">Order</p><p className="mt-1 text-2xl font-medium">{order.id}</p></div>
              <p className="font-serif text-2xl">${order.total.toFixed(2)}</p>
            </div>
            <div className="py-8">
              {steps.map((step, index) => <div key={step.key} className="flex items-start gap-4"><div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${index <= currentIndex ? "border-[#29251F] bg-[#29251F] text-[#F7F1E8]" : "border-[#29251F]/20 text-[#75695B]"}`}>{index <= currentIndex ? "✓" : index + 1}</div><div className="pb-7"><p className={index <= currentIndex ? "font-medium" : "text-[#75695B]"}>{step.label}</p>{index === currentIndex && <p className="mt-1 text-sm text-[#75695B]">Current status</p>}</div></div>)}
            </div>
            <div className="border-t border-[#29251F]/10 pt-6"><p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#75695B]">Items</p>{order.items.map((item) => <div key={item.name} className="flex justify-between py-2 text-sm"><span>{item.name} × {item.qty}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>)}</div>
          </section>
        )}

        <div className="mt-10 flex flex-wrap gap-3"><Link href="/shop" className="rounded-full border border-[#29251F]/20 px-6 py-3 text-sm uppercase tracking-[0.15em]">Continue shopping</Link><Link href="/care" className="rounded-full border border-[#29251F]/20 px-6 py-3 text-sm uppercase tracking-[0.15em]">Jewellery care</Link></div>
      </div>
    </main>
  );
}
