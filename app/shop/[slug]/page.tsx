import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { products } from "@/data/products";

const siteUrl = "https://lael-jewellery.vercel.app";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return { title: "Piece not found | LAEL Jewellery" };

  return {
    title: `${product.name} | LAEL Jewellery`,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.name} | LAEL Jewellery`,
      description: product.description,
      url: `${siteUrl}/shop/${product.slug}`,
      type: "website",
      images: product.gallery?.[0] ? [{ url: product.gallery[0], alt: product.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
