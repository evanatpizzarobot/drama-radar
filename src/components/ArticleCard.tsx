import Link from "next/link";
import { ShowTagPill } from "./ShowTagPill";
import type { EditorialArticle } from "@/lib/types";

interface ArticleCardProps {
  article: EditorialArticle;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/view?slug=${article.slug}`}
      className="group overflow-hidden rounded-xl border border-dr-border bg-dr-surface/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-dr-pink/40 hover:shadow-lg hover:shadow-dr-pink/5"
    >
      {/* Hero image */}
      {article.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dr-surface to-transparent" />

          {/* Badges overlaid on image */}
          <div className="absolute left-3 top-3 flex gap-2">
            {article.isExclusive && (
              <span className="rounded-full bg-dr-gold/90 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-dr-bg">
                Exclusive
              </span>
            )}
            {article.isFeatured && (
              <span className="rounded-full bg-dr-pink/90 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                Featured
              </span>
            )}
          </div>
        </div>
      )}

      {/* Badges when no image */}
      {!article.imageUrl && (article.isExclusive || article.isFeatured) && (
        <div className="flex gap-2 px-4 pt-4">
          {article.isExclusive && (
            <span className="rounded-full bg-dr-gold/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-dr-gold">
              Exclusive
            </span>
          )}
          {article.isFeatured && (
            <span className="rounded-full bg-dr-pink/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-dr-pink">
              Featured
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Title */}
        <h3 className="mb-1.5 text-base font-bold leading-tight text-dr-text transition-colors duration-200 group-hover:text-dr-pink">
          {article.title}
        </h3>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-dr-text-muted">
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
        <div className="flex items-center gap-2 text-[10px] text-dr-text-dim">
          <span>{article.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}
