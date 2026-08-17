import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { total, items } = await request.json();
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ error: "Online payment is not configured yet." }, { status: 503 });
    if (!Array.isArray(items) || !items.length || !Number.isFinite(Number(total)) || Number(total) <= 0) return NextResponse.json({ error: "Invalid order." }, { status: 400 });
    const amount = Math.round(Number(total) * 100);
    const orderNumber = `LAEL-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" }, body: JSON.stringify({ amount, currency: process.env.RAZORPAY_CURRENCY || "USD", receipt: orderNumber, notes: { brand: "LAEL" } }) });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.description || "Payment gateway error." }, { status: 502 });
    return NextResponse.json({ keyId, amount: data.amount, currency: data.currency, paymentOrderId: data.id, orderNumber });
  } catch { return NextResponse.json({ error: "Unable to create payment order." }, { status: 500 }); }
}
