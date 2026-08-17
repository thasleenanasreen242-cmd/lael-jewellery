"use client";

import { useEffect } from "react";

interface JsonLdClientProps {
  schema: Record<string, unknown>;
}

export function JsonLdClient({ schema }: JsonLdClientProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [schema]);

  return null;
}
