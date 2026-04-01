"use client";

import { useState, useEffect } from "react";
import { fetchArticles } from "@/lib/api";
import { SHOW_TAGS } from "@/lib/constants";
import { ArticleCard } from "@/components/ArticleCard";
import type { EditorialArticle } from "@/lib/types";

const showOptions = Object.values(SHOW_TAGS);

const ARTICLE_CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "exclusives", label: "Exclusives" },
  { slug: "hot-takes", label: "Hot Takes" },
  { slug: "recaps", label: "Recaps" },
  { slug: "rankings", label: "Rankings" },
];

function ArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60"
        >
          <div className="h-48 w-full rounded-t-xl bg-[#2A2A3E]" />
          <div className="p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-[#2A2A3E]" />
            <div className="mb-1 h-3 w-full rounded bg-[#2A2A3E]" />
            <div className="mb-3 h-3 w-1/2 rounded bg-[#2A2A3E]" />
            <div className="flex gap-2">
              <div className="h-5 w-14 rounded-full bg-[#2A2A3E]" />
              <div className="h-5 w-14 rounded-full bg-[#2A2A3E]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<EditorialArticle[]>([]);
  const [allArticles, setAllArticles] = useState<EditorialArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeShow, setActiveShow] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      const res = await fetchArticles({
        show: activeShow || undefined,
      });
      setAllArticles(res.articles);
      setArticles(res.articles);
      setLoading(false);
    }

    loadArticles();
  }, [activeShow]);

  // Filter by article category (client-side)
  useEffect(() => {
    if (activeCategory === "all") {
      setArticles(allArticles);
      return;
    }

    const filtered = allArticles.filter((article) => {
      if (activeCategory === "exclusives") return article.isExclusive;
      if (activeCategory === "hot-takes") return article.categories.includes("hot-takes");
      if (activeCategory === "recaps") return article.categories.includes("recaps");
      if (activeCategory === "rankings") return article.categories.includes("rankings");
      return true;
    });
    setArticles(filtered);
  }, [activeCategory, allArticles]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-extrabold text-[#F5F5F5]">
          DramaRadar Originals
        </h1>
        <p className="text-sm text-[#A0A0B0]">
          Exclusive articles, hot takes, and deep dives from the DramaRadar editorial team.
        </p>
        <div
          className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#E84393] to-[#A855F7]"
          aria-hidden="true"
        />
      </div>

      {/* Article category filter pills */}
      <div className="mb-4">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Filter articles by type"
        >
          {ARTICLE_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat.slug
                  ? "bg-[#E84393] text-white shadow-lg shadow-[#E84393]/20"
                  : "border border-[#2A2A3E] bg-transparent text-[#A0A0B0] hover:border-[#E84393] hover:text-[#E84393]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Show filter pills */}
      <div className="mb-8">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter articles by show"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeShow === null}
            onClick={() => setActiveShow(null)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeShow === null
                ? "bg-[#A855F7] text-white shadow-lg shadow-[#A855F7]/20"
                : "border border-[#2A2A3E] bg-transparent text-[#A0A0B0] hover:border-[#A855F7] hover:text-[#A855F7]"
            }`}
          >
            All Shows
          </button>
          {showOptions.map((show) => (
            <button
              key={show.tag}
              type="button"
              role="tab"
              aria-selected={activeShow === show.tag}
              onClick={() => setActiveShow(show.tag)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeShow === show.tag
                  ? "text-white shadow-lg"
                  : "border border-[#2A2A3E] bg-transparent text-[#A0A0B0] hover:border-[#E84393] hover:text-[#E84393]"
              }`}
              style={
                activeShow === show.tag
                  ? {
                      backgroundColor: show.color,
                      boxShadow: `0 10px 15px -3px ${show.color}33`,
                    }
                  : undefined
              }
            >
              {show.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      {loading ? (
        <ArticlesSkeleton />
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-sm text-[#A0A0B0]">No articles found.</p>
          <p className="text-xs text-[#555568]">
            {activeShow || activeCategory !== "all"
              ? "Try a different filter or view all articles."
              : "Check back soon for new editorial content."}
          </p>
        </div>
      )}
    </div>
  );
}
