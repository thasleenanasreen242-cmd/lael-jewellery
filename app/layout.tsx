import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { FloatingBagButton } from "@/components/FloatingBagButton";
import { LaelConcierge } from "@/components/LaelConcierge";
import { LaelInteractionBridge } from "@/components/LaelInteractionBridge";
import { PageBackButton } from "@/components/PageBackButton";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant-garamond", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const siteUrl = "https://lael-jewellery.vercel.app";
export const metadata: Metadata = {
  title: "LAEL Jewellery | Anti-Tarnish Jewellery for Everyday Luxury",
  description: "Discover LAEL anti-tarnish jewellery designed for everyday wear. Shop elegant earrings, necklaces, rings and bracelets crafted for timeless style.",
  metadataBase: new URL(siteUrl), alternates: { canonical: "/" },
  keywords: ["LAEL jewellery","anti-tarnish jewellery","everyday jewellery","gold jewellery","fashion jewellery","jewellery for women"],
  openGraph: { title: "LAEL Jewellery | Timeless Anti-Tarnish Collection", description: "Everyday elegance. Quiet confidence. Timeless beauty.", url: siteUrl, siteName: "LAEL Jewellery", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "LAEL Jewellery | Anti-Tarnish Jewellery", description: "Timeless jewellery designed for everyday elegance." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};
const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "LAEL Jewellery", url: siteUrl, slogan: "Jewellery that stays beautiful." };
const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "LAEL Jewellery", url: siteUrl, description: "Anti-tarnish jewellery designed for everyday elegance.", potentialAction: { "@type": "SearchAction", target: `${siteUrl}/shop?search={search_term_string}`, "query-input": "required name=search_term_string" } };
export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}>
    <head>
      <link rel="canonical" href={siteUrl} />
      <link rel="stylesheet" href="/lael-hero-live.css" />
      <link rel="stylesheet" href="/lael-edit-uniform.css" />
      <meta name="theme-color" content="#F7F1E8" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </head>
    <body className="min-h-full flex flex-col bg-[#F7F1E8] text-[#29251F]">
      {children}
      <PageBackButton />
      <LaelInteractionBridge />
      <FloatingWhatsAppButton />
      <FloatingBagButton />
      <LaelConcierge />
    </body>
  </html>;
}
