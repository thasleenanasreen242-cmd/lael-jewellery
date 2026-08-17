export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LAEL Jewellery",
    description: "Anti-tarnish jewellery for everyday luxury",
    url: "https://lael-jewellery.vercel.app",
    logo: "https://lael-jewellery.vercel.app/logo.png",
    sameAs: ["https://instagram.com/lael"],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LAEL Jewellery",
    url: "https://lael-jewellery.vercel.app",
  };
}

export function generateProductSchema(product: {
  slug: string;
  name: string;
  description: string;
  price: number;
  gallery: string[];
  material: string;
  badge?: string;
}) {
  const image = product.gallery[0] || "https://lael-jewellery.vercel.app/logo.png";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: image.startsWith("http") ? image : `https://lael-jewellery.vercel.app${image}`,
    brand: {
      "@type": "Brand",
      name: "LAEL",
    },
    material: product.material,
    offers: {
      "@type": "Offer",
      url: `https://lael-jewellery.vercel.app/shop/${product.slug}`,
      priceCurrency: "INR",
      price: product.price.toString(),
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  date: string;
  slug?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description || article.title,
    datePublished: article.date,
    url: `https://lael-jewellery.vercel.app/journal/${article.slug || "article"}`,
    author: {
      "@type": "Organization",
      name: "LAEL",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
