import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "./constants";

interface SEOParams {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export function generateSEOMetadata({
  title,
  description,
  ogImage,
  ogType = "website",
  canonicalUrl,
}: SEOParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const resolvedImage = ogImage || `${SITE_URL}/og-default.png`;
  const resolvedCanonical = canonicalUrl || SITE_URL;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: resolvedCanonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: resolvedCanonical,
      siteName: SITE_NAME,
      type: ogType as "website" | "article",
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME}: ${SITE_DESCRIPTION}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [resolvedImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
