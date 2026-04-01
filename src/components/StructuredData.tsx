import { SITE_URL } from "@/lib/constants";
import { getAuthor } from "@/lib/authors";
import type { EditorialArticle, ShowDefinition } from "@/lib/types";

interface ArticleSchemaProps {
  article: EditorialArticle;
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const author = getAuthor(article.author);

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.subtitle || article.title,
    image: article.imageUrl || `${SITE_URL}/og-default.png`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: author.displayName,
      url: `${SITE_URL}/team/${article.author}`,
    },
    publisher: {
      "@type": "Organization",
      name: "DramaRadar",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DramaRadar",
    url: SITE_URL,
    description: "Reality TV and celebrity gossip news aggregator",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ShowSchemaProps {
  show: ShowDefinition;
}

export function ShowSchema({ show }: ShowSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${show.fullName} News and Updates`,
    description: show.intro,
    url: `${SITE_URL}/shows/${show.tag}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
