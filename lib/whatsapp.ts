export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function buildWhatsAppLink(message: string, phone?: string) {
  const sanitizedPhone = normalizePhoneNumber(phone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

export function buildCartWhatsAppMessage(items: Array<{ name: string; qty: number; price: number }>) {
  const summary = items
    .map((item) => `${item.qty}x ${item.name} - $${(item.price * item.qty).toFixed(2)}`)
    .join("\n");

  return `Hi LAEL, I'd like to order the following:\n\n${summary}\n\nPlease help me complete my order.`;
}
