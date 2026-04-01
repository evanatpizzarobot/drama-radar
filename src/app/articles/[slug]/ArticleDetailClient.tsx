"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchArticle, fetchArticles } from "@/lib/api";
import { ShowTagPill } from "@/components/ShowTagPill";
import { ArticleCard } from "@/components/ArticleCard";
import { AdUnit } from "@/components/AdUnit";
import type { EditorialArticle } from "@/lib/types";

interface ArticleDetailClientProps {
  slug: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-8 animate-pulse">
        <div className="mb-4 h-64 w-full rounded-xl bg-[#2A2A3E]" />
        <div className="mb-3 h-8 w-3/4 rounded bg-[#2A2A3E]" />
        <div className="mb-2 h-5 w-full rounded bg-[#2A2A3E]" />
        <div className="mb-6 flex gap-3">
          <div className="h-4 w-24 rounded bg-[#2A2A3E]" />
          <div className="h-4 w-32 rounded bg-[#2A2A3E]" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-4 w-full rounded bg-[#2A2A3E]" />
          ))}
          <div className="h-4 w-2/3 rounded bg-[#2A2A3E]" />
        </div>
      </div>
    </div>
  );
}

export function ArticleDetailClient({ slug }: ArticleDetailClientProps) {
  const [article, setArticle] = useState<EditorialArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<EditorialArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      setNotFound(false);

      const data = await fetchArticle(slug);

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(data);

      // Fetch related articles by matching show tags
      if (data.showTags.length > 0) {
        const relatedRes = await fetchArticles({
          show: data.showTags[0],
          limit: 4,
        });
        // Filter out the current article
        const filtered = relatedRes.articles.filter(
          (a) => a.slug !== data.slug
        );
        setRelatedArticles(filtered.slice(0, 3));
      }

      setLoading(false);
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (notFound || !article) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-md">
          <h1 className="mb-3 text-2xl font-extrabold text-[#F5F5F5]">
            Article Not Found
          </h1>
          <p className="mb-6 text-sm text-[#A0A0B0]">
            We could not find this article. It may have been removed or the link may be outdated.
          </p>
          <Link
            href="/articles"
            className="inline-block rounded-full bg-[#E84393] px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Browse All Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-[#555568]" aria-label="Breadcrumb">
        <Link href="/articles" className="transition-colors hover:text-[#E84393]">
          Articles
        </Link>
        <span aria-hidden="true">/</span>
        <span className="truncate text-[#A0A0B0]">{article.title}</span>
      </nav>

      {/* Hero image */}
      {article.imageUrl && (
        <div className="relative mb-8 overflow-hidden rounded-xl">
          <img
            src={article.imageUrl}
            alt=""
            className="h-64 w-full object-cover sm:h-80 md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F]/60 to-transparent" />
        </div>
      )}

      {/* Badges */}
      <div className="mb-3 flex flex-wrap gap-2">
        {article.isExclusive && (
          <span className="rounded-full bg-[#FDCB6E]/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#FDCB6E]">
            Exclusive
          </span>
        )}
        {article.isFeatured && (
          <span className="rounded-full bg-[#E84393]/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#E84393]">
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="mb-3 text-2xl font-extrabold leading-tight text-[#F5F5F5] sm:text-3xl">
        {article.title}
      </h1>

      {/* Subtitle */}
      {article.subtitle && (
        <p className="mb-4 text-base leading-relaxed text-[#A0A0B0]">
          {article.subtitle}
        </p>
      )}

      {/* Author and date */}
      <div className="mb-4 flex items-center gap-3 text-xs text-[#555568]">
        <span className="font-semibold text-[#A0A0B0]">{article.author}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
        {article.updatedAt !== article.publishedAt && (
          <>
            <span aria-hidden="true">&middot;</span>
            <span>Updated {formatDate(article.updatedAt)}</span>
          </>
        )}
      </div>

      {/* Show tags */}
      {article.showTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {article.showTags.map((tag) => (
            <Link key={tag} href={`/shows/${tag}`}>
              <ShowTagPill tag={tag} />
            </Link>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr className="mb-8 border-[#1A1A2E]" />

      {/* Mid-article ad */}
      <div className="my-6">
        <AdUnit slot="mid-article" />
      </div>

      {/* Article body (Markdown) */}
      <div className="prose-drama mb-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.body}
        </ReactMarkdown>
      </div>

      {/* Between sections ad */}
      <div className="my-6">
        <AdUnit slot="between-sections" />
      </div>

      {/* Divider */}
      <hr className="mb-8 border-[#1A1A2E]" />

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="mb-8" aria-label="Related articles">
          <h2 className="mb-4 text-lg font-bold text-[#F5F5F5]">
            Related Stories
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
