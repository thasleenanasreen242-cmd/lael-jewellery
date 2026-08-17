import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { LaelConcierge } from "@/components/LaelConcierge";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LAEL Jewellery | Anti-Tarnish Jewellery for Everyday Luxury",
  description: "Discover LAEL anti-tarnish jewellery designed for everyday wear. Shop elegant earrings, necklaces, rings and bracelets crafted for timeless style.",
  metadataBase: new URL("https://lael-jewellery.vercel.app"),
  openGraph: {
    title: "LAEL Jewellery | Timeless Anti-Tarnish Collection",
    description: "Everyday elegance. Quiet confidence. Timeless beauty.",
    url: "https://lael-jewellery.vercel.app",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://lael-jewellery.vercel.app" />
        <meta name="theme-color" content="#F7F1E8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F1E8] text-[#29251F]">
        {children}
        <FloatingWhatsAppButton />
        <LaelConcierge />
      </body>
    </html>
  );
}
