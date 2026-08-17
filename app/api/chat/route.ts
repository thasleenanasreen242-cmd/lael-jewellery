import { NextRequest, NextResponse } from "next/server";

const fallbackResponses: Record<string, string> = {
  "help me choose": "I can help narrow it down by style. For everyday polish, start with The Aurelia Necklace or The Solis Hoops. For a richer statement, try The Noor Set.",
  "what&apos;s anti-tarnish": "Our LAEL pieces are designed with anti-tarnish finishes and mindful materials to stay beautiful through everyday wear. We recommend storing them dry and sealed in their pouch when not in use.",
  "jewellery care": "Wipe gently after wear, store in a dry pouch, and avoid perfume or water when possible. A soft cloth and a breathable storage space help preserve the shine.",
  "gift ideas": "Gift-worthy pieces include The Noor Set, The Aurelia Necklace, and The Elara Bracelet. They feel personal without being overly formal.",
  "find my style": "If you love quiet luxury, try minimal silhouettes. For a layered look, choose rings and necklaces in mixed tones. For evenings, a statement cuff or set adds a graceful finish.",
  "shipping": "Shipping is typically processed within a few business days, and we’ll share tracking as soon as your order is on the way.",
  "returns": "Returns are available on eligible pieces within the stated return window. We’re happy to help if there’s an issue with your order.",
  "size": "If you’re unsure, our team can help with sizing guidance. For necklaces, adjustable lengths are easiest. For rings, a stackable style is often the most flexible.",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = String(body?.message || "").trim();

    const lowered = message.toLowerCase();
    const match = Object.keys(fallbackResponses).find((key) => lowered.includes(key));
    const response = match ? fallbackResponses[match] : "I’d love to help you find the right piece. For everyday wear, a necklace or hoops are a classic starting point. If you'd like, I can suggest a piece based on your style or occasion.";

    return NextResponse.json({
      role: "assistant",
      text: response,
      fallback: true,
    });
  } catch {
    return NextResponse.json(
      {
        role: "assistant",
        text: "I’m here to help you choose the right piece for your everyday rituals.",
        fallback: true,
      },
      { status: 200 }
    );
  }
}
