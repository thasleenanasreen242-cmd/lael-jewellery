export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function buildWhatsAppLink(message: string, phone?: string) {
  const configuredPhone = phone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const sanitizedPhone = normalizePhoneNumber(configuredPhone);

  if (!sanitizedPhone) return "#";

  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

export function buildCartWhatsAppMessage(items: Array<{ name: string; qty: number; price: number }>) {
  const summary = items
    .map((item) => `${item.qty}x ${item.name} - $${(item.price * item.qty).toFixed(2)}`)
    .join("\n");

  return `Hi LAEL, I'd like to order the following:\n\n${summary}\n\nPlease help me complete my order.`;
}
