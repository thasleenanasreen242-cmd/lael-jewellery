"use client";

export type OrderStatus = "inquiry" | "confirmed" | "processing" | "shipped" | "delivered";

export interface TrackedOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  items: { name: string; qty: number; price: number }[];
}

const KEY = "lael-orders";

export function getTrackedOrders(): TrackedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? (JSON.parse(value) as TrackedOrder[]) : [];
  } catch {
    return [];
  }
}

export function createTrackedOrder(order: Omit<TrackedOrder, "id" | "createdAt" | "status">): TrackedOrder {
  const id = `LAEL-${Date.now().toString(36).toUpperCase().slice(-8)}`;
  const tracked: TrackedOrder = { ...order, id, createdAt: new Date().toISOString(), status: "inquiry" };
  const orders = [tracked, ...getTrackedOrders()].slice(0, 20);
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(orders));
  return tracked;
}

export function findTrackedOrder(id: string): TrackedOrder | null {
  const normalized = id.trim().toUpperCase();
  return getTrackedOrders().find((order) => order.id === normalized) ?? null;
}
