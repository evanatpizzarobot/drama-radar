import Link from "next/link";
import { ShowTagPill } from "./ShowTagPill";
import type { EditorialArticle } from "@/lib/types";

interface FeaturedArticlesProps {
  articles: EditorialArticle[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (!articles.length) return null;

  const display = articles.slice(0, 4);

  return (
    <section aria-label="Featured articles">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {display.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group relative overflow-hidden rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E84393]/40 hover:shadow-lg hover:shadow-[#E84393]/5"
          >
            {/* Hero image */}
            {article.imageUrl && (
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent" />
              </div>
            )}

            <div className="p-4">
              {/* Badges */}
              <div className="mb-2 flex flex-wrap gap-2">
                {article.isExclusive && (
                  <span className="rounded-full bg-[#FDCB6E]/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#FDCB6E]">
                    Exclusive
                  </span>
                )}
                {article.isFeatured && (
                  <span className="rounded-full bg-[#E84393]/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#E84393]">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="mb-1 text-base font-bold leading-tight text-[#F5F5F5] transition-colors duration-200 group-hover:text-[#E84393]">
                {article.title}
              </h3>

              {/* Subtitle */}
              {article.subtitle && (
                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[#A0A0B0]">
                  {article.subtitle}
                </p>
              )}

              {/* Show tags */}
              {article.showTags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {article.showTags.map((tag) => (
                    <ShowTagPill key={tag} tag={tag} />
                  ))}
                </div>
              )}

              {/* Author and date */}
              <div className="flex items-center gap-2 text-[10px] text-[#555568]">
                <span>{article.author}</span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
