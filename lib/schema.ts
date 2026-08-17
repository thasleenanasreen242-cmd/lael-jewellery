export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LAEL Jewellery",
    description: "Anti-tarnish jewellery for everyday luxury",
    url: "https://lael-jewellery.vercel.app",
    logo: "https://lael-jewellery.vercel.app/logo.png",
    sameAs: [
      "https://instagram.com/lael",
      "https://twitter.com/lael",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://wa.me/1234567890",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LAEL Jewellery",
    url: "https://lael-jewellery.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://lael-jewellery.vercel.app?search={search_term_string}",
      },
      query_input: "required name=search_term_string",
    },
  };
}

export function generateProductSchema(product: {
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  material: string;
  badge: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://lael-jewellery.vercel.app${product.image}`,
    brand: {
      "@type": "Brand",
      name: "LAEL",
    },
    offers: {
      "@type": "Offer",
      url: `https://lael-jewellery.vercel.app/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toString(),
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: new Date(article.date).toISOString(),
    url: `https://lael-jewellery.vercel.app/journal/${article.slug}`,
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
