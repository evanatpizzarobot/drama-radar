import { ArticleDetailClient } from "./ArticleDetailClient";

// For static export, return a placeholder slug. In production, this would
// be populated by fetching known article slugs from the API at build time.
export async function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

interface ArticleDetailPageProps {
  params: { slug: string };
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  return <ArticleDetailClient slug={params.slug} />;
}
